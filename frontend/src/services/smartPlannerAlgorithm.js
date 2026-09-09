export const getFocusSequence = (tasks = []) => {
  return [...tasks].sort((a, b) => ((b.urgency || 5) * (b.importance || 5)) - ((a.urgency || 5) * (a.importance || 5)));
};
