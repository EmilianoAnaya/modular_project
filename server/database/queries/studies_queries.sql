-- Create new study (adaptado a tu estructura)
-- @param patient_id: int, doctor_id: int, study_type: string
INSERT INTO studies (patient_id, doctor_id, study_type, result, performed_at)
VALUES (%s, %s, %s, NULL, CURRENT_TIMESTAMP);

-- Create study file reference
-- @param study_id: int, file_name: string, file_path: string, file_type: string, file_size: int, upload_order: int
INSERT INTO study_files (study_id, file_name, file_path, file_type, file_size, upload_order, uploaded_at)
VALUES (%s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP);

-- Get studies by patient_id (adaptado a tu estructura)
-- @param patient_id: int
SELECT s.id, s.patient_id, s.doctor_id, s.study_type, s.result, s.performed_at as created_at,
       COUNT(sf.id) as file_count
FROM studies s
LEFT JOIN study_files sf ON s.id = sf.study_id
WHERE s.patient_id = %s
GROUP BY s.id
ORDER BY s.performed_at DESC;

-- Get study files by study_id
-- @param study_id: int
SELECT id, study_id, file_name, file_path, file_type, file_size, upload_order, uploaded_at
FROM study_files
WHERE study_id = %s
ORDER BY upload_order ASC;

-- Get studies with files by patient_id
-- @param patient_id: int
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
ORDER BY s.performed_at DESC, sf.upload_order ASC;