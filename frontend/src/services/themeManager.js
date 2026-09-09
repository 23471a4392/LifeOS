const THEME_KEY = 'lifeos_appearance_theme';
export const themeManager = {
  getTheme() { return localStorage.getItem(THEME_KEY) || 'dark'; },
  setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
};
