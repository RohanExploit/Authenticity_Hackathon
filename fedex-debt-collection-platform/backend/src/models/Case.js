const casesById = new Map();
const casesByCollector = new Map();

export const getAllCases = () => Array.from(casesById.values());

export const getCaseCount = () => casesById.size;

export const addCase = (newCase) => {
    casesById.set(newCase.id, newCase);

    if (newCase.collector) {
        if (!casesByCollector.has(newCase.collector)) {
            casesByCollector.set(newCase.collector, new Set());
        }
        casesByCollector.get(newCase.collector).add(newCase);
    }
};

export const getCaseById = (id) => casesById.get(id);

export const getCasesByCollector = (collectorId) => {
    const collectorCases = casesByCollector.get(collectorId);
    return collectorCases ? Array.from(collectorCases) : [];
};
