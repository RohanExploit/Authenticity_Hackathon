## 2026-01-23 - Synchronous Logging Bottleneck
**Learning:** `fs.appendFileSync` blocks the Event Loop significantly (~0.1ms per op). For high-frequency logging, this limits throughput.
**Action:** Use `fs.createWriteStream` for logging to achieve ~0.01ms non-blocking writes.
## 2026-01-23 - In-Memory Indexing
**Learning:** `Array.find` and `Array.filter` on large in-memory datasets are significant bottlenecks (O(N)).
**Action:** Use `Map` for O(1) lookups by ID and secondary indexes (Map of Arrays) for filtering fields like `collector`.
