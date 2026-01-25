import { addCase, getCaseById, getCasesByCollector } from "./models/Case.js";
import { performance } from 'perf_hooks';

const N = 100000;
const SEARCH_ITERS = 1000;
const FILTER_ITERS = 50;

console.log(`Populating ${N} cases...`);

for (let i = 0; i < N; i++) {
    addCase({
        id: `CASE_${i}`,
        collector: `COLLECTOR_${i % 100}`, // 100 collectors
        status: "ASSIGNED"
    });
}

console.log("Benchmarking find by ID...");
const startFind = performance.now();
for (let i = 0; i < SEARCH_ITERS; i++) {
    const targetId = `CASE_${Math.floor(Math.random() * N)}`;
    const c = getCaseById(targetId);
}
const endFind = performance.now();
const findTime = endFind - startFind;
console.log(`Find by ID (${SEARCH_ITERS} ops): ${findTime.toFixed(2)}ms`);
console.log(`Avg Find time: ${(findTime / SEARCH_ITERS).toFixed(4)}ms`);

console.log("Benchmarking filter by Collector...");
const startFilter = performance.now();
for (let i = 0; i < FILTER_ITERS; i++) {
    const targetCollector = `COLLECTOR_${i % 100}`;
    const result = getCasesByCollector(targetCollector);
}
const endFilter = performance.now();
const filterTime = endFilter - startFilter;
console.log(`Filter by Collector (${FILTER_ITERS} ops): ${filterTime.toFixed(2)}ms`);
console.log(`Avg Filter time: ${(filterTime / FILTER_ITERS).toFixed(4)}ms`);
