from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

app = FastAPI(
    title="YatraFlow Backend Gateway API",
    version="1.0.0",
    description="Central Integration Layer for YOLOv8 Computer Vision Pipeline, Prophet Analytics, Supabase, and Live Dashboards (SIH 2026)"
)

# Enable CORS for Next.js Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Data Handoff Schemas (Matched with computer_vision/CV/main.py) ---
class GateCounts(BaseModel):
    in_count: int = Field(ge=0)
    out_count: int = Field(ge=0)
    current_count: int = Field(ge=0)

class FlowMetrics(BaseModel):
    total_tracked: Optional[int] = 0
    moving_people: int = Field(ge=0)
    stationary_people: int = Field(ge=0)
    average_speed_px_per_sec: float

class CVPipelineHandoff(BaseModel):
    timestamp: str
    camera_id: str
    gate_counts: GateCounts
    zones: Optional[Dict[str, Any]] = None
    flow: FlowMetrics

class LiveReroutingRequest(BaseModel):
    target_gate: str
    override_mode: bool = True

# --- In-Memory Real-Time State ---
system_state = {
    "gates": {
        "Gate_A": {"name": "Singhadwara (Lion Gate)", "count": 340, "max_cap": 360, "status": "CRITICAL", "utilization": 94.4},
        "Gate_B": {"name": "Ashwadwara (Horse Gate)", "count": 65, "max_cap": 300, "status": "NORMAL", "utilization": 21.6},
        "Gate_C": {"name": "Vyaghradwara (Tiger Gate)", "count": 140, "max_cap": 250, "status": "NORMAL", "utilization": 56.0},
        "Gate_D": {"name": "Hastidwara (Elephant Gate)", "count": 88, "max_cap": 250, "status": "NORMAL", "utilization": 35.2},
    },
    "recommended_gate": "Gate_B",
    "manual_override": False,
    "last_cv_update": None
}

# --- API Endpoints ---
@app.get("/")
def read_root():
    return {"status": "online", "system": "YatraFlow Central Gateway", "version": "1.0.0"}

@app.post("/api/v1/cv-data", status_code=201)
async def receive_cv_data(payload: CVPipelineHandoff):
    """Receive live person counts, gate flows & movement metrics from CV module (YOLOv8 + ByteTrack)"""
    system_state["last_cv_update"] = payload.model_dump()
    
    # Update gate counts dynamically
    cam_id = payload.camera_id
    current_count = payload.gate_counts.current_count
    
    if cam_id in ["CAM_01", "camera_01"]:
        gate = system_state["gates"]["Gate_A"]
        gate["count"] = current_count
        gate["utilization"] = round((current_count / gate["max_cap"]) * 100, 1)
        gate["status"] = "CRITICAL" if gate["utilization"] >= 90 else "HIGH" if gate["utilization"] >= 75 else "NORMAL"

    # Evaluate Live Rerouting Logic
    if system_state["gates"]["Gate_A"]["utilization"] >= 75 and not system_state["manual_override"]:
        system_state["recommended_gate"] = "Gate_B"

    return {
        "status": "success",
        "ingested_camera": payload.camera_id,
        "processed_count": current_count,
        "recommended_reroute": system_state["recommended_gate"]
    }

@app.get("/api/v1/live-routing")
async def get_live_routing():
    """Serve real-time gate load balancing & external tourism circuit recommendations"""
    gate_a = system_state["gates"]["Gate_A"]
    is_congested = gate_a["utilization"] >= 75 or system_state["manual_override"]
    
    return {
        "destination_id": "puri_shree_mandira",
        "congested_gate": "Gate_A",
        "congestion_status": gate_a["status"],
        "recommended_gate": system_state["recommended_gate"],
        "is_rerouting_active": is_congested,
        "internal_rerouting": {
            "target_gate": system_state["recommended_gate"],
            "target_gate_name": "Ashwadwara (Horse Gate)",
            "estimated_wait_time": "8 mins vs 55 mins"
        },
        "external_redistribution": {
            "heritage_circuits": [
                {"name": "Konark Sun Temple", "distance": "35 km", "crowd_level": "LOW", "travel_time": "45 mins"},
                {"name": "Raghurajpur Heritage Crafts Village", "distance": "12 km", "crowd_level": "LOW", "travel_time": "20 mins"},
                {"name": "Narendra Sacred Tank", "distance": "2 km", "crowd_level": "LOW", "travel_time": "5 mins"},
                {"name": "Blue Flag Beach", "distance": "4 km", "crowd_level": "MODERATE", "travel_time": "10 mins"}
            ]
        }
    }

@app.post("/api/v1/manual-override")
async def trigger_manual_override(req: LiveReroutingRequest):
    """Allow control room admins to manually trigger gate lock & live rerouting"""
    system_state["manual_override"] = req.override_mode
    system_state["recommended_gate"] = req.target_gate
    return {
        "status": "success",
        "manual_override": system_state["manual_override"],
        "enforced_gate": system_state["recommended_gate"]
    }
