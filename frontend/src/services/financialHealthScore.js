export const computeFinancialScore = (savingsRate = 0) => {
  let score = Math.min(100, Math.round(savingsRate * 1.5 + 40));
  let rating = 'Excellent';
  if (score < 50) rating = 'Needs Attention';
  else if (score < 75) rating = 'Good';
  return { score, rating };
};
