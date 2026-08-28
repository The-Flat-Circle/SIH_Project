import unittest
import numpy as np
from cv.detector import PersonDetector


class TestPersonDetector(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.detector = PersonDetector(model_path="yolov8n.pt", conf=0.25, device="cpu")

    def test_detector_initialization(self):
        self.assertEqual(self.detector.conf, 0.25)
        self.assertEqual(self.detector.device, "cpu")
        self.assertEqual(self.detector.target_classes, [0])

    def test_detect_blank_frame(self):
        blank_frame = np.zeros((480, 640, 3), dtype=np.uint8)
        detections = self.detector.detect(blank_frame)
        self.assertIsInstance(detections, list)

    def test_detection_format_structure(self):
        # Create a frame with some content
        frame = np.full((480, 640, 3), 200, dtype=np.uint8)
        detections = self.detector.detect(frame)
        self.assertIsInstance(detections, list)
        
        for det in detections:
            self.assertIn("bbox", det)
            self.assertIn("confidence", det)
            self.assertIn("class_id", det)
            self.assertEqual(len(det["bbox"]), 4)
            self.assertEqual(det["class_id"], 0)
            self.assertIsInstance(det["confidence"], float)


if __name__ == "__main__":
    unittest.main()

