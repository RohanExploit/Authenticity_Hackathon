import { cases } from "../models/Case.js";

export const getUnrecovered = (req, res) => {
    res.json(cases.filter(c => c.status === "FAILED"));
};
