"""
Generate a deterministic synthetic test video for Phase 5 Crowd Flow & Movement Metrics:
- Person 1: Moving RIGHT (x=50 -> 550, y=120)
- Person 2: Moving DOWN (x=180, y=60 -> 380)
- Person 3: Moving LEFT (x=580 -> 220, y=380)
- Person 4: Stationary (x=320, y=250)
Expected Flow: 3 Moving (RIGHT: 1, DOWN: 1, LEFT: 1), 1 Stationary
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


def generate_flow_movement_video(output_path="data/videos/flow_movement_test.mp4", duration_sec=3, fps=30):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    width, height = 640, 480
    total_frames = duration_sec * fps

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    writer = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    for i in range(total_frames):
        frame = np.full((height, width, 3), (240, 240, 240), dtype=np.uint8)

        # Person 1: Moving RIGHT (x=50 -> 550, y=100)
        x1 = int(50 + (i / total_frames) * 500)
        y1 = 100
        draw_humanoid(frame, x1, y1, scale=0.9, color=(180, 30, 30))

        # Person 2: Moving DOWN (x=150, y=60 -> 360)
        x2 = 150
        y2 = int(60 + (i / total_frames) * 300)
        draw_humanoid(frame, x2, y2, scale=0.9, color=(30, 180, 30))

        # Person 3: Moving LEFT (x=580 -> 280, y=340)
        x3 = int(580 - (i / total_frames) * 300)
        y3 = 340
        draw_humanoid(frame, x3, y3, scale=0.9, color=(30, 30, 180))

        # Person 4: Stationary (x=380, y=220)
        x4 = 380
        y4 = 220
        draw_humanoid(frame, x4, y4, scale=0.9, color=(180, 180, 30))

        writer.write(frame)

    writer.release()
    print(f"[FlowData] Generated Phase 5 test video at: '{output_path}' ({total_frames} frames)")


if __name__ == "__main__":
    generate_flow_movement_video()

