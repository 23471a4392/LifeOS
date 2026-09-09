export const logActivity = (userId, action, details = {}) => {
  if (!userId) return;
  const key = `lifeos_activity_log_${userId}`;
  try {
    const raw = localStorage.getItem(key);
    const logs = raw ? JSON.parse(raw) : [];
    logs.unshift({ id: `act_${Date.now()}`, action, details, timestamp: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(logs.slice(0, 50)));
  } catch (e) {
    console.warn('Activity logging error:', e);
  }
};
