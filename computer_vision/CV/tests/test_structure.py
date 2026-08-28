import unittest
import yaml
from cv import PersonDetector, PersonTracker, CrowdCounter, DensityEstimator, Visualizer

class TestProjectStructure(unittest.TestCase):
    def test_imports(self):
        detector = PersonDetector()
        tracker = PersonTracker()
        counter = CrowdCounter()
        density = DensityEstimator()
        visualizer = Visualizer()
        self.assertIsNotNone(detector)
        self.assertIsNotNone(tracker)
        self.assertIsNotNone(counter)
        self.assertIsNotNone(density)
        self.assertIsNotNone(visualizer)

    def test_config_loading(self):
        with open("config/config.yaml", "r") as f:
            config = yaml.safe_load(f)
        self.assertEqual(config.get("project", {}).get("name"), "SIH-Crowd-Management")

if __name__ == "__main__":
    unittest.main()

