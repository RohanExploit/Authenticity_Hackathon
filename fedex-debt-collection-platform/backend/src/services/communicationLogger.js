import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust path relative to src/services (root is one level up)
// We need to go up from services (src/services) -> src -> backend root
const logDir = path.join(__dirname, "..", "..", "logs", "communication");
const logPath = path.join(logDir, "calls_log.csv");

// Ensure directory exists
if (!fs.existsSync(logDir)) {
    try {
        fs.mkdirSync(logDir, { recursive: true });
    } catch (err) {
        console.error("Failed to create log directory:", err);
    }
}

// Create a write stream for better performance (non-blocking I/O)
const logStream = fs.createWriteStream(logPath, { flags: 'a' });

logStream.on('error', (err) => {
    console.error("Error writing to log stream:", err);
});

export const logCommunication = (data) => {
  const line = `${data.caseId},${data.collector},${data.status},${new Date().toISOString()}\n`;
  // write() is non-blocking.
  logStream.write(line);
};
