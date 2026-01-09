import { collectorPerformance } from "../models/CollectorPerformance.js";

export const updatePerformance = (collector, status, amount = 0) => {
    if (!collectorPerformance[collector]) {
        collectorPerformance[collector] = {
            totalCases: 0,
            successfulCases: 0,
            failedCases: 0,
            totalRecoveredAmount: 0
        };
    }

    const p = collectorPerformance[collector];
    p.totalCases++;

    if (status === "PAID") {
        p.successfulCases++;
        p.totalRecoveredAmount += amount;
    }

    if (status === "FAILED") {
        p.failedCases++;
    }

    p.successRate = ((p.successfulCases / p.totalCases) * 100).toFixed(2);
};
