class RealtimeProcessor:

    REQUIRED_FIELDS = [
        "timestamp",
        "crowd_number",
        "gate_no",
        "density"
    ]

    def validate_input(self, data):

        for field in self.REQUIRED_FIELDS:

            if field not in data:
                raise ValueError(
                    f"Missing required field: {field}"
                )

        if data["crowd_number"] < 0:
            raise ValueError(
                "Crowd number cannot be negative."
            )

        return True

    def process(self, data):

        self.validate_input(data)

        return {
            "timestamp": data["timestamp"],
            "crowd_number": data["crowd_number"],
            "gate_no": data["gate_no"],
            "density": data["density"]
        }