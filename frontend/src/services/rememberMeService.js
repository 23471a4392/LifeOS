const REMEMBER_KEY = 'lifeos_remembered_email';
export const rememberMeService = {
  getRememberedEmail() { return localStorage.getItem(REMEMBER_KEY) || ''; },
  setRememberedEmail(email, enabled) {
    if (enabled && email) localStorage.setItem(REMEMBER_KEY, email.trim().toLowerCase());
    else localStorage.removeItem(REMEMBER_KEY);
  }
};
