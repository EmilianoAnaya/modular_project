-- Login query
-- @param email: string
-- @param password: string (ya hasheada)
SELECT u.id, u.first_name, u.last_name, u.email, u.role, u.status
FROM users u 
WHERE u.email = %s AND u.password = %s AND u.status = 'Active';

-- Get user by email (para verificar si existe)
-- @param email: string
SELECT id, email, password, role, status 
FROM users u 
WHERE u.email = %s;