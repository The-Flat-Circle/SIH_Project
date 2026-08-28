import unittest
from cv.flow import FlowAnalyzer


class TestFlowAnalyzer(unittest.TestCase):
    def setUp(self):
        self.analyzer = FlowAnalyzer(
            movement_threshold_pixels=5.0,
            stationary_speed_threshold=5.0,
            max_history_len=10,
            max_stale_frames=5,
            default_fps=30.0,
            camera_id="cam_01"
        )

    def test_1_move_right(self):
        """TEST 1: A person moves right. Expected: direction = RIGHT, state = MOVING."""
        dt = 1.0 / 30.0
        # Frame 1
        self.analyzer.update([{"track_id": 1, "center": [100, 100]}], dt=dt)
        # Frame 10: Move right to x=200 over 0.3s
        res = None
        for i in range(1, 10):
            res = self.analyzer.update([{"track_id": 1, "center": [100 + i * 10, 100]}], dt=dt)

        t1 = res["tracks"][0]
        self.assertEqual(t1["direction"], "RIGHT")
        self.assertEqual(t1["state"], "MOVING")
        self.assertGreater(t1["speed_px_per_sec"], 5.0)

    def test_2_move_left(self):
        """TEST 2: A person moves left. Expected: direction = LEFT."""
        dt = 1.0 / 30.0
        self.analyzer.update([{"track_id": 1, "center": [200, 100]}], dt=dt)
        res = None
        for i in range(1, 10):
            res = self.analyzer.update([{"track_id": 1, "center": [200 - i * 10, 100]}], dt=dt)

        t1 = res["tracks"][0]
        self.assertEqual(t1["direction"], "LEFT")
        self.assertEqual(t1["state"], "MOVING")

    def test_3_move_up(self):
        """TEST 3: A person moves upward. Expected: direction = UP."""
        dt = 1.0 / 30.0
        self.analyzer.update([{"track_id": 1, "center": [100, 200]}], dt=dt)
        res = None
        for i in range(1, 10):
            res = self.analyzer.update([{"track_id": 1, "center": [100, 200 - i * 10]}], dt=dt)

        t1 = res["tracks"][0]
        self.assertEqual(t1["direction"], "UP")
        self.assertEqual(t1["state"], "MOVING")

    def test_4_move_down(self):
        """TEST 4: A person moves downward. Expected: direction = DOWN."""
        dt = 1.0 / 30.0
        self.analyzer.update([{"track_id": 1, "center": [100, 100]}], dt=dt)
        res = None
        for i in range(1, 10):
            res = self.analyzer.update([{"track_id": 1, "center": [100, 100 + i * 10]}], dt=dt)

        t1 = res["tracks"][0]
        self.assertEqual(t1["direction"], "DOWN")
        self.assertEqual(t1["state"], "MOVING")

    def test_5_stationary_within_threshold(self):
        """TEST 5: A person barely moves within the configured threshold. Expected: state = STATIONARY."""
        dt = 1.0 / 30.0
        self.analyzer.update([{"track_id": 1, "center": [100, 100]}], dt=dt)
        res = self.analyzer.update([{"track_id": 1, "center": [101, 101]}], dt=dt)

        t1 = res["tracks"][0]
        self.assertEqual(t1["state"], "STATIONARY")
        self.assertEqual(t1["direction"], "STATIONARY")

    def test_6_speed_calculation(self):
        """TEST 6: Speed calculation math: Position 1=(0,0), Position 2=(10,0), dt=2.0s. Expected speed = 5 px/s."""
        self.analyzer.update([{"track_id": 1, "center": [0, 0]}], dt=1.0)
        res = self.analyzer.update([{"track_id": 1, "center": [10, 0]}], dt=2.0)

        t1 = res["tracks"][0]
        self.assertEqual(t1["speed_px_per_sec"], 5.0)

    def test_7_multi_person_directional_counts(self):
        """TEST 7: Multiple people moving in different directions. Verify directional counts."""
        dt = 1.0 / 30.0
        # Frame 1
        self.analyzer.update([
            {"track_id": 1, "center": [100, 100]},
            {"track_id": 2, "center": [200, 200]},
            {"track_id": 3, "center": [300, 300]}
        ], dt=dt)
        # Frame 5: P1 moves Right, P2 moves Down, P3 Stationary
        res = None
        for i in range(1, 6):
            res = self.analyzer.update([
                {"track_id": 1, "center": [100 + i * 15, 100]},
                {"track_id": 2, "center": [200, 200 + i * 15]},
                {"track_id": 3, "center": [300, 300]}
            ], dt=dt)

        counts = res["direction_counts"]
        self.assertEqual(counts["RIGHT"], 1)
        self.assertEqual(counts["DOWN"], 1)
        self.assertEqual(counts["STATIONARY"], 1)
        self.assertEqual(res["moving_people"], 2)
        self.assertEqual(res["stationary_people"], 1)

    def test_8_average_speed_calculation(self):
        """TEST 8: Average speed calculation across moving tracks."""
        # P1 speed = 10 px/s, P2 speed = 20 px/s -> Avg = 15 px/s
        self.analyzer.update([
            {"track_id": 1, "center": [0, 0]},
            {"track_id": 2, "center": [0, 0]}
        ], dt=1.0)
        res = self.analyzer.update([
            {"track_id": 1, "center": [10, 0]},
            {"track_id": 2, "center": [20, 0]}
        ], dt=1.0)

        self.assertEqual(res["average_speed_px_per_sec"], 15.0)

    def test_9_bounded_history_and_stale_pruning(self):
        """TEST 9: Track history is bounded and stale tracks are removed after max_stale_frames."""
        # Active track 1
        self.analyzer.update([{"track_id": 1, "center": [100, 100]}])
        self.assertIn(1, self.analyzer.track_histories)

        # Run 10 frames without track 1 (max_stale_frames=5)
        for _ in range(10):
            self.analyzer.update([{"track_id": 2, "center": [200, 200]}])

        # Verify track 1 history was pruned
        self.assertNotIn(1, self.analyzer.track_histories)
        # Verify history length bounded to max_history_len (10)
        self.assertLessEqual(len(self.analyzer.track_histories[2]), 10)

    def test_10_anti_jitter_noise_suppression(self):
        """TEST 10: No false movement caused by tiny coordinate jitter (< threshold)."""
        dt = 1.0 / 30.0
        self.analyzer.update([{"track_id": 1, "center": [100, 100]}], dt=dt)
        # Jitter around 100, 100 by +/- 1 pixel
        for j in [101, 99, 100, 101, 100]:
            res = self.analyzer.update([{"track_id": 1, "center": [j, j]}], dt=dt)

        t1 = res["tracks"][0]
        self.assertEqual(t1["state"], "STATIONARY")
        self.assertEqual(t1["direction"], "STATIONARY")


if __name__ == "__main__":
    unittest.main()

