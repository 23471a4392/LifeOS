export const classifyQuadrant = (task) => {
  const isU = (task.urgency || 5) >= 7;
  const isI = (task.importance || 5) >= 7;
  if (isU && isI) return 'Q1_DO_FIRST';
  if (!isU && isI) return 'Q2_SCHEDULE';
  if (isU && !isI) return 'Q3_DELEGATE';
  return 'Q4_ELIMINATE';
};
