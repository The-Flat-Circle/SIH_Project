"""
Generate a deterministic synthetic test video for Phase 4 Zone Density Estimation:
- Zone 1 (Main Entrance): Contains 3 humanoids (Expected count = 3)
- Zone 2 (Sanctum Queue): Contains 1 humanoid (Expected count = 1)
- Zone 3 (Exit Plaza): Contains 0 humanoids (Expected count = 0)
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


def generate_zone_density_video(output_path="data/videos/zone_density_test.mp4", duration_sec=3, fps=30):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    width, height = 640, 480
    total_frames = duration_sec * fps

    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    writer = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    for i in range(total_frames):
        frame = np.full((height, width, 3), (240, 240, 240), dtype=np.uint8)

        # Draw Zone 1 (top half): 3 humanoids at x=150, x=320, x=480 (y=80)
        draw_humanoid(frame, 150, 80, scale=0.9, color=(180, 30, 30))
        draw_humanoid(frame, 320, 80, scale=0.9, color=(30, 180, 30))
        draw_humanoid(frame, 480, 80, scale=0.9, color=(30, 30, 180))

        # Draw Zone 2 (bottom-left quadrant): 1 humanoid at x=160 (y=280)
        draw_humanoid(frame, 160, 280, scale=0.9, color=(180, 180, 30))

        # Zone 3 (bottom-right quadrant): 0 humanoids

        writer.write(frame)

    writer.release()
    print(f"[DensityData] Generated Phase 4 test video at: '{output_path}' ({total_frames} frames)")


if __name__ == "__main__":
    generate_zone_density_video()

