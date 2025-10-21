-- Create new doctor record (linked to user)
-- @param user_id: int (FK from users table)
INSERT INTO doctors (user_id, speciality, license_number, consultory_at, city, country)
VALUES (%s, NULL, NULL, NULL, NULL, NULL);

-- Get doctor by user_id
-- @param user_id: int
SELECT d.id, d.user_id, d.speciality, d.license_number, d.consultory_at, d.city, d.country
FROM doctors d
WHERE d.user_id = %s;

-- Get all doctors with user information
SELECT d.id as doctor_id, d.user_id, d.speciality, d.license_number, d.consultory_at, d.city as doctor_city, d.country as doctor_country,
       u.first_name, u.last_name, u.email, u.gender, u.date_of_birth, u.city as user_city, u.country as user_country, u.created_at
FROM doctors d
JOIN users u ON d.user_id = u.id
WHERE u.status = 'Active'
ORDER BY u.first_name, u.last_name;

-- Get doctor by doctor_id with user information
-- @param doctor_id: int
SELECT d.id as doctor_id, d.user_id, d.speciality, d.license_number, d.consultory_at, d.city as doctor_city, d.country as doctor_country,
       u.first_name, u.last_name, u.email, u.gender, u.date_of_birth, u.city as user_city, u.country as user_country, u.created_at
FROM doctors d
JOIN users u ON d.user_id = u.id
WHERE d.id = %s AND u.status = 'Active';