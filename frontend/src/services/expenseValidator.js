export const validateExpensePayload = (d) => {
  const errors = {};
  if (!d.title || d.title.trim().length < 2) errors.title = 'Title required.';
  if (!d.amount || Number(d.amount) <= 0) errors.amount = 'Amount must be positive.';
  return { isValid: Object.keys(errors).length === 0, errors };
};
