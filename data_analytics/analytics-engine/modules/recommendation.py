import pandas as pd


class RecommendationEngine:

    def __init__(self, tourism_file):
        self.data = pd.read_csv(tourism_file)

    def get_recommendations(
        self,
        congestion_probability
    ):

        heritage = self.data[
            self.data["type"] == "heritage"
        ]

        food = self.data[
            self.data["type"] == "food"
        ]

        culture = self.data[
            self.data["type"] == "culture"
        ]

        recommendations = {

            "heritage_sites": [
                {
                    "name": row["name"],
                    "distance": row["distance"],
                    "crowd_level": row["crowd_level"]
                }

                for _, row in heritage.iterrows()
            ],

            "food": [
                {
                    "name": row["name"],
                    "distance": row["distance"]
                }

                for _, row in food.iterrows()
            ],

            "culture": [
                {
                    "name": row["name"],
                    "distance": row["distance"]
                }

                for _, row in culture.iterrows()
            ]
        }

        if congestion_probability >= 80:
            recommended_visit_time = "5:00 PM"

        elif congestion_probability >= 60:
            recommended_visit_time = "3:00 PM"

        else:
            recommended_visit_time = "Now"

        return {
            "external_recommendations":
                recommendations,

            "recommended_visit_time":
                recommended_visit_time
        }