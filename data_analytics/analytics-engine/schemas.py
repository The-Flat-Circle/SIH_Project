"""
schemas.py

Central contract definitions for the Analytics & Recommendation Engine.

DO NOT change field names without informing the entire team.
All modules must conform to these schemas.
"""

# ==========================================================
# INPUT SCHEMA (From Computer Vision Team)
# ==========================================================

INPUT_SCHEMA = {
    "timestamp": str,
    "crowd_number": int,
    "gate_no": str,
    "density": str
}


# ==========================================================
# CAPACITY MODEL OUTPUT
# capacity.py
# ==========================================================

CAPACITY_OUTPUT = {
    "capacity_utilization": float
}


# ==========================================================
# RISK ASSESSMENT OUTPUT
# risk.py
# ==========================================================

RISK_OUTPUT = {
    "level": str,          # Low / Moderate / High / Critical
    "score": int
}


# ==========================================================
# REAL-TIME ANALYSIS OUTPUT
# realtime.py
# ==========================================================

REALTIME_OUTPUT = {
    "current_crowd": int,
    "current_risk": str,
    "trend": str           # Increasing / Stable / Decreasing
}


# ==========================================================
# CONGESTION PREDICTION OUTPUT
# prediction.py
# ==========================================================

PREDICTION_OUTPUT = {
    "predicted_crowd": int,
    "prediction_window": str,
    "congestion_probability": float
}


# ==========================================================
# ALERT OUTPUT
# alerts.py
# ==========================================================

ALERT_SCHEMA = {
    "severity": str,
    "zone": str,
    "message": str
}

ALERT_OUTPUT = [
    ALERT_SCHEMA
]


# ==========================================================
# INTERNAL REROUTING OUTPUT
# rerouting.py
# ==========================================================

REROUTING_OUTPUT = {
    "recommended_gate": str,
    "crowd_count": int,
    "occupancy": float
}


# ==========================================================
# TOURISM REDISTRIBUTION OUTPUT
# recommendation.py
# ==========================================================

HERITAGE_SITE_SCHEMA = {
    "name": str,
    "distance": str,
    "crowd_level": str
}

FOOD_SCHEMA = {
    "name": str,
    "distance": str
}

CULTURE_SCHEMA = {
    "name": str,
    "distance": str
}

RECOMMENDATION_OUTPUT = {
    "heritage_sites": [
        HERITAGE_SITE_SCHEMA
    ],
    "food": [
        FOOD_SCHEMA
    ],
    "culture": [
        CULTURE_SCHEMA
    ]
}


# ==========================================================
# FINAL ANALYTICS OUTPUT SCHEMA
# main.py
# ==========================================================

FINAL_OUTPUT = {
    "zone": str,

    "capacity_utilization": float,

    "risk": {
        "level": str,
        "score": int
    },

    "predicted_crowd": int,
    "prediction_window": str,
    "congestion_probability": float,

    "alerts": [
        ALERT_SCHEMA
    ],

    "internal_rerouting": {
        "recommended_gate": str,
        "crowd_count": int,
        "occupancy": float
    },

    "external_recommendations": {
        "heritage_sites": [],
        "food": [],
        "culture": []
    },

    "recommended_visit_time": str,
    "recommended_action": str
}