-- Create new patient record (linked to user)
-- @param user_id: int (FK from users table), token: string
INSERT INTO patients (user_id, token)
VALUES (%s, %s);

-- Get patient by user_id
-- @param user_id: int
SELECT p.id, p.user_id
FROM patients p
WHERE p.user_id = %s;

-- Get all patients with user information
SELECT p.id as patient_id, p.user_id, u.first_name, u.last_name, u.email, u.gender, u.date_of_birth, u.city, u.country, u.created_at
FROM patients p
JOIN users u ON p.user_id = u.id
WHERE u.status = 'Active'
ORDER BY u.first_name, u.last_name;

-- Get patient by patient_id with user information
-- @param patient_id: int
SELECT p.id as patient_id, p.user_id, u.first_name, u.last_name, u.email, u.gender, u.date_of_birth, u.city, u.country, u.created_at
FROM patients p
JOIN users u ON p.user_id = u.id
WHERE p.id = %s AND u.status = 'Active';