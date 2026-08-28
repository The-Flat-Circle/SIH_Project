import pandas as pd


class ReroutingEngine:

    def __init__(
        self,
        capacity_file,
        status_file
    ):
        self.capacity_data = pd.read_csv(
            capacity_file
        )

        self.status_data = pd.read_csv(
            status_file
        )

    def get_recommendation(
        self,
        current_gate
    ):

        merged = pd.merge(
            self.status_data,
            self.capacity_data,
            on="gate"
        )

        merged["occupancy"] = (
            merged["crowd"] /
            merged["capacity"]
        ) * 100

        alternatives = merged[
            merged["gate"] != current_gate
        ]

        best_gate = alternatives.loc[
            alternatives["occupancy"].idxmin()
        ]

        return {
            "recommended_gate":
                best_gate["gate"],

            "crowd_count":
                int(best_gate["crowd"]),

            "occupancy":
                round(
                    best_gate["occupancy"]
                )
        }