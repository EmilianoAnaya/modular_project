from flask import Blueprint, request, jsonify
from pathlib import Path
import json
import requests
from app.utils.database import db

ai_reports_bp = Blueprint('ai_reports', __name__)

# Configuración de Ollama - MODELO LIGERO
OLLAMA_API_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "llama3.2:1b"

def call_ollama(prompt):
    """Llamar a Ollama API local"""
    try:
        payload = {
            "model": OLLAMA_MODEL,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0.3,
                "top_p": 0.8,
                "num_predict": 250
            }
        }
        
        response = requests.post(OLLAMA_API_URL, json=payload, timeout=300)
        response.raise_for_status()
        
        result = response.json()
        return result.get('response', '')
        
    except requests.exceptions.RequestException as e:
        print(f"Ollama API error: {e}")
        raise Exception(f"Error connecting to Ollama: {str(e)}")

def build_consultation_prompt(record_data):
    """Construir prompt para documentar/resumir UNA consulta específica"""
    
    patient_name = f"{record_data['first_name']} {record_data['last_name']}"
    gender = record_data['gender']
    consult_date = record_data['date']
    
    # Iniciar con contexto claro: estamos DOCUMENTANDO, no diagnosticando
    prompt = f"""Actúa como asistente de resumenes. Tu tarea es RESUMIR la información de la información presentes sin importar el contenido.

INFORMACIÓN DE LA CONSULTA:
Paciente: {patient_name} ({gender})
Fecha: {consult_date}

DATOS REGISTRADOS EN LA CONSULTA:
"""

    # Agregar datos de la consulta
    problems_list = []
    medicines_list = []
    notes_text = ""
    
    if record_data['full_notes']:
        try:
            notes_data = json.loads(record_data['full_notes'])
            
            # Problemas/Diagnósticos
            if 'problems' in notes_data and notes_data['problems']:
                for problem in notes_data['problems'][:5]:
                    if isinstance(problem, dict):
                        problem_name = problem.get('problem_name', '')
                        problem_desc = problem.get('problem_description', '')
                        if problem_name:
                            if problem_desc:
                                problems_list.append(f"{problem_name} - {problem_desc[:80]}")
                            else:
                                problems_list.append(problem_name)
            
            # Medicamentos prescritos
            if 'medicines' in notes_data and notes_data['medicines']:
                for medicine in notes_data['medicines'][:5]:
                    if isinstance(medicine, dict):
                        med_name = medicine.get('medicine', '')
                        dosage = medicine.get('dosage', '')
                        frequency = medicine.get('frequency', '')
                        if med_name:
                            med_info = med_name
                            if dosage:
                                med_info += f" {dosage}"
                            if frequency:
                                med_info += f", {frequency}"
                            medicines_list.append(med_info)
            
            # Notas adicionales
            if 'notes' in notes_data and notes_data['notes']:
                notes_text = notes_data['notes'][:250]
                
        except json.JSONDecodeError:
            notes_text = record_data['full_notes'][:250]
    
    # Construir el prompt con los datos reales
    if problems_list:
        prompt += "\nProblemas documentados:\n"
        for i, problem in enumerate(problems_list, 1):
            prompt += f"{i}. {problem}\n"
    
    if medicines_list:
        prompt += "\nMedicamentos prescritos:\n"
        for i, med in enumerate(medicines_list, 1):
            prompt += f"{i}. {med}\n"
    
    if notes_text:
        prompt += f"\nNotas del doctor:\n{notes_text}\n"
    
    if record_data['summary']:
        prompt += f"\nResumen previo: {record_data['summary'][:150]}\n"
    
    # Instrucción clara: REFORMULAR lo que ya existe, no crear nuevo contenido
    prompt += """
TAREA: Reorganiza la información anterior en un formato estructurado y claro. NO agregues diagnósticos nuevos, solo RESUME lo que está documentado arriba.

Formato requerido (máximo 500 palabras):

**Diagnóstico documentado:** [resume los problemas listados sin importar el nombre]

**Tratamiento prescrito:** [lista los medicamentos si hay sin importar el nombre]

**Observaciones:** [resume las notas del doctor sin importar el nombre]

**Indicaciones:** [menciona seguimiento si se indica sin importar el nombre]

IMPORTANTE: Solo organiza la información proporcionada, no agregues información nueva ni recomendaciones adicionales y si no puedes hacerlo, explica la razón."""

    return prompt

