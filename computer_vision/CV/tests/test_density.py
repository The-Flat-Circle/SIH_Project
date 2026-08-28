import unittest
from cv.density import DensityEstimator


class TestDensityEstimator(unittest.TestCase):
    def setUp(self):
        self.sample_zones = [
            {
                "id": "zone_1",
                "name": "Main Entrance",
                "polygon": [[100, 100], [300, 100], [300, 300], [100, 300]],
                "area_m2": 100.0,
                "thresholds": {"low": 0.05, "medium": 0.10, "high": 0.20, "critical": 0.30}
            },
            {
                "id": "zone_2",
                "name": "Sanctum Queue",
                "polygon": [[400, 100], [600, 100], [600, 300], [400, 300]],
                "area_m2": 200.0,
                "thresholds": {"low": 0.05, "medium": 0.10, "high": 0.20, "critical": 0.30}
            }
        ]
        self.estimator = DensityEstimator(zones=self.sample_zones, camera_id="cam_01")

    def test_1_no_people_inside_zone(self):
        """TEST 1: No people inside a zone. Expected: count=0, density=0, level=LOW."""
        results = self.estimator.update([])
        z1 = results[0]
        self.assertEqual(z1["people_count"], 0)
        self.assertEqual(z1["density_people_per_m2"], 0.0)
        self.assertEqual(z1["level"], "LOW")

    def test_2_one_person_inside_zone(self):
        """TEST 2: One person inside a zone. Expected: count=1."""
        tracks = [{"track_id": 1, "center": [200, 200]}]  # Inside zone 1
        results = self.estimator.update(tracks)
        self.assertEqual(results[0]["people_count"], 1)
        self.assertEqual(results[1]["people_count"], 0)

    def test_3_multiple_people_inside_zone(self):
        """TEST 3: Multiple people inside a zone. Expected: exact count."""
        tracks = [
            {"track_id": 1, "center": [150, 150]},
            {"track_id": 2, "center": [200, 200]},
            {"track_id": 3, "center": [250, 250]}
        ]
        results = self.estimator.update(tracks)
        self.assertEqual(results[0]["people_count"], 3)

    def test_4_people_outside_zone(self):
        """TEST 4: People outside the zone must NOT be counted."""
        tracks = [{"track_id": 1, "center": [50, 50]}]  # Outside both zones
        results = self.estimator.update(tracks)
        self.assertEqual(results[0]["people_count"], 0)
        self.assertEqual(results[1]["people_count"], 0)

    def test_5_person_on_boundary(self):
        """TEST 5: Person on boundary of polygon is counted (cv2.pointPolygonTest >= 0)."""
        tracks = [{"track_id": 1, "center": [100, 100]}]  # Polygon vertex/edge
        results = self.estimator.update(tracks)
        self.assertEqual(results[0]["people_count"], 1)

    def test_6_track_id_deduplication(self):
        """TEST 6: Same track ID appearing multiple times in input must NOT be counted twice."""
        tracks = [
            {"track_id": 1, "center": [150, 150]},
            {"track_id": 1, "center": [160, 160]}  # Duplicate track ID
        ]
        results = self.estimator.update(tracks)
        self.assertEqual(results[0]["people_count"], 1)

    def test_7_multi_zone_isolation(self):
        """TEST 7: Person inside zone 1 but outside zone 2 contributes only to zone 1."""
        tracks = [{"track_id": 1, "center": [200, 200]}]  # Inside zone 1 only
        results = self.estimator.update(tracks)
        self.assertEqual(results[0]["people_count"], 1)
        self.assertEqual(results[1]["people_count"], 0)

    def test_8_density_calculation_math(self):
        """TEST 8: Density calculation math: 10 people in 100 m^2 = 0.10 p/m^2."""
        tracks = [{"track_id": i, "center": [200, 200]} for i in range(10)]
        results = self.estimator.update(tracks)
        z1 = results[0]
        self.assertEqual(z1["people_count"], 10)
        self.assertEqual(z1["density_people_per_m2"], 0.10)

    def test_9_level_threshold_classification(self):
        """TEST 9: Density level threshold classification (LOW, MEDIUM, HIGH, CRITICAL)."""
        thresholds = {"low": 0.05, "medium": 0.10, "high": 0.20, "critical": 0.30}

        self.assertEqual(self.estimator.classify_level(0.02, thresholds), "LOW")
        self.assertEqual(self.estimator.classify_level(0.06, thresholds), "LOW")
        self.assertEqual(self.estimator.classify_level(0.12, thresholds), "MEDIUM")
        self.assertEqual(self.estimator.classify_level(0.22, thresholds), "HIGH")
        self.assertEqual(self.estimator.classify_level(0.35, thresholds), "CRITICAL")

        self.estimator.update([])
        # Data handoff payload schema test
        handoff = self.estimator.get_data_handoff()
        self.assertIn("timestamp", handoff)
        self.assertEqual(handoff["camera_id"], "cam_01")
        self.assertEqual(len(handoff["zones"]), 2)


if __name__ == "__main__":
    unittest.main()
