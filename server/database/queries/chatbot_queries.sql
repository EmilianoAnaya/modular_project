-- Query #1: Get complete patient context for chatbot
-- Obtener información básica del paciente
SELECT 
    u.first_name,
    u.last_name,
    u.gender,
    u.date_of_birth,
    TIMESTAMPDIFF(YEAR, u.date_of_birth, CURDATE()) as age
FROM patients p
INNER JOIN users u ON p.user_id = u.id
WHERE p.id = %s;

-- Query #2: Get patient allergies
SELECT 
    description
FROM medical_notes
WHERE patient_id = %s 
AND note_type = 'Allergy'
ORDER BY created_at DESC;

-- Query #3: Get patient chronic diseases
SELECT 
    description
FROM medical_notes
WHERE patient_id = %s 
AND note_type = 'Chronical Disease'
ORDER BY created_at DESC;

-- Query #4: Get recent medical records (last 5)
SELECT 
    date,
    summary,
    full_notes
FROM medical_records
WHERE patient_id = %s
ORDER BY date DESC
LIMIT 5;

-- Query #5: Get recent studies (last 3)
SELECT 
    study_type,
    result,
    performed_at
FROM studies
WHERE patient_id = %s
ORDER BY performed_at DESC
LIMIT 3;