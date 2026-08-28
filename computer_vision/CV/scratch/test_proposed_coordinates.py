import os
import sys
sys.path.insert(0, os.path.abspath("."))
import cv2
from cv import PersonTracker, CrowdCounter, DensityEstimator, FlowAnalyzer

def test_proposed_coords():
    proposed_zones = [
        {
            "id": "zone_1",
            "name": "Main Entrance",
            "polygon": [[30, 40], [738, 40], [738, 170], [30, 170]],
            "area_m2": 500.0,
            "thresholds": {"low": 0.005, "medium": 0.010, "high": 0.020, "critical": 0.030}
        },
        {
            "id": "zone_2",
            "name": "Sanctum Queue",
            "polygon": [[30, 190], [370, 190], [370, 400], [30, 400]],
            "area_m2": 250.0,
            "thresholds": {"low": 0.005, "medium": 0.010, "high": 0.020, "critical": 0.030}
        },
        {
            "id": "zone_3",
            "name": "Exit Plaza",
            "polygon": [[390, 190], [738, 190], [738, 400], [390, 400]],
            "area_m2": 300.0,
            "thresholds": {"low": 0.005, "medium": 0.010, "high": 0.020, "critical": 0.030}
        }
    ]

    tracker = PersonTracker(model_path="yolov8n.pt", conf=0.25, device="cpu")
    counter = CrowdCounter(line_position=180, orientation="horizontal", margin=15)
    density = DensityEstimator(zones=proposed_zones)
    flow = FlowAnalyzer()

    cap = cv2.VideoCapture("data/videos/real_crowd_test.mp4")
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    for frame_idx in range(min(150, total_frames)):
        ret, frame = cap.read()
        if not ret:
            break
        tracks = tracker.update(frame)
        counts = counter.update(tracks)
        density_res = density.update(tracks)
        flow_res = flow.update(tracks)

    cap.release()

    print("\n--- Proposed Coordinates Verification Results (First 150 Frames) ---")
    print(f"Gate Counts (y=180) -> IN: {counts['in_count']}, OUT: {counts['out_count']}, CURRENT: {counts['current_count']}")
    print("Zone Occupancy:")
    for z in density_res:
        print(f"  - {z['zone_name']} ({z['zone_id']}): {z['people_count']} people | {z['density_people_per_m2']} p/m² [{z['level']}]")
    print(f"Flow Metrics -> Moving: {flow_res['moving_people']}, Stationary: {flow_res['stationary_people']}, Avg Speed: {flow_res['average_speed_px_per_sec']} px/s")

if __name__ == "__main__":
    test_proposed_coords()

