# YATRAFLOW — Smart Tourism Flow & Crowd Optimization Engine (SIH 2026)

**Adaptive Crowd Management & Visitor Flow Optimization for Tourist and Pilgrimage Destinations**  
*Flagship Pilot Destination*: Shree Jagannath Temple, Puri, Odisha  

---

## 🏛️ Monorepo Domain Module Architecture

```text
SIH_Project /
├── 🎨 frontend/                # Next.js 14 + R3F 3D Digital Twin + Tailwind CSS
│   ├── app/                    # Next.js App Router (Landing Page, /login, /admin)
│   ├── components/             # 3D Gopuram Model, Dual Flow Rerouting, Dashboards
│   ├── lib/                    # Supabase Client & Google Auth Helpers
│   └── public/                 # Authentic Jagannath Puri Temple Imagery
│
├── ⚙️ backend/                 # FastAPI REST Gateway & Supabase Integration
│   ├── main.py                 # FastAPI Application & Ingestion Routers
│   ├── database_schema.sql     # Supabase PostgreSQL Migrations & Tables
│   └── requirements.txt
│
├── 👁️ computer_vision/         # CCTV Stream Processing Pipeline
│   ├── main_cv_stream.py       # YOLOv8 Person Detection & ByteTrack Tracker
│   └── requirements.txt
│
├── 📊 data_analytics/          # Prediction & Recommendation Engine
│   ├── prediction_engine.py    # Prophet 15-min Surge Forecast & Risk Scoring
│   └── requirements.txt
│
└── 📄 API_DOCUMENTATION.md     # Full System API & JSON Payload Contracts
```

---

## 🚀 Module Execution Quickstart

### 1. Frontend (Next.js 14)
```bash
cd frontend
npm install
npm run dev
```

### 2. Backend (FastAPI Gateway)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 3. Computer Vision Pipeline (YOLOv8 + ByteTrack)
```bash
cd computer_vision
pip install -r requirements.txt
python main_cv_stream.py
```

### 4. Data Analytics Engine (Prophet + Risk Assessment)
```bash
cd data_analytics
pip install -r requirements.txt
python prediction_engine.py
```

---

## 👥 SIH 2026 Team Roster
- **Soumyashree**: Research & Tourism Analysis / CV
- **Aditya**: Research & Presentation / Pitch
- **Abinash**: Computer Vision / Analytics
- **Soumyadeep**: Computer Vision / Frontend UI
- **Akashdeepti**: Prediction & Analytics / Backend
- **Debayan**: Backend Integration / Deployment
