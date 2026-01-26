## 2026-01-23 - Synchronous Logging Bottleneck
**Learning:** `fs.appendFileSync` blocks the Event Loop significantly (~0.1ms per op). For high-frequency logging, this limits throughput.
**Action:** Use `fs.createWriteStream` for logging to achieve ~0.01ms non-blocking writes.

## 2026-01-26 - In-Memory Data Structure Optimization
**Learning:** Arrays are inefficient (O(N)) for ID lookups. `Map` provides O(1).
**Action:** Encapsulated `Case` model with `Map` for ~500x faster lookups.
