// Optimized Case model using Map for O(1) ID lookups
const cases = new Map();

export const addCase = (caseData) => {
    cases.set(caseData.id, caseData);
};

export const getCaseById = (id) => {
    return cases.get(id);
};

export const getAllCases = () => {
    return Array.from(cases.values());
};

export const getCaseCount = () => {
    return cases.size;
};

export const getCasesByCollector = (collectorId) => {
    const result = [];
    for (const c of cases.values()) {
        if (c.collector === collectorId) {
            result.push(c);
        }
    }
    return result;
};
