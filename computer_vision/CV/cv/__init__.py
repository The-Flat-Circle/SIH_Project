"""
Computer Vision Package for Adaptive Crowd Management.
"""

from .detector import PersonDetector
from .tracker import PersonTracker
from .counter import CrowdCounter
from .density import DensityEstimator
from .flow import FlowAnalyzer
from .visualization import Visualizer
from .geometry import calculate_scale_factors, scale_line_position, scale_zones

__version__ = "0.1.0"

__all__ = [
    "PersonDetector",
    "PersonTracker",
    "CrowdCounter",
    "DensityEstimator",
    "FlowAnalyzer",
    "Visualizer",
    "calculate_scale_factors",
    "scale_line_position",
    "scale_zones",
]


