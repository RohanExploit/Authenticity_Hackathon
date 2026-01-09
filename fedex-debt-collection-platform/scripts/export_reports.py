import csv
import requests

try:
    res = requests.get("http://localhost:5000/api/unrecovered")
    data = res.json()

    if data:
        with open("unrecovered_cases.csv", "w", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=data[0].keys())
            writer.writeheader()
            writer.writerows(data)
        print("Exported unrecovered_cases.csv")
    else:
        print("No unrecovered cases found to export.")

except Exception as e:
    print(f"Error exporting report: {e}")
