## 2026-01-20 - Node.js Sync I/O Bottleneck
**Learning:** `fs.appendFileSync` blocks the event loop, causing significant latency (~0.1ms per operation) in high-frequency paths like logging.
**Action:** Use `fs.createWriteStream` for logging to leverage buffering and asynchronous writes, reducing overhead to ~0.009ms per operation.
