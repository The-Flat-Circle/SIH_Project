"""
Person Tracker Module.
Provides ByteTrack multi-object tracking functionality integrated with YOLOv8.
"""

from typing import List, Dict, Any, Union
import numpy as np
import torch
from ultralytics import YOLO


class PersonTracker:
    def __init__(
        self,
        model_path: str = "yolov8n.pt",
        conf: float = 0.35,
        device: str = "cpu",
        tracker_config: str = "bytetrack.yaml",
        target_classes: Union[List[int], None] = None
    ):
        """
        Initialize the ByteTrack Person Tracker.

        :param model_path: Path or name of YOLO model (e.g., 'yolov8n.pt')
        :param conf: Minimum confidence threshold
        :param device: Computing device ('cpu', 'cuda', or 'auto')
        :param tracker_config: Tracking configuration file (e.g., 'bytetrack.yaml')
        :param target_classes: List of class indices to track (default [0] for person)
        """
        self.model_path = model_path
        self.conf = conf
        self.tracker_config = tracker_config
        self.target_classes = target_classes if target_classes is not None else [0]

        # Resolve compute device
        if device == "auto":
            self.device = "cuda" if torch.cuda.is_available() else "cpu"
        else:
            self.device = device

        print(f"[PersonTracker] Initializing ByteTrack with model '{self.model_path}' on device '{self.device}'...")
        self.model = YOLO(self.model_path)

    def update(self, frame: np.ndarray) -> List[Dict[str, Any]]:
        """
        Update tracker with current video frame.

        :param frame: BGR image frame as numpy array
        :return: List of active track dicts with format:
                 [
                     {
                         "track_id": int,            # Persistent tracking ID
                         "bbox": [x1, y1, x2, y2],  # Bounding box coordinates
                         "confidence": float,        # Detection confidence
                         "center": [cx, cy]          # Centroid coordinates
                     },
                     ...
                 ]
        """
        if frame is None or frame.size == 0:
            return []

        results = self.model.track(
            source=frame,
            persist=True,
            tracker=self.tracker_config,
            conf=self.conf,
            classes=self.target_classes,
            device=self.device,
            verbose=False
        )

        tracks = []
        if len(results) > 0 and results[0].boxes is not None:
            boxes = results[0].boxes
            has_ids = boxes.id is not None

            for i, box in enumerate(boxes):
                xyxy = box.xyxy[0].cpu().numpy()
                x1, y1, x2, y2 = [round(float(coord), 2) for coord in xyxy]
                cx = round((x1 + x2) / 2.0, 2)
                cy = round((y1 + y2) / 2.0, 2)
                conf_val = round(float(box.conf[0].cpu().numpy()), 4)

                track_id = int(boxes.id[i].cpu().numpy()) if has_ids else None

                if track_id is not None:
                    tracks.append({
                        "track_id": track_id,
                        "bbox": [x1, y1, x2, y2],
                        "confidence": conf_val,
                        "center": [cx, cy]
                    })

        return tracks

    def reset(self):
        """
        Reset persistent tracker state.
        """
        if hasattr(self.model, "predictor") and self.model.predictor is not None:
            if hasattr(self.model.predictor, "trackers") and self.model.predictor.trackers:
                for tracker in self.model.predictor.trackers:
                    if hasattr(tracker, "reset"):
                        tracker.reset()
