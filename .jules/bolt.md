## 2026-01-23 - Synchronous Logging Bottleneck
**Learning:** `fs.appendFileSync` blocks the Event Loop significantly (~0.1ms per op). For high-frequency logging, this limits throughput.
**Action:** Use `fs.createWriteStream` for logging to achieve ~0.01ms non-blocking writes.

## 2026-01-26 - In-Memory Data Structure Optimization
**Learning:** Arrays are inefficient (O(N)) for ID lookups. `Map` provides O(1).
**Action:** Encapsulated `Case` model with `Map` for ~500x faster lookups.

## 2026-01-27 - Secondary Index Optimization
**Learning:** Iterating over a Map values to filter by a property is O(N). Maintaining a secondary index (Map<Prop, List>) reduces lookup time to O(1). However, secondary indexes must be diligently maintained on updates (remove from old, add to new) to avoid consistency issues.
**Action:** Implemented `casesByCollector` index in `Case` model with proper upsert handling, reducing lookup time from ~1.7ms to ~0.0002ms (8500x improvement).

## 2026-02-02 - Large Payload Mitigation
**Learning:** The `getCustomers` endpoint returns the entire dataset (O(N) payload). While pagination is the long-term fix, network transfer is the immediate bottleneck.
**Action:** Implemented manual Gzip compression using `zlib` (no new deps). reduced payload by ~4.3x (1.1MB -> 0.27MB for 10k items), significantly improving response time on constrained networks.

## 2026-02-05 - DOM Virtualization Importance
**Learning:** Rendering 10,000+ items in React (even simple divs) blocks the main thread for >10 seconds. Client-side pagination (rendering only 50 items) reduces this to ~1 second.
**Action:** Always paginate or virtualize large lists, even if the data is already loaded in memory.
