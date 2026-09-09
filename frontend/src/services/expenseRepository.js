export const expenseRepository = {
  getExpenses(userId) {
    try { const r = localStorage.getItem(`lifeos_user_${userId}_expenses`); return r ? JSON.parse(r) : []; } catch { return []; }
  },
  saveExpenses(userId, exps) { localStorage.setItem(`lifeos_user_${userId}_expenses`, JSON.stringify(exps)); },
  addExpense(userId, exp) {
    const exps = this.getExpenses(userId);
    const newE = { id: `exp_${Date.now()}`, ...exp };
    exps.unshift(newE); this.saveExpenses(userId, exps); return newE;
  },
  deleteExpense(userId, expId) {
    this.saveExpenses(userId, this.getExpenses(userId).filter(e => e.id !== expId));
    return true;
  }
};
