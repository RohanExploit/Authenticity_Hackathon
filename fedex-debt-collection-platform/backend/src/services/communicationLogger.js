import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust path relative to src/services (root is one level up)
// We need to go up from services (src/services) -> src -> backend root
const logPath = path.join(__dirname, "..", "..", "logs", "communication", "calls_log.csv");

// Ensure directory exists
const logDir = path.dirname(logPath);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Create a persistent write stream (append mode)
// Performance Optimization: This avoids opening/closing file and blocking the main thread on every log
const logStream = fs.createWriteStream(logPath, { flags: 'a' });

logStream.on('error', (err) => {
  console.error("Error writing to log file:", err);
});

export const logCommunication = (data) => {
  const line = `${data.caseId},${data.collector},${data.status},${new Date().toISOString()}\n`;
  logStream.write(line);
};
