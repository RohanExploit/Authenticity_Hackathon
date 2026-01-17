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

// Create a write stream for better performance than sync append
const logStream = fs.createWriteStream(logPath, { flags: 'a' });

// Handle stream errors to prevent crashing
logStream.on('error', (err) => {
  console.error("Error writing to log stream:", err);
});

export const logCommunication = (data) => {
  const line = `${data.caseId},${data.collector},${data.status},${new Date().toISOString()}\n`;
  // write returns false if the stream wishes for the calling code to wait for the 'drain' event
  // but for logging we typically fire and forget unless backpressure is critical
  logStream.write(line);
};
