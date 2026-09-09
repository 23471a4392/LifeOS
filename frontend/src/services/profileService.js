/**
 * User Profile Service
 */
export const profileService = {
  getUserProfile(userId) {
    if (!userId) return null;
    const key = `lifeos_user_${userId}_profile`;
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  updateUserProfile(userId, updates) {
    if (!userId) return null;
    const current = this.getUserProfile(userId) || {};
    const updated = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    const key = `lifeos_user_${userId}_profile`;
    localStorage.setItem(key, JSON.stringify(updated));
    return updated;
  }
};
