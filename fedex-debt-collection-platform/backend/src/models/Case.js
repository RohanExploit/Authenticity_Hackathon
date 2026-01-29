// Optimized Case model using Map for O(1) ID lookups
const cases = new Map();
// Secondary index for O(1) collector lookups
const casesByCollector = new Map();

export const addCase = (caseData) => {
    // Handle updates: remove from old collector's list if exists
    if (cases.has(caseData.id)) {
        const oldCase = cases.get(caseData.id);
        if (oldCase.collector && casesByCollector.has(oldCase.collector)) {
            const list = casesByCollector.get(oldCase.collector);
            const index = list.findIndex(c => c.id === oldCase.id);
            if (index !== -1) {
                list.splice(index, 1);
            }
        }
    }

    cases.set(caseData.id, caseData);

    if (caseData.collector) {
        if (!casesByCollector.has(caseData.collector)) {
            casesByCollector.set(caseData.collector, []);
        }
        casesByCollector.get(caseData.collector).push(caseData);
    }
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
    return casesByCollector.get(collectorId) || [];
};
