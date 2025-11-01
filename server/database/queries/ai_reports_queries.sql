-- Query #1: Insert AI report for a specific medical record
INSERT INTO ai_reports (medical_record_id, summary, generated_at)
VALUES (%s, %s, NOW());

-- Query #2: Get AI report by medical_record_id (check if exists)
SELECT 
    id,
    medical_record_id,
    summary,
    generated_at
FROM ai_reports
WHERE medical_record_id = %s
LIMIT 1;

-- Query #3: Get medical record details for AI analysis
SELECT 
    mr.id,
    mr.patient_id,
    mr.doctor_id,
    mr.date,
    mr.summary,
    mr.full_notes,
    u.first_name,
    u.last_name,
    u.gender
FROM medical_records mr
INNER JOIN patients p ON mr.patient_id = p.id
INNER JOIN users u ON p.user_id = u.id
WHERE mr.id = %s;