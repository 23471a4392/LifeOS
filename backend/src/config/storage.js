import { initialSeedData } from '../seed/seedData.js';

class LifeOSStorage {
  constructor() {
    this.data = JSON.parse(JSON.stringify(initialSeedData));
  }

  getUser() {
    return this.data.user;
  }

  updateUser(updates) {
    this.data.user = { ...this.data.user, ...updates };
    return this.data.user;
  }

  getLifeScore() {
    // Dynamic recalculation of Life Score based on completed tasks, habits, and budgets
    const completedTasks = this.data.tasks.filter(t => t.completed).length;
    const totalTasks = this.data.tasks.length || 1;
    const taskScore = Math.round((completedTasks / totalTasks) * 100);

    const completedHabits = this.data.health.habits.filter(h => h.todayCompleted).length;
    const totalHabits = this.data.health.habits.length || 1;
    const habitScore = Math.round((completedHabits / totalHabits) * 100);

    const waterScore = Math.min(100, Math.round((this.data.health.waterIntake.currentMl / this.data.health.waterIntake.goalMl) * 100));

    const overall = Math.round((taskScore * 0.25) + (habitScore * 0.25) + (waterScore * 0.2) + (this.data.lifeScoreMetrics.career * 0.15) + (this.data.lifeScoreMetrics.finance * 0.15));
    
    this.data.lifeScoreMetrics.overall = overall;
    this.data.lifeScoreMetrics.productivity = taskScore;
    this.data.lifeScoreMetrics.health = Math.round((habitScore + waterScore) / 2);

    return {
      overall,
      metrics: this.data.lifeScoreMetrics,
      completedTasks,
      totalTasks,
      completedHabits,
      totalHabits,
      waterPercentage: waterScore
    };
  }

  // Tasks
  getTasks() {
    return this.data.tasks;
  }

  addTask(task) {
    const newTask = {
      id: `task_${Date.now()}`,
      completed: false,
      createdAt: new Date().toISOString(),
      ...task
    };
    this.data.tasks.unshift(newTask);
    this.addNotification({
      type: "info",
      title: "New Task Scheduled",
      message: `"${newTask.title}" added with ${newTask.priority || 'Normal'} priority.`
    });
    return newTask;
  }

  updateTask(id, updates) {
    const idx = this.data.tasks.findIndex(t => t.id === id);
    if (idx !== -1) {
      this.data.tasks[idx] = { ...this.data.tasks[idx], ...updates };
      if (updates.completed) {
        this.data.tasks[idx].completedAt = new Date().toISOString();
        this.addNotification({
          type: "success",
          title: "Task Completed 🎉",
          message: `Awesome job! "${this.data.tasks[idx].title}" marked complete.`
        });
      }
      return this.data.tasks[idx];
    }
    return null;
  }

  deleteTask(id) {
    this.data.tasks = this.data.tasks.filter(t => t.id !== id);
    return true;
  }

  // Decisions
  getDecisions() {
    return this.data.decisions;
  }

  getDecisionById(id) {
    return this.data.decisions.find(d => d.id === id);
  }

  createDecision(decision) {
    const newDecision = {
      id: `dec_${Date.now()}`,
      status: "In Progress",
      createdAt: new Date().toISOString(),
      ...decision
    };

    // Calculate score & recommendation if options exist
    if (newDecision.options && newDecision.options.length > 0) {
      newDecision.options = newDecision.options.map(opt => {
        const s = opt.scores || {};
        // Normalized computation
        let totalScore = 0;
        let count = 0;
        if (s.growthRating) { totalScore += s.growthRating * 10; count++; }
        if (s.learningRating) { totalScore += s.learningRating * 10; count++; }
        if (s.workLifeBalance) { totalScore += s.workLifeBalance * 10; count++; }
        if (s.salary) { 
          // Relative salary scoring
          const salaryScore = Math.min(100, Math.round((s.salary / 50000) * 80));
          totalScore += salaryScore;
          count++;
        }
        if (s.travelTimeMin) {
          // Lower travel time is better
          const travelScore = Math.max(20, 100 - (s.travelTimeMin * 0.8));
          totalScore += travelScore;
          count++;
        }
        const overallScore = count > 0 ? Math.round(totalScore / count) : 75;
        return { ...opt, overallScore: opt.overallScore || overallScore };
      });

      // Best option
      const sorted = [...newDecision.options].sort((a, b) => (b.overallScore || 0) - (a.overallScore || 0));
      const winner = sorted[0];

      newDecision.recommendation = {
        winner: winner.name,
        confidencePercentage: winner.overallScore,
        summary: `${winner.name} achieves the highest multi-criteria score (${winner.overallScore}%). Review your personal trade-offs before finalizing.`,
        tradeOffs: winner.pros && winner.pros.length > 0 ? `Key Advantages: ${winner.pros.join(', ')}` : "Balanced trajectory."
      };
    }

    this.data.decisions.unshift(newDecision);
    return newDecision;
  }

