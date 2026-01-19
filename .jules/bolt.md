# Bolt's Journal

## 2024-05-22 - Synchronous Logging Bottleneck
**Learning:** The backend was using `fs.appendFileSync` for every communication log. This blocks the main thread for the duration of the disk I/O, which significantly degrades performance under load.
**Action:** Replaced with `fs.createWriteStream`. Always verify logging implementations are asynchronous in Node.js services.
