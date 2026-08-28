import os
import sys
sys.path.insert(0, os.path.abspath("."))
import cv2
import yaml
from cv import PersonTracker, CrowdCounter, DensityEstimator, FlowAnalyzer, Visualizer

def preview_geometry(video_path="data/videos/real_crowd_test.mp4", config_path="config/config.yaml"):
    with open(config_path, "r") as f:
        config = yaml.safe_load(f)

    tracker = PersonTracker(model_path="yolov8n.pt", conf=0.25, device="cpu")
    counter = CrowdCounter(
        line_position=config.get("counting_line", {}).get("position", 240),
        orientation=config.get("counting_line", {}).get("orientation", "horizontal")
    )
    density = DensityEstimator(zones=config.get("zones", []))
    flow = FlowAnalyzer()
    visualizer = Visualizer()

    cap = cv2.VideoCapture(video_path)
    for frame_idx in range(60):
        ret, frame = cap.read()
        if not ret:
            break
        tracks = tracker.update(frame)
        counts = counter.update(tracks)
        density_res = density.update(tracks)
        flow_res = flow.update(tracks)

        if frame_idx == 45:
            annotated = visualizer.draw_tracks(
                frame, tracks, counts=counts, density_results=density_res, flow_results=flow_res, line_position=counter.line_position
            )
            cv2.imwrite("data/images/preview_768x432.jpg", annotated)
            print("Saved preview to 'data/images/preview_768x432.jpg'")

    cap.release()

if __name__ == "__main__":
    preview_geometry()

