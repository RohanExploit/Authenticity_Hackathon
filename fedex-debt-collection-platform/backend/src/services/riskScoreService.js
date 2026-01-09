export const calculateRiskScore = (c) => {
  if (!c) return 50; // Default if no customer
  return (
    0.4 * (c.daysPastDue || 0) +
    0.3 * (c.overdueAmount ? Math.min(c.overdueAmount / 100, 100) : 0) +
    0.3 * (100 - (c.paymentHistory || 0))
  );
};
