-- Create new user
-- @param first_name, last_name, email, password, role
INSERT INTO users (first_name, last_name, email, password, role, status) 
VALUES (%s, %s, %s, %s, %s, 'Active');

-- Get user by ID
-- @param user_id: int
SELECT id, first_name, last_name, email, role, status, created_at 
FROM users 
WHERE id = %s;