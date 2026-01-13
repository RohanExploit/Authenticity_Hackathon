import { customers } from "../models/Customer.js";
import { cases } from "../models/Case.js";
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
        id: "CASE_" + (cases.length + 1) + "_" + Date.now().toString().slice(-4),
        customerId: req.body.customerId,
        collector: req.body.collector,
        status: "ASSIGNED",
        createdAt: new Date()
    };

    cases.push(newCase);
    res.json(newCase);
};

export const updateCaseStatus = (req, res) => {
    const { caseId, status, amount, collector } = req.body;

    const c = cases.find(x => x.id === caseId);
    if (!c) return res.status(404).send("Case not found");

    c.status = status;

    updatePerformance(collector, status, amount || 0);
    logCommunication({ caseId, collector, status });

    res.send("Case updated");
};

export const getCasesForCollector = (req, res) => {
    const { collector } = req.params;
    // Simple filter for prototype
    res.json(cases.filter(c => c.collector === collector));
};

// For backward compatibility if strictly needed by existing routes, 
// but we essentially replaced 'getAssignedCases' with 'getCasesForCollector' logic.
// However, the router still points to 'getAssignedCases' in previous steps unless we update routes.js.
// IMPORTANT: We will update routes.js next step to use 'getCasesForCollector'.
// Keeping this as alias if any old code hits it? No, assume we fix routes.
export const getAssignedCases = (req, res) => {
    const { collectorId } = req.params;
    res.json(cases.filter(c => c.collector === collectorId));
};
