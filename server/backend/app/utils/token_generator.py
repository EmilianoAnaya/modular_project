import uuid
import random
import string
from datetime import datetime

def generate_patient_token():
    """
    Genera un token único para pacientes usando UUID4
    Formato: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    """
    return str(uuid.uuid4())

def generate_simple_token(length=8):
    """
    Genera un token simple alfanumérico
    Formato: ABC12345 (ejemplo con length=8)
    """
    timestamp = str(int(datetime.now().timestamp()))[-4:]  # Últimos 4 dígitos del timestamp
    random_chars = ''.join(random.choices(string.ascii_uppercase + string.digits, k=length-4))
    return timestamp + random_chars

def generate_patient_id_token():
    """
    Genera un token legible para pacientes
    Formato: PAT-YYYYMMDD-XXXXX
    """
    date_str = datetime.now().strftime("%Y%m%d")
    random_suffix = ''.join(random.choices(string.ascii_uppercase + string.digits, k=5))
    return f"PAT-{date_str}-{random_suffix}"