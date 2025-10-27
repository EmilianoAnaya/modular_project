from flask import Blueprint, request, jsonify
from pathlib import Path
from app.utils.database import db

appointments_bp = Blueprint('appointments', __name__)

@appointments_bp.route('/patient/<int:patient_id>', methods=['GET'])
def get_patient_appointments(patient_id):
    """Obtener todas las citas de un paciente"""
    try:
        base_path = Path(__file__).parent.parent.parent.parent
        sql_path = base_path / 'database' / 'queries' / 'appointments_queries.sql'
        
        with open(sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            get_appointments_query = queries[0].split('\n')
            get_appointments_query = [line for line in get_appointments_query if not line.strip().startswith('--')]
            get_appointments_query = '\n'.join(get_appointments_query).strip()
        
        appointments = db.execute_query(get_appointments_query, (patient_id,), fetch_all=True)
        
        return jsonify({
            'message': 'Appointments retrieved successfully',
            'appointments': [dict(apt) for apt in appointments] if appointments else []
        }), 200
        
    except Exception as e:
        print(f"Get appointments error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500


@appointments_bp.route('/', methods=['POST'])
def create_appointment():
    """Crear nueva cita"""
    try:
        data = request.get_json()
        
        patient_id = data.get('patient_id')
        doctor_id = data.get('doctor_id')
        appointment_date = data.get('appointment_date')
        appointment_time = data.get('appointment_time')
        reason = data.get('reason')
        
        if not all([patient_id, doctor_id, appointment_date]):
            return jsonify({'error': 'Missing required fields'}), 400
        
        base_path = Path(__file__).parent.parent.parent.parent
        sql_path = base_path / 'database' / 'queries' / 'appointments_queries.sql'
        
        with open(sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            create_appointment_query = queries[1].split('\n')
            create_appointment_query = [line for line in create_appointment_query if not line.strip().startswith('--')]
            create_appointment_query = '\n'.join(create_appointment_query).strip()
        
        db.execute_query(
            create_appointment_query,
            (patient_id, doctor_id, appointment_date, appointment_time, reason)
        )
        
        return jsonify({
            'message': 'Appointment created successfully'
        }), 201
        
    except Exception as e:
        print(f"Create appointment error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500


@appointments_bp.route('/<int:appointment_id>', methods=['PUT'])
def update_appointment(appointment_id):
    """Actualizar una cita"""
    try:
        data = request.get_json()
        
        appointment_date = data.get('appointment_date')
        appointment_time = data.get('appointment_time')
        reason = data.get('reason')
        status = data.get('status')
        
        base_path = Path(__file__).parent.parent.parent.parent
        sql_path = base_path / 'database' / 'queries' / 'appointments_queries.sql'
        
        with open(sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            update_appointment_query = queries[2].split('\n')
            update_appointment_query = [line for line in update_appointment_query if not line.strip().startswith('--')]
            update_appointment_query = '\n'.join(update_appointment_query).strip()
        
        db.execute_query(
            update_appointment_query,
            (appointment_date, appointment_time, reason, status, appointment_id)
        )
        
        return jsonify({
            'message': 'Appointment updated successfully'
        }), 200
        
    except Exception as e:
        print(f"Update appointment error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500


@appointments_bp.route('/<int:appointment_id>/cancel', methods=['PUT'])
def cancel_appointment(appointment_id):
    """Cancelar una cita"""
    try:
        base_path = Path(__file__).parent.parent.parent.parent
        sql_path = base_path / 'database' / 'queries' / 'appointments_queries.sql'
        
        with open(sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            cancel_appointment_query = queries[3].split('\n')
            cancel_appointment_query = [line for line in cancel_appointment_query if not line.strip().startswith('--')]
            cancel_appointment_query = '\n'.join(cancel_appointment_query).strip()
        
        db.execute_query(cancel_appointment_query, (appointment_id,))
        
        return jsonify({
            'message': 'Appointment cancelled successfully'
        }), 200
        
    except Exception as e:
        print(f"Cancel appointment error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500