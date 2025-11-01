from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object('app.config.Config')
    
    # Desactivar strict slashes globalmente
    app.url_map.strict_slashes = False
    
    # Configurar CORS
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:4040", "http://localhost:5173"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type"]
        }
    })
    
    # Registrar blueprints
    from app.routes.auth import auth_bp
    from app.routes.patients import patients_bp
    from app.routes.medical_records import medical_records_bp
    from app.routes.medical_notes import medical_notes_bp
    from app.routes.studies import studies_bp
    from app.routes.appointments import appointments_bp
    from app.routes.ai_reports import ai_reports_bp  # ← NUEVO
    
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(patients_bp, url_prefix='/api/patients')
    app.register_blueprint(medical_records_bp, url_prefix='/api/medical-records')
    app.register_blueprint(medical_notes_bp, url_prefix='/api/medical-notes')
    app.register_blueprint(studies_bp, url_prefix='/api/studies')
    app.register_blueprint(appointments_bp, url_prefix='/api/appointments')
    app.register_blueprint(ai_reports_bp, url_prefix='/api/ai')  # ← NUEVO

    
    return app
