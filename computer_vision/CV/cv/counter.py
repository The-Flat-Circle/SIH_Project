"""
Crowd Counter & Virtual Gate Line-Crossing Measurement Module.
"""

from typing import List, Dict, Any, Optional
from datetime import datetime


class CrowdCounter:
    def __init__(
        self,
        line_position: int = 240,
        orientation: str = "horizontal",
        margin: int = 15,
        in_direction: str = "above_to_below",
        camera_id: str = "camera_01"
    ):
        """
        Initialize CrowdCounter with virtual gate settings.

        :param line_position: Pixel coordinate of counting line (y for horizontal)
        :param orientation: Line orientation ('horizontal' or 'vertical')
        :param margin: Anti-jitter margin buffer in pixels
        :param in_direction: 'above_to_below' (default) or 'below_to_above'
        :param camera_id: Identifier for data handoff reporting
        """
        self.line_position = line_position
        self.orientation = orientation
        self.margin = margin
        self.in_direction = in_direction
        self.camera_id = camera_id

        self.in_count = 0
        self.out_count = 0

        # State tracking per track_id:
        # { track_id: {"last_confirmed_side": "above"|"below", "last_cy": float} }
        self.track_states: Dict[int, Dict[str, Any]] = {}

    def _determine_side(self, coord: float) -> Optional[str]:
        """Determine position side relative to counting line with anti-jitter buffer."""
        if coord < (self.line_position - self.margin):
            return "above"
        elif coord > (self.line_position + self.margin):
            return "below"
        return None  # Within anti-jitter margin zone

    def update(self, tracks: List[Dict[str, Any]]) -> Dict[str, int]:
        """
        Process active tracks, evaluate line crossing events, and update IN/OUT counts.

        :param tracks: List of active track dicts containing 'track_id', 'center' or 'bbox'
        :return: Count dictionary {'in_count': int, 'out_count': int, 'current_count': int}
        """
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

            # For horizontal line, monitor y-coordinate (center[1])
            coord = float(center[1]) if self.orientation == "horizontal" else float(center[0])
            current_side = self._determine_side(coord)

            if track_id not in self.track_states:
                # First time seeing track_id
                self.track_states[track_id] = {
                    "last_confirmed_side": current_side,
                    "last_coord": coord
                }
                continue

            state = self.track_states[track_id]
            last_side = state.get("last_confirmed_side")

            # Check for crossing transition
            if last_side is not None and current_side is not None and last_side != current_side:
                if last_side == "above" and current_side == "below":
                    # Transition above -> below
                    if self.in_direction == "above_to_below":
                        self.in_count += 1
                    else:
                        self.out_count += 1
                elif last_side == "below" and current_side == "above":
                    # Transition below -> above
                    if self.in_direction == "above_to_below":
                        self.out_count += 1
                    else:
                        self.in_count += 1

                # Update confirmed side after crossing
                state["last_confirmed_side"] = current_side
            elif current_side is not None:
                # Update confirmed side if out of margin zone
                state["last_confirmed_side"] = current_side

            state["last_coord"] = coord

        return self.get_counts()

    def get_counts(self) -> Dict[str, int]:
        """Return current IN, OUT, and net CURRENT crowd counts."""
        current_count = max(0, self.in_count - self.out_count)
        return {
            "in_count": self.in_count,
            "out_count": self.out_count,
            "current_count": current_count
        }

    def get_data_handoff(self) -> Dict[str, Any]:
        """Return structured schema for backend API data handoff."""
        counts = self.get_counts()
        return {
            "timestamp": datetime.now().isoformat(),
            "camera_id": self.camera_id,
            "in_count": counts["in_count"],
            "out_count": counts["out_count"],
            "current_count": counts["current_count"]
        }

    def reset(self):
        """Reset counter state and track histories."""
        self.in_count = 0
        self.out_count = 0
        self.track_states.clear()
