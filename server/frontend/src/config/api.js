// Configuración de la API
const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    ENDPOINTS: {
        // Auth
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        PROFILE: '/api/auth/profile',
        DOCTOR: '/api/auth/doctor',
        
        // Patients
        PATIENTS: '/api/patients',
        PATIENTS_SEARCH: '/api/patients/search',
        
        // Medical Records
        MEDICAL_RECORDS: '/api/medical-records',
        MEDICAL_RECORDS_BY_PATIENT: '/api/medical-records/patient',
        
        // Medical Notes
        MEDICAL_NOTES: '/api/medical-notes',
        MEDICAL_NOTES_BY_PATIENT: '/api/medical-notes/patient'
    }
};

// Helper function para construir URLs completas
export const getApiUrl = (endpoint, params = {}) => {
    let url = `${API_CONFIG.BASE_URL}${endpoint}`;
    
    // Reemplazar parámetros en la URL (ej: /patients/:id)
    Object.keys(params).forEach(key => {
        url = url.replace(`:${key}`, params[key]);
    });
    
    return url;
};

export default API_CONFIG;