## 2026-01-23 - Synchronous Logging Bottleneck
**Learning:** `fs.appendFileSync` blocks the Event Loop significantly (~0.1ms per op). For high-frequency logging, this limits throughput.
**Action:** Use `fs.createWriteStream` for logging to achieve ~0.01ms non-blocking writes.

## 2026-01-26 - In-Memory Data Structure Optimization
**Learning:** Arrays are inefficient (O(N)) for ID lookups. `Map` provides O(1).
**Action:** Encapsulated `Case` model with `Map` for ~500x faster lookups.

## 2026-01-26 - Customer Lookup Optimization
**Learning:** O(N) Array.find became a bottleneck with 50k records (0.45ms/op). O(1) Map.get reduced this to 0.002ms/op (~200x speedup).
**Action:** Default to Map/Set for entities accessed by ID, even for in-memory prototypes.
