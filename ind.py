import json
import random
import time

def generate_data():
    data = {
        "indicators": {
            "NVDI": random.randint(0, 100),
            "heatStress": random.randint(0, 100),
            "humidity": random.randint(0, 100),
            "surfTemp": random.randint(0, 100),
            "grndTemp": random.randint(0, 100)
        }
    }
    
    with open('data.json', 'w') as json_file:
        json.dump(data, json_file)

while True:
    generate_data()
    time.sleep(5)  # Actualiza cada 5 segundos