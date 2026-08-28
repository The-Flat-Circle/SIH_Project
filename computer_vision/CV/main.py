"""
Main Entry Point for SIH Adaptive Crowd Management Pipeline.
Phase 5: Crowd Flow & Movement Metrics with Resolution-Independent Geometry Scaling.
"""

import os
import sys
import time
import argparse
import json
import yaml
import cv2
from cv import (
    PersonDetector,
    PersonTracker,
    CrowdCounter,
    DensityEstimator,
    FlowAnalyzer,
    Visualizer,
    calculate_scale_factors,
    scale_line_position,
    scale_zones,
)


def load_config(config_path: str = "config/config.yaml") -> dict:
    """Load configuration YAML file."""
    if os.path.exists(config_path):
        with open(config_path, "r") as f:
            return yaml.safe_load(f) or {}
    return {}


def parse_args():
    """Parse command-line arguments."""
    parser = argparse.ArgumentParser(
        description="SIH 2026: Adaptive Crowd Management & Visitor Flow Optimization - Phase 5"
    )
    parser.add_argument("--source", type=str, default=None, help="Path to input video file")
    parser.add_argument("--output", type=str, default=None, help="Path to output processed video file")
    parser.add_argument("--model", type=str, default=None, help="YOLO model path or identifier")
    parser.add_argument("--conf", type=float, default=None, help="Detection/Tracking confidence threshold")
    parser.add_argument("--device", type=str, default=None, help="Compute device ('cpu', 'cuda', 'auto')")
    parser.add_argument("--line-pos", type=int, default=None, help="Virtual gate line pixel position")
    parser.add_argument("--config", type=str, default="config/config.yaml", help="Path to config YAML")
    return parser.parse_args()


def process_video(
    source_path: str,
    output_path: str,
    tracker: PersonTracker,
    counter: CrowdCounter,
    density_estimator: DensityEstimator,
    flow_analyzer: FlowAnalyzer,
    visualizer: Visualizer,
    config: dict = None
):
    """
    Process video frame by frame for YOLO + ByteTrack + Counter + DensityEstimator + FlowAnalyzer pipeline.
    Dynamically scales reference geometry (Virtual Gate & Polygon Zones) to match video resolution.
    """
    if not os.path.exists(source_path):
        raise FileNotFoundError(f"Input video file not found at: '{source_path}'")

    cap = cv2.VideoCapture(source_path)
    if not cap.isOpened():
        raise RuntimeError(f"Failed to open video file: '{source_path}'")

    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps_in = cap.get(cv2.CAP_PROP_FPS)
    fps_in = fps_in if fps_in > 0 else 30.0
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    print(f"[VideoInfo] Source: {source_path}")
    print(f"[VideoInfo] Resolution: {width}x{height} | Target FPS: {fps_in:.1f} | Total Frames: {total_frames}")

    # Geometry Resolution Scaling
    config = config or {}
    ref_geometry = config.get("geometry", {})
    ref_width = ref_geometry.get("reference_width", 768)
    ref_height = ref_geometry.get("reference_height", 432)

    scale_x, scale_y = calculate_scale_factors(width, height, ref_width, ref_height)

    # Scale Gate Line Position & Margin
    scaled_line_pos = scale_line_position(
        counter.line_position,
        actual_width=width,
        actual_height=height,
        ref_width=ref_width,
        ref_height=ref_height,
        orientation=counter.orientation
    )
    counter.line_position = scaled_line_pos
    if counter.orientation == "horizontal":
        counter.margin = max(1, round(counter.margin * scale_y))
    else:
        counter.margin = max(1, round(counter.margin * scale_x))

    # Scale Polygon Zones
    scaled_zones = scale_zones(
        density_estimator.zones,
        actual_width=width,
        actual_height=height,
        ref_width=ref_width,
        ref_height=ref_height
    )
    density_estimator.set_zones(scaled_zones)

    print(f"[Geometry] Scale Factors (Ref: {ref_width}x{ref_height}) -> scale_x: {scale_x:.4f}, scale_y: {scale_y:.4f}")
    print(f"[Geometry] Scaled Virtual Gate Line: y={counter.line_position} | Scaled Zones: {len(scaled_zones)}")

    # Ensure output directory exists
    output_dir = os.path.dirname(output_path)
    if output_dir and not os.path.exists(output_dir):
        os.makedirs(output_dir, exist_ok=True)

    # Initialize VideoWriter
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    writer = cv2.VideoWriter(output_path, fourcc, fps_in, (width, height))

    frame_count = 0
    total_processing_time = 0.0
    fps_rolling = 0.0

    print(f"[Pipeline] Processing started...")
    start_time = time.perf_counter()

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame_start = time.perf_counter()

        # Step 1 & 2: YOLO Detection + ByteTrack Tracking
        tracks = tracker.update(frame)

        # Step 3: Virtual Gate Line-Crossing Counter
        counts = counter.update(tracks)

        # Step 4: Zone Crowd Density Estimation (uses scaled polygon contours)
        density_results = density_estimator.update(tracks)

        # Step 5: Crowd Flow & Movement Metrics
        frame_dt = 1.0 / fps_in
        flow_results = flow_analyzer.update(tracks, dt=frame_dt)

        frame_duration = time.perf_counter() - frame_start
        total_processing_time += frame_duration
        current_fps = 1.0 / frame_duration if frame_duration > 0 else 0.0
        fps_rolling = 0.9 * fps_rolling + 0.1 * current_fps if fps_rolling > 0 else current_fps

        # Step 6: Visual Overlay Rendering (uses scaled line & zone geometry)
        annotated_frame = visualizer.draw_tracks(
            frame,
            tracks,
            counts=counts,
            density_results=density_results,
            flow_results=flow_results,
            fps=fps_rolling,
            line_position=counter.line_position
        )

        # Step 7: Save Frame to VideoWriter
        writer.write(annotated_frame)
        frame_count += 1

        if frame_count % 10 == 0 or frame_count == total_frames:
            print(
                f"Progress: [{frame_count}/{total_frames}] frames | "
                f"IN: {counts['in_count']} | OUT: {counts['out_count']} | MOVING: {flow_results['moving_people']} | "
                f"FPS: {fps_rolling:.1f}",
                end="\r"
            )

    cap.release()
    writer.release()
    print()

    total_elapsed = time.perf_counter() - start_time
    avg_fps = frame_count / total_processing_time if total_processing_time > 0 else 0.0
    final_counts = counter.get_counts()
    final_density = density_estimator.get_zone_results()
    final_flow = flow_analyzer.get_flow_results()

    data_handoff = {
        "timestamp": final_flow.get("timestamp"),
        "camera_id": flow_analyzer.camera_id,
        "gate_counts": final_counts,
        "zones": final_density,
        "flow": final_flow
    }

    print(f"[SUCCESS] Video processing complete!")
    print(f"Processed Frames: {frame_count}")
    print(f"Output Video Saved: '{output_path}'")
    print(f"Total Processing Time: {total_elapsed:.2f} seconds")
    print(f"Average FPS (CPU): {avg_fps:.2f}")
    print(f"Final Gate Counts -> IN: {final_counts['in_count']} | OUT: {final_counts['out_count']} | CURRENT: {final_counts['current_count']}")
    print(f"Final Flow Metrics -> Moving: {final_flow.get('moving_people')} | Stationary: {final_flow.get('stationary_people')} | Avg Speed: {final_flow.get('average_speed_px_per_sec')} px/s")
    print(f"Structured Data Handoff Payload:\n{json.dumps(data_handoff, indent=2)}")

    return {
        "frames_processed": frame_count,
        "output_path": output_path,
        "avg_fps": avg_fps,
        "counts": final_counts,
        "density": final_density,
        "flow": final_flow,
        "data_handoff": data_handoff
    }


