-- Create new medical record
-- @param patient_id: int, doctor_id: int, date: date, summary: text, full_notes: text (JSON format)
INSERT INTO medical_records (patient_id, doctor_id, date, summary, full_notes)
VALUES (%s, %s, %s, %s, %s);

-- Get medical records by patient_id
-- @param patient_id: int
SELECT id, patient_id, doctor_id, date, summary, full_notes, created_at
FROM medical_records
WHERE patient_id = %s
ORDER BY date DESC, created_at DESC;

-- Get single medical record by id
-- @param id: int
SELECT id, patient_id, doctor_id, date, summary, full_notes, created_at
FROM medical_records
WHERE id = %s;