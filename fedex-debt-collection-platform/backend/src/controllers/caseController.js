import { customers } from "../models/Customer.js";
import { cases } from "../models/Case.js";
import { calculateRiskScore } from "../services/riskScoreService.js";
import { updatePerformance } from "../services/performanceService.js";

export const createCustomer = (req, res) => {
    const customer = { id: Date.now(), ...req.body };
    customer.riskScore = calculateRiskScore(customer);
    customers.push(customer);

    // Auto-create a case for demo purposes
    cases.push({
        id: Date.now() + 1,
        customerId: customer.id,
        amount: customer.overdueAmount,
        status: "ASSIGNED",
        collector: "collector1" // Auto-assign to our demo collector
    });

    res.json(customer);
};

export const createCase = (req, res) => {
    cases.push({ id: Date.now(), ...req.body, status: "ASSIGNED" });
    res.send("Case created");
};

export const getAssignedCases = (req, res) => {
    const { collectorId } = req.params;
    const myCases = cases.filter(c => c.collector === collectorId || c.collector === "collector1"); // Hack for demo
    res.json(myCases);
};

export const updateCaseStatus = (req, res) => {
    const { collector, status, amount } = req.body;

    updatePerformance(collector, status, amount || 0);
    res.send("Case updated & performance recorded");
};
