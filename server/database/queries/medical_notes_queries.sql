-- Create new medical note
-- @param patient_id: int, note_type: enum, description: text (JSON format)
INSERT INTO medical_notes (patient_id, note_type, description)
VALUES (%s, %s, %s);

-- Get medical notes by patient_id and note_type
-- @param patient_id: int, note_type: string
SELECT id, patient_id, note_type, description, created_at
FROM medical_notes
WHERE patient_id = %s AND note_type = %s
ORDER BY created_at DESC;

-- Get single medical note by id
-- @param id: int
SELECT id, patient_id, note_type, description, created_at
FROM medical_notes
WHERE id = %s;

-- Update medical note
-- @param description: text, id: int
UPDATE medical_notes
SET description = %s
WHERE id = %s;

-- Delete medical note
-- @param id: int
DELETE FROM medical_notes
WHERE id = %s;