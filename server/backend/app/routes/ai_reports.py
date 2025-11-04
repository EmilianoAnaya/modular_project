from flask import Blueprint, request, jsonify
from pathlib import Path
import json
import requests
from app.utils.database import db

ai_reports_bp = Blueprint('ai_reports', __name__)

# Configuración de Ollama
OLLAMA_API_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "phi3"

def call_ollama(prompt):
    """Llamar a Ollama API local"""
    try:
        payload = {
            "model": OLLAMA_MODEL,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0.7,
                "top_p": 0.9,
                "num_predict": 300
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
    """Construir prompt técnico para extraer información estructurada"""
    
    patient_name = f"{record_data['first_name']} {record_data['last_name']}"
    gender = record_data['gender']
    consult_date = record_data['date']
    
    prompt = f"""Tarea: Extraer y organizar datos de registro médico electrónico.

REGISTRO MÉDICO ELECTRÓNICO:
ID Paciente: {patient_name} ({gender})
Fecha registro: {consult_date}

DATOS DEL REGISTRO:
"""

    problems_list = []
    medicines_list = []
    notes_text = ""
    
    if record_data['full_notes']:
        try:
            notes_data = json.loads(record_data['full_notes'])
            
            if 'problems' in notes_data and notes_data['problems']:
                for problem in notes_data['problems'][:5]:
                    if isinstance(problem, dict):
                        problem_name = problem.get('problem_name', '')
                        problem_desc = problem.get('problem_description', '')
                        if problem_name:
                            problems_list.append(f"{problem_name}: {problem_desc[:60]}")
            
            if 'medicines' in notes_data and notes_data['medicines']:
                for medicine in notes_data['medicines'][:5]:
                    if isinstance(medicine, dict):
                        med_name = medicine.get('medicine', '')
                        dosage = medicine.get('dosage', '')
                        if med_name:
                            medicines_list.append(f"{med_name} {dosage}")
            
            if 'notes' in notes_data and notes_data['notes']:
                notes_text = notes_data['notes'][:200]
                
        except json.JSONDecodeError:
            notes_text = record_data['full_notes'][:200]
    
    if problems_list:
        prompt += "\nCondiciones registradas:\n"
        for i, problem in enumerate(problems_list, 1):
            prompt += f"{i}. {problem}\n"
    
    if medicines_list:
        prompt += "\nMedicamentos registrados:\n"
        for i, med in enumerate(medicines_list, 1):
            prompt += f"{i}. {med}\n"
    
    if notes_text:
        prompt += f"\nObservaciones: {notes_text}\n"
    
    prompt += """
INSTRUCCIÓN: Reformula la información anterior en formato estructurado. Usa EXACTAMENTE estas secciones:

Condiciones: [lista las condiciones registradas]
Medicación: [lista los medicamentos]
Observaciones: [resume las observaciones]
Indicaciones: [menciona seguimiento si hay]

Máximo 80 palabras. Solo reformula, no agregues información nueva."""

    return prompt

def get_patient_context(patient_id):
    """Obtener todo el contexto del paciente para el chatbot"""
    try:
        base_path = Path(__file__).parent.parent.parent.parent
        sql_path = base_path / 'database' / 'queries' / 'chatbot_queries.sql'
        
        with open(sql_path, 'r') as file:
            queries = file.read().split('\n\n')
        
        # Query #1: Patient basic info
        patient_query = queries[0].split('\n')
        patient_query = [line for line in patient_query if not line.strip().startswith('--')]
        patient_query = '\n'.join(patient_query).strip()
        patient_data = db.execute_query(patient_query, (patient_id,), fetch_one=True)
        
        if not patient_data:
            return None
        
        # Query #2: Allergies
        allergies_query = queries[1].split('\n')
        allergies_query = [line for line in allergies_query if not line.strip().startswith('--')]
        allergies_query = '\n'.join(allergies_query).strip()
        allergies = db.execute_query(allergies_query, (patient_id,), fetch_all=True)
        
        # Query #3: Chronic diseases
        chronic_query = queries[2].split('\n')
        chronic_query = [line for line in chronic_query if not line.strip().startswith('--')]
        chronic_query = '\n'.join(chronic_query).strip()
        chronic_diseases = db.execute_query(chronic_query, (patient_id,), fetch_all=True)
        
        # Query #4: Recent medical records
        records_query = queries[3].split('\n')
        records_query = [line for line in records_query if not line.strip().startswith('--')]
        records_query = '\n'.join(records_query).strip()
        medical_records = db.execute_query(records_query, (patient_id,), fetch_all=True)
        
        # Query #5: Recent studies
        studies_query = queries[4].split('\n')
        studies_query = [line for line in studies_query if not line.strip().startswith('--')]
        studies_query = '\n'.join(studies_query).strip()
        studies = db.execute_query(studies_query, (patient_id,), fetch_all=True)
        
        return {
            'patient': patient_data,
            'allergies': allergies,
            'chronic_diseases': chronic_diseases,
            'medical_records': medical_records,
            'studies': studies
        }
        
    except Exception as e:
        print(f"Error getting patient context: {e}")
        return None

def build_chatbot_prompt(patient_context, conversation_history, user_message):
    """Construir prompt para el chatbot con contexto del paciente - SIN etiquetas en output"""
    
    patient = patient_context['patient']
    
    prompt = f"""Eres un asistente médico. Tienes acceso al historial médico del paciente.

INFORMACIÓN DEL PACIENTE:
- Nombre: {patient['first_name']} {patient['last_name']}
- Edad: {patient['age']} años
- Género: {patient['gender']}

"""
    
    # Agregar alergias
    if patient_context['allergies']:
        prompt += "ALERGIAS:\n"
        for allergy in patient_context['allergies']:
            try:
                allergy_data = json.loads(allergy['description'])
                if isinstance(allergy_data, list):
                    for item in allergy_data:
                        if isinstance(item, dict) and 'allergen' in item:
                            prompt += f"- {item['allergen']}: {item.get('reaction', 'N/A')}\n"
            except:
                pass
    
    # Agregar enfermedades crónicas
    if patient_context['chronic_diseases']:
        prompt += "\nENFERMEDADES CRÓNICAS:\n"
        for disease in patient_context['chronic_diseases']:
            try:
                disease_data = json.loads(disease['description'])
                if isinstance(disease_data, list):
                    for item in disease_data:
                        if isinstance(item, dict) and 'disease_name' in item:
                            prompt += f"- {item['disease_name']}\n"
            except:
                pass
    
    # Agregar consultas recientes (resumidas)
    if patient_context['medical_records']:
        prompt += "\nCONSULTAS RECIENTES:\n"
        for record in patient_context['medical_records'][:2]:
            prompt += f"- {record['date']}: {record['summary'][:100]}\n"
    
    # Agregar estudios recientes
    if patient_context['studies']:
        prompt += "\nESTUDIOS RECIENTES:\n"
        for study in patient_context['studies']:
            prompt += f"- {study['study_type']} ({study['performed_at']})\n"
    
    # Agregar historial de conversación (sin etiquetas USER/ASSISTANT)
    if conversation_history:
        prompt += "\nCONVERSACIÓN PREVIA:\n"
        for msg in conversation_history[-4:]:
            if msg['role'] == 'user':
                prompt += f"Paciente preguntó: {msg['content']}\n"
            else:
                prompt += f"Tú respondiste: {msg['content']}\n"
    
    # Agregar pregunta actual
    prompt += f"\nPaciente pregunta ahora: {user_message}\n"
    
    # Instrucción SIN formato de etiquetas
    prompt += """
Responde en español de forma clara y concisa. Usa la información médica del paciente cuando sea relevante. Si preguntan algo que no está en los registros, indica que no tienes esa información. Máximo 100 palabras.

Tu respuesta (solo el texto, sin etiquetas ni formato especial):"""

    return prompt

@ai_reports_bp.route('/chat', methods=['POST'])
def chat_with_patient_context():
    """Chatbot con contexto del paciente"""
    try:
        data = request.get_json()
        
        patient_id = data.get('patient_id')
        user_message = data.get('message')
        conversation_history = data.get('history', [])
        
        if not patient_id or not user_message:
            return jsonify({'error': 'patient_id and message are required'}), 400
        
        # Obtener contexto del paciente
        patient_context = get_patient_context(patient_id)
        
        if not patient_context:
            return jsonify({'error': 'Patient not found'}), 404
        
        # Construir prompt con contexto
        prompt = build_chatbot_prompt(patient_context, conversation_history, user_message)
        
        print(f"Chatbot prompt length: {len(prompt)} characters")
        
        # Llamar a Ollama
        ai_response = call_ollama(prompt)
        
        if not ai_response:
            return jsonify({'error': 'Failed to generate response'}), 500
        
        # Limpiar respuesta (remover posibles etiquetas residuales)
        ai_response = ai_response.strip()
        
        # Remover etiquetas comunes si aparecen
        prefixes_to_remove = [
            'ASSISTANT:', 'Assistant:', 'AI:', 
            'USER:', 'User:',
            'Tu respuesta:', 'Respuesta:'
        ]
        
        for prefix in prefixes_to_remove:
            if ai_response.startswith(prefix):
                ai_response = ai_response[len(prefix):].strip()
        
        return jsonify({
            'message': 'Response generated successfully',
            'response': ai_response
        }), 200
        
    except Exception as e:
        print(f"Chat error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@ai_reports_bp.route('/generate-summary/record/<int:medical_record_id>', methods=['POST'])
def generate_summary_for_record(medical_record_id):
    """Generar resumen de IA para UN medical record específico (consulta)"""
    try:
        base_path = Path(__file__).parent.parent.parent.parent
        sql_path = base_path / 'database' / 'queries' / 'ai_reports_queries.sql'
        
        with open(sql_path, 'r') as file:
            queries = file.read().split('\n\n')
        
        # Query #2: Verificar si ya existe un resumen
        check_existing_query = queries[1].split('\n')
        check_existing_query = [line for line in check_existing_query if not line.strip().startswith('--')]
        check_existing_query = '\n'.join(check_existing_query).strip()
        
        existing_report = db.execute_query(check_existing_query, (medical_record_id,), fetch_one=True)
        
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
        
        if not record_data['full_notes'] and not record_data['summary']:
            return jsonify({'error': 'No data available to generate summary'}), 400
        
        prompt = build_consultation_prompt(record_data)
        
        print(f"Generating summary for medical_record_id: {medical_record_id}")
        
        ai_summary = call_ollama(prompt)
        
        if not ai_summary or len(ai_summary.strip()) < 20:
            return jsonify({'error': 'Failed to generate valid summary'}), 500
        
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