from flask import Blueprint, request, jsonify
from pathlib import Path
from datetime import datetime
import json
from app.utils.database import db

medical_records_bp = Blueprint('medical_records', __name__)

@medical_records_bp.route('/', methods=['POST'])
def create_medical_record():
    try:
        data = request.get_json()
        
        # Validar campos requeridos
        required_fields = ['patient_id', 'doctor_id', 'consultation_data']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        patient_id = data['patient_id']
        doctor_id = data['doctor_id']
        consultation_data = data['consultation_data']
        
        # Generar summary desde problems, medicines y notes
        summary_parts = []
        
        # Agregar problem names
        if 'problems' in consultation_data and consultation_data['problems']:
            problem_names = [p.get('problem_name', '') for p in consultation_data['problems'] if p.get('problem_name')]
            if problem_names:
                summary_parts.append(f"Problems: {', '.join(problem_names)}")
        
        # Agregar medicines
        if 'medicines' in consultation_data and consultation_data['medicines']:
            medicine_names = [m.get('medicine', '') for m in consultation_data['medicines'] if m.get('medicine')]
            if medicine_names:
                summary_parts.append(f"Medicines: {', '.join(medicine_names)}")
        
        # Agregar notes
        if 'notes' in consultation_data and consultation_data['notes']:
            notes_preview = consultation_data['notes'][:100]  # Primeros 100 caracteres
            summary_parts.append(f"Notes: {notes_preview}...")
        
        summary = ' | '.join(summary_parts) if summary_parts else 'No summary available'
        
        # Convertir consultation_data a JSON string
        full_notes_json = json.dumps(consultation_data, ensure_ascii=False)
        
        # Fecha actual
        current_date = datetime.now().date()
        
        # Insertar en la base de datos
        base_path = Path(__file__).parent.parent.parent.parent
        sql_path = base_path / 'database' / 'queries' / 'medical_records_queries.sql'
        
        with open(sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            create_query = queries[0].split('\n')
            create_query = [line for line in create_query if not line.strip().startswith('--')]
            create_query = '\n'.join(create_query).strip()
        
        result = db.execute_query(
            create_query,
            (patient_id, doctor_id, current_date, summary, full_notes_json)
        )
        
        if not result:
            return jsonify({'error': 'Failed to create medical record'}), 500
        
        return jsonify({
            'message': 'Medical record created successfully',
            'summary': summary
        }), 201
        
    except Exception as e:
        print(f"Create medical record error: {e}")
        return jsonify({'error': 'Internal server error'}), 500


@medical_records_bp.route('/patient/<int:patient_id>', methods=['GET'])
def get_patient_medical_records(patient_id):
    try:
        base_path = Path(__file__).parent.parent.parent.parent
        sql_path = base_path / 'database' / 'queries' / 'medical_records_queries.sql'
        
        with open(sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            get_records_query = queries[1].split('\n')
            get_records_query = [line for line in get_records_query if not line.strip().startswith('--')]
            get_records_query = '\n'.join(get_records_query).strip()
        
        records = db.execute_query(get_records_query, (patient_id,), fetch_all=True)
        
        if not records:
            return jsonify({
                'message': 'No medical records found',
                'records': []
            }), 200
        
        # Formatear respuesta
        records_list = []
        for record in records:
            # Parsear JSON de full_notes
            full_notes_data = None
            if record['full_notes']:
                try:
                    full_notes_data = json.loads(record['full_notes'])
                except json.JSONDecodeError:
                    full_notes_data = None
            
            records_list.append({
                'id': record['id'],
                'patient_id': record['patient_id'],
                'doctor_id': record['doctor_id'],
                'date': record['date'].isoformat() if record['date'] else None,
                'summary': record['summary'],
                'consultation_data': full_notes_data,
                'created_at': record['created_at'].isoformat() if record['created_at'] else None
            })
        
        return jsonify({
            'message': 'Medical records found',
            'records': records_list
        }), 200
        
    except Exception as e:
        print(f"Get medical records error: {e}")
        return jsonify({'error': 'Internal server error'}), 500