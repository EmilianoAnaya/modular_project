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
        
        # Buscar usuario por email usando query SQL
        base_path = Path(__file__).parent.parent.parent.parent
        sql_file_path = base_path / 'database' / 'queries' / 'auth_queries.sql'
        
        # Leer y ejecutar la segunda query (get user by email)
        with open(sql_file_path, 'r') as file:
            queries = file.read().split('\n\n')  # Separar por doble salto de línea
            get_user_query = queries[1].split('\n')
            # Filtrar líneas que no sean comentarios
            get_user_query = [line for line in get_user_query if not line.strip().startswith('--')]
            get_user_query = '\n'.join(get_user_query).strip()
        
        user = db.execute_query(get_user_query, (email,), fetch_one=True)
        
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        print(f"Password ingresado: {password}")
        print(f"Hash en DB: {user['password']}")
        print(f"Verificación: {bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8'))}")
        
        # Verificar password
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
            'user': {
                'id': user['id'],
                'email': user['email'],
                'role': user['role']
            }
        }), 200
        
    except Exception as e:
        print(f"Login error: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        required_fields = ['first_name', 'last_name', 'email', 'password']
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
        
        role = data.get('role', 'Patient')  # Default role
        
        result = db.execute_query(
            create_user_query,
            (data['first_name'], data['last_name'], data['email'], 
             hashed_password.decode('utf-8'), role)
        )
        
        if result:
            return jsonify({'message': 'User created successfully'}), 201
        else:
            return jsonify({'error': 'Failed to create user'}), 500
            
    except Exception as e:
        print(f"Register error: {e}")
        return jsonify({'error': 'Internal server error'}), 500