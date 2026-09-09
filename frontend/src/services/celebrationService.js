export const celebrateCompletion = () => {
  if (typeof window !== 'undefined' && window.confetti) window.confetti({ particleCount: 50, spread: 60 });
};