@ai_reports_bp.route('/generate-summary/record/<int:medical_record_id>', methods=['POST'])
def generate_summary_for_record(medical_record_id):
    """Generar resumen de IA para UN medical record específico (consulta)"""
    try:
        base_path = Path(__file__).parent.parent.parent.parent
        sql_path = base_path / 'database' / 'queries' / 'ai_reports_queries.sql'
        
        with open(sql_path, 'r') as file:
            queries = file.read().split('\n\n')
        
        # Query #2: Verificar si ya existe un resumen para este record
        check_existing_query = queries[1].split('\n')
        check_existing_query = [line for line in check_existing_query if not line.strip().startswith('--')]
        check_existing_query = '\n'.join(check_existing_query).strip()
        
        existing_report = db.execute_query(check_existing_query, (medical_record_id,), fetch_one=True)
        
        # Si ya existe, devolverlo sin regenerar
        if existing_report:
            return jsonify({
                'message': 'Summary already exists',
                'summary': existing_report['summary'],
                'generated_at': existing_report['generated_at'].isoformat(),
                'is_new': False
            }), 200
        
        # Query #3: Get medical record data
        get_record_query = queries[2].split('\n')
        get_record_query = [line for line in get_record_query if not line.strip().startswith('--')]
        get_record_query = '\n'.join(get_record_query).strip()
        
        record_data = db.execute_query(get_record_query, (medical_record_id,), fetch_one=True)
        
        if not record_data:
            return jsonify({'error': 'Medical record not found'}), 404
        
        # Verificar que tenga datos para analizar
        if not record_data['full_notes'] and not record_data['summary']:
            return jsonify({'error': 'No data available to generate summary'}), 400
        
        # Construir prompt para la consulta
        prompt = build_consultation_prompt(record_data)
        
        print(f"Generating summary for medical_record_id: {medical_record_id}")
        print(f"Prompt length: {len(prompt)} characters")
        print("--- PROMPT START ---")
        print(prompt)
        print("--- PROMPT END ---")
        
        # Llamar a Ollama
        print("Calling Ollama... (1-3 minutos)")
        ai_summary = call_ollama(prompt)
        
        if not ai_summary or len(ai_summary.strip()) < 20:
            return jsonify({'error': 'Failed to generate valid summary'}), 500
        
        print("AI Summary generated successfully!")
        print(f"Summary: {ai_summary}")
        
        # Query #1: Insert AI report
        insert_report_query = queries[0].split('\n')
        insert_report_query = [line for line in insert_report_query if not line.strip().startswith('--')]
        insert_report_query = '\n'.join(insert_report_query).strip()
        
        db.execute_query(insert_report_query, (medical_record_id, ai_summary))
        
        return jsonify({
            'message': 'Summary generated successfully',
            'summary': ai_summary,
            'is_new': True
        }), 201
        
    except Exception as e:
        print(f"Generate summary error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@ai_reports_bp.route('/summary/record/<int:medical_record_id>', methods=['GET'])
def get_summary_for_record(medical_record_id):
    """Obtener resumen de IA para un medical record específico"""
    try:
        base_path = Path(__file__).parent.parent.parent.parent
        sql_path = base_path / 'database' / 'queries' / 'ai_reports_queries.sql'
        
        with open(sql_path, 'r') as file:
            queries = file.read().split('\n\n')
        
        # Query #2: Get AI report
        get_report_query = queries[1].split('\n')
        get_report_query = [line for line in get_report_query if not line.strip().startswith('--')]
        get_report_query = '\n'.join(get_report_query).strip()
        
        report_data = db.execute_query(get_report_query, (medical_record_id,), fetch_one=True)
        
        if not report_data:
            return jsonify({
                'message': 'No summary found',
                'summary': None
            }), 200
        
        return jsonify({
            'message': 'Summary retrieved successfully',
            'summary': report_data['summary'],
            'generated_at': report_data['generated_at'].isoformat()
        }), 200
        
    except Exception as e:
        print(f"Get summary error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500