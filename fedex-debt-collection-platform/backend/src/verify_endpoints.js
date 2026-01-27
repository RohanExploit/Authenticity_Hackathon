
const BASE_URL = 'http://localhost:5000/api';

async function verify() {
    console.log("Verifying endpoints...");

    try {
        // 1. Get Customers
        console.log("Checking GET /customers...");
        const resCustomers = await fetch(`${BASE_URL}/customers`);
        if (!resCustomers.ok) throw new Error(`GET /customers failed: ${resCustomers.status}`);
        const customers = await resCustomers.json();
        if (!Array.isArray(customers) || customers.length === 0) throw new Error("GET /customers returned invalid data");
        console.log("✅ GET /customers passed");

        const customerId = customers[0].id;

        // 2. Create Case
        console.log("Checking POST /cases...");
        const newCase = {
            customerId: customerId,
            collector: "collector1"
        };
        const resCase = await fetch(`${BASE_URL}/cases`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCase)
        });
        if (!resCase.ok) throw new Error(`POST /cases failed: ${resCase.status}`);
        const caseData = await resCase.json();
        if (!caseData.id) throw new Error("POST /cases returned invalid data");
        console.log("✅ POST /cases passed");

        // 3. Assign Case (which checks customer lookup)
        console.log("Checking POST /assign-case...");
        const assignData = {
            customerId: customerId,
            collector: "collector2"
        };
        const resAssign = await fetch(`${BASE_URL}/assign-case`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(assignData)
        });
        if (!resAssign.ok) throw new Error(`POST /assign-case failed: ${resAssign.status}`);
        const assignResult = await resAssign.json();
        if (!assignResult.case) throw new Error("POST /assign-case returned invalid data");
        console.log("✅ POST /assign-case passed");

        console.log("🎉 All verifications passed!");
    } catch (err) {
        console.error("❌ Verification failed:", err);
        process.exit(1);
    }
}

verify();
