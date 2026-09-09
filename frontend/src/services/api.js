import { initialSeedData } from '../../../backend/src/seed/seedData.js';

const API_BASE = '/api';

// Local storage fallback state
const LOCAL_STORAGE_KEY = 'lifeos_app_state_v1';

const getLocalState = () => {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Storage read error:', e);
  }
  return JSON.parse(JSON.stringify(initialSeedData));
};

const saveLocalState = (state) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Storage write error:', e);
  }
};

let localState = getLocalState();

export const api = {
  // Generic request with fallback
  async request(endpoint, options = {}) {
    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        },
        ...options
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {
      // Backend not running, execute fallback smoothly
    }
    return null;
  },

  // Auth
  async login(credentials) {
    const res = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    if (res) return res;
    return {
      success: true,
      user: localState.user,
      token: 'demo_token'
    };
  },

  // Dashboard Summary
  async getDashboard() {
    const res = await this.request('/dashboard');
    if (res && res.data) return res.data;

    // Recalculate local stats
    const completedTasks = localState.tasks.filter(t => t.completed).length;
    const totalTasks = localState.tasks.length || 1;
    const completedHabits = localState.health.habits.filter(h => h.todayCompleted).length;
    const totalHabits = localState.health.habits.length || 1;
    const waterPerc = Math.min(100, Math.round((localState.health.waterIntake.currentMl / localState.health.waterIntake.goalMl) * 100));

    const overall = Math.round(
      ((completedTasks / totalTasks) * 25) +
      ((completedHabits / totalHabits) * 25) +
      (waterPerc * 0.2) +
      (localState.lifeScoreMetrics.career * 0.15) +
      (localState.lifeScoreMetrics.finance * 0.15)
    );

    return {
      user: localState.user,
      lifeScore: {
        overall,
        metrics: {
          ...localState.lifeScoreMetrics,
          overall,
          productivity: Math.round((completedTasks / totalTasks) * 100),
          health: Math.round(((completedHabits / totalHabits) * 100 + waterPerc) / 2)
        },
        completedTasks,
        totalTasks,
        completedHabits,
        totalHabits,
        waterPercentage: waterPerc
      },
      priorityTasks: localState.tasks.filter(t => !t.completed).slice(0, 5),
      aiPlanner: localState.smartPlanner,
      upcomingBills: localState.finance.bills.filter(b => b.status !== 'Paid'),
      upcomingExams: localState.learning.upcomingExams,
      habits: localState.health.habits,
      waterIntake: localState.health.waterIntake,
      jobApplications: localState.career.jobApplications.slice(0, 3)
    };
  },

  // Tasks
  async getTasks() {
    const res = await this.request('/tasks');
    if (res && res.data) return res.data;
    return localState.tasks;
  },

  async createTask(task) {
    const res = await this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(task)
    });
    if (res && res.data) return res.data;

    const newTask = {
      id: `task_${Date.now()}`,
      completed: false,
      createdAt: new Date().toISOString(),
      ...task
    };
    localState.tasks.unshift(newTask);
    saveLocalState(localState);
    return newTask;
  },

  async updateTask(id, updates) {
    const res = await this.request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
    if (res && res.data) return res.data;

    const idx = localState.tasks.findIndex(t => t.id === id);
    if (idx !== -1) {
      localState.tasks[idx] = { ...localState.tasks[idx], ...updates };
      saveLocalState(localState);
      return localState.tasks[idx];
    }
    return null;
  },

  async deleteTask(id) {
    await this.request(`/tasks/${id}`, { method: 'DELETE' });
    localState.tasks = localState.tasks.filter(t => t.id !== id);
    saveLocalState(localState);
    return true;
  },

  // Decisions 🔥
  async getDecisions() {
    const res = await this.request('/decisions');
    if (res && res.data) return res.data;
    return localState.decisions;
  },

  async createDecision(decision) {
    const res = await this.request('/decisions', {
      method: 'POST',
      body: JSON.stringify(decision)
    });
    if (res && res.data) return res.data;

    const newDec = {
      id: `dec_${Date.now()}`,
      status: "In Progress",
      createdAt: new Date().toISOString(),
      ...decision
    };
    localState.decisions.unshift(newDec);
    saveLocalState(localState);
    return newDec;
  },

  // Smart Planner 🤖
  async getSmartPlanner() {
    const res = await this.request('/planner');
    if (res && res.data) return res.data;
    return localState.smartPlanner;
  },

  // Finance
  async getFinance() {
    const res = await this.request('/finance');
    if (res && res.data) return res.data;
    return localState.finance;
  },

  async addTransaction(tx) {
    const res = await this.request('/finance/transaction', {
      method: 'POST',
      body: JSON.stringify(tx)
    });
    if (res && res.data) return res.data;

    const newTx = { id: `tx_${Date.now()}`, date: new Date().toISOString().split('T')[0], ...tx };
    localState.finance.recentTransactions.unshift(newTx);
    if (newTx.type === 'expense') {
      localState.finance.monthlyExpense += Number(newTx.amount);
    } else {
      localState.finance.monthlyIncome += Number(newTx.amount);
    }
    localState.finance.monthlySavings = localState.finance.monthlyIncome - localState.finance.monthlyExpense;
    saveLocalState(localState);
    return newTx;
  },

  // Health
  async getHealth() {
    const res = await this.request('/health');
    if (res && res.data) return res.data;
    return localState.health;
  },

  async toggleHabit(id) {
    const res = await this.request(`/health/habits/${id}/toggle`, { method: 'POST' });
    if (res && res.data) return res.data;

    const habit = localState.health.habits.find(h => h.id === id);
    if (habit) {
      habit.todayCompleted = !habit.todayCompleted;
      habit.streak = habit.todayCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1);
      saveLocalState(localState);
      return habit;
    }
    return null;
  },

  async logWater(amount = 250) {
    const res = await this.request('/health/water', {
      method: 'POST',
      body: JSON.stringify({ amount })
    });
    if (res && res.data) return res.data;

    localState.health.waterIntake.currentMl += amount;
    localState.health.waterIntake.percentage = Math.min(100, Math.round(
      (localState.health.waterIntake.currentMl / localState.health.waterIntake.goalMl) * 100
    ));
    saveLocalState(localState);
    return localState.health.waterIntake;
  },

  // Career, Learning, Travel, Documents, Relationships, Notes
  async getCareer() { return (await this.request('/career'))?.data || localState.career; },
  async getLearning() { return (await this.request('/learning'))?.data || localState.learning; },
  async getTravel() { return (await this.request('/travel'))?.data || localState.travel; },
  async getDocuments() { return (await this.request('/documents'))?.data || localState.documents; },
  async getRelationships() { return (await this.request('/relationships'))?.data || localState.relationships; },
  async getNotes() { return (await this.request('/notes'))?.data || localState.notes; },
  async getNotifications() { return (await this.request('/notifications'))?.data || localState.notifications; },

  async resetData() {
    localState = JSON.parse(JSON.stringify(initialSeedData));
    saveLocalState(localState);
    return localState;
  }
};
