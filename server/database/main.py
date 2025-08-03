import mysql.connector

def main():
    try:
        # Conexión a la base de datos
        conn = mysql.connector.connect(
            host="localhost",      # porque accedes desde tu máquina
            port=3306,
            user="root",
            password="rootpass",
            database="testdb"
        )

        cursor = conn.cursor()
        cursor.execute("SELECT id, nombre FROM usuarios")

        usuarios = cursor.fetchall()

        print("Usuarios en la base de datos:")
        for usuario in usuarios:
            print(f"ID: {usuario[0]} - Nombre: {usuario[1]}")

    except mysql.connector.Error as err:
        print(f"Error: {err}")
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

if __name__ == "__main__":
    main()
