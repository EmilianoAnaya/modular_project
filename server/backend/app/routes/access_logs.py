from flask import Blueprint, request, jsonify
from app.utils.database import db

access_logs_bp = Blueprint('access_logs', __name__)

@access_logs_bp.route('/', methods=['POST'])
def create_access_log():
    """Registrar acceso a un paciente"""
    try:
        data = request.get_json()
        
        if not data or not data.get('patient_user_id'):
            return jsonify({'error': 'patient_user_id is required'}), 400
        
        patient_user_id = data.get('patient_user_id')
        
        # Insertar registro de acceso
        insert_query = "INSERT INTO access_logs (user_id) VALUES (%s)"
        result = db.execute_query(insert_query, (patient_user_id,))
        
        if not result:
            return jsonify({'error': 'Failed to create access log'}), 500
        
        return jsonify({
            'message': 'Access log created successfully'
        }), 201
        
    except Exception as e:
        print(f"Create access log error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500