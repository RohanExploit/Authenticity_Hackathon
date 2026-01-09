import fs from "fs";
import path from "path";

export const getLogs = (req, res) => {
    const logPath = path.resolve("logs/communication/calls_log.csv");

    if (!fs.existsSync(logPath)) {
        return res.json({ logs: [] });
    }

    const data = fs.readFileSync(logPath, "utf8");
    // Simple CSV parsing
    const logs = data.split("\n").filter(line => line).map(line => {
        const [caseId, collector, action, timestamp] = line.split(",");
        return { caseId, collector, action, timestamp };
    });

    res.json({ logs });
};
