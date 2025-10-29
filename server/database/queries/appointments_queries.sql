-- Get appointments by patient_id
-- @param patient_id: int
SELECT 
    a.id,
    a.patient_id,
    a.doctor_id,
    a.appointment_date,
    a.reason,
    a.status,
    CONCAT(u.first_name, ' ', u.last_name) as doctor_name
FROM appointments a
INNER JOIN doctors d ON a.doctor_id = d.id
INNER JOIN users u ON d.user_id = u.id
WHERE a.patient_id = %s
ORDER BY a.appointment_date ASC;

-- Create new appointment
-- @param patient_id: int, doctor_id: int, appointment_date: datetime, reason: text
INSERT INTO appointments (patient_id, doctor_id, appointment_date, reason, status)
VALUES (%s, %s, %s, %s, 'Pending');

-- Update appointment
-- @param appointment_date: datetime, reason: text, status: enum, appointment_id: int
UPDATE appointments
SET appointment_date = %s,
    reason = %s,
    status = %s
WHERE id = %s;

-- Cancel appointment
-- @param appointment_id: int
UPDATE appointments
SET status = 'Canceled'
WHERE id = %s;