import { customers } from "../models/Customer.js";
import { addCase, getCaseById, getCasesByCollector, getAllCases } from "../models/Case.js";
import { calculateRiskScore } from "../services/riskScoreService.js";
import { updatePerformance } from "../services/performanceService.js";
import { logCommunication } from "../services/communicationLogger.js";

// Customer Logic
export const createCustomer = (req, res) => {
    const customer = { id: Date.now(), ...req.body };
    customer.riskScore = calculateRiskScore(customer);
    customers.push(customer);
    res.json(customer);
};

export const getCustomers = (req, res) => {
    // Optimization: riskScore is now pre-calculated in the model
    // This avoids O(N) calculation and object allocation on every request
    res.json(customers);
};

// Case Logic
export const createCase = (req, res) => {
    const allCases = getAllCases();
    const newCase = {
        id: "CASE_" + (allCases.length + 1) + "_" + Date.now().toString().slice(-4),
        customerId: req.body.customerId,
        collector: req.body.collector,
        status: "ASSIGNED",
        createdAt: new Date()
    };

    addCase(newCase);
    res.json(newCase);
};

export const updateCaseStatus = (req, res) => {
    const { caseId, status, amount, collector } = req.body;

    // Optimization: Use O(1) lookup instead of O(N) find
    const c = getCaseById(caseId);
    if (!c) return res.status(404).send("Case not found");

    c.status = status;

    updatePerformance(collector, status, amount || 0);
    logCommunication({ caseId, collector, status });

    res.send("Case updated");
};

export const getCasesForCollector = (req, res) => {
    const { collector } = req.params;
    // Optimization: Use O(1) lookup map instead of O(N) filter
    res.json(getCasesByCollector(collector));
};

// For backward compatibility if strictly needed by existing routes
export const getAssignedCases = (req, res) => {
    const { collectorId } = req.params;
    // Optimization: Use O(1) lookup map instead of O(N) filter
    res.json(getCasesByCollector(collectorId));
};
