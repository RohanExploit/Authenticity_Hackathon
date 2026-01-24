const cases = [];
const casesById = new Map();
const casesByCollector = new Map();

// Helper to index a case
const indexCase = (c) => {
    casesById.set(c.id, c);
    if (!casesByCollector.has(c.collector)) {
        casesByCollector.set(c.collector, []);
    }
    casesByCollector.get(c.collector).push(c);
};

export const getAllCases = () => cases;

export const addCase = (newCase) => {
    cases.push(newCase);
    indexCase(newCase);
};

export const getCaseById = (id) => casesById.get(id);

export const getCasesByCollector = (collector) => casesByCollector.get(collector) || [];

// Initialize if there were any static cases (none currently)
cases.forEach(indexCase);
