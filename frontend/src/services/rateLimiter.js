/**
 * Login Rate Limiter & Brute-force Shield
 */
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 60 * 1000; // 60 seconds

export const rateLimiter = {
  getRecord(email) {
    const key = `lifeos_ratelimit_${email?.toLowerCase()}`;
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : { attempts: 0, lockUntil: 0 };
    } catch {
      return { attempts: 0, lockUntil: 0 };
    }
  },
  recordFailure(email) {
    const rec = this.getRecord(email);
    rec.attempts += 1;
    if (rec.attempts >= MAX_ATTEMPTS) {
      rec.lockUntil = Date.now() + LOCKOUT_MS;
    }
    const key = `lifeos_ratelimit_${email?.toLowerCase()}`;
    localStorage.setItem(key, JSON.stringify(rec));
    return rec;
  },
  recordSuccess(email) {
    const key = `lifeos_ratelimit_${email?.toLowerCase()}`;
    localStorage.removeItem(key);
  },
  checkStatus(email) {
    const rec = this.getRecord(email);
    const now = Date.now();
    if (rec.lockUntil && rec.lockUntil > now) {
      const remainingSec = Math.ceil((rec.lockUntil - now) / 1000);
      return { locked: true, remainingSec, error: `Too many failed attempts. Account locked for ${remainingSec}s.` };
    }
    return { locked: false, attemptsRemaining: Math.max(0, MAX_ATTEMPTS - rec.attempts) };
  }
};
