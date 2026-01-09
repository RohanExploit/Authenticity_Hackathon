import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust path relative to src/services (root is one level up)
// We need to go up from services (src/services) -> src -> backend root
const logPath = path.join(__dirname, "..", "..", "logs", "communication", "calls_log.csv");

export const logCommunication = (data) => {
  const line = `${data.caseId},${data.collector},${data.status},${new Date().toISOString()}\n`;
  try {
    fs.appendFileSync(logPath, line);
  } catch (err) {
    console.error("Error writing to log file:", err);
    // Fallback if directory missing
  }
};
