# 🌱 Crop Recommendation System using Remora Optimization Algorithm

> An intelligent, full-stack agricultural recommendation platform powered by **Machine Learning**, **IoT integration**, and an **AI-powered chatbot** — built to help farmers make data-driven crop decisions.

---

## 📌 Table of Contents

- [Overview](#-overview)
- [AI Model](#-ai-model--machine-learning)
- [AI Chatbot](#-ai-chatbot)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [API Endpoints](#-api-endpoints)
- [IoT Integration](#-iot-integration)

---

## 🌾 Overview

The **Crop Recommendation System** is a full-stack intelligent application that recommends the most suitable crop for a farmer based on soil and environmental conditions:

| Parameter | Description |
|-----------|-------------|
| **N** | Nitrogen content in soil |
| **P** | Phosphorus content in soil |
| **K** | Potassium content in soil |
| **Temperature** | Ambient temperature (°C) |
| **Humidity** | Relative humidity (%) |
| **pH** | Soil pH level |
| **Rainfall** | Annual rainfall (mm) |

The system supports both **manual input** and **real-time IoT sensor data**, and uses a **hybrid AI chatbot** for agricultural guidance.

---

## 🧠 AI Model & Machine Learning

### Algorithm: Random Forest Classifier
- **Type:** Ensemble learning (bagging of decision trees)
- **Task:** Multi-class crop classification (22 crop types)
- **Input features:** 7 soil & environmental parameters
- **Output:** Predicted crop name + growing season

### Optimization: Remora Optimization Algorithm (ROA)
A **bio-inspired metaheuristic** algorithm inspired by remora fish attaching to larger hosts (sharks). Used to **auto-tune Random Forest hyperparameters**.

| Hyperparameter | Search Range |
|----------------|-------------|
| `n_estimators` | 50 – 300 trees |
| `max_depth` | 5 – 25 levels |

**ROA Process:**
1. Initialize population of 12 candidate solutions
2. Evaluate each using 3-fold cross-validation accuracy
3. Identify the best (leader) solution
4. Move all individuals toward the leader
5. Repeat for 7 generations (with early stopping, patience=3)

### Data Balancing: SMOTE
- **Problem:** Unequal class distribution across 22 crops
- **Solution:** SMOTE (Synthetic Minority Oversampling Technique)
- Generates synthetic samples for underrepresented crop classes
- Applied only on training data (70/30 train-test split)

### Model Validation
- **Cross-Validation:** Stratified K-Fold (3 folds)
- **Metrics:** Accuracy, Precision, Recall, F1-Score, Confusion Matrix

### Saved Model Files
| File | Purpose |
|------|---------|
| `crop_model_roa_balanced_v2.pkl` | Trained Random Forest model |
| `metrics_roa_v2.pkl` | Training & test accuracy metrics |
| `season_mapping.pkl` | Crop-to-season lookup table |

---

## 🤖 AI Chatbot

The system features a **hybrid AI chatbot** combining rule-based offline responses with OpenAI GPT for unlimited agricultural Q&A.

### Architecture: Hybrid (Offline + Online)

```
User Message
     │
     ▼
Offline Pattern Matching (750+ patterns)
     │
     ├──► Match Found → Return instant rule-based response
     │
     └──► No Match → Call OpenAI GPT API
                          │
                          ├──► API Success → Return AI response
                          └──► API Fails → Return offline fallback
```

### AI Model Used: OpenAI GPT
- **Model:** OpenAI GPT (via OpenAI API)
- **System Role:** Indian Agriculture Specialist
- **Context Awareness:** Rabi / Kharif / Zaid seasons, IPM (Integrated Pest Management), water-saving techniques
- **API Integration:** Node.js Express `/api/chat` endpoint

### Offline Knowledge Base (750+ Patterns)
Covers **15+ agricultural domains**:

| Domain | Topics |
|--------|--------|
| 🌊 Irrigation | Drip irrigation, orchard-specific, water-saving |
| 🌍 Soil Management | pH correction, fertility, soil types |
| 🧪 Fertilizers | NPK ratios, timing, organic alternatives |
| 🐛 Pest & Disease | Crop-specific control strategies |
| 📅 Farming Seasons | Rabi, Kharif, Zaid calendar guidance |
| 🏛️ Govt. Schemes | PM-KISAN, KCC (Kisan Credit Card) |
| 🌾 Crop Varieties | Wheat, rice, cotton cultivars |
| 💧 Water Conservation | Rainwater harvesting, mulching |
| 🌱 Organic Farming | Natural inputs, composting |

---

## 🛠️ Technology Stack

### 🎨 Frontend
| Technology | Purpose |
|------------|---------|
| **React.js** | UI component framework (SPA) |
| **React Router** | Client-side multi-page navigation |
| **Vite** | Fast development build tool |
| **CSS3** | Custom responsive styling |
| **Fetch API** | RESTful API communication |
| **Context API** | Global authentication state management |

### 🐍 Backend — Python (ML Service, Port 5000)
| Technology | Purpose |
|------------|---------|
| **Flask** | Lightweight Python web framework |
| **Scikit-learn** | Random Forest Classifier & ML utilities |
| **Pandas** | Data loading, cleaning, manipulation |
| **NumPy** | Numerical computations & array operations |
| **Joblib** | Model serialization (save/load `.pkl` files) |
| **Imbalanced-learn (SMOTE)** | Handle class imbalance in training data |
| **Flask-CORS** | Allow React frontend to call Flask API |

### 🟢 Backend — Node.js (User Service, Port 3000)
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | RESTful API framework & middleware |
| **MySQL2** | MySQL database driver with connection pooling |
| **bcrypt** | Secure password hashing (10 salt rounds) |
| **OpenAI API** | GPT-powered AI chatbot integration |
| **dotenv** | Secure management of environment variables |
| **CORS** | Cross-origin request support |

### 🗄️ Database
| Component | Technology |
|-----------|-----------|
| **RDBMS** | MySQL 8.0+ |
| **Tables** | `users`, `crops`, `seasons` |
| **Connection** | Pooling (max 10 concurrent connections) |
| **Security** | Parameterized queries (SQL injection prevention) |

### 🤖 AI & Machine Learning
| Component | Technology |
|-----------|-----------|
| **Crop Prediction Model** | Random Forest Classifier (Scikit-learn) |
| **Hyperparameter Optimization** | Remora Optimization Algorithm (ROA) |
| **Data Balancing** | SMOTE (Imbalanced-learn) |
| **Cross-Validation** | StratifiedKFold — 3 folds |
| **AI Chatbot** | OpenAI GPT API |
| **Offline Chatbot** | Custom rule-based pattern matching (750+ rules) |

### 📡 IoT Integration
| Component | Technology |
|-----------|-----------|
| **IoT Simulator** | Python script (`iot_simulator.py`) |
| **Sensor Data** | Normal distribution generation per crop |
| **Communication** | HTTP POST to Flask `/iot_predict` |
| **Update Interval** | Every 20 seconds |

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────┐
│              React.js Frontend               │
│   Forms │ Chatbot UI │ IoT Dashboard │ Auth  │
└──────┬───────────────────────────┬───────────┘
       │                           │
       ▼                           ▼
┌──────────────┐           ┌──────────────────┐
│  Flask API   │           │  Express.js API  │
│  (Python)    │           │  (Node.js)       │
│  Port: 5000  │           │  Port: 3000      │
│              │           │                  │
│  /predict    │           │  /api/register   │
│  /iot_predict│           │  /api/login      │
│  /latest_iot │           │  /api/crops      │
│              │           │  /api/chat ──────┼──► OpenAI GPT
└──────┬───────┘           └──────────┬───────┘
       │                              │
       ▼                              ▼
┌──────────────┐           ┌──────────────────┐
│ Trained ML   │           │  MySQL Database  │
│ Models (.pkl)│           │  users/crops/    │
│              │           │  seasons tables  │
└──────────────┘           └──────────────────┘
       ▲
       │
┌──────────────┐
│ IoT Simulator│
│ (Python)     │
│ 20s interval │
└──────────────┘
```

---

## ✨ Features

- 🌾 **AI Crop Prediction** — Random Forest model optimized with ROA
- 🤖 **AI Chatbot** — OpenAI GPT + 750+ offline agricultural patterns
- 📡 **IoT Integration** — Real-time sensor data simulation & prediction
- 🖼️ **Crop Image Display** — Automatic crop image shown with recommendation
- 📅 **Season Mapping** — Maps each crop to Kharif / Rabi / Summer / Whole Year
- 🔐 **Secure Authentication** — bcrypt hashing + strong password policies
- 📊 **22 Crop Classes** — Wide variety of crop recommendations
- 🌐 **Full-Stack Application** — React + Flask + Express + MySQL

---

## 📁 Project Structure

```
Crop_Recomendation_App-main/
│
├── app.py                          # Flask ML API (Python)
├── train_model_roa.py              # Model training with ROA
├── iot_simulator.py                # IoT sensor data simulator
├── Crop_recommendation.csv         # Training dataset (22 crops)
├── requirements.txt                # Python dependencies
│
├── crop_model_roa_balanced_v2.pkl  # Trained Random Forest model
├── metrics_roa_v2.pkl              # Model accuracy metrics
├── season_mapping.pkl              # Crop-to-season mapping
│
├── crop_images/                    # Crop image assets
├── static/                         # Flask static files
├── templates/                      # Flask HTML templates
│
├── crop-recommendation-app/        # React.js Frontend (Vite)
│   ├── src/
│   │   ├── components/             # UI components
│   │   ├── pages/                  # Page-level components
│   │   └── context/                # Context API (auth state)
│   └── package.json
│
└── cropBackend/                    # Node.js Express Backend
    ├── index.js                    # Main Express server
    ├── .env                        # Environment variables (API keys)
    └── package.json
```

---

## ⚙️ Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js 14+
- MySQL 8.0+
- OpenAI API Key

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Crop_Recomendation_App-main
```

### 2. Python (Flask ML API) Setup
```bash
pip install -r requirements.txt
python train_model_roa.py   # Train model (generates .pkl files)
python app.py               # Start Flask API on port 5000
```

### 3. Node.js (Express API) Setup
```bash
cd cropBackend
npm install
# Create .env file with:
# OPENAI_API_KEY=your_openai_key_here
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=yourpassword
# DB_NAME=crop_db
node index.js               # Start Express API on port 3000
```

### 4. React Frontend Setup
```bash
cd crop-recommendation-app
npm install
npm run dev                 # Start Vite dev server
```

### 5. IoT Simulator (Optional)
```bash
python iot_simulator.py     # Simulates sensor data every 20s
```

---

## 🔌 API Endpoints

### Flask API (Python — ML Service)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/predict` | POST | Manual crop prediction from form input |
| `/iot_predict` | POST | IoT sensor-based crop prediction |
| `/latest_iot` | GET | Fetch latest IoT prediction result |
| `/images/<filename>` | GET | Serve crop images |

### Express API (Node.js — User Service)
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/register` | POST | Register new user |
| `/api/login` | POST | User login with bcrypt verification |
| `/api/seasons` | GET | Get all farming seasons |
| `/api/crops` | GET | Get crops (with optional season filter) |
| `/api/crops/:id` | GET | Get single crop details |
| `/api/chat` | POST | AI chatbot (OpenAI GPT + offline fallback) |

---

## 📡 IoT Integration

The `iot_simulator.py` script simulates realistic soil sensor readings:

1. Loads historical crop data from `Crop_recommendation.csv`
2. Calculates **mean & standard deviation** for each of the 22 crops
3. Generates **sensor values using normal distribution**
4. POSTs simulated data to `/iot_predict` every **20 seconds**
5. Compares **predicted crop vs. true crop** for accuracy reporting

> In production, replace the simulator with actual hardware sensors: soil NPK sensors, temperature/humidity sensors, pH meters, and rain gauges.

---

## 🔐 Security

| Feature | Implementation |
|---------|---------------|
| Password Hashing | bcrypt (10 salt rounds) |
| SQL Injection Prevention | Parameterized queries (mysql2) |
| API Key Management | `.env` file + dotenv |
| CORS Protection | Configured per-origin |
| Input Validation | Regex (email, password strength) |
| Protected Routes | React Router guards |

---

## 📊 Dataset

- **Source:** `Crop_recommendation.csv`
- **Crops:** 22 varieties (wheat, rice, maize, cotton, coffee, etc.)
- **Features:** 7 (N, P, K, temperature, humidity, pH, rainfall)
- **Train/Test Split:** 70% / 30% (stratified)

---

*Built with ❤️ for smart agriculture — helping farmers make better decisions with AI.*
