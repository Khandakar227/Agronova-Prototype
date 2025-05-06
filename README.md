# Agronova

## Installation (Frontend)
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Installation (Backend)
`python version: 3.10`
Go to `backend`. create a virtual environment.\

```bash
python -m venv venv
```
Activate the environment (For Windows).
```bash
venv/Scripts/activate
```
Install fastapi:
```bash
pip install fastapi[standard]
```
Install all the python packages.
```bash
pip install -r requirements.txt
```

Run the backend:
```bash
fastapi dev main.py
```

### Add the Model weights
Download the [ZIP](https://drive.google.com/file/d/16tueh_67HojvjO0A6mZ45JvW_Ig9vovg/view?usp=drive_link) file and extract it to `backend/weights` folder.

### API Routes
Here's a comprehensive **API documentation** for your agricultural service `Agronova` based on the provided Insomnia export:

---

# **Agronova API Documentation**  
**Base URL**: `http://localhost:8000` (Backend) / `http://localhost:3000` (Frontend)  

---

## **1. Plant Disease Prediction**  
### **Predict Disease from Image**  
**Endpoint**: `POST /predict-disease`  
**Content-Type**: `multipart/form-data`  
**Request**:  
```json
{
  "file": "<leaf_image.jpg>"
}
```
**Response**:  
```json
{
  "disease": "Common Rust",
  "confidence": 0.92
}
```

---


## **2. Fertilizer Recommendation**  
### **Recommend Fertilizer**  
**Endpoint**: `POST /recommend-fertilizer`  
**Content-Type**: `application/json`  
**Request**:  
```json
{
  "crop": "watermelon",
  "N": 60,
  "P": 4.5,
  "K": 10,
  "moisture": 610,
  "temperature": 125,
  "humidity": 185,
  "soilType": "Loamy"
}
```
**Response**:  
```json
{
  "fertilizer": "10-10-10 NPK"
}
```

---

### **Get Fertilizer Details**  
**Endpoint**: `POST /api/fertilizer-info` (Frontend)  
**Content-Type**: `application/json`  
**Request**:  
```json
{
  "fertilizer": "Urea",
  "N": 45,
  "P": 29,
  "K": 38
}
```
**Response**:  
```json
{
  "fertilizer": "Urea",
  "response": "Apply during early growth stage."
}
```

---

## **3. Crop Suitability & Advice**  
### **Predict Optimal Crop**  
**Endpoint**: `POST /predict-crop`  
**Content-Type**: `application/json`  
**Request**:  
```json
{
  "soilDepth": "medium (50-150 cm)",
  "soilTexture": "light",
  "soilPH": 7.5,
  "temperature": 28,
  "rainfall": 91
}
```
**Response**:  
```json
{
  "crop": "Soybean",
  "suitability_score": 0.87
}
```

---

### **Check Location-Based Suitability**  
**Endpoint**: `POST /predict-suitability`  
**Content-Type**: `application/json`  
**Request**:  
```json
{
  "lon": 89.51464,
  "lat": 23.435397
}
```
**Response**:  
```json
{
  "suitable_crops": ["Rice", "Jute"],
  "unsuitable_crops": ["Wheat"]
}
```

---

## **4. Chatbot & Crop Details**  
### **Agricultural Chatbot (Bengali Supported)**  
**Endpoint**: `POST /api/chatbot`  
**Content-Type**: `application/json`  
**Request**:  
```json
{
  "question": "সুপারি ও নাড়কেলের ছোট ছোট ফল পড়ে যাচ্ছে। সমাধান জানতে চাই?"
}
```
**Response**:  
```json
{
	"question": "সুপারি ও নাড়কেলের ছোট ছোট ফল পড়ে যাচ্ছে। সমাধান জানতে চাই?",
	"response": "**উত্তর:**\n\n**সুপারির ক্ষেত্রে:**\n\n* **পুষ্টির অভাব:** নিয়মিত সার প্রয়োগ করুন, বিশেষ করে নাইট্রোজেন, ফসফরাস ও পটাশিয়াম।\n* **জল জমে যাওয়া:** জমিতে যথেষ্ট নিষ্কাশনের ব্যবস্থা করুন।\n* **রোগ ও পোকামাকড়:** রোগ ও পোকামাকড়ের আক্রমণ नियন্ত্রণ করুন।\n\n**নাড়িকেলের ক্ষেত্রে:**\n\n* **পানির ঘাটতি:** বিশেষ করে শুষ্ক মৌসুমে নিয়মিত পানি দিন।\n* **পুষ্টির ঘাটতি:** ভারসাম্যপূর্ণ সার প্রয়োগ করুন, বিশেষ করে বোরন, জিঙ্ক ও ম্যাগনেশিয়াম।\n* **ফলের দামা ঘাটতি:** ফলের দামা হওয়ার সময় পর্যাপ্ত পানি দিন।\n* **পোকামাকড় ও রোগ:** পোকামাকড় ও রোগের আক্রমণ नियন্ত্রণ করুন।"
}
```

---

### **Generate Crop Details**  
**Endpoint**: `POST /api/crop-details-generate`  
**Content-Type**: `application/json`  
**Request**:  
```json
{
  "crop": "Atriplex confertifolia"
}
```
**Response**:  
```json
{
	"crop": "Atriplex confertifolia",
	"result": {
		"name": "ডানা গাছ",
		"description": "হালকা কালচে সবুজ রঙের ডালপালা বিশিষ্ট আট্রিপ্লেক্স কনফারটিফোলিয়া একটি খাড়া বৃক্ষ যা প্রায় 9 ফুট পর্যন্ত লম্বা হয়।"
	}
}
```


**Need Swagger/OpenAPI spec?** I can generate a YAML file for you! Let me know 🚀.