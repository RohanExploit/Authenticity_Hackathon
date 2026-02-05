import time
import json
from playwright.sync_api import sync_playwright

def run(playwright):
    print("Launching browser...")
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Mock API to return 10,000 customers
    print("Generating 10,000 mock customers...")
    customers = []
    for i in range(10000):
        customers.append({
            "id": f"CUST_{i}",
            "overdueAmount": i * 10,
            "daysPastDue": i % 100,
            "paymentHistory": 50,
            "riskScore": (i % 100)
        })

    json_data = json.dumps(customers)

    def handle_route(route):
        route.fulfill(
            status=200,
            content_type="application/json",
            body=json_data
        )

    page.route("**/api/customers", handle_route)

    # Set authentication
    print("Setting up auth...")
    page.goto("http://localhost:5173/login")
    page.evaluate("localStorage.setItem('role', 'MANAGER')")

    print("Navigating to /customers with 10k items...")
    start_time = time.time()
    page.goto("http://localhost:5173/customers")

    # Measure time to first item
    try:
        page.wait_for_selector("text=CUST_0", timeout=30000)
        first_paint = time.time()
        print(f"Time to first item (CUST_0): {first_paint - start_time:.4f}s")
    except Exception as e:
        print(f"Timeout waiting for CUST_0: {e}")

    # Measure time to last item on Page 1 (CUST_49)
    try:
        page.wait_for_selector("text=CUST_49", timeout=5000)
        page_1_render = time.time()
        print(f"Time to last item on Page 1 (CUST_49): {page_1_render - start_time:.4f}s")
    except Exception as e:
        print(f"Timeout waiting for CUST_49: {e}")

    # Verify CUST_9999 is NOT visible (Optimization check)
    # Give it a moment to settle if it was going to render
    page.wait_for_timeout(1000)
    if page.query_selector("text=CUST_9999"):
        print("FAIL: CUST_9999 is visible! Pagination not working?")
    else:
        print("SUCCESS: CUST_9999 is NOT visible (Pagination working)")

    browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
