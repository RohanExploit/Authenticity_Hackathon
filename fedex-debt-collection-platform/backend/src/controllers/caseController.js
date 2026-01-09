import { customers } from "../models/Customer.js";
import { cases } from "../models/Case.js";
import { calculateRiskScore } from "../services/riskScoreService.js";

export const createCustomer = (req, res) => {
  const customer = { id: Date.now(), ...req.body };
  customer.riskScore = calculateRiskScore(customer);
  customers.push(customer);
  res.json(customer);
};

export const createCase = (req, res) => {
  cases.push({ id: Date.now(), ...req.body, status: "ASSIGNED" });
  res.send("Case created");
};
