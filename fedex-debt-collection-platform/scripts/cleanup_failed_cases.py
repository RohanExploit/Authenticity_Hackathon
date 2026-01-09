import requests

try:
    res = requests.get("http://localhost:5000/api/unrecovered")
    failed = res.json()

    print(f"Found {len(failed)} unrecovered cases")
    for c in failed:
        print(c["id"])
except Exception as e:
    print(f"Error fetching unrecovered cases: {e}")
