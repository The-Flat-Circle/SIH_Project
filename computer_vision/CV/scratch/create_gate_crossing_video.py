"""
Generate a deterministic synthetic test video specifically for Phase 3 Virtual Gate Line Crossing:
- Person A: Starts above line (y=80), moves down to below line (y=380). Expected: IN +1
- Person B: Starts below line (y=380), moves up to above line (y=80). Expected: OUT +1
- Person C: Stays stationary above line (y=100) for all frames. Expected: 0 counts
Expected Final Totals: IN = 1, OUT = 1, CURRENT = 0
"""

import os
import cv2
import numpy as np


def draw_humanoid(frame, x, y, scale=1.0, color=(50, 50, 200)):
    """Draw a realistic humanoid silhouette for detection/tracking."""
    h = int(120 * scale)
    w = int(40 * scale)
    
    head_r = int(14 * scale)
    head_cy = y + head_r
    cv2.circle(frame, (x, head_cy), head_r, color, -1)
    
    neck_y = head_cy + head_r
    hip_y = y + int(70 * scale)
    cv2.ellipse(frame, (x, (neck_y + hip_y) // 2), (w // 2, (hip_y - neck_y) // 2), 0, 0, 360, color, -1)
    
    cv2.line(frame, (x - w // 2 - 5, neck_y + 10), (x - w // 2 - 10, hip_y), color, int(8 * scale))
    cv2.line(frame, (x + w // 2 + 5, neck_y + 10), (x + w // 2 + 10, hip_y), color, int(8 * scale))
    
    foot_y = y + h
    cv2.line(frame, (x - 10, hip_y), (x - 12, foot_y), color, int(10 * scale))
    cv2.line(frame, (x + 10, hip_y), (x + 12, foot_y), color, int(10 * scale))


def generate_gate_crossing_video(output_path="data/videos/gate_crossing_test.mp4", duration_sec=3, fps=30):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    width, height = 640, 480
    total_frames = duration_sec * fps

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    writer = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    for i in range(total_frames):
        frame = np.full((height, width, 3), (235, 235, 235), dtype=np.uint8)

        # Draw visual reference gate line (y=240)
        cv2.line(frame, (0, 240), (width, 240), (255, 200, 0), 1)

        # Person A (IN candidate): Starts y=80 (above line y=240), moves down to y=320 (below line y=240)
        xa = 180
        ya = int(60 + (i / total_frames) * 260)
        draw_humanoid(frame, xa, ya, scale=1.0, color=(30, 30, 180))

        # Person B (OUT candidate): Starts y=320 (below line y=240), moves up to y=60 (above line y=240)
        xb = 460
        yb = int(320 - (i / total_frames) * 260)
        draw_humanoid(frame, xb, yb, scale=1.05, color=(180, 30, 30))

        # Person C (Stationary): Stays at y=60 (above line y=240)
        xc = 320
        yc = 60
        draw_humanoid(frame, xc, yc, scale=0.95, color=(30, 150, 30))

        writer.write(frame)

    writer.release()
    print(f"[GateData] Generated Phase 3 test video at: '{output_path}' ({total_frames} frames)")


if __name__ == "__main__":
    generate_gate_crossing_video()

