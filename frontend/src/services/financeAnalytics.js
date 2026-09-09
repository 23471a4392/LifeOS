export const calculateFinanceStats = (expenses = [], monthlyIncome = 0) => {
  const totalOutflow = expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0);
  const netSavings = monthlyIncome - totalOutflow;
  const savingsRate = monthlyIncome > 0 ? Math.max(0, Math.round((netSavings / monthlyIncome) * 100)) : 0;
  const categoryTotals = {};
  expenses.forEach(e => { const c = e.category || 'Misc'; categoryTotals[c] = (categoryTotals[c] || 0) + Number(e.amount); });
  return { totalOutflow, monthlyIncome, netSavings, savingsRate, categoryTotals };
};
