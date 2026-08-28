import unittest
import numpy as np
from cv.tracker import PersonTracker


class TestPersonTracker(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.tracker = PersonTracker(model_path="yolov8n.pt", conf=0.25, device="cpu", tracker_config="bytetrack.yaml")

    def test_tracker_initialization(self):
        self.assertEqual(self.tracker.conf, 0.25)
        self.assertEqual(self.tracker.device, "cpu")
        self.assertEqual(self.tracker.tracker_config, "bytetrack.yaml")
        self.assertEqual(self.tracker.target_classes, [0])

    def test_update_blank_frame(self):
        blank_frame = np.zeros((480, 640, 3), dtype=np.uint8)
        tracks = self.tracker.update(blank_frame)
        self.assertIsInstance(tracks, list)

    def test_track_output_structure(self):
        # Create dummy frame
        frame = np.full((480, 640, 3), 200, dtype=np.uint8)
        tracks = self.tracker.update(frame)
        self.assertIsInstance(tracks, list)

        for track in tracks:
            self.assertIn("track_id", track)
            self.assertIn("bbox", track)
            self.assertIn("confidence", track)
            self.assertIn("center", track)
            self.assertIsInstance(track["track_id"], int)
            self.assertEqual(len(track["bbox"]), 4)
            self.assertEqual(len(track["center"]), 2)
            self.assertIsInstance(track["confidence"], float)

    def test_tracker_reset(self):
        # Verify reset completes without error
        try:
            self.tracker.reset()
            success = True
        except Exception as e:
            success = False
        self.assertTrue(success)


if __name__ == "__main__":
    unittest.main()

