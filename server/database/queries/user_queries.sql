-- Create new user
-- @param first_name, last_name, email, gender, date_of_birth, city, country, password, role
INSERT INTO users (first_name, last_name, email, gender, date_of_birth, city, country, password, role, status) 
VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, 'Active');

-- Get user by ID
-- @param user_id: int
SELECT id, first_name, last_name, email, role, status, created_at 
FROM users 
WHERE id = %s;

-- Create new doctor record (linked to user)
-- @param user_id: int (FK from users table)
INSERT INTO doctors (user_id, speciality, license_number, consultory_at, city, country) 
VALUES (%s, NULL, NULL, NULL, NULL, NULL);

-- Get doctor by user_id
-- @param user_id: int
SELECT d.id, d.user_id, d.speciality, d.license_number, d.consultory_at, d.city, d.country
FROM doctors d 
WHERE d.user_id = %s;