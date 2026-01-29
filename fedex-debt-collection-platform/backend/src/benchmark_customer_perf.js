import { addCustomer, getCustomerById } from "./models/Customer.js";
import { calculateRiskScore } from "./services/riskScoreService.js";

const COUNT = 10000;
const LOOKUPS = 1000;

console.log(`Benchmarking Customer lookup (Map)...`);

// Populate large data
for (let i = 0; i < COUNT; i++) {
    const c = { id: `CUST_BENCH_${i}`, overdueAmount: 100, daysPastDue: 10, paymentHistory: 50 };
    c.riskScore = calculateRiskScore(c);
    addCustomer(c);
}

const startLookup = performance.now();
for (let i = 0; i < LOOKUPS; i++) {
    const targetId = `CUST_BENCH_${Math.floor(Math.random() * COUNT)}`;
    const c = getCustomerById(targetId);
}
const endLookup = performance.now();
const duration = endLookup - startLookup;
console.log(`Map Get ${LOOKUPS} times took: ${duration.toFixed(2)}ms`);
console.log(`Average lookup: ${(duration/LOOKUPS).toFixed(4)}ms`);
