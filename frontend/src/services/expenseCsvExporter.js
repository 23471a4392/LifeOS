export const exportExpensesToCSV = (expenses = []) => {
  const headers = 'ID,Title,Category,Amount,Date\n';
  const rows = expenses.map(e => `"${e.id}","${e.title}","${e.category}",${e.amount},"${e.date}"`).join('\n');
  const blob = new Blob([headers + rows], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'lifeos_expenses.csv'; a.click();
  URL.revokeObjectURL(url);
};
