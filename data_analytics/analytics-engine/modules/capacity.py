import pandas as pd


class CapacityModel:
    def __init__(self, capacity_file):
        """
        Load gate capacities from CSV.
        """
        self.capacity_data = pd.read_csv(capacity_file)

    def get_gate_capacity(self, gate_no):
        """
        Get capacity for a gate.
        """

        gate = self.capacity_data[
            self.capacity_data["gate"] == gate_no
        ]

        if gate.empty:
            raise ValueError(
                f"Gate {gate_no} not found."
            )

        return gate.iloc[0]["capacity"]

    def calculate_capacity_utilization(
        self,
        crowd_number,
        gate_no
    ):
        """
        Calculate utilization percentage.
        """

        capacity = self.get_gate_capacity(gate_no)

        if capacity <= 0:
            raise ValueError(
                "Invalid gate capacity."
            )

        utilization = (
            crowd_number / capacity
        ) * 100

        return {
            "capacity_utilization": float(round(
                utilization,
                2
            ))
        }