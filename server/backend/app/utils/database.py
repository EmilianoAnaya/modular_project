import mysql.connector
from mysql.connector import Error
import os
from app.config import Config

class DatabaseManager:
    def __init__(self):
        self.config = Config()
        
    def get_connection(self):
        """Crear conexión a la base de datos"""
        try:
            connection = mysql.connector.connect(
                host=self.config.DB_HOST,
                port=self.config.DB_PORT,
                user=self.config.DB_USER,
                password=self.config.DB_PASSWORD,
                database=self.config.DB_NAME
            )
            return connection
        except Error as e:
            print(f"Error connecting to MySQL: {e}")
            return None
    
    def execute_query_from_file(self, file_path, params=None, fetch_one=False, fetch_all=True):
        """Ejecutar query desde archivo SQL"""
        try:
            # Leer el archivo SQL
            with open(file_path, 'r') as file:
                query = file.read().strip()
            
            # Si hay múltiples queries, tomar la primera
            if ';' in query:
                queries = [q.strip() for q in query.split(';') if q.strip()]
                query = queries[0]  # Por ahora tomamos la primera query
            
            return self.execute_query(query, params, fetch_one, fetch_all)
            
        except FileNotFoundError:
            print(f"SQL file not found: {file_path}")
            return None
        except Exception as e:
            print(f"Error executing query from file: {e}")
            return None
    
    def execute_query(self, query, params=None, fetch_one=False, fetch_all=True):
        """Ejecutar query directamente"""
        connection = None
        cursor = None
        try:
            connection = self.get_connection()
            if not connection:
                return None
                
            cursor = connection.cursor(dictionary=True)
            cursor.execute(query, params or ())
            
            if query.strip().upper().startswith('SELECT'):
                if fetch_one:
                    result = cursor.fetchone()
                else:
                    result = cursor.fetchall()
            else:
                connection.commit()
                result = cursor.rowcount
                
            return result
            
        except Error as e:
            print(f"Database error: {e}")
            if connection:
                connection.rollback()
            return None
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()

# Instancia global
db = DatabaseManager()