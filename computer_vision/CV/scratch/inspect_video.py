import cv2
import json

def inspect_video(video_path="data/videos/real_crowd_test.mp4"):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Error opening video: {video_path}")
        return

    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    info = {
        "width": width,
        "height": height,
        "fps": fps,
        "total_frames": total_frames
    }

    print(json.dumps(info, indent=2))

    # Save a sample frame to data/images/
    ret, frame = cap.read()
    if ret:
        cv2.imwrite("data/images/real_crowd_frame0.jpg", frame)
        print("Saved sample frame to 'data/images/real_crowd_frame0.jpg'")

    cap.release()

if __name__ == "__main__":
    inspect_video()