  // Smart Planner
  getSmartPlannerData() {
    // Re-prioritize dynamically based on tasks
    const activeTasks = this.data.tasks.filter(t => !t.completed);
    
    // Compute priority rank for each task
    const ranked = activeTasks.map(t => {
      const urgencyScore = t.urgency || 5;
      const importanceScore = t.importance || 5;
      const weight = (urgencyScore * 0.6) + (importanceScore * 0.4);
      return {
        ...t,
        weight
      };
    }).sort((a, b) => b.weight - a.weight);

    const dailyPriorityList = ranked.map((t, index) => {
      let badge = "🟡 P3 - Normal";
      if (index === 0) badge = "🔴 P1 - Highest Priority";
      else if (index === 1) badge = "🔴 P2 - Critical Focus";
      else if (t.weight >= 7.5) badge = "🟠 P2 - Urgent Action";

      return {
        id: t.id,
        rank: index + 1,
        badge,
        title: t.title,
        action: `Execute high-focus block for ${t.category}`,
        timeAllocated: `${t.estimatedMinutes ? Math.round(t.estimatedMinutes / 60 * 10) / 10 : 1.0} hrs`
      };
    });

    return {
      dailyPriorityList: dailyPriorityList.length > 0 ? dailyPriorityList : this.data.smartPlanner.dailyPriorityList,
      weeklyDistribution: this.data.smartPlanner.weeklyDistribution,
      aiInsight: activeTasks.length > 0 
        ? `You have ${activeTasks.length} active priority tasks. We recommend knocking out "${activeTasks[0].title}" first before switching context.`
        : "All high-priority tasks completed! Excellent momentum. Plan tomorrow's learning goals."
    };
  }

  // Finance
  getFinanceData() {
    return this.data.finance;
  }

  addTransaction(tx) {
    const newTx = {
      id: `tx_${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...tx
    };
    this.data.finance.recentTransactions.unshift(newTx);
    if (newTx.type === 'expense') {
      this.data.finance.monthlyExpense += Number(newTx.amount);
      this.data.finance.monthlySavings = this.data.finance.monthlyIncome - this.data.finance.monthlyExpense;
    } else if (newTx.type === 'income') {
      this.data.finance.monthlyIncome += Number(newTx.amount);
      this.data.finance.monthlySavings = this.data.finance.monthlyIncome - this.data.finance.monthlyExpense;
    }
    return newTx;
  }

  updateBill(id, updates) {
    const idx = this.data.finance.bills.findIndex(b => b.id === id);
    if (idx !== -1) {
      this.data.finance.bills[idx] = { ...this.data.finance.bills[idx], ...updates };
      return this.data.finance.bills[idx];
    }
    return null;
  }

  // Career
  getCareerData() {
    return this.data.career;
  }

  addJobApplication(job) {
    const newJob = {
      id: `job_${Date.now()}`,
      appliedDate: new Date().toISOString().split('T')[0],
      ...job
    };
    this.data.career.jobApplications.unshift(newJob);
    return newJob;
  }

  // Learning
  getLearningData() {
    return this.data.learning;
  }

  // Health
  getHealthData() {
    return this.data.health;
  }

  toggleHabit(id) {
    const habit = this.data.health.habits.find(h => h.id === id);
    if (habit) {
      habit.todayCompleted = !habit.todayCompleted;
      if (habit.todayCompleted) {
        habit.streak += 1;
        this.addNotification({
          type: "success",
          title: "Habit Streak Maintained 🔥",
          message: `"${habit.name}" completed! Streak is now ${habit.streak} days.`
        });
      } else {
        habit.streak = Math.max(0, habit.streak - 1);
      }
      return habit;
    }
    return null;
  }

  addWaterIntake(amountMl = 250) {
    this.data.health.waterIntake.currentMl += amountMl;
    this.data.health.waterIntake.percentage = Math.min(100, Math.round(
      (this.data.health.waterIntake.currentMl / this.data.health.waterIntake.goalMl) * 100
    ));
    return this.data.health.waterIntake;
  }

  // Travel & Documents & Notes
  getTravelData() { return this.data.travel; }
  getDocuments() { return this.data.documents; }
  getRelationships() { return this.data.relationships; }
  getNotes() { return this.data.notes; }

  addNote(note) {
    const newNote = {
      id: `note_${Date.now()}`,
      updatedAt: new Date().toISOString(),
      ...note
    };
    this.data.notes.unshift(newNote);
    return newNote;
  }

  // Notifications
  getNotifications() {
    return this.data.notifications;
  }

  addNotification(notif) {
    const newNotif = {
      id: `notif_${Date.now()}`,
      time: "Just now",
      read: false,
      ...notif
    };
    this.data.notifications.unshift(newNotif);
    return newNotif;
  }

  markNotificationRead(id) {
    const n = this.data.notifications.find(item => item.id === id);
    if (n) n.read = true;
    return n;
  }
}

export const storage = new LifeOSStorage();
