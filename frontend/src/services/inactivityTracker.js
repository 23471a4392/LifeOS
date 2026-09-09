export const createInactivityTracker = (timeoutMinutes = 15, onTimeout) => {
  let timer = null;
  const reset = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => { if (onTimeout) onTimeout(); }, timeoutMinutes * 60 * 1000);
  };
  ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(evt => window.addEventListener(evt, reset, { passive: true }));
  reset();
  return () => {
    if (timer) clearTimeout(timer);
    ['mousedown', 'keydown', 'scroll', 'touchstart'].forEach(evt => window.removeEventListener(evt, reset));
  };
};
