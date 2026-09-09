export const getNextDueDate = (currentDate, freq = 'daily') => {
  const d = new Date(currentDate);
  if (freq === 'daily') d.setDate(d.getDate() + 1);
  else if (freq === 'weekly') d.setDate(d.getDate() + 7);
  return d.toISOString().split('T')[0];
};
