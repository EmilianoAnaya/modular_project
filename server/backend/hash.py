import bcrypt

password = "123456"
hashed = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
print("Hash generado:", hashed.decode('utf-8'))

# Verificar que el hash funciona
test = bcrypt.checkpw(password.encode('utf-8'), hashed)
print("Verificación:", test)