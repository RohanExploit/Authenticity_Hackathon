import { collectors } from "../models/Collector.js";
import { suggestBestCollector } from "../services/autoAssignmentService.js";

export const getSuggestion = (req, res) => {
    const { riskScore } = req.body;
    const suggestion = suggestBestCollector(collectors, riskScore);
    res.json(suggestion);
};

export const assignCase = (req, res) => {
    const { caseId, collector } = req.body;
    res.send(`Case ${caseId} assigned to ${collector}`);
};
