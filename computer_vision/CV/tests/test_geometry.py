import unittest
from cv.geometry import (
    calculate_scale_factors,
    scale_line_position,
    scale_zones,
    DEFAULT_REF_WIDTH,
    DEFAULT_REF_HEIGHT,
)


class TestGeometryScaling(unittest.TestCase):
    def setUp(self):
        self.sample_zones = [
            {
                "id": "zone_1",
                "name": "Main Entrance",
                "polygon": [[30, 40], [738, 40], [738, 170], [30, 170]],
                "area_m2": 500.0,
                "thresholds": {"low": 0.005, "medium": 0.010, "high": 0.020, "critical": 0.030}
            }
        ]

    def test_scale_factors_identity_768x432(self):
        """Test scale factor calculation for reference resolution (768x432). Expected: (1.0, 1.0)."""
        scale_x, scale_y = calculate_scale_factors(768, 432, 768, 432)
        self.assertEqual(scale_x, 1.0)
        self.assertEqual(scale_y, 1.0)

    def test_scale_factors_1280x720(self):
        """Test scale factor calculation for 1280x720 video. Expected: (1.6667, 1.6667)."""
        scale_x, scale_y = calculate_scale_factors(1280, 720, 768, 432)
        self.assertAlmostEqual(scale_x, 1280 / 768, places=4)
        self.assertAlmostEqual(scale_y, 720 / 432, places=4)

    def test_scale_line_position_768x432(self):
        """Test line position scaling for 768x432 video. Expected: position remains 240."""
        pos = scale_line_position(240, 768, 432, 768, 432, "horizontal")
        self.assertEqual(pos, 240)

    def test_scale_line_position_1280x720(self):
        """Test line position scaling for 1280x720 video. Expected: 240 * (720/432) = 400."""
        pos = scale_line_position(240, 1280, 720, 768, 432, "horizontal")
        self.assertEqual(pos, 400)

    def test_scale_zones_768x432(self):
        """Test zone polygon scaling for 768x432 video. Expected: identical polygon, area_m2 and thresholds unchanged."""
        scaled = scale_zones(self.sample_zones, 768, 432, 768, 432)
        self.assertEqual(scaled[0]["polygon"], [[30, 40], [738, 40], [738, 170], [30, 170]])
        self.assertEqual(scaled[0]["area_m2"], 500.0)
        self.assertEqual(scaled[0]["thresholds"]["critical"], 0.030)

    def test_scale_zones_1280x720(self):
        """Test zone polygon scaling for 1280x720 video. Expected: scaled polygon, area_m2 and thresholds unchanged."""
        scaled = scale_zones(self.sample_zones, 1280, 720, 768, 432)
        expected_polygon = [
            [round(30 * 1280 / 768), round(40 * 720 / 432)],
            [round(738 * 1280 / 768), round(40 * 720 / 432)],
            [round(738 * 1280 / 768), round(170 * 720 / 432)],
            [round(30 * 1280 / 768), round(170 * 720 / 432)]
        ]
        self.assertEqual(scaled[0]["polygon"], expected_polygon)
        self.assertEqual(scaled[0]["polygon"], [[50, 67], [1230, 67], [1230, 283], [50, 283]])
        # Verify area_m2 and thresholds are NOT modified
        self.assertEqual(scaled[0]["area_m2"], 500.0)
        self.assertEqual(scaled[0]["thresholds"]["critical"], 0.030)


if __name__ == "__main__":
    unittest.main()

