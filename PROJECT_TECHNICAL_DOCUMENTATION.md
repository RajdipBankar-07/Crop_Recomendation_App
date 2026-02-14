# 🌱 Crop Recommendation System - Technical Documentation

## Project Overview
A full-stack intelligent crop recommendation system that uses **Machine Learning** optimized with **Remora Optimization Algorithm (ROA)** to suggest the most suitable crops based on soil and environmental parameters. The system includes IoT integration for real-time sensor data processing and an AI-powered chatbot for agricultural assistance.

---

## 🏗️ System Architecture

### **Three-Tier Architecture:**
1. **Frontend Layer** - React.js SPA (Single Page Application)
2. **Backend Layer** - Dual Backend System
   - Python Flask API (ML Model & Predictions)
   - Node.js Express API (User Management & Database)
3. **Data Layer** - MySQL Database + Trained ML Models

---

## 💻 Technology Stack

### **Frontend Technologies**
| Technology | Purpose | Version/Details |
|------------|---------|-----------------|
| **React.js** | UI Framework | Component-based architecture |
| **React Router** | Client-side routing | Multi-page navigation |
| **Vite** | Build tool | Fast development server |
| **CSS3** | Styling | Custom responsive design |
| **Fetch API** | HTTP requests | RESTful API communication |
| **Context API** | State management | Authentication state |

### **Backend Technologies - Python (ML Service)**
| Technology | Purpose | Key Features |
|------------|---------|--------------|
| **Flask** | Web framework | RESTful API server |
| **Scikit-learn** | ML library | Random Forest Classifier |
| **Pandas** | Data processing | CSV handling, data manipulation |
| **NumPy** | Numerical computing | Array operations, calculations |
| **Joblib** | Model serialization | Saving/loading trained models |
| **Imbalanced-learn (SMOTE)** | Data balancing | Synthetic Minority Oversampling |
| **Flask-CORS** | Cross-origin requests | Enable frontend-backend communication |

### **Backend Technologies - Node.js (User Service)**
| Technology | Purpose | Key Features |
|------------|---------|--------------|
| **Express.js** | Web framework | RESTful API, middleware support |
| **MySQL2** | Database driver | Connection pooling, async/await |
| **bcrypt** | Password hashing | Secure password storage (10 rounds) |
| **OpenAI API** | AI chatbot | GPT-based agricultural assistant |
| **dotenv** | Environment variables | Secure API key management |
| **CORS** | Cross-origin support | Frontend-backend integration |

### **Database**
| Component | Technology | Details |
|-----------|-----------|---------|
| **RDBMS** | MySQL | Relational database |
| **Tables** | users, crops, seasons | Normalized schema |
| **Connection** | Connection pooling | Max 10 concurrent connections |

### **Machine Learning Components**
| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Algorithm** | Random Forest Classifier | Crop prediction |
| **Optimization** | Remora Optimization Algorithm (ROA) | Hyperparameter tuning |
| **Data Balancing** | SMOTE | Handle class imbalance |
| **Cross-Validation** | StratifiedKFold (3-fold) | Model validation |
| **Features** | 7 parameters | N, P, K, temp, humidity, pH, rainfall |

---

## 🧠 Machine Learning Logic

### **1. Data Preprocessing**
```
Input Dataset: Crop_recommendation.csv
- 22 crop classes
- 7 features (N, P, K, temperature, humidity, pH, rainfall)
- Data cleaning: Strip whitespace, title case normalization
```

### **2. Data Balancing with SMOTE**
- **Problem:** Imbalanced class distribution
- **Solution:** SMOTE (Synthetic Minority Oversampling Technique)
- **Process:** 
  - Split data: 70% training, 30% testing (stratified)
  - Apply SMOTE only on training data
  - Generate synthetic samples for minority classes
  - Prevents overfitting on test data

### **3. Remora Optimization Algorithm (ROA)**
**Bio-inspired optimization algorithm** mimicking remora fish behavior:

#### **Hyperparameters Optimized:**
- `n_estimators`: Number of trees (range: 50-300)
- `max_depth`: Maximum tree depth (range: 5-25)

#### **ROA Process:**
1. **Initialize population** (12 individuals with random parameters)
2. **Fitness evaluation** using 3-fold cross-validation
3. **Leader selection** (best performing individual)
4. **Population update** (individuals move toward leader)
5. **Early stopping** (patience=3, no improvement threshold)
6. **Iterations:** 7 generations

#### **Fitness Function:**
```python
fitness = mean(cross_val_score(RandomForest, X_train, y_train, cv=3))
```

