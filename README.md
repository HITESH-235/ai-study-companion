# 📚 AI Study Companion

A full-stack AI-powered study assistant that helps you generate structured explanations for any topic using modern web technologies and LLM APIs.

---

## 🚀 Features

* 🧠 Generate clear explanations for any topic
* 📑 Structured output with headings & bullet points
* ⚡ Fast responses using Groq API
* 🎯 Clean and minimal UI
* 🌐 Fully deployed (Frontend + Backend)

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* CSS (custom styling)
* React Markdown

### Backend

* Flask (Python)
* Groq API (LLM)
* Gunicorn (production server)

### Deployment

* Frontend: Vercel
* Backend: Railway

---

## 📂 Project Structure

```
ai-study-companion/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── Procfile
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── main.jsx
│
├── public/
│   └── logo.png
│
├── index.html
└── package.json
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/HITESH-235/ai-study-companion.git
cd ai-study-companion
```

---

## 🔧 Backend Setup (Flask)

### Navigate to backend

```
cd backend
```

### Create virtual environment

```
python -m venv venv
source venv/bin/activate   # Linux / Mac
venv\Scripts\activate      # Windows
```

### Install dependencies

```
pip install -r requirements.txt
```

### Add environment variable

Create `.env` file:

```
GROQ_API_KEY=your_api_key_here
```

### Run server

```
python app.py
```

Server runs on:

```
http://localhost:5000
```

---

## 💻 Frontend Setup (React)

### Install dependencies

```
npm install
```

### Run dev server

```
npm run dev
```

App runs on:

```
http://localhost:5173
```

---

## 🌐 Environment Configuration

Use environment variables for API URL:

### `.env.development`

```
VITE_API_URL=http://localhost:5000
```

### `.env.production`

```
VITE_API_URL=https://your-backend-url
```

---

## 📡 API Endpoint

### POST `/ai`

**Request:**

```json
{
  "topic": "Binary Trees"
}
```

**Response:**

```json
{
  "response": "Structured explanation..."
}
```

---

## 🚀 Deployment

### Backend (Railway)

* Connect GitHub repo
* Add environment variable:

  * `GROQ_API_KEY`
* Ensure:

  * `requirements.txt`
  * `Procfile`

---

### Frontend (Vercel)

* Import GitHub repo
* Deploy automatically

---

## ⚠️ Important Notes

* CORS must allow frontend domain
* Do not expose API keys in frontend
* Use environment variables for configuration

---

## 🔮 Future Improvements

* Chat-based interface
* Streaming responses
* User authentication
* Save study history
* Dark/light theme toggle

---

## 📸 Screenshots

*Add screenshots here*

---

## 📄 License

This project is for educational purposes.

---

## 🙌 Acknowledgements

* Groq API for LLM inference
* React & Flask communities

---

## 👤 Author

Hitesh Sinha / HIT_235

---
