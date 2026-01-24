import { getAllCases } from "../models/Case.js";

export const getUnrecovered = (req, res) => {
    res.json(getAllCases().filter(c => c.status === "FAILED"));
};
