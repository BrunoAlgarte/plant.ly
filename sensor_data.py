import RPi.GPIO as GPIO
import time
from pymongo import MongoClient
from datetime import datetime, timedelta
import Adafruit_DHT

# Configuração do GPIO
GPIO.setmode(GPIO.BCM)

# Definir o pino digital do sensor de umidade do solo
SOIL_PIN = 21  # Substitua pelo GPIO correto onde o sensor está conectado

# Configuração para sensor DHT22 (temperatura e umidade do ar)
DHT_SENSOR = Adafruit_DHT.DHT22
DHT_PIN = 4  # Substitua pelo GPIO correto onde o DHT22 está conectado

# Configurar conexão com o MongoDB
client = MongoClient('mongodb+srv://brunoalgter:Bruno123filedetilapia@cluster0.ar4lb8g.mongodb.net/')
db = client['plant_monitoring']
collection = db['sensor_data']

# Data de início do monitoramento (primeira execução)
start_date = datetime.now()

# Função para salvar os dados no MongoDB
def save_to_mongodb(temperature, humidity_air, humidity_soil, week_number):
    current_time = datetime.now()
    data = {
        "sensor_data": {
            "temperature_air_celsius": round(temperature, 2),  # Arredondar temperatura para 2 casas decimais
            "humidity_air_percentage": round(humidity_air, 2), # Arredondar umidade para 2 casas decimais
            "soil_moisture_status": humidity_soil,  # Status de umidade do solo (úmido ou seco)
            "timestamp": current_time.strftime("%Y-%m-%dT%H:%M:%S"),  # Formato ISO 8601
            "week": week_number
        }
    }
    collection.insert_one(data)
    print("Dados salvos no MongoDB:", data)

# Função para ler o sensor de umidade do solo digital
def read_soil_moisture():
    if GPIO.input(SOIL_PIN) == GPIO.LOW:
        return "Úmido"
    else:
        return "Seco"

# Função para calcular a semana de monitoramento
def get_week_number():
    current_date = datetime.now()
    delta = current_date - start_date
    week_number = delta.days // 7 + 1
    return week_number

try:
    # Configurar o pino do sensor de umidade do solo como entrada
    GPIO.setup(SOIL_PIN, GPIO.IN)

    while True:
        # Ler os dados do sensor DHT22 (temperatura e umidade do ar)
        humidity_air, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)

        # Ler o estado do sensor de umidade do solo
        soil_moisture = read_soil_moisture()

        # Calcular o número da semana
        week_number = get_week_number()

        # Exibir os dados no terminal
        print(f"Temperatura: {round(temperature, 2)}°C | Umidade do ar: {round(humidity_air, 2)}% | Umidade do solo: {soil_moisture} | Semana: {week_number}")

        # Salvar os dados no MongoDB
        save_to_mongodb(temperature, humidity_air, soil_moisture, week_number)

        # Aguardar 10 minutos (600 segundos) até a próxima leitura
        time.sleep(600)

except KeyboardInterrupt:
    GPIO.cleanup()