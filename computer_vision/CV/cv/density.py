"""
Zone Density Estimation Module.
Provides polygon zone-based crowd occupancy measurement, density computation, and level classification.
"""

from typing import List, Dict, Any, Optional
from datetime import datetime
import cv2
import numpy as np


class DensityEstimator:
    def __init__(self, zones: Optional[List[Dict[str, Any]]] = None, camera_id: str = "camera_01"):
        """
        Initialize DensityEstimator with zone polygon definitions.

        :param zones: List of zone configuration dictionaries containing id, name, polygon, area_m2, thresholds
        :param camera_id: Identifier for data handoff reporting
        """
        self.camera_id = camera_id
        self.zones = zones or []

        # Pre-process polygon contours for OpenCV pointPolygonTest
        self.prepared_zones = []
        for z in self.zones:
            poly_pts = np.array(z.get("polygon", []), dtype=np.int32)
            self.prepared_zones.append({
                "id": z.get("id", "zone_unknown"),
                "name": z.get("name", "Unnamed Zone"),
                "polygon": z.get("polygon", []),
                "contour": poly_pts,
                "area_m2": float(z.get("area_m2", 100.0)),
                "thresholds": z.get("thresholds", {
                    "low": 0.05,
                    "medium": 0.10,
                    "high": 0.20,
                    "critical": 0.30
                })
            })

        self.last_results: List[Dict[str, Any]] = []

    def set_zones(self, zones: List[Dict[str, Any]]):
        """Update and re-prepare zone polygon contours (e.g. after scaling)."""
        self.zones = zones or []
        self.prepared_zones = []
        for z in self.zones:
            poly_pts = np.array(z.get("polygon", []), dtype=np.int32)
            self.prepared_zones.append({
                "id": z.get("id", "zone_unknown"),
                "name": z.get("name", "Unnamed Zone"),
                "polygon": z.get("polygon", []),
                "contour": poly_pts,
                "area_m2": float(z.get("area_m2", 100.0)),
                "thresholds": z.get("thresholds", {
                    "low": 0.05,
                    "medium": 0.10,
                    "high": 0.20,
                    "critical": 0.30
                })
            })

    def classify_level(self, density: float, thresholds: Dict[str, float]) -> str:
        """Classify numerical density into LOW, MEDIUM, HIGH, or CRITICAL level."""
        low = thresholds.get("low", 0.05)
        medium = thresholds.get("medium", 0.10)
        high = thresholds.get("high", 0.20)
        critical = thresholds.get("critical", 0.30)

        if density >= critical:
            return "CRITICAL"
        elif density >= high:
            return "HIGH"
        elif density >= medium:
            return "MEDIUM"
        elif density >= low:
            return "LOW"
        else:
            return "LOW"

    def update(self, tracks: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """
        Evaluate tracked person locations against polygon zones.

        :param tracks: List of active track dicts containing 'track_id', 'center' or 'bbox'
        :return: List of zone density result dictionaries
        """
        results = []

        for z in self.prepared_zones:
            contour = z["contour"]
            area_m2 = z["area_m2"]
            thresholds = z["thresholds"]

            seen_track_ids = set()
            people_count = 0

            if len(contour) >= 3:
                for track in tracks:
                    track_id = track.get("track_id")
                    center = track.get("center")

                    if not center or len(center) < 2:
                        bbox = track.get("bbox", [])
                        if len(bbox) == 4:
                            center = [(bbox[0] + bbox[2]) / 2.0, (bbox[1] + bbox[3]) / 2.0]
                        else:
                            continue

                    pt = (float(center[0]), float(center[1]))

                    # pointPolygonTest: >= 0 means inside polygon or on boundary
                    dist = cv2.pointPolygonTest(contour, pt, False)
                    if dist >= 0:
                        # Deduplicate: count track ID at most once per zone per frame
                        if track_id is not None:
                            if track_id not in seen_track_ids:
                                seen_track_ids.add(track_id)
                                people_count += 1
                        else:
                            people_count += 1

            density_m2 = round(people_count / area_m2, 4) if area_m2 > 0 else 0.0
            level = self.classify_level(density_m2, thresholds)

            results.append({
                "zone_id": z["id"],
                "zone_name": z["name"],
                "polygon": z["polygon"],
                "people_count": people_count,
                "area_m2": area_m2,
                "density_people_per_m2": density_m2,
                "level": level
            })

        self.last_results = results
        return results

    def get_zone_results(self) -> List[Dict[str, Any]]:
        """Return the latest zone density evaluation results."""
        return self.last_results

    def get_data_handoff(self) -> Dict[str, Any]:
        """Return structured schema for backend API data handoff."""
        return {
            "timestamp": datetime.now().isoformat(),
            "camera_id": self.camera_id,
            "zones": self.last_results
        }

    def reset(self):
        """Reset density estimator state."""
        self.last_results = []
