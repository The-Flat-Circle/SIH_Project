import unittest
from cv.counter import CrowdCounter


class TestCrowdCounter(unittest.TestCase):
    def setUp(self):
        self.counter = CrowdCounter(line_position=240, orientation="horizontal", margin=15, in_direction="above_to_below")

    def test_1_cross_above_to_below(self):
        """TEST 1: One person crosses above -> below. Expected: IN = 1, OUT = 0."""
        # Frame 1: Person 1 above line (y=100)
        self.counter.update([{"track_id": 1, "center": [100, 100]}])
        # Frame 2: Person 1 below line (y=300)
        counts = self.counter.update([{"track_id": 1, "center": [100, 300]}])

        self.assertEqual(counts["in_count"], 1)
        self.assertEqual(counts["out_count"], 0)
        self.assertEqual(counts["current_count"], 1)

    def test_2_cross_below_to_above(self):
        """TEST 2: One person crosses below -> above. Expected: IN = 0, OUT = 1."""
        # Frame 1: Person 1 below line (y=300)
        self.counter.update([{"track_id": 1, "center": [100, 300]}])
        # Frame 2: Person 1 above line (y=100)
        counts = self.counter.update([{"track_id": 1, "center": [100, 100]}])

        self.assertEqual(counts["in_count"], 0)
        self.assertEqual(counts["out_count"], 1)
        self.assertEqual(counts["current_count"], 0)  # max(0, 0-1) = 0

    def test_3_stay_on_same_side(self):
        """TEST 3: Person remains on same side for many frames. Expected: No count."""
        for y in [100, 105, 110, 115, 120, 100, 95]:
            counts = self.counter.update([{"track_id": 1, "center": [100, y]}])

        self.assertEqual(counts["in_count"], 0)
        self.assertEqual(counts["out_count"], 0)
        self.assertEqual(counts["current_count"], 0)

    def test_4_cross_over_consecutive_frames(self):
        """TEST 4: One person crosses the line over several consecutive frames. Expected: Exactly ONE count."""
        trajectory = [100, 150, 200, 230, 240, 250, 270, 310, 350]
        for y in trajectory:
            counts = self.counter.update([{"track_id": 1, "center": [100, y]}])

        self.assertEqual(counts["in_count"], 1)
        self.assertEqual(counts["out_count"], 0)

    def test_5_two_independent_crossings(self):
        """TEST 5: Two different IDs cross independently. Expected: Both events counted correctly."""
        # Person 1 (above -> below)
        self.counter.update([{"track_id": 1, "center": [100, 100]}, {"track_id": 2, "center": [300, 300]}])
        counts = self.counter.update([{"track_id": 1, "center": [100, 300]}, {"track_id": 2, "center": [300, 100]}])

        self.assertEqual(counts["in_count"], 1)
        self.assertEqual(counts["out_count"], 1)
        self.assertEqual(counts["current_count"], 0)

    def test_6_anti_jitter_margin(self):
        """TEST 6: Detection position jitters slightly around the line without genuine crossing. Expected: No repeated false counts."""
        # Start above line
        self.counter.update([{"track_id": 1, "center": [100, 100]}])
        # Jitter near y=240 inside margin zone [225, 255]
        for y in [230, 235, 240, 245, 238, 242, 235]:
            counts = self.counter.update([{"track_id": 1, "center": [100, y]}])

        self.assertEqual(counts["in_count"], 0)
        self.assertEqual(counts["out_count"], 0)

    def test_7_multiple_people_both_directions(self):
        """TEST 7: Multiple people cross in both directions. Expected: Correct independent totals."""
        # P1, P2 start above (y=100); P3 starts below (y=300)
        self.counter.update([
            {"track_id": 1, "center": [100, 100]},
            {"track_id": 2, "center": [200, 100]},
            {"track_id": 3, "center": [300, 300]}
        ])
        # P1, P2 move below (y=300); P3 moves above (y=100)
        counts = self.counter.update([
            {"track_id": 1, "center": [100, 300]},
            {"track_id": 2, "center": [200, 300]},
            {"track_id": 3, "center": [300, 100]}
        ])

        self.assertEqual(counts["in_count"], 2)
        self.assertEqual(counts["out_count"], 1)
        self.assertEqual(counts["current_count"], 1)

    def test_8_current_count_calculation(self):
        """TEST 8: Current count calculation current_count = max(0, in_count - out_count)."""
        # P1 crosses below -> above (OUT +1)
        self.counter.update([{"track_id": 1, "center": [100, 300]}])
        counts = self.counter.update([{"track_id": 1, "center": [100, 100]}])

        self.assertEqual(counts["in_count"], 0)
        self.assertEqual(counts["out_count"], 1)
        self.assertEqual(counts["current_count"], 0)  # Never negative!

        # Data handoff payload check
        handoff = self.counter.get_data_handoff()
        self.assertIn("timestamp", handoff)
        self.assertEqual(handoff["in_count"], 0)
        self.assertEqual(handoff["out_count"], 1)
        self.assertEqual(handoff["current_count"], 0)


if __name__ == "__main__":
    unittest.main()

