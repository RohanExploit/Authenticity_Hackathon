import { addCustomer, getCustomerById } from "./models/Customer.js";

const COUNT = 50000;
const LOOKUPS = 5000;

console.log("Benchmarking Customer storage (Optimized - Map)...");

// Populate additional customers for benchmark
const startPop = performance.now();
for (let i = 0; i < COUNT; i++) {
    addCustomer({ id: `CUST_BM_${i}`, val: i });
}
const endPop = performance.now();
console.log(`Population took: ${(endPop - startPop).toFixed(2)}ms`);

// Lookup using Map.get
const startLookup = performance.now();
let foundCount = 0;
for (let i = 0; i < LOOKUPS; i++) {
    const targetId = `CUST_BM_${Math.floor(Math.random() * COUNT)}`;
    const c = getCustomerById(targetId);
    if (c) foundCount++;
}
const endLookup = performance.now();
console.log(`Lookup ${LOOKUPS} times took: ${(endLookup - startLookup).toFixed(2)}ms`);
console.log(`Average lookup: ${((endLookup - startLookup)/LOOKUPS).toFixed(4)}ms`);
