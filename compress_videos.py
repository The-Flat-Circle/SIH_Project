import cv2
import os

def compress_video(input_path, output_path, max_frames=300, target_width=768, target_height=432):
    if not os.path.exists(input_path):
        print(f"File not found: {input_path}")
        return
    
    cap = cv2.VideoCapture(input_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    fps = fps if fps > 0 else 25.0
    
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    writer = cv2.VideoWriter(output_path, fourcc, fps, (target_width, target_height))
    
    count = 0
    while cap.isOpened() and count < max_frames:
        ret, frame = cap.read()
        if not ret:
            break
        
        resized = cv2.resize(frame, (target_width, target_height))
        writer.write(resized)
        count += 1
        
    cap.release()
    writer.release()
    print(f"Compressed {input_path} -> {output_path} ({count} frames, size: {os.path.getsize(output_path)} bytes)")

if __name__ == "__main__":
    os.makedirs("frontend/public", exist_ok=True)
    compress_video("Project details/real_crowd_output.mp4", "frontend/public/real_crowd_output.mp4", max_frames=250)
    compress_video("Project details/crowd_night_scaled_output.mp4", "frontend/public/crowd_night_scaled_output.mp4", max_frames=250)
