import { addCustomer, getAllCustomers } from "../models/Customer.js";
import { addCase, getCaseById, getCaseCount, getCasesByCollector } from "../models/Case.js";
import { calculateRiskScore } from "../services/riskScoreService.js";
import { updatePerformance } from "../services/performanceService.js";
import { logCommunication } from "../services/communicationLogger.js";
import { gzip } from "zlib";

// Customer Logic
export const createCustomer = (req, res) => {
    const customer = { id: Date.now(), ...req.body };
    customer.riskScore = calculateRiskScore(customer);
    addCustomer(customer);
    res.json(customer);
};

export const getCustomers = (req, res) => {
    const customers = getAllCustomers();
    const acceptEncoding = req.headers['accept-encoding'];

    // Optimization: Gzip compression to reduce payload size
    if (acceptEncoding && acceptEncoding.includes('gzip')) {
        const json = JSON.stringify(customers);
        gzip(json, (err, buffer) => {
            if (err) {
                console.error("Compression error:", err);
                return res.json(customers);
            }
            res.set('Content-Encoding', 'gzip');
            res.set('Content-Type', 'application/json');
            res.send(buffer);
        });
    } else {
        res.json(customers);
    }
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
