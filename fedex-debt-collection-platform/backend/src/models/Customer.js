import { calculateRiskScore } from "../services/riskScoreService.js";

const initialCustomers = [
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

const customersMap = new Map();

initialCustomers.forEach(c => {
    const customer = {
        ...c,
        riskScore: calculateRiskScore(c)
    };
    customersMap.set(customer.id, customer);
});

export const getAllCustomers = () => Array.from(customersMap.values());
export const getCustomerById = (id) => customersMap.get(id);
export const addCustomer = (customer) => {
    customersMap.set(customer.id, customer);
    return customer;
};
