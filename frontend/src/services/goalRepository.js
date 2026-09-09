export const goalRepository = {
  getGoals(userId) {
    try { const r = localStorage.getItem(`lifeos_user_${userId}_goals`); return r ? JSON.parse(r) : []; } catch { return []; }
  },
  saveGoals(userId, goals) { localStorage.setItem(`lifeos_user_${userId}_goals`, JSON.stringify(goals)); },
  addGoal(userId, goal) {
    const goals = this.getGoals(userId);
    const newG = { id: `goal_${Date.now()}`, milestones: [], progress: 0, status: 'In Progress', ...goal };
    goals.unshift(newG); this.saveGoals(userId, goals); return newG;
  }
};
