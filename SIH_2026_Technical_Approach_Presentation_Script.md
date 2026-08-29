# 🎤 SIH 2026 Technical Approach Presentation Script
**Team Name**: The Flat Circle  
**Slide 3**: Technical Approach & AI Architecture  
**Total Target Time**: ~3 Minutes 30 Seconds  

---

## 📸 COMPUTER VISION (CV) TEAM — [Total: ~2 Minutes]

### 1️⃣ Abinash — CV Perception & Detection (~40 Seconds)

> **"Respected Judges, starting with our Perception Layer:**  
> Our system ingests multi-source video feeds from live temple CCTV camera nodes. We deploy a lightweight, high-throughput **YOLOv8** model optimized for real-time human detection. 
> 
> To ensure seamless performance across different camera hardware, we implemented **Resolution-Independent Geometry Scaling**. This dynamically scales virtual gate counting lines and polygon zone contours matching any stream resolution without manual re-calibration. YOLOv8 isolates person class detections with confidence thresholds above 35%, generating raw bounding boxes even under dense crowd illumination."

---

### 2️⃣ Soumyashree — CV Multi-Object Tracking & Counting (~40 Seconds)

> **"Building on live perception:**  
> We integrate **ByteTrack** for robust multi-object tracking. ByteTrack assigns persistent, unique ID tags to every pilgrim in the frame, maintaining track continuity even when visitors temporarily occlude each other in dense queues. 
> 
> Across these tracked IDs, our **Virtual Gate Line-Crossing Counter** calculates directional inflow and outflow rates in real time. This converts raw video pixels into structured headcount metrics, logging exactly how many pilgrims enter and exit each specific gate every minute."

---

### 3️⃣ Soumyadeep — CV Zone Density & Flow Metrics (~40 Seconds)

> **"Completing our Computer Vision Pipeline:**  
> Our **Density Estimator** maps polygon zones over critical bottleneck areas like the Sanctum Corridor or Holding Areas to calculate zone occupancy index. 
> 
> Simultaneously, our **Flow Analyzer** tracks displacement vectors to measure crowd velocity in meters per second—differentiating moving pilgrims from stationary crowds to detect stampede risk early. All these metrics are packaged into a lightweight, real-time JSON handoff payload and streamed directly to our FastAPI backend gateway."

---

## 📊 DATA ANALYTICS TEAM — [Total: 1 Minute]

### 4️⃣ Akash — Predictive Forecasting & Intelligence Engine (1 Minute)

> **"Once the backend receives real-time CV telemetry, our Analytics & Decision Engine takes over:**  
> We utilize a **Prophet time-series prediction model** trained on historical temple festival attendance, weather, and traffic data to forecast crowd surge probability **15 minutes in advance**.
> 
> When our risk-scoring algorithm detects that **Gate A (Singhadwara)** will hit 94% critical capacity, it triggers our **Proactive Dual Redistribution Strategy**:
> 
> 1. **Internal Rerouting**: It automatically redirects 65% of incoming queue traffic to under-utilized gates like **Gate B (Ashwadwara)**, reducing wait times from 55 minutes to just 8 minutes.
> 2. **External Redistribution**: For regional crowd control, it suggests nearby off-peak heritage circuits—such as **Konark Sun Temple** (35 km) or **Raghurajpur Craft Village** (12 km)—and issues digital **Fast-Track Return Passes** for later off-peak time slots, smoothing the peak load across the entire city."

---

## 💻 FRONTEND & PLATFORM — [Total: 30 Seconds]

### 5️⃣ Debayan — 3D Digital Twin & Admin Control Room (30 Seconds)

> **"Finally, bringing everything together into an intuitive user interface:**  
> We built a production **Next.js 14 Web Application** featuring **Interactive 3D Digital Twins** for 6 major pilgrimage destinations—including Puri Shree Mandira and Mata Vaishno Devi. 
> 
> Operators access a secured **Admin Control Room** with live CCTV feeds, manual gate lock override controls, and WebSocket telemetry logs. Meanwhile, tourists can directly view real-time gate wait times and claim digital **Fast-Track QR Code Passes** directly on their smartphones without needing complex apps!"

---

## 📌 Summary Quick-Reference Card

| Speaker | Topic | Key Technical Keywords | Time |
| :--- | :--- | :--- | :--- |
| **Abinash** | CV Detection & Geometry | CCTV Ingestion, YOLOv8, Resolution Scaling | 40s |
| **Soumyashree** | CV Tracking & Gate Counts | ByteTrack, Occlusion IDs, Virtual Gate Line Counter | 40s |
| **Soumyadeep** | CV Density & Flow Metrics | Polygon Zones, Velocity Vectors (m/s), JSON Handoff | 40s |
| **Akash** | Data Analytics & Rerouting | Prophet 15-min Forecast, Dual Rerouting, Gate B & Konark Circuit | 60s |
| **Debayan** | Frontend & Control Room | Next.js 14, 3D Digital Twins, Admin Control Room, QR Passes | 30s |
