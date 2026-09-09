export const evaluateGoalRisk = (goal) => {
  if (!goal.targetDate) return 'On Track';
  const target = new Date(goal.targetDate).getTime();
  const now = Date.now();
  if (now > target && (goal.progress || 0) < 100) return 'Overdue';
  return 'On Track';
};
