## 2026-01-16 - Node.js File I/O Performance
**Learning:** In a high-throughput logging scenario, `fs.appendFileSync` (sync) was actually faster (111ms) than `fs.promises.appendFile` (410ms) for 10,000 writes due to Promise creation and microtask overhead. However, both were crushed by `fs.createWriteStream` (35ms), which avoids repeated open/close syscalls.
**Action:** When logging or writing frequently to the same file, always prefer `fs.createWriteStream` over individual `appendFile` calls, even async ones. Speedup was ~3x over sync and ~10x over async promises.
