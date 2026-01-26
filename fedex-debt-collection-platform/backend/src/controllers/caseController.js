import { customers } from "../models/Customer.js";
import { addCase, getCaseById, getCaseCount, getCasesByCollector } from "../models/Case.js";
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
    const newCase = {
        id: "CASE_" + (getCaseCount() + 1) + "_" + Date.now().toString().slice(-4),
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

    const c = getCaseById(caseId);
    if (!c) return res.status(404).send("Case not found");

    c.status = status;

    updatePerformance(collector, status, amount || 0);
    logCommunication({ caseId, collector, status });

    res.send("Case updated");
};

export const getCasesForCollector = (req, res) => {
    const { collector } = req.params;
    res.json(getCasesByCollector(collector));
};

export const getAssignedCases = (req, res) => {
    const { collectorId } = req.params;
    res.json(getCasesByCollector(collectorId));
};
