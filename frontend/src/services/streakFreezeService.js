export const useStreakFreeze = (freezesAvailable, currentStreak) => {
  if (freezesAvailable > 0) return { preserved: true, remaining: freezesAvailable - 1, streak: currentStreak };
  return { preserved: false, remaining: 0, streak: 0 };
};
