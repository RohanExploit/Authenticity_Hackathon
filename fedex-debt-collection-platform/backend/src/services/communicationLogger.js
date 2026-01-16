import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logPath = path.join(__dirname, "..", "..", "logs", "communication", "calls_log.csv");

// Create a write stream (opened once)
// flags: 'a' means append
const logStream = fs.createWriteStream(logPath, { flags: 'a' });

logStream.on('error', (err) => {
  console.error('Error writing to log stream:', err);
});

export const logCommunication = (data) => {
  const line = `${data.caseId},${data.collector},${data.status},${new Date().toISOString()}\n`;
  // write() is asynchronous (buffered) and returns true/false
  logStream.write(line);
};
