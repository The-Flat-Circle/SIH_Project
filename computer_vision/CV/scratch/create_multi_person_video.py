"""
Generate a realistic multi-person synthetic test video to verify ByteTrack tracking behavior:
- Figure A: Enters frame 0 (left), moves right, exits at frame 60.
- Figure B: Enters frame 15 (right), moves left, stays visible till frame 90.
- Figure C: Enters frame 30 (center top), moves down, stays visible till frame 90.
"""

import os
import cv2
import numpy as np


def draw_humanoid(frame, x, y, scale=1.0, color=(50, 50, 200)):
    """Draw a realistic humanoid silhouette for object detection testing."""
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


def generate_multi_person_video(output_path="data/videos/multi_person_test.mp4", duration_sec=3, fps=30):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    width, height = 640, 480
    total_frames = duration_sec * fps

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    writer = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    for i in range(total_frames):
        frame = np.full((height, width, 3), (230, 230, 230), dtype=np.uint8)
        
        # Figure A: Frame 0 -> 60 (Left to Right, exits at frame 60)
        if 0 <= i <= 55:
            xa = int(30 + (i / 55.0) * 650)  # Exits off right edge (>640)
            ya = 180
            draw_humanoid(frame, xa, ya, scale=1.0, color=(30, 30, 180))

        # Figure B: Frame 15 -> 90 (Right to Left)
        if i >= 15:
            t_b = i - 15
            xb = int(580 - (t_b / 75.0) * 350)
            yb = 220
            draw_humanoid(frame, xb, yb, scale=1.1, color=(180, 30, 30))

        # Figure C: Frame 30 -> 90 (Top to Bottom)
        if i >= 30:
            t_c = i - 30
            xc = 320
            yc = int(50 + (t_c / 60.0) * 250)
            draw_humanoid(frame, xc, yc, scale=0.9, color=(30, 150, 30))

        writer.write(frame)

    writer.release()
    print(f"[MultiPersonData] Generated test video at: '{output_path}' ({total_frames} frames)")


if __name__ == "__main__":
    generate_multi_person_video()

