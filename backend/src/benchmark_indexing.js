
console.log("Starting benchmark...");

const N = 100000;
const cases = [];
const casesById = new Map();
const casesByCollector = new Map();

// Seed data
console.time("Seeding");
for (let i = 0; i < N; i++) {
    const id = `CASE_${i}`;
    const collector = `COLLECTOR_${i % 10}`; // 10 collectors
    const c = { id, collector, status: "ASSIGNED" };

    cases.push(c);
    casesById.set(id, c);

    if (!casesByCollector.has(collector)) {
        casesByCollector.set(collector, []);
    }
    casesByCollector.get(collector).push(c);
}
console.timeEnd("Seeding");

// Benchmark 1: Find by ID (Worst case: last element)
const targetId = `CASE_${N - 1}`;

console.time("Array.find (ID)");
const foundArray = cases.find(c => c.id === targetId);
console.timeEnd("Array.find (ID)");

console.time("Map.get (ID)");
const foundMap = casesById.get(targetId);
console.timeEnd("Map.get (ID)");

// Benchmark 2: Filter by Collector (first collector, ~10k items)
const targetCollector = "COLLECTOR_0";

console.time("Array.filter (Collector)");
const filteredArray = cases.filter(c => c.collector === targetCollector);
console.timeEnd("Array.filter (Collector)");

console.time("Map.get (Collector)");
const filteredMap = casesByCollector.get(targetCollector);
console.timeEnd("Map.get (Collector)");

console.log(`Array result count: ${filteredArray.length}`);
console.log(`Map result count: ${filteredMap.length}`);
