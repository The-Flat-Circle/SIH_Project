class RiskModel:

    def calculate_risk(self, capacity_utilization):

        score = round(capacity_utilization)

        if score < 50:
            level = "low"

        elif score < 75:
            level = "moderate"

        elif score < 90:
            level = "high"

        else:
            level = "critical"

        return {
            "level": level,
            "score": score
        }