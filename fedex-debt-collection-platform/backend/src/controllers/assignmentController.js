import { customers } from "../models/Customer.js";
import { cases } from "../models/Case.js";

export const assignCase = (req, res) => {
    const { customerId, collector } = req.body;

    const customer = customers.find(c => c.id === customerId);
    if (!customer) {
        return res.status(404).send("Customer not found");
    }

    const newCase = {
        id: "CASE_" + customerId + "_" + Date.now().toString().slice(-4),
        customerId: customerId,
        collector: collector,
        status: "ASSIGNED",
        amount: customer.overdueAmount,
        createdAt: new Date()
    };
    cases.push(newCase);

    res.send({ message: `Case for ${customerId} assigned to ${collector}`, case: newCase });
};

export const getSuggestion = (req, res) => {
    const { riskScore } = req.body;
    // Mock logic based on risk
    const suggestion = {
        name: riskScore > 70 ? "John Doe" : "Alice Smith",
        successRate: riskScore > 70 ? 95 : 88,
        workload: "Medium"
    };
    res.json(suggestion);
};
