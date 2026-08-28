from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

app = FastAPI(
    title="YatraFlow Backend Gateway API",
    version="1.0.0",
    description="Central Integration Layer for Computer Vision, Data Analytics, Supabase, and Frontend Dashboards (SIH 2026)"
)

# Enable CORS for Next.js Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Data Models ---
class CVDataInput(BaseModel):
    timestamp: datetime
    camera_id: str
    gate_no: str
    crowd_number: int = Field(ge=0)
    density: str = Field(pattern="^(low|moderate|high|critical)$")
    confidence: float

class RiskScore(BaseModel):
    level: str
    score: int

class InternalRerouting(BaseModel):
    recommended_gate: str
    crowd_count: int
    occupancy: int

class AnalyticsDataInput(BaseModel):
    zone: str
    capacity_utilization: float
    risk: RiskScore
    predicted_crowd: int
    prediction_window: str
    congestion_probability: int
    alerts: List[dict]
    internal_rerouting: InternalRerouting
    external_recommendations: dict
    recommended_visit_time: str
    recommended_action: str

# --- API Endpoints ---
@app.get("/")
def read_root():
    return {"status": "online", "system": "YatraFlow Central Backend Gateway", "version": "1.0.0"}

@app.post("/api/v1/cv-data", status_code=201)
async def receive_cv_data(data: CVDataInput):
    """Receive live person counts & density from Computer Vision module (YOLOv8)"""
    return {"status": "success", "ingested_gate": data.gate_no, "count": data.crowd_number}

@app.post("/api/v1/analytics-data", status_code=201)
async def receive_analytics_data(data: AnalyticsDataInput):
    """Receive predictions & rerouting options from Data Analytics engine"""
    return {"status": "success", "zone": data.zone, "action": data.recommended_action}

@app.get("/api/v1/crowd-status")
async def get_crowd_status():
    """Serve live gate status to Tourist App & Admin Dashboard"""
    return {
        "destination_id": "puri_shree_mandira",
        "recommended_gate": "Gate_B",
        "gates": [
            {"gate_id": "Gate_A", "name": "Singhadwara (Lion Gate)", "crowd_count": 340, "capacity_utilization": 94.0, "status": "CRITICAL"},
            {"gate_id": "Gate_B", "name": "Ashwadwara (Horse Gate)", "crowd_count": 65, "capacity_utilization": 25.0, "status": "NORMAL"}
        ]
    }
