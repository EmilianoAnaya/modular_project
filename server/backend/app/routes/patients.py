from flask import Blueprint, request, jsonify
from pathlib import Path
from datetime import datetime
from app.utils.database import db
from app.utils.token_generator import generate_patient_token

patients_bp = Blueprint('patients', __name__)

@patients_bp.route('/register', methods=['POST'])
def register_patient():
    try:
        data = request.get_json()

        required_fields = ['first_name', 'last_name', 'email', 'gender', 'date_of_birth', 'city', 'country']
        if not all(field in data for field in required_fields):
            missing_fields = [field for field in required_fields if field not in data]
            return jsonify({'error': f'Missing required fields: {missing_fields}'}), 400

        # Validar que los campos no estén vacíos
        for field in required_fields:
            if not data.get(field) or str(data.get(field)).strip() == '':
                return jsonify({'error': f'{field} is required and cannot be empty'}), 400

        # Verificar si el usuario ya existe
        base_path = Path(__file__).parent.parent.parent.parent
        auth_sql_path = base_path / 'database' / 'queries' / 'auth_queries.sql'
        with open(auth_sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            get_user_query = queries[1].split('\n')
            get_user_query = [line for line in get_user_query if not line.strip().startswith('--')]
            get_user_query = '\n'.join(get_user_query).strip()

        existing_user = db.execute_query(get_user_query, (data['email'],), fetch_one=True)

        if existing_user:
            return jsonify({'error': 'Email already registered'}), 400

        # Crear usuario usando query SQL (sin password para pacientes por ahora)
        user_sql_path = base_path / 'database' / 'queries' / 'user_queries.sql'
        with open(user_sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            create_user_query = queries[0].split('\n')
            create_user_query = [line for line in create_user_query if not line.strip().startswith('--')]
            create_user_query = '\n'.join(create_user_query).strip()

        role = 'Patient'
        # Password temporal vacío (se puede cambiar después)
        temp_password = 'temp_patient_password'

        result = db.execute_query(
            create_user_query,
            (data['first_name'], data['last_name'], data['email'], data['gender'],
             data['date_of_birth'], data['city'], data['country'], temp_password, role)
        )

        if not result:
            return jsonify({'error': 'Failed to create user'}), 500

        # Obtener el usuario recién creado
        new_user = db.execute_query(get_user_query, (data['email'],), fetch_one=True)

        if not new_user:
            return jsonify({'error': 'Failed to retrieve created user'}), 500

        user_id = new_user['id']

        # Crear registro en tabla patients
        patients_sql_path = base_path / 'database' / 'queries' / 'patients_queries.sql'
        with open(patients_sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            create_patient_query = queries[0].split('\n')
            create_patient_query = [line for line in create_patient_query if not line.strip().startswith('--')]
            create_patient_query = '\n'.join(create_patient_query).strip()

        # Generar token único para el paciente
        patient_token = generate_patient_token()

        # Insertar patient
        patient_result = db.execute_query(create_patient_query, (user_id, patient_token))

        if not patient_result:
            # Si falla crear patient, el usuario ya se creó (no hay rollback por ahora)
            return jsonify({'error': 'Failed to create patient profile'}), 500

        return jsonify({
            'message': 'Patient registered successfully',
            'user_id': user_id,
            'role': role
        }), 201

    except Exception as e:
        print(f"Register patient error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@patients_bp.route('/search', methods=['GET'])
def search_patients():
    try:
        search_term = request.args.get('q', '').strip()

        if not search_term:
            return jsonify({'error': 'Search term is required'}), 400

        base_path = Path(__file__).parent.parent.parent.parent
        patients_sql_path = base_path / 'database' / 'queries' / 'patients_queries.sql'

        with open(patients_sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            # Query #3: Get all patients with user information
            get_all_patients_query = queries[2].split('\n')
            get_all_patients_query = [line for line in get_all_patients_query if not line.strip().startswith('--')]
            get_all_patients_query = '\n'.join(get_all_patients_query).strip()

        # Modificar la query para agregar filtro de búsqueda
        search_query = get_all_patients_query.replace(
            "WHERE u.status = 'Active'",
            "WHERE u.status = 'Active' AND (u.first_name LIKE %s OR u.last_name LIKE %s OR CONCAT(u.first_name, ' ', u.last_name) LIKE %s)"
        )

        # Preparar término de búsqueda con wildcards
        search_pattern = f"%{search_term}%"

        patients = db.execute_query(
            search_query,
            (search_pattern, search_pattern, search_pattern),
            fetch_all=True
        )

        if not patients:
            return jsonify({
                'message': 'No patients found',
                'patients': []
            }), 200

        # Formatear respuesta
        patients_list = []
        for patient in patients:
            patients_list.append({
                'patient_id': patient['patient_id'],
                'user_id': patient['user_id'],
                'first_name': patient['first_name'],
                'last_name': patient['last_name'],
                'email': patient['email'],
                'gender': patient['gender'],
                'date_of_birth': patient['date_of_birth'].isoformat() if patient['date_of_birth'] else None,
                'city': patient['city'],
                'country': patient['country'],
                'created_at': patient['created_at'].isoformat() if patient['created_at'] else None
            })

        return jsonify({
            'message': 'Patients found successfully',
            'patients': patients_list
        }), 200

    except Exception as e:
        print(f"Search patients error: {e}")
        return jsonify({'error': 'Internal server error'}), 500
    

@patients_bp.route('/<int:patient_id>', methods=['GET'])
def get_patient_by_id(patient_id):
    try:
        base_path = Path(__file__).parent.parent.parent.parent
        patients_sql_path = base_path / 'database' / 'queries' / 'patients_queries.sql'

        with open(patients_sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            # Query #4: Get patient by patient_id with user information AND token
            get_patient_query = queries[3].split('\n')
            get_patient_query = [line for line in get_patient_query if not line.strip().startswith('--')]
            get_patient_query = '\n'.join(get_patient_query).strip()

        # Modificar query para incluir token
        get_patient_query = get_patient_query.replace(
            "SELECT p.id as patient_id, p.user_id,",
            "SELECT p.id as patient_id, p.user_id, p.token,"
        )

        patient = db.execute_query(get_patient_query, (patient_id,), fetch_one=True)

        if not patient:
            return jsonify({'error': 'Patient not found'}), 404

        # Calcular edad
        age = None
        if patient['date_of_birth']:
            today = datetime.now().date()
            birth_date = patient['date_of_birth']
            age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))

        return jsonify({
            'message': 'Patient found successfully',
            'patient': {
                'patient_id': patient['patient_id'],
                'user_id': patient['user_id'],
                'token': patient['token'],  # ← AGREGAR ESTA LÍNEA
                'first_name': patient['first_name'],
                'last_name': patient['last_name'],
                'full_name': f"{patient['first_name']} {patient['last_name']}",
                'email': patient['email'],
                'gender': patient['gender'],
                'date_of_birth': patient['date_of_birth'].isoformat() if patient['date_of_birth'] else None,
                'age': age,
                'city': patient['city'],
                'country': patient['country'],
                'created_at': patient['created_at'].isoformat() if patient['created_at'] else None
            }
        }), 200

    except Exception as e:
        print(f"Get patient error: {e}")
        return jsonify({'error': 'Internal server error'}), 500


@patients_bp.route('/<int:patient_id>/generate-token', methods=['POST'])
def generate_new_token(patient_id):
    """Generar nuevo token para un paciente"""
    try:
        from app.utils.token_generator import generate_patient_token
        
        # Generar nuevo token
        new_token = generate_patient_token()
        
        # Actualizar en la base de datos
        update_query = "UPDATE patients SET token = %s WHERE id = %s"
        db.execute_query(update_query, (new_token, patient_id))
        
        return jsonify({
            'message': 'Token generated successfully',
            'token': new_token
        }), 200
        
    except Exception as e:
        print(f"Generate token error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500
    
    
@patients_bp.route('/', methods=['GET'])
def get_patient_by_user_id():
    """Obtener patient_id por user_id"""
    try:
        user_id = request.args.get('user_id')
        
        if not user_id:
            return jsonify({'error': 'user_id is required'}), 400
        
        query = "SELECT id as patient_id, user_id, token FROM patients WHERE user_id = %s"
        patient = db.execute_query(query, (user_id,), fetch_one=True)
        
        if not patient:
            return jsonify({'error': 'Patient not found'}), 404
        
        return jsonify({
            'message': 'Patient found',
            'patient': dict(patient)
        }), 200
        
    except Exception as e:
        print(f"Get patient by user_id error: {e}")
        return jsonify({'error': 'Internal server error'}), 500