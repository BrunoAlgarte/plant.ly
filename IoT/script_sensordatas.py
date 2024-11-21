import time
from pymongo import MongoClient
from bson.objectid import ObjectId  # Para converter o plant_id em ObjectId
from datetime import datetime
import Adafruit_DHT
import RPi.GPIO as GPIO

# Configurar o sensor de temperatura e umidade (DHT22)
DHT_SENSOR = Adafruit_DHT.DHT22
DHT_PIN = 21  # GPIO onde o sensor DHT22 está conectado

# Configurar o sensor de umidade do solo digital
SOIL_SENSOR_PIN = 17  # GPIO onde o sensor de umidade do solo está conectado
GPIO.setmode(GPIO.BCM)
GPIO.setup(SOIL_SENSOR_PIN, GPIO.IN)

# Solicitar o plant_id para associar ao registro
plant_id = input("Informe o plant_id para os registros: ")

# Validar e converter o plant_id para ObjectId
try:
    plant_id = ObjectId(plant_id)
except Exception as e:
    print("Erro: o plant_id fornecido não é um ObjectId válido.")
    exit()

# Configurar conexão com o MongoDB
client = MongoClient("URL DE CONEXÃO")
db = client['DATA_BASE']
collection = db['COLLECTION']

# Data de início do monitoramento (primeira execução)
start_date = datetime.now()

# Função para salvar os dados no MongoDB
def save_to_mongodb(temperature, humidity_air, soil_moisture, week_number):
    current_time = datetime.now()
    data = {
        "plant_id": plant_id,  # Salvar como ObjectId
        "temperature_air": round(temperature, 2),
        "humidity_air": round(humidity_air, 2),
        "soil_moisture": soil_moisture,
        "timestamp": current_time,
        "week": week_number
    }
    collection.insert_one(data)
    print("Dados coletados e salvos no MongoDB:", data)

# Função para calcular o número da semana do monitoramento
def get_week_number():
    current_date = datetime.now()
    delta = current_date - start_date
    week_number = delta.days // 7 + 1
    return week_number

try:
    while True:
        # Obter a leitura do sensor DHT22
        humidity_air, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)
        
        if humidity_air is None or temperature is None:
            print("Falha ao ler o sensor DHT22. Tentando novamente...")
            continue

        # Obter o estado do sensor de umidade do solo digital
        # Sensor retorna 0 para "Úmido" e 1 para "Seco"
        soil_moisture = "Úmido" if GPIO.input(SOIL_SENSOR_PIN) == 0 else "Seco"

        # Calcular o número da semana
        week_number = get_week_number()

        # Exibir dados no terminal
        print(f"Temperatura: {temperature:.2f}°C | Umidade do ar: {humidity_air:.2f}% | Umidade do solo: {soil_moisture} | Semana: {week_number}")

        # Salvar dados no MongoDB
        save_to_mongodb(temperature, humidity_air, soil_moisture, week_number)

        # Aguardar 30 minutos (1800 segundos) até a próxima leitura
        time.sleep(1800)

except KeyboardInterrupt:
    print("Script interrompido manualmente.")
    GPIO.cleanup()
