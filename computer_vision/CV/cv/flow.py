"""
Crowd Flow & Movement Metrics Module.
Measures movement direction, speed (px/s), moving vs. stationary states, directional counts, and flow rates.
"""

import math
import time
from typing import List, Dict, Any, Optional
from collections import deque
from datetime import datetime
import numpy as np


class FlowAnalyzer:
    def __init__(
        self,
        movement_threshold_pixels: float = 5.0,
        stationary_speed_threshold: float = 5.0,
        max_history_len: int = 30,
        max_stale_frames: int = 60,
        default_fps: float = 30.0,
        camera_id: str = "camera_01"
    ):
        """
        Initialize FlowAnalyzer.

        :param movement_threshold_pixels: Minimum pixel displacement to consider valid movement
        :param stationary_speed_threshold: Minimum speed in px/s to classify as MOVING
        :param max_history_len: Maximum history buffer length per track ID
        :param max_stale_frames: Inactive frame threshold before pruning stale track history
        :param default_fps: Default video frame rate used for time calculations if dt omitted
        :param camera_id: Identifier for data handoff reporting
        """
        self.movement_threshold = movement_threshold_pixels
        self.stationary_speed_threshold = stationary_speed_threshold
        self.max_history_len = max_history_len
        self.max_stale_frames = max_stale_frames
        self.default_fps = default_fps if default_fps > 0 else 30.0
        self.camera_id = camera_id

        # Track history storage: track_id -> deque([(cx, cy, timestamp_sec), ...])
        self.track_histories: Dict[int, deque] = {}
        self.last_seen_frame: Dict[int, int] = {}
        self.track_last_time: Dict[int, float] = {}

        self.current_frame_idx = 0
        self.last_results: Dict[str, Any] = {}

    def _determine_direction(self, dx: float, dy: float, dist: float) -> str:
        """Classify movement direction based on displacement vector."""
        if dist < self.movement_threshold:
            return "STATIONARY"

        if abs(dx) >= abs(dy):
            return "RIGHT" if dx > 0 else "LEFT"
        else:
            return "DOWN" if dy > 0 else "UP"

    def update(self, tracks: List[Dict[str, Any]], dt: Optional[float] = None) -> Dict[str, Any]:
        """
        Process active tracks, calculate per-track movement metrics, and compute scene aggregate flow.

        :param tracks: List of active track dicts containing 'track_id', 'center' or 'bbox'
        :param dt: Time elapsed since previous frame in seconds (optional)
        :return: Flow analysis summary dict
        """
        self.current_frame_idx += 1
        frame_dt = dt if (dt is not None and dt > 0) else (1.0 / self.default_fps)

        moving_count = 0
        stationary_count = 0
        moving_speeds = []
        direction_counts = {"UP": 0, "DOWN": 0, "LEFT": 0, "RIGHT": 0, "STATIONARY": 0}

        evaluated_tracks = []

        for track in tracks:
            track_id = track.get("track_id")
            if track_id is None:
                continue

            center = track.get("center")
            if not center or len(center) < 2:
                bbox = track.get("bbox", [])
                if len(bbox) == 4:
                    center = [(bbox[0] + bbox[2]) / 2.0, (bbox[1] + bbox[3]) / 2.0]
                else:
                    continue

            cx, cy = float(center[0]), float(center[1])
            last_time = self.track_last_time.get(track_id, 0.0)
            curr_time = last_time + frame_dt
            self.track_last_time[track_id] = curr_time

            # Retrieve or initialize track history
            if track_id not in self.track_histories:
                self.track_histories[track_id] = deque(maxlen=self.max_history_len)

            history = self.track_histories[track_id]
            history.append((cx, cy, curr_time))
            self.last_seen_frame[track_id] = self.current_frame_idx

            # Calculate speed and direction from history
            if len(history) >= 2:
                # Compare against previous point
                prev_cx, prev_cy, prev_time = history[-2]

                dx = cx - prev_cx
                dy = cy - prev_cy
                dist = math.sqrt(dx * dx + dy * dy)
                elapsed_time = curr_time - prev_time

                speed_px_sec = round(dist / elapsed_time, 2) if elapsed_time > 0 else 0.0
                direction = self._determine_direction(dx, dy, dist)

                if speed_px_sec >= self.stationary_speed_threshold and direction != "STATIONARY":
                    state = "MOVING"
                else:
                    state = "STATIONARY"
                    direction = "STATIONARY"
            else:
                speed_px_sec = 0.0
                direction = "STATIONARY"
                state = "STATIONARY"

            # Aggregate scene stats
            direction_counts[direction] = direction_counts.get(direction, 0) + 1

            if state == "MOVING":
                moving_count += 1
                moving_speeds.append(speed_px_sec)
            else:
                stationary_count += 1

            evaluated_track_item = {
                "track_id": track_id,
                "center": [round(cx, 2), round(cy, 2)],
                "speed_px_per_sec": speed_px_sec,
                "direction": direction,
                "state": state
            }
            evaluated_tracks.append(evaluated_track_item)

            # Mutate active track dictionary to include flow metadata
            track["speed_px_per_sec"] = speed_px_sec
            track["direction"] = direction
            track["state"] = state

        # Memory Cleanup: Prune stale track histories
        stale_ids = [
            tid for tid, last_frame in self.last_seen_frame.items()
            if (self.current_frame_idx - last_frame) > self.max_stale_frames
        ]
        for tid in stale_ids:
            self.track_histories.pop(tid, None)
            self.last_seen_frame.pop(tid, None)
            self.track_last_time.pop(tid, None)

        avg_speed = round(float(np.mean(moving_speeds)), 2) if moving_speeds else 0.0
        # Flow rate: moving rate per second (moving tracks per second window)
        flow_rate = round(moving_count / (1.0 if frame_dt == 0 else (1.0 / self.default_fps)), 2)

        self.last_results = {
            "timestamp": datetime.now().isoformat(),
            "camera_id": self.camera_id,
            "moving_people": moving_count,
            "stationary_people": stationary_count,
            "average_speed_px_per_sec": avg_speed,
            "direction_counts": direction_counts,
            "flow_rate": flow_rate,
            "tracks": evaluated_tracks
        }

        return self.last_results

    def get_flow_results(self) -> Dict[str, Any]:
        """Return the latest crowd flow evaluation results."""
        return self.last_results

    def get_data_handoff(self) -> Dict[str, Any]:
        """Return structured schema for backend API data handoff."""
        return self.get_flow_results()

    def reset(self):
        """Reset flow analyzer state and track histories."""
        self.track_histories.clear()
        self.last_seen_frame.clear()
        self.track_last_time.clear()
        self.current_frame_idx = 0
        self.last_results = {}

