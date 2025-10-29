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
        appointment_date = data.get('appointment_date')  # Ahora es datetime completo
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
            (patient_id, doctor_id, appointment_date, reason)
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
        
        appointment_date = data.get('appointment_date')  # Ahora es datetime completo
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
            (appointment_date, reason, status, appointment_id)
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
    
    
@appointments_bp.route('/doctors/search', methods=['GET'])
def search_doctors():
    """Buscar doctores por nombre o especialidad"""
    try:
        search_term = request.args.get('q', '')
        
        if not search_term:
            return jsonify({'doctors': []}), 200
        
        base_path = Path(__file__).parent.parent.parent.parent
        sql_path = base_path / 'database' / 'queries' / 'doctor_queries.sql'
        
        with open(sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            # Query index 4: Search doctors (es la 5ta query, índice 4)
            search_doctors_query = queries[4].split('\n')
            search_doctors_query = [line for line in search_doctors_query if not line.strip().startswith('--')]
            search_doctors_query = '\n'.join(search_doctors_query).strip()
        
        doctors = db.execute_query(search_doctors_query, (search_term, search_term), fetch_all=True)
        
        return jsonify({
            'message': 'Doctors found',
            'doctors': [dict(doc) for doc in doctors] if doctors else []
        }), 200
        
    except Exception as e:
        print(f"Search doctors error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500
    

@appointments_bp.route('/available-hours', methods=['GET'])
def get_available_hours():
    """Obtener horarios disponibles verificando tanto doctor como paciente"""
    try:
        doctor_id = request.args.get('doctor_id')
        patient_id = request.args.get('patient_id')
        date = request.args.get('date')
        
        if not all([doctor_id, patient_id, date]):
            return jsonify({'error': 'Missing required parameters'}), 400
        
        print(f"DEBUG - Checking availability for date: {date}, doctor: {doctor_id}, patient: {patient_id}")
        
        # Query para obtener horarios ocupados por el DOCTOR o el PACIENTE en la fecha específica
        query = """
            SELECT 
                DATE_FORMAT(appointment_date, '%H:%i') as occupied_time,
                appointment_date
            FROM appointments
            WHERE DATE(appointment_date) = %s
              AND status != 'Canceled'
              AND (doctor_id = %s OR patient_id = %s)
        """
        
        occupied_hours = db.execute_query(query, (date, doctor_id, patient_id), fetch_all=True)
        
        print(f"DEBUG - Query result: {occupied_hours}")
        
        # Convertir a lista de strings HH:MM
        occupied_list = []
        if occupied_hours:
            for row in occupied_hours:
                time_str = row['occupied_time']
                print(f"DEBUG - Processing time: {time_str}")
                if time_str:
                    # Asegurar formato HH:MM
                    if len(time_str) == 5:  # Ya está en formato HH:MM
                        occupied_list.append(time_str)
                    else:  # Extraer HH:MM del datetime
                        occupied_list.append(time_str[:5])
        
        # Eliminar duplicados
        occupied_list = list(set(occupied_list))
        
        print(f"DEBUG - Final occupied hours: {occupied_list}")
        
        return jsonify({
            'message': 'Available hours retrieved',
            'occupied_hours': occupied_list
        }), 200
        
    except Exception as e:
        print(f"Get available hours error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500
    
@appointments_bp.route('/doctor/<int:doctor_id>/date/<string:date>', methods=['GET'])
def get_doctor_appointments_by_date(doctor_id, date):
    """Obtener citas de un doctor en una fecha específica"""
    try:
        query = """
            SELECT 
                a.id,
                a.patient_id,
                a.doctor_id,
                a.appointment_date,
                a.reason,
                a.status,
                CONCAT(u.first_name, ' ', u.last_name) as patient_name
            FROM appointments a
            INNER JOIN patients p ON a.patient_id = p.id
            INNER JOIN users u ON p.user_id = u.id
            WHERE a.doctor_id = %s
              AND DATE(a.appointment_date) = %s
            ORDER BY a.appointment_date ASC
        """
        
        appointments = db.execute_query(query, (doctor_id, date), fetch_all=True)
        
        return jsonify({
            'message': 'Appointments retrieved successfully',
            'appointments': [dict(apt) for apt in appointments] if appointments else []
        }), 200
        
    except Exception as e:
        print(f"Get doctor appointments error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500   

@appointments_bp.route('/doctor/<int:doctor_id>', methods=['GET'])
def get_all_doctor_appointments(doctor_id):
    """Obtener todas las citas de un doctor"""
    try:
        query = """
            SELECT 
                a.id,
                a.patient_id,
                a.doctor_id,
                a.appointment_date,
                a.reason,
                a.status,
                CONCAT(u.first_name, ' ', u.last_name) as patient_name
            FROM appointments a
            INNER JOIN patients p ON a.patient_id = p.id
            INNER JOIN users u ON p.user_id = u.id
            WHERE a.doctor_id = %s
            ORDER BY a.appointment_date DESC
        """
        
        appointments = db.execute_query(query, (doctor_id,), fetch_all=True)
        
        return jsonify({
            'message': 'Appointments retrieved successfully',
            'appointments': [dict(apt) for apt in appointments] if appointments else []
        }), 200
        
    except Exception as e:
        print(f"Get all doctor appointments error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500
    
