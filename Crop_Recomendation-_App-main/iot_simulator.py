# import time, random, requests

# API_URL = "http://127.0.0.1:5000/iot_predict"

# def simulate_sensor_data():
#     return {
#         "N": random.randint(10, 120),
#         "P": random.randint(5, 100),
#         "K": random.randint(5, 120),
#         "temperature": round(random.uniform(15, 35), 2),
#         "humidity": round(random.uniform(40, 90), 2),
#         "ph": round(random.uniform(4.5, 8.5), 2),
#         "rainfall": round(random.uniform(50, 300), 2)
#     }

# while True:
#     data = simulate_sensor_data()
#     print("📡 Sending sensor data:", data)

#     try:
#         response = requests.post(API_URL, json=data)
#         if response.status_code == 200:
#             print("✅ Response:", response.json())
#         else:
#             print("⚠️ Error:", response.text)
#     except Exception as e:
#         print("❌ Failed to send:", e)

#     time.sleep(15)  # wait 5 sec before sending next reading







import pandas as pd
import numpy as np
import requests
import random
import time

# ==============================
# ⚙ Load Crop Dataset
# ==============================
print("📥 Loading crop dataset...")
data = pd.read_csv("Crop_recommendation.csv")

# Ensure consistent label naming
data['label'] = data['label'].str.strip().str.title()

# ==============================
# 📊 Cluster Data Per Crop
# ==============================
crop_clusters = {}

for crop in data['label'].unique():
    crop_data = data[data['label'] == crop]
    crop_clusters[crop] = {
        'N': (crop_data['N'].mean(), crop_data['N'].std()),
        'P': (crop_data['P'].mean(), crop_data['P'].std()),
        'K': (crop_data['K'].mean(), crop_data['K'].std()),
        'temperature': (crop_data['temperature'].mean(), crop_data['temperature'].std()),
        'humidity': (crop_data['humidity'].mean(), crop_data['humidity'].std()),
        'ph': (crop_data['ph'].mean(), crop_data['ph'].std()),
        'rainfall': (crop_data['rainfall'].mean(), crop_data['rainfall'].std()),
    }

print(f"✅ Clustered data prepared for {len(crop_clusters)} crops")

# ==============================
# 🌾 IoT Simulation Function
# ==============================
def generate_crop_data(crop_name):
    if crop_name not in crop_clusters:
        raise ValueError(f"Unknown crop: {crop_name}")

    stats = crop_clusters[crop_name]
    simulated = {
        key: float(np.clip(np.random.normal(mean, std if std > 0 else 1), 0, None))
        for key, (mean, std) in stats.items()
    }
    return simulated

# ==============================
# 🚀 Send to Flask API
# ==============================
API_URL = "http://127.0.0.1:5000/iot_predict"

print("\n🌿 Starting realistic IoT simulation...\n")

crops = list(crop_clusters.keys())

while True:
    # Randomly pick a crop to simulate
    true_crop = random.choice(crops)
    simulated_data = generate_crop_data(true_crop)

    try:
        res = requests.post(API_URL, json=simulated_data)
        result = res.json()

        print(f"\n🛰 IoT Data Sent: {simulated_data}")
        print(f"🌾 Predicted Crop: {result.get('crop')} | ✅ True Crop (Simulator): {true_crop}")
        print(f"🌤 Season: {result.get('season')}")
        print("-" * 70)

    except Exception as e:
        print("❌ IoT request failed:", e)

    time.sleep(20)  # run every 10 seconds