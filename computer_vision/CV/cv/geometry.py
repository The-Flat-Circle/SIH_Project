"""
Geometry Scaling Utilities Module.
Dynamically scales pixel-based coordinates (Virtual Gate and Polygon Zones)
from reference resolution (e.g. 768x432) to match actual input video resolution.
"""

from typing import List, Dict, Any, Tuple

DEFAULT_REF_WIDTH = 768
DEFAULT_REF_HEIGHT = 432


def calculate_scale_factors(
    actual_width: int,
    actual_height: int,
    ref_width: int = DEFAULT_REF_WIDTH,
    ref_height: int = DEFAULT_REF_HEIGHT
) -> Tuple[float, float]:
    """
    Calculate resolution scaling factors.

    scale_x = actual_width / ref_width
    scale_y = actual_height / ref_height
    """
    if ref_width <= 0 or ref_height <= 0:
        raise ValueError(f"Reference dimensions must be positive, got {ref_width}x{ref_height}")

    scale_x = actual_width / float(ref_width)
    scale_y = actual_height / float(ref_height)
    return scale_x, scale_y


def scale_line_position(
    position: int,
    actual_width: int,
    actual_height: int,
    ref_width: int = DEFAULT_REF_WIDTH,
    ref_height: int = DEFAULT_REF_HEIGHT,
    orientation: str = "horizontal"
) -> int:
    """Scale gate line position based on actual video resolution."""
    scale_x, scale_y = calculate_scale_factors(actual_width, actual_height, ref_width, ref_height)
    if orientation == "horizontal":
        return round(position * scale_y)
    else:
        return round(position * scale_x)


def scale_zones(
    zones: List[Dict[str, Any]],
    actual_width: int,
    actual_height: int,
    ref_width: int = DEFAULT_REF_WIDTH,
    ref_height: int = DEFAULT_REF_HEIGHT
) -> List[Dict[str, Any]]:
    """
    Scale polygon zone coordinates based on actual video resolution.
    Preserves configured area_m2 and thresholds without modification.
    """
    scale_x, scale_y = calculate_scale_factors(actual_width, actual_height, ref_width, ref_height)

    scaled_zones = []
    for z in zones:
        scaled_z = dict(z)
        orig_polygon = z.get("polygon", [])
        scaled_polygon = [
            [round(pt[0] * scale_x), round(pt[1] * scale_y)]
            for pt in orig_polygon
        ]
        scaled_z["polygon"] = scaled_polygon
        # area_m2 and thresholds remain completely unchanged
        scaled_zones.append(scaled_z)

    return scaled_zones

