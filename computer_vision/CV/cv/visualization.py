"""
Visualization Module.
Handles rendering bounding boxes, persistent track IDs, density zones, virtual counting gate line, crowd flow HUD, and FPS metrics.
"""

from typing import List, Dict, Any, Optional
import cv2
import numpy as np


class Visualizer:
    def __init__(
        self,
        box_color: tuple = (0, 255, 0),        # BGR Green for bounding boxes
        center_color: tuple = (0, 0, 255),     # Red dot for centroid
        gate_color: tuple = (255, 255, 0),     # Cyan line for virtual gate
        text_color: tuple = (255, 255, 255),   # White text
        bg_color: tuple = (20, 20, 20),        # Dark background for HUD
        thickness: int = 2
    ):
        self.box_color = box_color
        self.center_color = center_color
        self.gate_color = gate_color
        self.text_color = text_color
        self.bg_color = bg_color
        self.thickness = thickness

        # Density Level BGR Colors
        self.level_colors = {
            "LOW": (0, 180, 0),         # Green
            "MEDIUM": (0, 220, 240),     # Yellow
            "HIGH": (0, 140, 255),       # Orange
            "CRITICAL": (0, 0, 230)      # Red
        }

    def draw_density_zones(
        self,
        frame: np.ndarray,
        density_results: List[Dict[str, Any]]
    ) -> np.ndarray:
        """Draw polygon zones with level-based color fill and status badges."""
        if frame is None or not density_results:
            return frame

        overlay = frame.copy()

        for z in density_results:
            polygon = z.get("polygon", [])
            if len(polygon) < 3:
                continue

            pts = np.array(polygon, dtype=np.int32)
            level = z.get("level", "LOW")
            color = self.level_colors.get(level, (0, 180, 0))

            # Semi-transparent fill
            cv2.fillPoly(overlay, [pts], color)

        # Blend semi-transparent fill onto frame
        cv2.addWeighted(overlay, 0.20, frame, 0.80, 0, frame)

        # Draw polygon borders and text labels
        for z in density_results:
            polygon = z.get("polygon", [])
            if len(polygon) < 3:
                continue

            pts = np.array(polygon, dtype=np.int32)
            level = z.get("level", "LOW")
            color = self.level_colors.get(level, (0, 180, 0))
            name = z.get("zone_name", z.get("zone_id", "Zone"))
            count = z.get("people_count", 0)
            density = z.get("density_people_per_m2", 0.0)

            # Draw polygon border
            cv2.polylines(frame, [pts], isClosed=True, color=color, thickness=2, lineType=cv2.LINE_AA)

            # Draw zone badge label near top-left of polygon
            min_x = int(np.min(pts[:, 0]))
            min_y = int(np.min(pts[:, 1]))

            badge_text = f"{name}: {count}p ({density:.3f} p/m²) [{level}]"
            (tw, th), baseline = cv2.getTextSize(badge_text, cv2.FONT_HERSHEY_SIMPLEX, 0.45, 1)

            # Text background badge
            cv2.rectangle(
                frame,
                (min_x, max(0, min_y - th - 6)),
                (min_x + tw + 6, min_y),
                (30, 30, 30),
                -1
            )
            cv2.rectangle(
                frame,
                (min_x, max(0, min_y - th - 6)),
                (min_x + tw + 6, min_y),
                color,
                1
            )

            cv2.putText(
                frame,
                badge_text,
                (min_x + 3, max(12, min_y - 4)),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.45,
                (255, 255, 255),
                1,
                cv2.LINE_AA
            )

        return frame

    def draw_virtual_gate(
        self,
        frame: np.ndarray,
        line_position: int = 240,
        orientation: str = "horizontal"
    ) -> np.ndarray:
        """Draw virtual counting line across frame with label."""
        if frame is None:
            return frame

        h, w = frame.shape[:2]
        if orientation == "horizontal":
            y = int(line_position)
            cv2.line(frame, (0, y), (w, y), self.gate_color, self.thickness + 1, cv2.LINE_AA)
            cv2.putText(
                frame,
                f"VIRTUAL GATE (y={y})",
                (15, y - 8),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.5,
                self.gate_color,
                1,
                cv2.LINE_AA
            )
        else:
            x = int(line_position)
            cv2.line(frame, (x, 0), (x, h), self.gate_color, self.thickness + 1, cv2.LINE_AA)
            cv2.putText(
                frame,
                f"VIRTUAL GATE (x={x})",
                (x + 5, 25),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.5,
                self.gate_color,
                1,
                cv2.LINE_AA
            )

        return frame

    def draw_flow_hud(
        self,
        frame: np.ndarray,
        flow_results: Dict[str, Any]
    ) -> np.ndarray:
        """Draw Top-Right Scene Flow Info Panel."""
        if frame is None or not flow_results:
            return frame

        h, w = frame.shape[:2]
        hud_w, hud_h = 250, 110
        top_x = w - hud_w - 10
        top_y = 10

        overlay = frame.copy()
        cv2.rectangle(overlay, (top_x, top_y), (top_x + hud_w, top_y + hud_h), self.bg_color, -1)
        cv2.addWeighted(overlay, 0.75, frame, 0.25, 0, frame)
        cv2.rectangle(frame, (top_x, top_y), (top_x + hud_w, top_y + hud_h), (255, 200, 0), 1)

        moving = flow_results.get("moving_people", 0)
        stat = flow_results.get("stationary_people", 0)
        avg_sp = flow_results.get("average_speed_px_per_sec", 0.0)
        dirs = flow_results.get("direction_counts", {})
        flow_rate = flow_results.get("flow_rate", 0.0)

        cv2.putText(
            frame,
            f"MOVING: {moving} | STAT: {stat}",
            (top_x + 10, top_y + 25),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.5,
            (0, 255, 255),
            1,
            cv2.LINE_AA
        )
        cv2.putText(
            frame,
            f"AVG SPEED: {avg_sp:.1f} px/s",
            (top_x + 10, top_y + 50),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.5,
            (255, 255, 255),
            1,
            cv2.LINE_AA
        )

        dir_str = f"U:{dirs.get('UP',0)} D:{dirs.get('DOWN',0)} L:{dirs.get('LEFT',0)} R:{dirs.get('RIGHT',0)}"
        cv2.putText(
            frame,
            dir_str,
            (top_x + 10, top_y + 75),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.45,
            (200, 200, 255),
            1,
            cv2.LINE_AA
        )

        cv2.putText(
            frame,
            f"FLOW RATE: {flow_rate:.1f} ev/s",
            (top_x + 10, top_y + 98),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.45,
            (0, 255, 150),
            1,
            cv2.LINE_AA
        )

        return frame

    def draw_tracks(
        self,
        frame: np.ndarray,
        tracks: List[Dict[str, Any]],
        counts: Optional[Dict[str, int]] = None,
        density_results: Optional[List[Dict[str, Any]]] = None,
        flow_results: Optional[Dict[str, Any]] = None,
        fps: Optional[float] = None,
        line_position: Optional[int] = 240
    ) -> np.ndarray:
        """
        Draw active persistent tracks, density zones, virtual gate line, flow metrics, and HUDs on frame.

        :param frame: Input image frame (BGR format)
        :param tracks: List of track dicts
        :param counts: Dict containing 'in_count', 'out_count', 'current_count'
        :param density_results: List of zone density result dicts
        :param flow_results: Summary dict from FlowAnalyzer
        :param fps: Processing FPS float (optional)
        :param line_position: Y-coordinate of virtual gate line
        :return: Annotated frame
        """
        if frame is None:
            return frame

        annotated_frame = frame.copy()

        # 1. Draw Density Zones (Background layer)
        if density_results:
            self.draw_density_zones(annotated_frame, density_results)

        # 2. Draw Virtual Gate Line if line_position provided
        if line_position is not None:
            self.draw_virtual_gate(annotated_frame, line_position=line_position)

        # 3. Draw individual tracks with flow annotations
        for track in tracks:
            track_id = track.get("track_id")
            bbox = track.get("bbox", [])
            conf = track.get("confidence", 0.0)
            center = track.get("center", [])
            direction = track.get("direction", "")
            speed = track.get("speed_px_per_sec")

            if len(bbox) != 4:
                continue

            x1, y1, x2, y2 = [int(v) for v in bbox]

            # Bounding box
            cv2.rectangle(
                annotated_frame,
                (x1, y1),
                (x2, y2),
                self.box_color,
                self.thickness
            )

            # Centroid point
            if len(center) == 2:
                cx, cy = int(center[0]), int(center[1])
                cv2.circle(annotated_frame, (cx, cy), 4, self.center_color, -1)

            # Label banner
            if direction and direction != "STATIONARY" and speed is not None:
                label = f"ID:{track_id} | {direction} {speed:.1f}px/s"
            else:
                label = f"ID: {track_id} ({conf:.2f})"

            (tw, th), baseline = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.45, 1)

            cv2.rectangle(
                annotated_frame,
                (x1, max(0, y1 - th - 6)),
                (x1 + tw + 4, y1),
                self.box_color,
                -1
            )

            cv2.putText(
                annotated_frame,
                label,
                (x1 + 2, max(12, y1 - 4)),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.45,
                (0, 0, 0),
                1,
                cv2.LINE_AA
            )

        # 4. Draw Top-Left Gate Counts HUD Info Panel
        in_c = counts.get("in_count", 0) if counts else 0
        out_c = counts.get("out_count", 0) if counts else 0
        curr_c = counts.get("current_count", len(tracks)) if counts else len(tracks)

        hud_w, hud_h = 240, 110
        overlay = annotated_frame.copy()
        cv2.rectangle(overlay, (10, 10), (10 + hud_w, 10 + hud_h), self.bg_color, -1)
        cv2.addWeighted(overlay, 0.75, annotated_frame, 0.25, 0, annotated_frame)
        cv2.rectangle(annotated_frame, (10, 10), (10 + hud_w, 10 + hud_h), (0, 255, 0), 1)

        cv2.putText(
            annotated_frame,
            f"IN: {in_c}",
            (20, 35),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (0, 255, 0),
            2,
            cv2.LINE_AA
        )
        cv2.putText(
            annotated_frame,
            f"OUT: {out_c}",
            (120, 35),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (0, 0, 255),
            2,
            cv2.LINE_AA
        )
        cv2.putText(
            annotated_frame,
            f"CURRENT: {curr_c}",
            (20, 65),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (0, 255, 255),
            2,
            cv2.LINE_AA
        )

        fps_text = f"FPS: {fps:.1f}" if fps is not None else "FPS: --"
        cv2.putText(
            annotated_frame,
            fps_text,
            (20, 95),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (255, 255, 255),
            1,
            cv2.LINE_AA
        )

        # 5. Draw Top-Right Flow HUD Info Panel if flow_results provided
        if flow_results:
            self.draw_flow_hud(annotated_frame, flow_results)

        return annotated_frame

    def draw_detections(self, frame, detections, fps=None):
        """Draw detections (Phase 1 compatibility)."""
        tracks = []
        for i, det in enumerate(detections):
            t = dict(det)
            if "track_id" not in t:
                t["track_id"] = i + 1
            if "center" not in t and len(t.get("bbox", [])) == 4:
                b = t["bbox"]
                t["center"] = [round((b[0] + b[2]) / 2.0, 2), round((b[1] + b[3]) / 2.0, 2)]
            tracks.append(t)
        return self.draw_tracks(frame, tracks, fps=fps, line_position=None)

    def draw_overlays(self, frame, detections=None, tracks=None, counts=None, density_results=None, flow_results=None, fps=None, line_position=240):
        """Generic entrypoint for visual overlays."""
        trks = tracks if tracks is not None else (detections if detections is not None else [])
        return self.draw_tracks(frame, trks, counts=counts, density_results=density_results, flow_results=flow_results, fps=fps, line_position=line_position)
