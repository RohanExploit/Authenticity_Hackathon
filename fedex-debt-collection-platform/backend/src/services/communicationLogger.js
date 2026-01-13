import { appendFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Adjust path relative to src/services (root is one level up)
// We need to go up from services (src/services) -> src -> backend root
const logPath = path.join(__dirname, "..", "..", "logs", "communication", "calls_log.csv");

/**
 * Logs communication to a CSV file asynchronously.
 * Uses fs/promises to avoid blocking the Event Loop.
 * @param {Object} data - { caseId, collector, status }
 */
export const logCommunication = async (data) => {
  const line = `${data.caseId},${data.collector},${data.status},${new Date().toISOString()}\n`;
  try {
    await appendFile(logPath, line);
  } catch (err) {
    console.error("Error writing to log file:", err);
    // Fallback if directory missing
  }
};
