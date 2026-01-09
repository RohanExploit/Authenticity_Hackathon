import { collectorPerformance } from "../models/CollectorPerformance.js";

export const getPerformance = (_, res) => {
    res.json(collectorPerformance);
};
