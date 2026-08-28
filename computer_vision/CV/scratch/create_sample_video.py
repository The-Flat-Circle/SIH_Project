"""
Generate a synthetic sample video for testing the Computer Vision pipeline.
Creates a 3-second 30fps video with simple background and moving figures.
"""

import os
import cv2
import numpy as np

def generate_synthetic_video(output_path: str = "data/videos/synthetic_test.mp4", duration_sec: int = 3, fps: int = 30):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    width, height = 640, 480
    total_frames = duration_sec * fps
    
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    writer = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
    
    for i in range(total_frames):
        # Create a simple textured background
        frame = np.full((height, width, 3), (220, 220, 220), dtype=np.uint8)
        
        # Draw moving person-like stick figures / shapes
        x_pos = int(50 + (i / total_frames) * 450)
        
        # Figure 1: Head, body, arms, legs
        cv2.circle(frame, (x_pos, 150), 20, (50, 50, 200), -1)  # Head
        cv2.line(frame, (x_pos, 170), (x_pos, 270), (50, 50, 200), 8)  # Body
        cv2.line(frame, (x_pos - 30, 200), (x_pos + 30, 200), (50, 50, 200), 6)  # Arms
        cv2.line(frame, (x_pos, 270), (x_pos - 25, 360), (50, 50, 200), 6)  # Left leg
        cv2.line(frame, (x_pos, 270), (x_pos + 25, 360), (50, 50, 200), 6)  # Right leg
        
        # Figure 2: Stationary figure
        cv2.circle(frame, (500, 180), 20, (200, 50, 50), -1)
        cv2.line(frame, (500, 200), (500, 300), (200, 50, 50), 8)
        cv2.line(frame, (500 - 30, 230), (500 + 30, 230), (200, 50, 50), 6)
        cv2.line(frame, (500, 300), (500 - 25, 380), (200, 50, 50), 6)
        cv2.line(frame, (500, 300), (500 + 25, 380), (200, 50, 50), 6)
        
        writer.write(frame)
        
    writer.release()
    print(f"[SyntheticData] Generated synthetic video at: '{output_path}' ({total_frames} frames)")

if __name__ == "__main__":
    generate_synthetic_video()

