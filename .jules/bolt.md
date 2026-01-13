# BOLT'S JOURNAL

## 2024-05-23 - Synchronous I/O in Express Controllers
**Learning:** Found `fs.appendFileSync` being used in a logging service called directly from an Express controller. This blocks the Event Loop for every request that triggers a log, significantly reducing throughput under load.
**Action:** Always check logging and file I/O utilities for synchronous methods. Prefer `fs.promises` or callback-based methods for I/O operations in Node.js servers.
