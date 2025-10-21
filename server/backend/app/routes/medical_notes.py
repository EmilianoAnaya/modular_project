from flask import Blueprint, request, jsonify
from pathlib import Path
import json
from app.utils.database import db

medical_notes_bp = Blueprint('medical_notes', __name__)

@medical_notes_bp.route('/', methods=['POST'])
def create_medical_note():
    try:
        data = request.get_json()
        
        required_fields = ['patient_id', 'note_type', 'note_data']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        patient_id = data['patient_id']
        note_type = data['note_type']
        note_data = data['note_data']
        
        # Convertir note_data a JSON string
        description_json = json.dumps(note_data, ensure_ascii=False)
        
        base_path = Path(__file__).parent.parent.parent.parent
        sql_path = base_path / 'database' / 'queries' / 'medical_notes_queries.sql'
        
        with open(sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            create_query = queries[0].split('\n')
            create_query = [line for line in create_query if not line.strip().startswith('--')]
            create_query = '\n'.join(create_query).strip()
        
        result = db.execute_query(create_query, (patient_id, note_type, description_json))
        
        if not result:
            return jsonify({'error': 'Failed to create medical note'}), 500
        
        return jsonify({
            'message': 'Medical note created successfully'
        }), 201
        
    except Exception as e:
        print(f"Create medical note error: {e}")
        return jsonify({'error': 'Internal server error'}), 500


@medical_notes_bp.route('/patient/<int:patient_id>/<note_type>', methods=['GET'])
def get_patient_notes(patient_id, note_type):
    try:
        base_path = Path(__file__).parent.parent.parent.parent
        sql_path = base_path / 'database' / 'queries' / 'medical_notes_queries.sql'
        
        with open(sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            get_notes_query = queries[1].split('\n')
            get_notes_query = [line for line in get_notes_query if not line.strip().startswith('--')]
            get_notes_query = '\n'.join(get_notes_query).strip()
        
        notes = db.execute_query(get_notes_query, (patient_id, note_type), fetch_all=True)
        
        if not notes:
            return jsonify({
                'message': 'No notes found',
                'notes': []
            }), 200
        
        # Parsear JSON de description
        notes_list = []
        for note in notes:
            note_data = None
            if note['description']:
                try:
                    note_data = json.loads(note['description'])
                except json.JSONDecodeError:
                    note_data = None
            
            notes_list.append({
                'id': note['id'],
                'patient_id': note['patient_id'],
                'note_type': note['note_type'],
                'note_data': note_data,
                'created_at': note['created_at'].isoformat() if note['created_at'] else None
            })
        
        return jsonify({
            'message': 'Notes found',
            'notes': notes_list
        }), 200
        
    except Exception as e:
        print(f"Get medical notes error: {e}")
        return jsonify({'error': 'Internal server error'}), 500


@medical_notes_bp.route('/<int:note_id>', methods=['PUT'])
def update_medical_note(note_id):
    try:
        data = request.get_json()
        
        if 'note_data' not in data:
            return jsonify({'error': 'note_data is required'}), 400
        
        note_data = data['note_data']
        description_json = json.dumps(note_data, ensure_ascii=False)
        
        base_path = Path(__file__).parent.parent.parent.parent
        sql_path = base_path / 'database' / 'queries' / 'medical_notes_queries.sql'
        
        with open(sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            update_query = queries[3].split('\n')
            update_query = [line for line in update_query if not line.strip().startswith('--')]
            update_query = '\n'.join(update_query).strip()
        
        result = db.execute_query(update_query, (description_json, note_id))
        
        if not result:
            return jsonify({'error': 'Failed to update medical note'}), 500
        
        return jsonify({
            'message': 'Medical note updated successfully'
        }), 200
        
    except Exception as e:
        print(f"Update medical note error: {e}")
        return jsonify({'error': 'Internal server error'}), 500


@medical_notes_bp.route('/<int:note_id>', methods=['DELETE'])
def delete_medical_note(note_id):
    try:
        base_path = Path(__file__).parent.parent.parent.parent
        sql_path = base_path / 'database' / 'queries' / 'medical_notes_queries.sql'
        
        with open(sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            delete_query = queries[4].split('\n')
            delete_query = [line for line in delete_query if not line.strip().startswith('--')]
            delete_query = '\n'.join(delete_query).strip()
        
        result = db.execute_query(delete_query, (note_id,))
        
        if not result:
            return jsonify({'error': 'Failed to delete medical note'}), 500
        
        return jsonify({
            'message': 'Medical note deleted successfully'
        }), 200
        
    except Exception as e:
        print(f"Delete medical note error: {e}")
        return jsonify({'error': 'Internal server error'}), 500