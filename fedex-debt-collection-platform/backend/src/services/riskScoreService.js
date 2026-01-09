export const calculateRiskScore = (c) => {
  return (
    0.4 * c.daysPastDue +
    0.3 * c.overdueAmount +
    0.3 * (100 - c.paymentHistory)
  );
};
