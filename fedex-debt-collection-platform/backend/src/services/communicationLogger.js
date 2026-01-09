import fs from "fs";

export const logCommunication = (data) => {
  const line = `${data.caseId},${data.collector},${data.action},${new Date()}\n`;
  fs.appendFileSync("logs/communication/calls_log.csv", line);
};
