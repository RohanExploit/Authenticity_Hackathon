
import { addCase, getCaseById } from "./models/Case.js";

const COUNT = 50000;
const LOOKUPS = 5000;

console.log("Benchmarking Case storage (Optimized)...");

const runBenchmark = () => {
    // Populate
    const startPop = performance.now();
    for (let i = 0; i < COUNT; i++) {
        addCase({ id: `CASE_${i}`, val: i });
    }
    const endPop = performance.now();
    console.log(`Population took: ${(endPop - startPop).toFixed(2)}ms`);

    // Lookup
    const startLookup = performance.now();
    for (let i = 0; i < LOOKUPS; i++) {
        const targetId = `CASE_${Math.floor(Math.random() * COUNT)}`;
        const c = getCaseById(targetId);
    }
    const endLookup = performance.now();
    console.log(`Lookup ${LOOKUPS} times took: ${(endLookup - startLookup).toFixed(2)}ms`);
    console.log(`Average lookup: ${((endLookup - startLookup)/LOOKUPS).toFixed(4)}ms`);
};

runBenchmark();
