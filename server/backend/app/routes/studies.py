from flask import Blueprint, request, jsonify
from pathlib import Path
from werkzeug.utils import secure_filename
import os
import json
from app.utils.database import db

studies_bp = Blueprint('studies', __name__)

# Configuración de upload
UPLOAD_FOLDER = Path(__file__).parent.parent.parent.parent / 'uploads' / 'studies'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'pdf'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@studies_bp.route('/', methods=['POST'])
def create_study():
    try:
        # Obtener datos del form
        patient_id = request.form.get('patient_id')
        doctor_id = request.form.get('doctor_id')
        study_type = request.form.get('study_type')
        
        if not all([patient_id, doctor_id, study_type]):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Verificar que hay archivos
        if 'files' not in request.files:
            return jsonify({'error': 'No files provided'}), 400
        
        files = request.files.getlist('files')
        
        if len(files) == 0:
            return jsonify({'error': 'No files selected'}), 400
        
        if len(files) > 5:
            return jsonify({'error': 'Maximum 5 files allowed'}), 400
        
        # Crear registro en tabla studies
        base_path = Path(__file__).parent.parent.parent.parent
        sql_path = base_path / 'database' / 'queries' / 'studies_queries.sql'
        
        with open(sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            create_study_query = queries[0].split('\n')
            create_study_query = [line for line in create_study_query if not line.strip().startswith('--')]
            create_study_query = '\n'.join(create_study_query).strip()
        
        # Insertar study (adaptado a tu estructura)
        result = db.execute_query(
            create_study_query,
            (patient_id, doctor_id, study_type)
        )
        
        print(f"DEBUG - Insert result: {result}")
        print(f"DEBUG - Insert result type: {type(result)}")
        
        # Intentar obtener con LAST_INSERT_ID()
        get_last_id_query = "SELECT LAST_INSERT_ID() as id"
        last_id_result = db.execute_query(get_last_id_query, fetch_one=True)
        
        print(f"DEBUG - Last ID result: {last_id_result}")
        
        if last_id_result and 'id' in last_id_result and last_id_result['id'] > 0:
            study_id = last_id_result['id']
        else:
            # Como último recurso, obtener el ID máximo de la tabla
            max_id_query = "SELECT MAX(id) as id FROM studies WHERE patient_id = %s AND doctor_id = %s"
            max_id_result = db.execute_query(max_id_query, (patient_id, doctor_id), fetch_one=True)
            study_id = max_id_result['id'] if max_id_result else None
            print(f"DEBUG - Study ID from MAX: {study_id}")
        
        if not study_id or study_id == 0:
            return jsonify({'error': 'Failed to get study ID'}), 500
        
        print(f"DEBUG - Final Study ID: {study_id}")
        
        # Verificar que el study existe
        verify_query = "SELECT id FROM studies WHERE id = %s"
        verify_result = db.execute_query(verify_query, (study_id,), fetch_one=True)
        print(f"DEBUG - Verify study exists: {verify_result}")
        
        if not verify_result:
            return jsonify({'error': 'Study was not created properly'}), 500
        
        # Crear carpeta para este estudio
        study_folder = UPLOAD_FOLDER / f'patient_{patient_id}' / f'study_{study_id}'
        study_folder.mkdir(parents=True, exist_ok=True)
        
        # Guardar archivos
        saved_files = []
        file_queries = queries[1].split('\n')
        file_queries = [line for line in file_queries if not line.strip().startswith('--')]
        create_file_query = '\n'.join(file_queries).strip()
        
        for idx, file in enumerate(files, 1):
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file_path = study_folder / filename
                file.save(str(file_path))
                
                # Guardar referencia en base de datos
                relative_path = f'patient_{patient_id}/study_{study_id}/{filename}'
                
                print(f"DEBUG - Saving file: {filename}, study_id: {study_id}")
                
                try:
                    db.execute_query(
                        create_file_query,
                        (study_id, filename, relative_path, file.content_type, file.content_length, idx)
                    )
                    
                    saved_files.append({
                        'filename': filename,
                        'path': relative_path,
                        'size': file.content_length
                    })
                except Exception as file_error:
                    print(f"ERROR saving file to DB: {file_error}")
                    import traceback
                    traceback.print_exc()
                    # Continuar con los demás archivos
        
        return jsonify({
            'message': 'Study created successfully',
            'study_id': study_id,
            'files': saved_files
        }), 201
        
    except Exception as e:
        print(f"Create study error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500


@studies_bp.route('/patient/<int:patient_id>', methods=['GET'])
def get_patient_studies(patient_id):
    try:
        base_path = Path(__file__).parent.parent.parent.parent
        sql_path = base_path / 'database' / 'queries' / 'studies_queries.sql'
        
        with open(sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            get_studies_query = queries[2].split('\n')
            get_studies_query = [line for line in get_studies_query if not line.strip().startswith('--')]
            get_studies_query = '\n'.join(get_studies_query).strip()
        
        studies = db.execute_query(get_studies_query, (patient_id,), fetch_all=True)
        
        if not studies:
            return jsonify({
                'message': 'No studies found',
                'studies': []
            }), 200
        
        return jsonify({
            'message': 'Studies found',
            'studies': [dict(study) for study in studies]
        }), 200
        
    except Exception as e:
        print(f"Get studies error: {e}")
        return jsonify({'error': 'Internal server error'}), 500
    
@studies_bp.route('/patient/<int:patient_id>/files', methods=['GET'])
def get_study_files(patient_id):
    """Obtener todos los estudios con sus archivos para un paciente"""
    try:
        base_path = Path(__file__).parent.parent.parent.parent
        sql_path = base_path / 'database' / 'queries' / 'studies_queries.sql'
        
        with open(sql_path, 'r') as file:
            queries = file.read().split('\n\n')
            # Query index 4 para estudios con archivos
            if len(queries) > 4:
                get_studies_with_files_query = queries[4].split('\n')
                get_studies_with_files_query = [line for line in get_studies_with_files_query if not line.strip().startswith('--')]
                get_studies_with_files_query = '\n'.join(get_studies_with_files_query).strip()
            else:
                get_studies_with_files_query = ""
        
        if not get_studies_with_files_query:
            # Query definitiva - JOIN con users para obtener nombre del doctor
            get_studies_with_files_query = """
                SELECT 
                    s.id as study_id,
                    s.study_type,
                    s.performed_at,
                    CONCAT(u.first_name, ' ', u.last_name) as doctor_name,
                    sf.id as file_id,
                    sf.file_name,
                    sf.file_path,
                    sf.file_type,
                    sf.file_size,
                    sf.upload_order
                FROM studies s
                INNER JOIN doctors d ON s.doctor_id = d.id
                INNER JOIN users u ON d.user_id = u.id
                LEFT JOIN study_files sf ON s.id = sf.study_id
                WHERE s.patient_id = %s
                ORDER BY s.performed_at DESC, sf.upload_order ASC
            """
        
        results = db.execute_query(get_studies_with_files_query, (patient_id,), fetch_all=True)
        
        # Agrupar archivos por estudio
        studies_dict = {}
        for row in results:
            study_id = row['study_id']
            
            if study_id not in studies_dict:
                studies_dict[study_id] = {
                    'id': study_id,
                    'study_type': row['study_type'],
                    'performed_at': row['performed_at'].isoformat() if row['performed_at'] else None,
                    'doctor_name': row['doctor_name'],
                    'files': []
                }
            
            # Agregar archivo si existe
            if row.get('file_id'):
                studies_dict[study_id]['files'].append({
                    'id': row['file_id'],
                    'file_name': row['file_name'],
                    'file_path': row['file_path'],
                    'file_type': row['file_type'],
                    'file_size': row['file_size'],
                    'upload_order': row['upload_order']
                })
        
        studies_list = list(studies_dict.values())
        
        return jsonify({
            'message': 'Studies retrieved successfully',
            'studies': studies_list
        }), 200
        
    except Exception as e:
        print(f"Get study files error: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500


@studies_bp.route('/file/<path:file_path>', methods=['GET'])
def get_file(file_path):
    """Servir archivo de estudio"""
    try:
        full_path = UPLOAD_FOLDER / file_path
        
        if not full_path.exists():
            return jsonify({'error': 'File not found'}), 404
        
        from flask import send_file
        return send_file(str(full_path))
        
    except Exception as e:
        print(f"Get file error: {e}")
        return jsonify({'error': 'Internal server error'}), 500