# 🌟 Skin‑Care Recommender – Personalized Product Suggestions 🧴✨

A full‑stack **skincare recommendation** system that lets users input their **skin type** and up to three **skin concerns**, then returns the **top 10** tailored product suggestions. Powered by a **KNN**‑based ML model in **Flask**, an **Express** API gateway, and a **responsive React + Tailwind CSS** frontend.

---

## 🛠 Tech Stack

### Frontend (ui)  
- **React** (v18) with **Create React App**  
- **Tailwind CSS** for utility‑first styling  
- **React Router** for SPA routing  
- **@react‑oauth/google** for Google OAuth sign‑in  
- **axios** for HTTP requests 

### API Gateway (backend)  
- **Node.js** + **Express**  
- **body‑parser** & **cors** middleware  
- **axios** to forward requests to the ML service

### ML Service (ml_model)  
- **Python 3**  
- **Flask** REST API  
- **pandas** for data handling  
- **scikit‑learn** for KNN classifier  
- **SimpleImputer** for missing‑value handling

---

## 📚 Dataset

- **File**: `ml_model/to_be_use_dataset.csv`  
- **Contents**:  
  - `skin type` (0–5), `concern`, `concern 2`, `concern 3` (0–33)
  - `label` (product ID/category), `brand`, `name`, `price`  
- **Mapping**: See `ml_model/data_kinds.txt` for numeric encoding of skin types & concerns

---

## 🧠 Algorithm & Pipeline

1. **Data Preprocessing**  
   - Load CSV & drop rows missing `skin type`.  
   - Impute missing `concern` fields with the most frequent value. 
2. **Feature Engineering**  
   - Features: `skin type`, `concern`, `concern 2`, `concern 3`.  
   - Target: `label` (the product to recommend).  
3. **Model Training**  
   - **KNeighborsClassifier** with `n_neighbors=5`.  
   - Train/test split: 80% train, 20% test.  
   - Evaluate accuracy via `accuracy_score`. 
4. **Recommendation**  
   - For a user’s input vector, retrieve the **10 nearest neighbors**.  
   - Return their `label`, `brand`, `name`, and `price` as suggestions.

---

## 📂 Project Structure

```
skin-care-recommender/
├── ml_model/               # 🔬 ML service (Flask + KNN)
│   ├── to_be_use_dataset.csv
│   ├── data_kinds.txt
│   ├── app.py              # 🚀 Flask API & recommendation logic
│   └── requirements.txt
├── backend/                # 🌐 Express API gateway
│   ├── index.js            # ↔️ Forwards requests to Flask
│   ├── package.json
│   └── .gitignore
└── ui/                     # 💅 React + Tailwind CSS frontend
    ├── src/
    │   ├── components/     # 🖼️ UI components (Home, Form, Results…)
    │   ├── Router/         # 🛣️ Route definitions
    │   └── index.js
    ├── public/
    ├── tailwind.config.js
    ├── package.json
    └── README.md           # CRA boilerplate
```

---

## 🚀 Quick Start

### 1. Clone the repo  
```bash
git clone https://github.com/shekharider/skin-care-recommender.git
cd skin-care-recommender
```

### 2. Launch the ML Service  
```bash
cd ml_model
python -m venv venv
# Windows: .\venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
python app.py
# → http://localhost:5000
```

### 3. Start the API Gateway  
```bash
cd backend
npm install
npm start
# → http://localhost:4000
```

### 4. Run the Frontend  
```bash
cd ui
npm install
npm start
# → http://localhost:3000
```

---

## 🎯 Features

- 🔐 **Google OAuth** login  
- 📝 **Dynamic form** for selecting skin type & up to three concerns  
- 🤖 **Real‑time recommendations** via KNN  
- 🛒 **Cart** & **Profile** pages for saved products  
- 📱 Fully **responsive** UI with Tailwind CSS  

---

## 🤖 Chatbot Integration

The chatbot module provides an **intelligent conversational interface** to help users discover skincare products through natural language interaction.

### Chatbot Features
- 💬 **Conversational Recommendations** – Users describe their skin concerns in natural language  
- 🎯 **Context-Aware Suggestions** – Understands skin type, sensitivity, and specific concerns  
- 🔄 **Follow-up Guidance** – Clarifies user needs and refines recommendations  
- 📚 **Product Knowledge Base** – Trained on skincare product catalog and ingredient info  

### Guardrails & Safety

The chatbot operates within defined guardrails to ensure safe, accurate, and helpful responses:

**Scope (✅ In-Scope)**
- Product recommendations based on skin type & concerns  
- Ingredient information & skin benefits  
- Price comparisons & product alternatives  
- General skincare routine guidance  
- Product suitability based on user profile  

**Out-of-Scope (❌ Not Recommended)**
- Medical diagnosis or treatment claims  
- Prescription of medications or controlled substances  
- Replacing professional dermatologist advice  
- Allergy testing or medical assessments  
- Treatment of serious skin conditions (acne, eczema, psoriasis → refer to dermatologist)  
- Personal health data storage beyond session context  

### Context & Limitations

- **Session-Based Context** – Chatbot remembers user preferences within a session  
- **Single User Focus** – Recommendations tailored to individual profile only  
- **Dataset Limitations** – Recommendations limited to products in `to_be_use_dataset.csv`  
- **Accuracy Note** – Current KNN model operates at ~41% accuracy; recommendations are suggestion-based, not definitive  
- **No Real-Time Updates** – Product availability & pricing are static from dataset  
- **Privacy** – No personal health data is stored; context is temporary per session  

---

## 🤝 Contributing

1. Fork & clone  
2. Create a branch: `git checkout -b feature/my‑awesome‑feature`  
3. Commit: `git commit -m "feat: add new feature"`  
4. Push & open a PR 🚀

---

Made with ❤️ by [@shankar](https://github.com/shekharider)
