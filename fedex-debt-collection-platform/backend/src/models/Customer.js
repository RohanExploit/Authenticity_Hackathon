import { calculateRiskScore } from "../services/riskScoreService.js";

const seedData = [
    {
        id: "CUST_001",
        overdueAmount: 5000,
        daysPastDue: 45,
        paymentHistory: 70
    },
    {
        id: "CUST_002",
        overdueAmount: 12000,
        daysPastDue: 90,
        paymentHistory: 40
    },
    {
        id: "CUST_003",
        overdueAmount: 2000,
        daysPastDue: 15,
        paymentHistory: 85
    }
];

// Initialize with risk scores
export let customers = seedData.map(c => ({
    ...c,
    riskScore: calculateRiskScore(c)
}));
