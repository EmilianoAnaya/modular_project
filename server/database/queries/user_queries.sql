-- Create new user
-- @param first_name, last_name, email, gender, date_of_birth, city, country, password, role
INSERT INTO users (first_name, last_name, email, gender, date_of_birth, city, country, password, role, status)
VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, 'Active');

-- Get user by ID
-- @param user_id: int
SELECT id, first_name, last_name, email, role, status, created_at
FROM users
WHERE id = %s;

-- Get user profile data by ID
-- @param user_id: int
SELECT id, first_name, last_name, email, gender, date_of_birth, city, country, created_at
FROM users
WHERE id = %s;

-- Update user profile data
-- @param first_name, last_name, email, gender, date_of_birth, city, country, user_id
UPDATE users
SET first_name = %s, last_name = %s, email = %s, gender = %s, date_of_birth = %s, city = %s, country = %s
WHERE id = %s;