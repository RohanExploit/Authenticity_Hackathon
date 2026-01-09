export const suggestCollector = (collectors, riskScore) => {
  return collectors.sort((a, b) => b.successRate - a.successRate)[0];
};
