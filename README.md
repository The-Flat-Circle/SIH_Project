# 🛕 YATRAFLOW — Smart Tourism Flow & Crowd Optimization Engine (SIH 2026)

> **AI-Powered Adaptive Crowd Management, Real-Time Video Perception & Dual-Redistribution System for High-Density Pilgrimage Destinations**  
> 🌐 **Live Web Platform**: [yatraaflow.vercel.app](https://yatraaflow.vercel.app)  
> 🏆 **Smart India Hackathon 2026** — Team: **The Flat Circle**  
> 🚩 **Flagship Pilot Destination**: Shree Jagannath Temple, Puri, Odisha (Expanding to 6 Major Pilgrimage Circuits)

---

![Next.js 14](https://img.shields.io/badge/Frontend-Next.js%2014-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Three.js](https://img.shields.io/badge/3D%20Engine-Three.js%20%2F%20R3F-black?style=for-the-badge&logo=three.js)
![YOLOv8](https://img.shields.io/badge/AI%20Vision-YOLOv8%20%2B%20ByteTrack-FF6F00?style=for-the-badge&logo=opencv)
![TensorFlow.js](https://img.shields.io/badge/Neural%20Inference-TensorFlow.js-FF6F00?style=for-the-badge&logo=tensorflow)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI%20%2B%20Python-009688?style=for-the-badge&logo=fastapi)
![Supabase](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)
![Vercel](https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel)

---

## 📌 Executive Summary

Major pilgrimage destinations across India (such as **Puri Shree Mandira**, **Mata Vaishno Devi**, **Tirupati Balaji**, **Kashi Vishwanath**, **Kedarnath Dham**, and **Siddhivinayak**) face extreme seasonal crowd surges during festivals (e.g. Ratha Yatra, Navratri). Traditional static security measures lead to severe queue bottlenecks, prolonged wait times (up to 4+ hours), and dangerous stampede risks.

**YATRAFLOW** delivers an end-to-end, proactive crowd intelligence ecosystem that:
1. **Perceives** live pilgrim headcount & movement velocity in real time via CCTV stream computer vision.
2. **Forecasts** crowd surge risk 15 minutes in advance using time-series AI models.
3. **Executes** a **Dual Redistribution Strategy**:
   - **Internal Rerouting**: Dynamically re-balances queue traffic from overloaded entry gates (e.g. *Singhadwara*) to under-utilized gates (e.g. *Ashwadwara*), reducing wait times from **55 mins to 8 mins**.
   - **External Redistribution**: Promotes off-peak regional heritage circuits (e.g. *Konark Sun Temple*, *Raghurajpur Craft Village*) and issues digital **Fast-Track Return Passes**.

---

## 🌟 Key Platform Modules & Technical Features

### 1. 🏰 Interactive 3D Digital Twin System
- Built with **React Three Fiber (R3F)** and **Three.js**.
- Features 6 authentic 3D architectural models:
  - **Puri Shree Mandira**: Kalinga *Rekha Deula* spire, *Jagamohana* hall, *Aruna Stambha*, *Neelachakra* blue wheel, *Patitapabana* flag, and *Meghanada Pacheri* fortress wall.
  - **Mata Vaishno Devi**: Trikuta Mountain Cave Shrine, Holy Bhawan Sanctum, 3 glowing Pindis, and moving *Bhairon Temple Ropeway Cable Car*.
  - **Tirupati Balaji**: Dravidian *Ananda Nilayam* 24k gold-plated spire & *Swamy Pushkarini Tank*.
  - **Kashi Vishwanath**: Twin 15.5m gold spires & Ganges riverfront stone ghat steps with glowing oil diyas.
  - **Kedarnath Dham**: Heavy Himalayan stone sanctum with snow-capped Kedar massif peaks.
  - **Siddhivinayak Mumbai**: 12-foot central golden main dome surrounded by 6 kalasa domes.
- Includes **Live Telemetry Hotspots** displaying real-time pilgrim headcount, capacity status (`NORMAL`, `HIGH`, `CRITICAL`), and wait times.

### 2. 👁️ Real-Time Neural Video Perception Engine (`/live-routing`)
- **Neural Person Detection**: Runs **YOLOv8** and **TensorFlow COCO-SSD** directly in the browser.
- **Visual Bounding Boxes**: Draws real-time emerald green (`#10B981`) bounding boxes around every detected pilgrim.
- **Velocity Vectors**: Calculates movement speed in m/s to separate moving crowd streams from stationary bottleneck clusters.
- **Virtual Gate Line Counter**: Tracks directional inflow/outflow line crossings live throughout any uploaded video stream.

### 3. 📊 Predictive Analytics & Rerouting Engine
- **Prophet Time-Series AI**: Trained on historical festival attendance, traffic, and weather data to predict 15-minute crowd surge curves.
- **Automatic Reroute Trigger**: Triggers internal gate re-balancing when primary gate capacity exceeds **75%**.

### 4. 🔒 Dual-Trust OAuth Authentication (`/login`)
- Integrated with **Supabase OAuth 2.0 (Google)**.
- **Tourist Access**: Allows any Gmail user to sign in, view live wait times, and request Fast-Track Passes.
- **Control Room Admin Access**: Restricted to authorized administration emails (e.g. `2405872@kiit.ac.in`) with access to the **Admin Control Panel** (`/admin`) for manual gate overrides.

---

## 🏗️ Repository Architecture

```text
SIH_Project /
├── 🎨 frontend/                # Next.js 14 Web Application
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Main Public Landing Page
│   │   ├── live-routing/       # Real-Time Video Person Detector & Rerouting Engine
│   │   ├── admin/              # Control Room Admin Dashboard
│   │   └── login/              # Dual-Trust Auth Gateway
│   ├── components/             # Reusable UI & 3D Components
│   │   ├── 3d/                 # 3D Digital Twin Architecture (TempleDigitalTwin.tsx)
│   │   ├── Navbar.tsx          # Navigation Header & Auth State Badge
│   │   ├── HeroSection.tsx     # Hero Banner & Destination Selector Pills
│   │   └── AuthModal.tsx       # Live Video Demo Stream Modal
│   ├── lib/                    # Supabase Client & Auth Helpers
│   └── public/                 # Compressed Web-Optimized Media Assets
│
├── ⚙️ backend/                 # FastAPI Microservice Gateway
│   ├── main.py                 # REST Endpoints & Real-Time Telemetry Ingestion
│   ├── database_schema.sql     # Supabase PostgreSQL Migrations & Tables
│   └── requirements.txt
│
├── 👁️ computer_vision/         # CCTV Processing Pipeline
│   ├── main_cv_stream.py       # YOLOv8 Object Detection & ByteTrack Tracker
│   └── requirements.txt
│
├── 📊 data_analytics/          # Surge Prediction & Decision Module
│   ├── prediction_engine.py    # Prophet 15-min Surge Forecast & Risk Scoring
│   └── requirements.txt
│
└── 📄 SIH_2026_Technical_Approach_Presentation_Script.md  # Timed Pitch Presentation Script
```

---

## ⚡ Quickstart & Installation Guide

### Prerequisites
- Node.js `v18.x` or higher
- Python `3.10` or higher
- Git

### 1. Frontend Setup (Next.js 14)
```bash
# Navigate to frontend folder
cd frontend

# Install Node dependencies
npm install

# Start local dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build
```

### 2. Backend Setup (FastAPI Gateway)
```bash
# Navigate to backend folder
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start FastAPI server (http://localhost:8000)
uvicorn main:app --reload --port 8000
```

### 3. Computer Vision Setup (YOLOv8 + ByteTrack)
```bash
# Navigate to computer_vision folder
cd computer_vision

# Install CV dependencies
pip install -r requirements.txt

# Run live video perception stream
python main_cv_stream.py
```

### 4. Data Analytics Setup (Prophet Engine)
```bash
# Navigate to data_analytics folder
cd data_analytics

# Install Analytics dependencies
pip install -r requirements.txt

# Run 15-minute surge prediction model
python prediction_engine.py
```

---

## 👥 SIH 2026 Team Roster — *The Flat Circle*

| Member Name | Role & Responsibility | Presentation Topic |
| :--- | :--- | :--- |
| **Abinash** | Computer Vision / Perception | CCTV Ingestion, YOLOv8 Detection & Resolution Scaling |
| **Soumyashree** | Computer Vision / Analytics | ByteTrack Multi-Object Tracking & Line Crossing Counter |
| **Soumyadeep** | Computer Vision / UI | Polygon Zone Density, Flow Velocity Vectors (m/s) & JSON Handoff |
| **Akash** | Data Analytics / AI Engine | Prophet 15-min Surge Forecast & Dual Rerouting Strategy |
| **Debayan** | Frontend Architecture / Deployment | Next.js 14 Web Platform, 3D Digital Twins & Admin Control Room |
| **Aditya** | Research & Presentation | Domain Research, Solution Pitch & Slide Presentation |

---

## 📄 License & Acknowledgments

Developed for **Smart India Hackathon (SIH) 2026** by team **The Flat Circle**.  
Special thanks to the Ministry of Tourism & Culture, Odisha Tourism, and temple administration authorities for domain context research.