def main():
    args = parse_args()
    config = load_config(args.config)

    # Resolve parameters from CLI or config
    source_path = args.source or config.get("input", {}).get("source", "data/videos/flow_movement_test.mp4")
    output_path = args.output or config.get("output", {}).get("output_path", "outputs/flow_counted_output.mp4")
    model_path = args.model or config.get("detector", {}).get("model_path", "yolov8n.pt")
    conf_thresh = args.conf if args.conf is not None else config.get("detector", {}).get("confidence_threshold", 0.35)
    device = args.device or config.get("detector", {}).get("device", "cpu")
    tracker_config = config.get("tracker", {}).get("tracker_config", "bytetrack.yaml")

    line_config = config.get("counting_line", {})
    line_pos = args.line_pos if args.line_pos is not None else line_config.get("position", 240)
    orientation = line_config.get("orientation", "horizontal")
    margin = line_config.get("margin", 15)
    in_direction = line_config.get("in_direction", "above_to_below")
    camera_id = line_config.get("camera_id", "camera_01")
    zones = config.get("zones", [])

    flow_config = config.get("flow", {})
    movement_thresh = flow_config.get("movement_threshold_pixels", 5.0)
    stationary_thresh = flow_config.get("stationary_speed_threshold", 5.0)
    max_hist_len = flow_config.get("max_history_len", 30)
    max_stale_fr = flow_config.get("max_stale_frames", 60)

    print("=== SIH 2026: Adaptive Crowd Management — Resolution-Independent Pipeline ===")
    print(f"Model: {model_path} | Device: {device} | Ref Line Pos: {line_pos} | Zones: {len(zones)}")

    tracker = PersonTracker(
        model_path=model_path,
        conf=conf_thresh,
        device=device,
        tracker_config=tracker_config
    )
    counter = CrowdCounter(
        line_position=line_pos,
        orientation=orientation,
        margin=margin,
        in_direction=in_direction,
        camera_id=camera_id
    )
    density_estimator = DensityEstimator(
        zones=zones,
        camera_id=camera_id
    )
    flow_analyzer = FlowAnalyzer(
        movement_threshold_pixels=movement_thresh,
        stationary_speed_threshold=stationary_thresh,
        max_history_len=max_hist_len,
        max_stale_frames=max_stale_fr,
        camera_id=camera_id
    )
    visualizer = Visualizer()

    process_video(
        source_path=source_path,
        output_path=output_path,
        tracker=tracker,
        counter=counter,
        density_estimator=density_estimator,
        flow_analyzer=flow_analyzer,
        visualizer=visualizer,
        config=config
    )


if __name__ == "__main__":
    main()
