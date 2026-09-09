const NOTIF_PREFS_KEY = 'lifeos_notif_preferences';
export const notificationPreferences = {
  getPreferences() {
    try {
      const raw = localStorage.getItem(NOTIF_PREFS_KEY);
      return raw ? JSON.parse(raw) : { soundEnabled: true, taskReminders: true, weeklyDigest: false, hydrationAlerts: true };
    } catch {
      return { soundEnabled: true, taskReminders: true, weeklyDigest: false, hydrationAlerts: true };
    }
  },
  savePreferences(prefs) {
    localStorage.setItem(NOTIF_PREFS_KEY, JSON.stringify(prefs));
    return prefs;
  }
};
