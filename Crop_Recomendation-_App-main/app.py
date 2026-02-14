from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

# -----------------------------
# Load trained model
# -----------------------------
model = joblib.load("crop_model_roa_balanced_v2.pkl")

# Load dataset for reference
data = pd.read_csv("Crop_recommendation.csv")
data['label'] = data['label'].str.strip().str.title()

# -----------------------------
# Image folder
# -----------------------------
IMAGE_FOLDER = os.path.join(os.getcwd(), "crop_images")

# -----------------------------
# Season mapping for crops
# -----------------------------
CROP_SEASONS = {
    "Rice": "Kharif",
    "Maize": "Kharif",
    "Chickpea": "Rabi",
    "Kidneybeans": "Kharif",
    "Pigeonpeas": "Kharif",
    "Mothbeans": "Kharif",
    "Mungbean": "Kharif",
    "Blackgram": "Kharif",
    "Lentil": "Rabi",
    "Pomegranate": "Whole Year",
    "Banana": "Whole Year",
    "Mango": "Summer",
    "Grapes": "Rabi",
    "Watermelon": "Summer",
    "Muskmelon": "Summer",
    "Apple": "Rabi",
    "Orange": "Winter",
    "Papaya": "Whole Year",
    "Coconut": "Whole Year",
    "Cotton": "Kharif",
    "Jute": "Kharif",
    "Coffee": "Rabi",
    "Wheat": "Rabi",
    "Sugarcane": "Whole Year"
}

# -----------------------------
# Helper function to get image URL
# -----------------------------
def get_crop_image(crop_name):
    filename = f"{crop_name.lower()}.jpg"
    image_path = os.path.join(IMAGE_FOLDER, filename)
    if os.path.exists(image_path):
        return f"/images/{filename}"
    return "/images/default.jpg"

# -----------------------------
# Serve crop images
# -----------------------------
@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory(IMAGE_FOLDER, filename)

# -----------------------------
# Manual prediction endpoint
# -----------------------------
@app.route('/predict', methods=['POST'])
def predict_crop():
    data_req = request.get_json()
    features = [
        data_req['N'], data_req['P'], data_req['K'],
        data_req['temperature'], data_req['humidity'],
        data_req['ph'], data_req['rainfall']
    ]
    
    prediction = model.predict([features])[0]
    crop = str(prediction).strip().title()  # ensures proper casing

    response = {
        "crop": crop,
        "season": CROP_SEASONS.get(crop, "Season info not available"),
        "crop_image": get_crop_image(crop),
        "message": f"The most suitable crop for your conditions is {crop}.",
    }
    return jsonify(response)

# -----------------------------
# IoT prediction endpoint
# -----------------------------
latest_iot_result = {}

@app.route('/iot_predict', methods=['POST'])
def iot_predict_crop():
    global latest_iot_result
    data_req = request.get_json()
    features = [
        data_req['N'], data_req['P'], data_req['K'],
        data_req['temperature'], data_req['humidity'],
        data_req['ph'], data_req['rainfall']
    ]

    prediction = model.predict([features])[0]
    crop = str(prediction).strip().title()  # ensures proper casing

  
    latest_iot_result = {
    "N": round(data_req['N'], 2),
    "P": round(data_req['P'], 2),
    "K": round(data_req['K'], 2),
    "temperature": round(data_req['temperature'], 2),
    "humidity": round(data_req['humidity'], 2),
    "ph": round(data_req['ph'], 2),
    "rainfall": round(data_req['rainfall'], 2),
    "predicted_crop": crop,
    "season": CROP_SEASONS.get(crop, "Season info not available"),
    "crop_image": get_crop_image(crop),
    "true_crop": data_req.get("true_crop", "")
    }

    return jsonify(latest_iot_result)

# -----------------------------
# Endpoint to fetch latest IoT result
# -----------------------------
@app.route('/latest_iot', methods=['GET'])
def get_latest_iot():
    if not latest_iot_result:
        return jsonify({"error": "No IoT data available"}), 404
    return jsonify(latest_iot_result)

# -----------------------------
# Run Flask
# -----------------------------
if __name__ == '__main__':
    print("🌱 Flask API (ROA Optimized) running on http://127.0.0.1:5000")
    print("🔗 Ready to connect with React frontend...")
    app.run(debug=True)