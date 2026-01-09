export const suggestBestCollector = (collectors, riskScore) => {
  return collectors
    .map(c => ({
      ...c,
      score: (c.successRate * 0.7) - (c.workload * 5) - (riskScore * 0.1)
    }))
    .sort((a, b) => b.score - a.score)[0];
};
