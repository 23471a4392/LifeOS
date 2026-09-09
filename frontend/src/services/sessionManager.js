/**
 * LifeOS Session Management Service
 */
const SESSION_KEY = 'lifeos_active_session_v2';
const DEFAULT_TTL_HOURS = 24;

export const sessionManager = {
  createSession(user, ttlHours = DEFAULT_TTL_HOURS) {
    const expiresAt = Date.now() + (ttlHours * 60 * 60 * 1000);
    const token = `lifeos_tok_${user.id}_${Math.random().toString(36).substring(2, 9)}`;
    const session = {
      token,
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
      currency: user.currency || '₹',
      expiresAt,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },
  getActiveSession() {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const session = JSON.parse(raw);
      if (Date.now() > session.expiresAt) {
        this.clearSession();
        return null;
      }
      return session;
    } catch {
      return null;
    }
  },
  clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }
};
