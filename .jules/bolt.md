## 2026-01-23 - Synchronous Logging Bottleneck
**Learning:** `fs.appendFileSync` blocks the Event Loop significantly (~0.1ms per op). For high-frequency logging, this limits throughput.
**Action:** Use `fs.createWriteStream` for logging to achieve ~0.01ms non-blocking writes.

## 2026-01-23 - Map vs Array for In-Memory Storage
**Learning:** For frequently accessed collections (like Cases), array methods `find` (O(N)) and `filter` (O(N)) become bottlenecks at scale (e.g., 100k items).
**Action:** Use `Map` for primary storage (O(1) by ID) and `Map<Key, Set>` for secondary indexes (O(1) by field).
**Impact:** 1700x speedup for ID lookup, 22x for filtering.
**Caution:** Ensure total count operations are also O(1) (maintain a counter or use `map.size`) to avoid O(N) `Array.from(map).length`.
