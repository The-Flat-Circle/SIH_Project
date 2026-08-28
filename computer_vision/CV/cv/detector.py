"""
Person Detector Module.
Provides modular wrapper for YOLO-based person detection.
"""

from typing import List, Dict, Any, Union
import numpy as np
import torch
from ultralytics import YOLO


class PersonDetector:
    def __init__(
        self,
        model_path: str = "yolov8n.pt",
        conf: float = 0.35,
        device: str = "cpu",
        target_classes: Union[List[int], None] = None
    ):
        """
        Initialize the YOLO Person Detector.

        :param model_path: Path or name of YOLO model (e.g., 'yolov8n.pt')
        :param conf: Minimum confidence threshold
        :param device: Computing device ('cpu', 'cuda', or 'auto')
        :param target_classes: List of COCO class indices to detect (default [0] for person)
        """
        self.model_path = model_path
        self.conf = conf
        self.target_classes = target_classes if target_classes is not None else [0]
        
        # Resolve compute device
        if device == "auto":
            self.device = "cuda" if torch.cuda.is_available() else "cpu"
        else:
            self.device = device
            
        print(f"[PersonDetector] Loading YOLO model '{self.model_path}' on device '{self.device}'...")
        self.model = YOLO(self.model_path)

    def detect(self, frame: np.ndarray) -> List[Dict[str, Any]]:
        """
        Detect persons in input frame.

        :param frame: BGR image frame as numpy array
        :return: List of detection dicts with format:
                 [
                     {
                         "bbox": [x1, y1, x2, y2],  # bounding box coordinates
                         "confidence": float,        # detection confidence
                         "class_id": int             # class index (0 for person)
                     },
                     ...
                 ]
        """
        if frame is None or frame.size == 0:
            return []

        results = self.model.predict(
            source=frame,
            conf=self.conf,
            classes=self.target_classes,
            device=self.device,
            verbose=False
        )

        detections = []
        if len(results) > 0 and results[0].boxes is not None:
            boxes = results[0].boxes
            for box in boxes:
                xyxy = box.xyxy[0].cpu().numpy()
                conf_val = float(box.conf[0].cpu().numpy())
                cls_val = int(box.cls[0].cpu().numpy())

                detections.append({
                    "bbox": [round(float(coord), 2) for coord in xyxy],
                    "confidence": round(conf_val, 4),
                    "class_id": cls_val
                })

        return detections
