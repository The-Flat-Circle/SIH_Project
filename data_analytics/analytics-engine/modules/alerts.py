class AlertSystem:

    def generate_alerts(
        self,
        zone,
        risk,
        congestion_probability
    ):

        alerts = []

        if risk["level"] == "moderate":

            alerts.append({
                "severity": "medium",
                "zone": zone,
                "message":
                    "Crowd levels increasing"
            })

        elif risk["level"] == "high":

            alerts.append({
                "severity": "high",
                "zone": zone,
                "message":
                    "Gate approaching capacity"
            })

        elif risk["level"] == "critical":

            alerts.append({
                "severity": "critical",
                "zone": zone,
                "message":
                    "Immediate intervention required"
            })

        if congestion_probability >= 80:

            alerts.append({
                "severity": "high",
                "zone": zone,
                "message":
                    "High congestion expected in next 15 minutes"
            })

        return alerts