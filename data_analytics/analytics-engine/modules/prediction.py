import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np


class PredictionModel:

    def __init__(self, historical_file):
        self.data = pd.read_csv(historical_file)

    def predict_crowd(self, gate_no):

        gate_data = self.data[
            self.data["gate"] == gate_no
        ].copy()

        X = np.arange(
            len(gate_data)
        ).reshape(-1, 1)

        y = gate_data["crowd"]

        model = LinearRegression()
        model.fit(X, y)

        next_index = np.array(
            [[len(gate_data)]]
        )

        predicted_crowd = int(
            model.predict(next_index)[0]
        )

        return predicted_crowd

    def get_prediction_output(
        self,
        gate_no,
        gate_capacity
    ):

        predicted_crowd = self.predict_crowd(
            gate_no
        )

        congestion_probability = min(
            100,
            round(
                (
                    predicted_crowd /
                    gate_capacity
                ) * 100
            )
        )

        return {
            "predicted_crowd":
                predicted_crowd,

            "prediction_window":
                "15min",

            "congestion_probability":
                congestion_probability
        }