### **4. Model Training**
- **Algorithm:** Random Forest Classifier
- **Final parameters:** Optimized by ROA
- **Additional settings:**
  - `min_samples_leaf=2` (prevent overfitting)
  - `random_state=42` (reproducibility)
- **Training data:** SMOTE-balanced dataset

### **5. Model Evaluation**
- Training accuracy
- Test accuracy
- Classification report
- Confusion matrix

### **6. Model Persistence**
- **Trained model:** `crop_model_roa_balanced_v2.pkl`
- **Metrics:** `metrics_roa_v2.pkl`
- **Season mapping:** `season_mapping.pkl`

---

## 🔧 Backend Architecture

### **Python Flask API (Port 5000)**

#### **Endpoints:**

| Endpoint | Method | Purpose | Input | Output |
|----------|--------|---------|-------|--------|
| `/predict` | POST | Manual crop prediction | Soil/env parameters | Crop, season, image |
| `/iot_predict` | POST | IoT sensor prediction | Sensor data | Crop prediction + metadata |
| `/latest_iot` | GET | Fetch latest IoT result | None | Last IoT prediction |
| `/images/<filename>` | GET | Serve crop images | Image filename | Image file |

#### **Key Features:**
1. **Model Loading:** Joblib deserialization at startup
2. **Image Management:** Dynamic crop image serving
3. **Season Mapping:** 23 crops mapped to seasons (Kharif/Rabi/Summer/Whole Year)
4. **Real-time Processing:** In-memory storage of latest IoT data

### **Node.js Express API (Port 5000)**

#### **Endpoints:**

| Endpoint | Method | Purpose | Authentication | Validation |
|----------|--------|---------|----------------|------------|
| `/api/register` | POST | User registration | None | Email, password regex |
| `/api/login` | POST | User authentication | None | bcrypt comparison |
| `/api/seasons` | GET | Fetch all seasons | None | None |
| `/api/crops` | GET | Fetch crops (optional filter) | None | Season query param |
| `/api/crops/:id` | GET | Fetch single crop | None | Crop ID |
| `/api/chat` | POST | AI chatbot | None | Messages array |

#### **Security Features:**
1. **Password Hashing:** bcrypt with 10 salt rounds
2. **Email Validation:** Regex pattern matching
3. **Password Policy:** 
   - Minimum 6 characters
   - 1 uppercase, 1 lowercase
   - 1 number, 1 special character
4. **SQL Injection Prevention:** Parameterized queries
5. **CORS:** Configured for cross-origin requests

#### **Database Schema:**

**Users Table:**
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  fullname VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,  -- bcrypt hashed
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Crops Table:**
```sql
CREATE TABLE crops (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  season VARCHAR(50),
  description TEXT,
  image_url VARCHAR(255),
  npk_ratio VARCHAR(50),
  soil_type VARCHAR(100),
  water_requirement VARCHAR(50)
);
```

**Seasons Table:**
```sql
CREATE TABLE seasons (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  start_month VARCHAR(20),
  end_month VARCHAR(20),
  description TEXT
);
```

---

## 🌐 IoT Integration

### **IoT Simulator (`iot_simulator.py`)**

#### **Purpose:**
Simulate realistic sensor data for testing and demonstration

#### **Logic:**
1. **Data Clustering:**
   - Load historical crop data
   - Calculate mean and standard deviation for each crop
   - Create statistical profiles for 22 crops

2. **Realistic Data Generation:**
   - Select random crop
   - Generate sensor values using normal distribution
   - Parameters: N, P, K, temperature, humidity, pH, rainfall
   - Clip negative values to zero

3. **API Communication:**
   - POST simulated data to `/iot_predict`
   - Interval: 20 seconds
   - Compare predicted vs. true crop

#### **Real-world Application:**
Replace simulator with actual IoT sensors:
- Soil NPK sensors
- Temperature/humidity sensors
- pH meters
- Rain gauges

---

## 🤖 AI Chatbot System

### **Hybrid Architecture:**
1. **Offline Fallback:** Rule-based responses (750+ patterns)
2. **Online AI:** OpenAI GPT integration

### **Offline Knowledge Base:**
- **Categories:** 15+ agricultural domains
- **Topics:**
  - Irrigation optimization (drip, orchard-specific)
  - Soil management (pH, fertility, types)
  - Fertilizer application (NPK ratios, timing)
  - Pest and disease control (crop-specific)
  - Indian farming seasons (Rabi, Kharif, Zaid)
  - Government schemes (PM-KISAN, KCC)
  - Crop varieties (wheat, rice, cotton)
  - Water conservation
  - Organic farming

