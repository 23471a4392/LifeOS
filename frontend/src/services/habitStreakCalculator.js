export const computeStreak = (current = 0, done = false) => {
  const streak = done ? current + 1 : Math.max(0, current - 1);
  return { streak, badge: streak >= 7 ? '🔥 7-Day Flame' : null };
};
