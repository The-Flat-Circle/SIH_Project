# Adaptive Crowd Management & Visitor Flow Optimization

An intelligent Computer Vision (CV) solution for real-time crowd analysis, density estimation, flow tracking, and capacity monitoring designed for tourist and pilgrimage destinations (SIH 2026).

## Project Structure

```text
SIH-Crowd-Management/
│
├── cv/
│   ├── __init__.py          # Package initialization
│   ├── detector.py          # Person detection module (YOLO)
│   ├── tracker.py           # Person tracking module (ByteTrack)
│   ├── counter.py           # Headcount & virtual gate crossing measurement
│   ├── density.py           # Spatial zone density estimation
│   └── visualization.py     # Drawing overlays & analytics UI
│
├── data/
│   ├── videos/              # Input footage storage
│   └── images/              # Input image samples
│
├── outputs/                 # Output videos and metric CSV reports
│
├── config/
│   └── config.yaml          # Pipeline configuration parameters
│
├── tests/                   # Test suite directory
│
├── main.py                  # Entry point for processing pipeline
├── requirements.txt         # Dependencies list
└── README.md                # Documentation & usage guide
```

## Setup Instructions

1. **Environment Requirements**:
   - Python 3.10+ (Recommended)
   - PyTorch, OpenCV, Ultralytics YOLO, NumPy, Pandas, PyYAML

2. **Installation**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Running the Pipeline**:
   ```bash
   python main.py
   ```

## Research Note: Detection-Based Density Estimation vs Density-Map Models

This implementation uses **Detection-Based Zone Density Estimation**. Individual persons are detected (YOLOv8) and tracked (ByteTrack), and their centroid coordinates are evaluated inside polygon boundaries using point-in-polygon tests to compute exact headcount and area-based density (`people / m²`).

### Future Research Extension (CSRNet)
In extreme crowd congestion scenarios (e.g. >10 people/m² during peak festival rushes), visual occlusion causes individual object detection bounding boxes to degrade. A planned research extension is to integrate density-map regression models such as **CSRNet** (Dilated Convolutional Neural Networks) for direct pixel-level crowd density estimation in high-density choke points, supplementing the detection-based tracking pipeline.

## Crowd Flow & Movement Metrics (Phase 5)

Phase 5 analyzes the dynamic movement behavior of tracked individuals across consecutive frames:

1. **Gate Count vs. Crowd Flow**:
   - **Gate Count (Phase 3)**: Cumulative tally of people physically crossing a fixed virtual line boundary (IN / OUT).
   - **Crowd Flow (Phase 5)**: Continuous tracking of individual speed (`px/s`), movement vectors (`UP`, `DOWN`, `LEFT`, `RIGHT`), movement state (`MOVING` vs `STATIONARY`), and instantaneous directional flow rate across the camera field-of-view.

2. **Pixel-Speed Limitation Note**:
   - Speed values are currently expressed in **pixels per second (px/s)** relative to the 2D image plane.
   - *Note*: Converting px/s to true physical speed (meters/second) requires perspective camera calibration or 2D-to-3D homography matrix transformation, which can be configured for specific camera mount angles in future deployments.

3. **Data Handoff Schema**:
   ```json
   {
     "timestamp": "2026-08-28T17:41:30.123456",
     "camera_id": "camera_01",
     "moving_people": 3,
     "stationary_people": 1,
     "average_speed_px_per_sec": 45.2,
     "direction_counts": {
       "UP": 0,
       "DOWN": 1,
       "LEFT": 1,
       "RIGHT": 1,
       "STATIONARY": 1
     },
     "flow_rate": 3.0
   }
   ```

