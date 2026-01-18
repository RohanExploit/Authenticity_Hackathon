## 2026-01-18 - Synchronous Logging Bottleneck
**Learning:** `fs.appendFileSync` was used for logging in the critical path, blocking the event loop. Switching to `fs.createWriteStream` provided a ~6.5x speedup (0.075ms -> 0.011ms per call) in benchmarks.
**Action:** Always scrutinize file I/O operations in Node.js backends. Prefer streams or asynchronous methods for high-frequency operations like logging.
