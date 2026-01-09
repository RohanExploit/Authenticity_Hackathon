import { performance } from "../services/performanceService.js";

export const getPerformance = (req, res) => {
    res.json(performance);
};
