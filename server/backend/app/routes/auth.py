from flask import Blueprint, request, jsonify
import bcrypt
import jwt
from datetime import datetime, timedelta
import os
from pathlib import Path
from app.utils.database import db
from app.config import Config

auth_bp = Blueprint('auth', __name__)
config = Config()

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data or not data.get('email') or not data.get('password'):
            return jsonify({'error': 'Email and password are required'}), 400
        
        email = data.get('email')
        password = data.get('password')
        
        # Buscar usuario por email
        base_path = Path(__file__).parent.parent.parent.parent
        sql_file_path = base_path / 'database' / 'queries' / 'auth_queries.sql'
        
        with open(sql_file_path, 'r') as file:
            queries = file.read().split('\n\n')
            get_user_query = queries[1].split('\n')
            get_user_query = [line for line in get_user_query if not line.strip().startswith('--')]
            get_user_query = '\n'.join(get_user_query).strip()
        
        user = db.execute_query(get_user_query, (email,), fetch_one=True)
        
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Verificar si es contraseña temporal (sin hash)
        is_temp_password = user['password'] == 'temp_patient_password'
        
        # Si es temporal, verificar directamente
        if is_temp_password:
            if password != 'temp_patient_password':
                return jsonify({'error': 'Invalid credentials'}), 401
        else:
            # Verificar password hasheado
            if not bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
                return jsonify({'error': 'Invalid credentials'}), 401
        
        # Verificar que el usuario esté activo
        if user['status'] != 'Active':
            return jsonify({'error': 'Account is not active'}), 401
        
        # Crear token JWT
        token_payload = {
            'user_id': user['id'],
            'email': user['email'],
            'role': user['role'],
            'exp': datetime.utcnow() + timedelta(seconds=config.JWT_ACCESS_TOKEN_EXPIRES)
        }
        
        token = jwt.encode(token_payload, config.JWT_SECRET_KEY, algorithm='HS256')
        
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'requires_password_change': is_temp_password,  # ← FLAG NUEVO
            'user': {
                'id': user['id'],
                'first_name': user['first_name'],
                'last_name': user['last_name'],
                'email': user['email'],
                'role': user['role']
            }
        }), 200
        
    except Exception as e:
        print(f"Login error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500


@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        required_fields = ['first_name', 'last_name', 'email', 'gender', 'date_of_birth', 'city', 'country', 'password']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'All fields are required'}), 400
        
        # Verificar si el usuario ya existe
        base_path = Path(__file__).parent.parent.parent.parent
        sql_file_path = base_path / 'database' / 'queries' / 'auth_queries.sql'
        with open(sql_file_path, 'r') as file:
            queries = file.read().split('\n\n')
            get_user_query = queries[1].split('\n')
            get_user_query = [line for line in get_user_query if not line.strip().startswith('--')]
            get_user_query = '\n'.join(get_user_query).strip()
        
        existing_user = db.execute_query(get_user_query, (data['email'],), fetch_one=True)
        
        if existing_user:
            return jsonify({'error': 'Email already registered'}), 400
        
        # Hash password
        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
        
        # Crear usuario usando query SQL
        user_sql_path = base_path / 'database' / 'queries' / 'user_queries.sql'
        with open(user_sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            create_user_query = queries[0].split('\n')
            create_user_query = [line for line in create_user_query if not line.strip().startswith('--')]
            create_user_query = '\n'.join(create_user_query).strip()
        
        role = 'Doctor'
        
        result = db.execute_query(
            create_user_query,
            (data['first_name'], data['last_name'], data['email'], data['gender'], data['date_of_birth'], data['city'], data['country'], 
             hashed_password.decode('utf-8'), role)
        )
        
        if not result:
            return jsonify({'error': 'Failed to create user'}), 500
        
        new_user = db.execute_query(get_user_query, (data['email'],), fetch_one=True)
        
        if not new_user:
            return jsonify({'error': 'Failed to retrieve created user'}), 500
        
        user_id = new_user['id']
        
        doctor_sql_path = base_path / 'database' / 'queries' / 'doctor_queries.sql'
        with open(doctor_sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            create_doctor_query = queries[0].split('\n')
            create_doctor_query = [line for line in create_doctor_query if not line.strip().startswith('--')]
            create_doctor_query = '\n'.join(create_doctor_query).strip()
        
        # Insertar doctor con campos NULL por ahora
        doctor_result = db.execute_query(create_doctor_query, (user_id,))
        
        if not doctor_result:
            # Si falla crear doctor, eliminar el usuario creado (rollback manual)
            return jsonify({'error': 'Failed to create doctor profile'}), 500
        
        return jsonify({
            'message': 'Doctor registered successfully',
            'user_id': user_id,
            'role': role
        }), 201
        
    except Exception as e:
        print(f"Register error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@auth_bp.route('/profile/<int:user_id>', methods=['GET'])
def get_user_profile(user_id):
    try:
        # Leer query para obtener datos del perfil
        base_path = Path(__file__).parent.parent.parent.parent
        sql_file_path = base_path / 'database' / 'queries' / 'user_queries.sql'

        with open(sql_file_path, 'r') as file:
            queries = file.read().split('\n\n')
            # Query #3: Get user profile data
            get_profile_query = queries[2].split('\n')
            get_profile_query = [line for line in get_profile_query if not line.strip().startswith('--')]
            get_profile_query = '\n'.join(get_profile_query).strip()

        user_profile = db.execute_query(get_profile_query, (user_id,), fetch_one=True)

        if not user_profile:
            return jsonify({'error': 'User not found'}), 404

        return jsonify({
            'message': 'Profile retrieved successfully',
            'user': {
                'id': user_profile['id'],
                'first_name': user_profile['first_name'],
                'last_name': user_profile['last_name'],
                'email': user_profile['email'],
                'gender': user_profile['gender'],
                'date_of_birth': user_profile['date_of_birth'].isoformat() if user_profile['date_of_birth'] else None,
                'city': user_profile['city'],
                'country': user_profile['country']
            }
        }), 200

    except Exception as e:
        print(f"Get profile error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@auth_bp.route('/profile/<int:user_id>', methods=['PUT'])
def update_user_profile(user_id):
    try:
        data = request.get_json()

        # Validar que todos los campos requeridos estén presentes y no vacíos
        required_fields = ['first_name', 'last_name', 'email', 'gender', 'date_of_birth', 'city', 'country']
        for field in required_fields:
            if not data.get(field) or str(data.get(field)).strip() == '':
                return jsonify({'error': f'{field} is required and cannot be empty'}), 400

        # Verificar que el email no esté siendo usado por otro usuario
        base_path = Path(__file__).parent.parent.parent.parent
        sql_file_path = base_path / 'database' / 'queries' / 'auth_queries.sql'

        with open(sql_file_path, 'r') as file:
            queries = file.read().split('\n\n')
            get_user_query = queries[1].split('\n')
            get_user_query = [line for line in get_user_query if not line.strip().startswith('--')]
            get_user_query = '\n'.join(get_user_query).strip()

        existing_user = db.execute_query(get_user_query, (data['email'],), fetch_one=True)

        # Si existe un usuario con ese email y no es el usuario actual
        if existing_user and existing_user['id'] != user_id:
            return jsonify({'error': 'Email already exists'}), 400

        # Actualizar datos del usuario
        user_sql_path = base_path / 'database' / 'queries' / 'user_queries.sql'
        with open(user_sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            # Query #4: Update user profile data
            update_query = queries[3].split('\n')
            update_query = [line for line in update_query if not line.strip().startswith('--')]
            update_query = '\n'.join(update_query).strip()

        result = db.execute_query(
            update_query,
            (data['first_name'], data['last_name'], data['email'], data['gender'],
             data['date_of_birth'], data['city'], data['country'], user_id)
        )

        if not result:
            return jsonify({'error': 'Failed to update profile'}), 500

        return jsonify({
            'message': 'Profile updated successfully'
        }), 200

    except Exception as e:
        print(f"Update profile error: {e}")
        return jsonify({'error': 'Internal server error'}), 500
    
@auth_bp.route('/doctor/<int:user_id>', methods=['GET'])
def get_doctor_by_user_id(user_id):
    try:
        base_path = Path(__file__).parent.parent.parent.parent
        sql_file_path = base_path / 'database' / 'queries' / 'doctor_queries.sql'
        
        with open(sql_file_path, 'r') as file:
            queries = file.read().split('\n\n')
            # Query #2: Get doctor by user_id
            get_doctor_query = queries[1].split('\n')
            get_doctor_query = [line for line in get_doctor_query if not line.strip().startswith('--')]
            get_doctor_query = '\n'.join(get_doctor_query).strip()
        
        doctor = db.execute_query(get_doctor_query, (user_id,), fetch_one=True)
        
        if not doctor:
            return jsonify({'error': 'Doctor not found'}), 404
        
        return jsonify({
            'message': 'Doctor found',
            'doctor_id': doctor['id']
        }), 200
        
    except Exception as e:
        print(f"Get doctor error: {e}")
        return jsonify({'error': 'Internal server error'}), 500
    
    
@auth_bp.route('/change-password/<int:user_id>', methods=['POST'])
def change_password(user_id):
    """Cambiar contraseña del usuario (para primer login de pacientes)"""
    try:
        data = request.get_json()
        new_password = data.get('new_password')
        
        if not new_password or len(new_password) < 8:
            return jsonify({'error': 'Password must be at least 8 characters'}), 400
        
        # Hash de la nueva contraseña
        hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
        
        # Actualizar contraseña
        update_query = "UPDATE users SET password = %s WHERE id = %s"
        db.execute_query(update_query, (hashed_password.decode('utf-8'), user_id))
        
        return jsonify({
            'message': 'Password changed successfully'
        }), 200
        
    except Exception as e:
        print(f"Change password error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500