### **Pattern Matching Logic:**
```javascript
function offlineReply(prompt) {
  const lower = prompt.toLowerCase();
  
  // Specific patterns first (e.g., "orchard irrigation")
  if (lower.includes("orchard") && lower.includes("irrigation")) {
    return specificAdvice;
  }
  
  // General patterns later
  if (lower.includes("irrigation")) {
    return generalAdvice;
  }
  
  // Default response
  return defaultMessage;
}
```

### **Online AI Integration:**
- **Model:** OpenAI GPT
- **System Prompt:** Indian agriculture specialist
- **Context:** Rabi/Kharif/Zaid seasons, IPM, water-saving
- **Fallback:** Offline responses if API fails

---

## 🔄 Application Flow

### **User Registration Flow:**
```
1. User submits registration form
2. Frontend validates input
3. POST /api/register
4. Backend validates:
   - Email format (regex)
   - Password strength (regex)
   - Email uniqueness (DB query)
5. Hash password (bcrypt, 10 rounds)
6. Insert into users table
7. Return success/error response
```

### **Crop Prediction Flow (Manual):**
```
1. User enters soil parameters (N, P, K, temp, humidity, pH, rainfall)
2. Frontend validates numeric inputs
3. POST /predict to Flask API
4. Load trained model (cached)
5. Predict crop using Random Forest
6. Lookup season from mapping
7. Generate image URL
8. Return JSON response
9. Frontend displays:
   - Predicted crop
   - Season
   - Crop image
   - Recommendation message
```

### **IoT Prediction Flow:**
```
1. IoT simulator generates sensor data
2. POST /iot_predict
3. Flask API processes data
4. Store in global variable (latest_iot_result)
5. Return prediction
6. Frontend polls /latest_iot every 5 seconds
7. Update UI with real-time data
8. Display predicted vs. true crop
```

### **Chatbot Interaction Flow:**
```
1. User sends message
2. POST /api/chat with messages array
3. Backend attempts offline match
4. If no match, call OpenAI API
5. Return AI response
6. If API fails, return offline fallback
7. Frontend displays response
8. Maintain conversation history
```

---

## 📊 Data Flow Diagram

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       ▼
┌─────────────────────────┐
│   React Frontend        │
│  - Forms                │
│  - State Management     │
│  - API Calls            │
└────┬──────────────┬─────┘
     │              │
     ▼              ▼
┌─────────────┐  ┌──────────────┐
│ Flask API   │  │ Express API  │
│ (ML Model)  │  │ (User/DB)    │
└──────┬──────┘  └──────┬───────┘
       │                │
       ▼                ▼
