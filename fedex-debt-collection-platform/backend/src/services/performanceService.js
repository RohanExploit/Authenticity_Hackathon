export let performance = {};

export const updatePerformance = (collector, status, amount = 0) => {
    if (!performance[collector]) {
        performance[collector] = {
            total: 0,
            success: 0,
            failed: 0,
            recovered: 0
        };
    }

    const p = performance[collector];
    p.total++;

    if (status === "PAID") {
        p.success++;
        p.recovered += Number(amount);
    }

    if (status === "FAILED") {
        p.failed++;
    }
};