┌─────────────┐  ┌──────────────┐
│ Trained     │  │   MySQL      │
│ ML Models   │  │  Database    │
└─────────────┘  └──────────────┘
```

---

## 🎯 Key Algorithms & Techniques

### **1. Random Forest Classifier**
- **Type:** Ensemble learning (bagging)
- **Components:** Multiple decision trees
- **Voting:** Majority vote for classification
- **Advantages:**
  - Handles non-linear relationships
  - Resistant to overfitting
  - Feature importance ranking

### **2. SMOTE (Synthetic Minority Oversampling)**
- **Purpose:** Balance imbalanced datasets
- **Method:** 
  - Select minority class samples
  - Find k-nearest neighbors
  - Generate synthetic samples between neighbors
- **Benefit:** Improves model performance on minority classes

### **3. Stratified K-Fold Cross-Validation**
- **Folds:** 3
- **Strategy:** Maintain class distribution in each fold
- **Purpose:** Reliable performance estimation

### **4. Remora Optimization Algorithm**
- **Type:** Nature-inspired metaheuristic
- **Inspiration:** Remora fish attaching to sharks
- **Mechanism:**
  - Population-based search
  - Leader-follower dynamics
  - Exploration and exploitation balance

---

## 🔐 Security Implementations

### **1. Password Security**
- **Hashing:** bcrypt algorithm
- **Salt rounds:** 10
- **Storage:** Never store plain text
- **Validation:** Strong password policy

### **2. SQL Injection Prevention**
- **Method:** Parameterized queries
- **Library:** mysql2 prepared statements
- **Example:**
```javascript
db.execute('SELECT * FROM users WHERE email = ?', [email])
```

### **3. API Security**
- **CORS:** Configured origins
- **Environment variables:** Sensitive data (API keys)
- **Input validation:** Server-side checks

### **4. Authentication**
- **Method:** Session-based (Context API)
- **Storage:** LocalStorage (user data)
- **Protected routes:** React Router guards

---

## 📈 Performance Optimizations

### **1. Database**
- **Connection pooling:** Reuse connections (max 10)
- **Indexed queries:** Primary keys, email unique index
- **Async operations:** Non-blocking queries

### **2. Frontend**
- **Code splitting:** React lazy loading
- **Build optimization:** Vite bundler
- **Image optimization:** Compressed crop images

### **3. Backend**
- **Model caching:** Load once at startup
- **In-memory storage:** Latest IoT data
- **Efficient routing:** Express middleware

---

## 🧪 Testing & Validation

### **Model Validation**
- **Train-test split:** 70-30 stratified
- **Cross-validation:** 3-fold stratified
- **Metrics:** Accuracy, precision, recall, F1-score

### **API Testing**
- **Tools:** Postman, curl
- **Test cases:**
  - Valid inputs
  - Invalid inputs
  - Edge cases
  - Error handling

---

## 📦 Deployment Considerations

### **Requirements:**
1. **Python 3.8+** with dependencies (requirements.txt)
2. **Node.js 14+** with npm packages
3. **MySQL 8.0+** database server
4. **Environment variables:**
   - `OPENAI_API_KEY`
   - Database credentials

### **Startup Sequence:**
1. Start MySQL server
2. Create database and tables
3. Start Flask API: `python app.py`
4. Start Express API: `node index.js`
5. Start React frontend: `npm run dev`

---

## 🎓 Skills Demonstrated

### **Technical Skills:**
- Full-stack web development
- Machine learning implementation
- RESTful API design
- Database design and management
- IoT integration concepts
- AI/NLP integration (OpenAI)
- Security best practices
- Optimization algorithms

### **Tools & Frameworks:**
- React.js, Vite
- Flask, Express.js
- Scikit-learn, Pandas, NumPy
- MySQL, bcrypt
- Git version control

### **Concepts:**
- Supervised learning (classification)
- Hyperparameter optimization
- Data preprocessing and balancing
- Cross-validation techniques
- Authentication and authorization
- Real-time data processing
- Responsive web design

---

## 📝 Resume Points

**Crop Recommendation System using Machine Learning**
- Developed full-stack agricultural recommendation system using **React.js**, **Flask**, **Express.js**, and **MySQL**
- Implemented **Random Forest Classifier** optimized with **Remora Optimization Algorithm (ROA)** achieving high accuracy
- Applied **SMOTE** for data balancing and **Stratified K-Fold Cross-Validation** for model validation
- Built dual backend architecture: **Python Flask** for ML predictions and **Node.js Express** for user management
- Integrated **IoT simulation** for real-time sensor data processing with 20-second polling intervals
- Developed AI-powered chatbot using **OpenAI GPT API** with 750+ offline fallback patterns
- Implemented secure authentication with **bcrypt hashing** (10 rounds) and password validation
- Designed normalized **MySQL database** with connection pooling and parameterized queries
- Created responsive React frontend with **Context API** state management and protected routes
- Handled 22 crop classes with 7 environmental features (N, P, K, temperature, humidity, pH, rainfall)

---

## 🔗 Technologies Summary

**Frontend:** React.js, React Router, Vite, CSS3, Fetch API, Context API

**Backend:** Flask, Express.js, Node.js, Python 3.x

**Machine Learning:** Scikit-learn, Random Forest, ROA, SMOTE, Pandas, NumPy, Joblib

**Database:** MySQL, mysql2 (connection pooling)

**Security:** bcrypt, CORS, parameterized queries, input validation

**AI/NLP:** OpenAI GPT API, rule-based chatbot

**IoT:** Sensor simulation, real-time data processing

**Tools:** Git, npm, pip, Postman

---

## 📚 Learning Outcomes

1. **Machine Learning Pipeline:** Data preprocessing → Model training → Optimization → Deployment
2. **Full-Stack Integration:** Connecting React frontend with dual backend services
3. **Database Management:** Schema design, queries, connection pooling
4. **API Development:** RESTful endpoints, error handling, validation
5. **Security:** Password hashing, SQL injection prevention, authentication
6. **Real-time Systems:** IoT data processing, polling mechanisms
7. **AI Integration:** OpenAI API, prompt engineering, fallback systems
8. **Optimization:** Hyperparameter tuning with bio-inspired algorithms

---

*This documentation provides comprehensive technical details for resume preparation and interview discussions.*
