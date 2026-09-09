/**
 * LifeOS User-Isolated Storage & Domain Repository
 * Strict data isolation per userId. Zero automatic fake data for new users.
 * Full CRUD, search, filter, export, and import support.
 */

import { initialSeedData } from '../../../backend/src/seed/seedData.js';

const buildKey = (userId, entity) => `lifeos_user_${userId}_${entity}_v2`;

export const storageRepository = {
  // Helper: Read entity collection
  getCollection(userId, entity) {
    if (!userId) return [];
    try {
      const raw = localStorage.getItem(buildKey(userId, entity));
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  // Helper: Save entity collection
  saveCollection(userId, entity, data) {
    if (!userId) return;
    try {
      localStorage.setItem(buildKey(userId, entity), JSON.stringify(data));
    } catch (e) {
      console.error(`Failed to save ${entity} for user ${userId}:`, e);
    }
  },

  // Helper: Read single object (e.g. settings)
  getObject(userId, entity, defaultValue = null) {
    if (!userId) return defaultValue;
    try {
      const raw = localStorage.getItem(buildKey(userId, entity));
      return raw ? JSON.parse(raw) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  // Helper: Save single object
  saveObject(userId, entity, data) {
    if (!userId) return;
    try {
      localStorage.setItem(buildKey(userId, entity), JSON.stringify(data));
    } catch (e) {
      console.error(`Failed to save object ${entity} for user ${userId}:`, e);
    }
  },

  // ==========================================
  // TRIPS MODULE (FULL CRUD + WORKFLOWS)
  // ==========================================
  getTrips(userId) {
    return this.getCollection(userId, 'trips');
  },

  getTripById(userId, tripId) {
    return this.getTrips(userId).find(t => t.id === tripId) || null;
  },

  createTrip(userId, tripData) {
    const trips = this.getTrips(userId);
    const newTrip = {
      id: `trip_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: tripData.name?.trim() || 'Untitled Adventure',
      destination: tripData.destination?.trim() || 'Destination',
      startDate: tripData.startDate || new Date().toISOString().split('T')[0],
      endDate: tripData.endDate || new Date().toISOString().split('T')[0],
      type: tripData.type || 'Vacation', // Vacation, Business, Adventure, Roadtrip, Family
      travelersCount: Number(tripData.travelersCount) || 1,
      transportation: tripData.transportation || 'Flight',
      accommodation: tripData.accommodation || 'Hotel / Resort',
      budget: Math.max(0, Number(tripData.budget) || 0),
      spent: 0,
      status: tripData.status || 'Planning', // Planning, Booked, In Progress, Completed, Archived
      notes: tripData.notes?.trim() || '',
      itinerary: Array.isArray(tripData.itinerary) ? tripData.itinerary : [],
      packingList: Array.isArray(tripData.packingList) ? tripData.packingList : [],
      expenses: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    trips.unshift(newTrip);
    this.saveCollection(userId, 'trips', trips);
    this.addNotification(userId, {
      type: 'info',
      title: 'New Trip Created',
      message: `Trip to ${newTrip.destination} is now in your planner.`
    });
    return newTrip;
  },

  updateTrip(userId, tripId, updates) {
    const trips = this.getTrips(userId);
    const idx = trips.findIndex(t => t.id === tripId);
    if (idx === -1) return null;

    trips[idx] = {
      ...trips[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    // Recompute spent from attached trip expenses
    if (trips[idx].expenses && Array.isArray(trips[idx].expenses)) {
      trips[idx].spent = trips[idx].expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    }

    this.saveCollection(userId, 'trips', trips);
    return trips[idx];
  },

  deleteTrip(userId, tripId) {
    const trips = this.getTrips(userId).filter(t => t.id !== tripId);
    this.saveCollection(userId, 'trips', trips);
    return true;
  },

  duplicateTrip(userId, tripId) {
    const source = this.getTripById(userId, tripId);
    if (!source) return null;

    const cloned = {
      ...source,
      id: `trip_${Date.now()}_clone`,
      name: `${source.name} (Copy)`,
      status: 'Planning',
      spent: 0,
      expenses: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const trips = this.getTrips(userId);
    trips.unshift(cloned);
    this.saveCollection(userId, 'trips', trips);
    return cloned;
  },

  // Itinerary Item in Trip
  addTripItineraryItem(userId, tripId, item) {
    const trip = this.getTripById(userId, tripId);
    if (!trip) return null;
    const newItem = {
      id: `itin_${Date.now()}`,
      day: Number(item.day) || 1,
      title: item.title?.trim() || 'Activity',
      time: item.time || '10:00 AM',
      location: item.location || '',
      notes: item.notes || ''
    };
    trip.itinerary = trip.itinerary || [];
    trip.itinerary.push(newItem);
    return this.updateTrip(userId, tripId, { itinerary: trip.itinerary });
  },

  deleteTripItineraryItem(userId, tripId, itemId) {
    const trip = this.getTripById(userId, tripId);
    if (!trip) return null;
    trip.itinerary = (trip.itinerary || []).filter(i => i.id !== itemId);
    return this.updateTrip(userId, tripId, { itinerary: trip.itinerary });
  },

  // Packing Item in Trip
  toggleTripPackingItem(userId, tripId, itemIndex) {
    const trip = this.getTripById(userId, tripId);
    if (!trip || !trip.packingList || !trip.packingList[itemIndex]) return null;
    trip.packingList[itemIndex].packed = !trip.packingList[itemIndex].packed;
    return this.updateTrip(userId, tripId, { packingList: trip.packingList });
  },

  addTripPackingItem(userId, tripId, item) {
    const trip = this.getTripById(userId, tripId);
    if (!trip) return null;
    trip.packingList = trip.packingList || [];
    trip.packingList.push({
      item: item.item?.trim() || 'Packing item',
      packed: false,
      category: item.category || 'General'
    });
    return this.updateTrip(userId, tripId, { packingList: trip.packingList });
  },

  // Add Expense tagged to Trip
  addTripExpense(userId, tripId, expenseData) {
    const trip = this.getTripById(userId, tripId);
    if (!trip) return null;

    const newExpense = {
      id: `tripexp_${Date.now()}`,
      title: expenseData.title?.trim() || 'Trip Outflow',
      amount: Number(expenseData.amount) || 0,
      category: expenseData.category || 'Travel',
      date: expenseData.date || new Date().toISOString().split('T')[0]
    };

    trip.expenses = trip.expenses || [];
    trip.expenses.push(newExpense);
    trip.spent = trip.expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

    this.updateTrip(userId, tripId, { expenses: trip.expenses, spent: trip.spent });
    
    // Also record in main expense ledger
    this.createExpense(userId, {
      title: `${trip.name}: ${newExpense.title}`,
      amount: newExpense.amount,
      category: 'Travel',
      date: newExpense.date,
      tripId: tripId,
      tripName: trip.name
    });

    return trip;
  },

  // ==========================================
  // EXPENSES & FINANCIAL LEDGER
  // ==========================================
  getExpenses(userId) {
    return this.getCollection(userId, 'expenses');
  },

  createExpense(userId, data) {
    const expenses = this.getExpenses(userId);
    const newExpense = {
      id: `exp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: data.title?.trim() || 'Expense',
      amount: Math.max(0, Number(data.amount) || 0),
      category: data.category || 'Food',
      date: data.date || new Date().toISOString().split('T')[0],
      paymentMethod: data.paymentMethod || 'UPI',
      tripId: data.tripId || null,
      tripName: data.tripName || null,
      notes: data.notes || '',
      isRecurring: !!data.isRecurring,
      tags: Array.isArray(data.tags) ? data.tags : [],
      createdAt: new Date().toISOString()
    };

    expenses.unshift(newExpense);
    this.saveCollection(userId, 'expenses', expenses);
    return newExpense;
  },

  updateExpense(userId, expenseId, updates) {
    const expenses = this.getExpenses(userId);
    const idx = expenses.findIndex(e => e.id === expenseId);
    if (idx === -1) return null;
    expenses[idx] = { ...expenses[idx], ...updates };
    this.saveCollection(userId, 'expenses', expenses);
    return expenses[idx];
  },

  deleteExpense(userId, expenseId) {
    const expenses = this.getExpenses(userId).filter(e => e.id !== expenseId);
    this.saveCollection(userId, 'expenses', expenses);
    return true;
  },

  // Financial Budgets & Income Settings
  getFinanceProfile(userId) {
    return this.getObject(userId, 'finance_profile', {
      monthlyIncome: 0,
      monthlySavingsTarget: 0,
      budgets: [
        { category: 'Food & Dining', allocated: 0, color: '#10B981' },
        { category: 'Housing & Rent', allocated: 0, color: '#3B82F6' },
        { category: 'Utilities & Bills', allocated: 0, color: '#F59E0B' },
        { category: 'Travel & Transport', allocated: 0, color: '#EC4899' },
        { category: 'Learning & Books', allocated: 0, color: '#8B5CF6' },
        { category: 'Entertainment', allocated: 0, color: '#06B6D4' }
      ],
      bills: [],
      savingsGoals: []
    });
  },

  updateFinanceProfile(userId, profile) {
    this.saveObject(userId, 'finance_profile', profile);
    return profile;
  },

  // ==========================================
  // TASKS MODULE (EISENHOWER & KANBAN)
  // ==========================================
  getTasks(userId) {
    return this.getCollection(userId, 'tasks');
  },

  createTask(userId, data) {
    const tasks = this.getTasks(userId);
    const newTask = {
      id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: data.title?.trim() || 'New Task',
      category: data.category || 'Career',
      priority: data.priority || 'Urgent-Important',
      urgency: Number(data.urgency) || (data.priority?.includes('Urgent') ? 9 : 4),
      importance: Number(data.importance) || (data.priority?.includes('Important') ? 9 : 4),
      estimatedMinutes: Number(data.estimatedMinutes) || 30,
      completed: false,
      completedAt: null,
      dueDate: data.dueDate || null,
      notes: data.notes || '',
      createdAt: new Date().toISOString()
    };

    tasks.unshift(newTask);
    this.saveCollection(userId, 'tasks', tasks);
    return newTask;
  },

  updateTask(userId, taskId, updates) {
    const tasks = this.getTasks(userId);
    const idx = tasks.findIndex(t => t.id === taskId);
    if (idx === -1) return null;

    const completedJustNow = updates.completed && !tasks[idx].completed;
    tasks[idx] = {
      ...tasks[idx],
      ...updates,
      completedAt: completedJustNow ? new Date().toISOString() : (updates.completed ? tasks[idx].completedAt : null)
    };

    this.saveCollection(userId, 'tasks', tasks);
    return tasks[idx];
  },

  deleteTask(userId, taskId) {
    const tasks = this.getTasks(userId).filter(t => t.id !== taskId);
    this.saveCollection(userId, 'tasks', tasks);
    return true;
  },

  // ==========================================
  // GOALS MODULE
  // ==========================================
  getGoals(userId) {
    return this.getCollection(userId, 'goals');
  },

  createGoal(userId, data) {
    const goals = this.getGoals(userId);
    const newGoal = {
      id: `goal_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: data.title?.trim() || 'New Goal',
      category: data.category || 'Career',
      targetDate: data.targetDate || '',
      progress: Math.min(100, Math.max(0, Number(data.progress) || 0)),
      status: data.status || 'In Progress', // In Progress, Achieved, Paused
      milestones: Array.isArray(data.milestones) ? data.milestones : [],
      notes: data.notes || '',
      createdAt: new Date().toISOString()
    };

    goals.unshift(newGoal);
    this.saveCollection(userId, 'goals', goals);
    return newGoal;
  },

  updateGoal(userId, goalId, updates) {
    const goals = this.getGoals(userId);
    const idx = goals.findIndex(g => g.id === goalId);
    if (idx === -1) return null;
    goals[idx] = { ...goals[idx], ...updates };
    this.saveCollection(userId, 'goals', goals);
    return goals[idx];
  },

  deleteGoal(userId, goalId) {
    const goals = this.getGoals(userId).filter(g => g.id !== goalId);
    this.saveCollection(userId, 'goals', goals);
    return true;
  },

  // ==========================================
  // DECISION SUPPORT MODULE (USP)
  // ==========================================
  getDecisions(userId) {
    return this.getCollection(userId, 'decisions');
  },

  createDecision(userId, data) {
    const decisions = this.getDecisions(userId);
    const newDec = {
      id: `dec_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: data.title?.trim() || 'Decision Question',
      category: data.category || 'Career',
      status: data.status || 'Evaluating', // Evaluating, Decided, Archived
      summary: data.summary || '',
      weights: data.weights || { salary: 30, growth: 25, learning: 20, commute: 15, workLife: 10 },
      options: Array.isArray(data.options) ? data.options : [],
      recommendation: data.recommendation || null,
      notes: data.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Calculate dynamic scores if options provided
    if (newDec.options.length > 0) {
      newDec.options = newDec.options.map(opt => {
        const salaryScore = Math.min(100, ((Number(opt.salary) || 30000) / 60000) * 100);
        const growthScore = (Number(opt.growthRating) || 5) * 10;
        const learningScore = (Number(opt.learningRating) || 5) * 10;
        const commuteScore = Math.max(10, 100 - ((Number(opt.travelTimeMin) || 30) * 0.75));
        const workLifeScore = (Number(opt.workLifeRating) || 5) * 10;

        const w = newDec.weights;
        const totalW = (w.salary || 30) + (w.growth || 25) + (w.learning || 20) + (w.commute || 15) + (w.workLife || 10);
        const weightedScore = Math.round(
          ((salaryScore * (w.salary || 30)) +
          (growthScore * (w.growth || 25)) +
          (learningScore * (w.learning || 20)) +
          (commuteScore * (w.commute || 15)) +
          (workLifeScore * (w.workLife || 10))) / (totalW || 1)
        );

        return {
          ...opt,
          overallScore: opt.overallScore || weightedScore
        };
      });

      const sorted = [...newDec.options].sort((a, b) => (b.overallScore || 0) - (a.overallScore || 0));
      const winner = sorted[0];
      newDec.recommendation = {
        winner: winner.name,
        confidencePercentage: winner.overallScore,
        summary: `${winner.name} achieved the highest weighted multi-criteria score (${winner.overallScore}%).`,
        tradeOffs: `Review criteria trade-offs against your individual priorities.`
      };
    }

    decisions.unshift(newDec);
    this.saveCollection(userId, 'decisions', decisions);
    return newDec;
  },

  updateDecision(userId, decId, updates) {
    const decisions = this.getDecisions(userId);
    const idx = decisions.findIndex(d => d.id === decId);
    if (idx === -1) return null;
    decisions[idx] = { ...decisions[idx], ...updates, updatedAt: new Date().toISOString() };
    this.saveCollection(userId, 'decisions', decisions);
    return decisions[idx];
  },

  deleteDecision(userId, decId) {
    const decisions = this.getDecisions(userId).filter(d => d.id !== decId);
    this.saveCollection(userId, 'decisions', decisions);
    return true;
  },

  // ==========================================
  // HABITS, NOTES, DOCUMENTS, RELATIONSHIPS
  // ==========================================
  getHabits(userId) {
    return this.getCollection(userId, 'habits');
  },

  saveHabits(userId, habits) {
    this.saveCollection(userId, 'habits', habits);
  },

  getNotes(userId) {
    return this.getCollection(userId, 'notes');
  },

  createNote(userId, data) {
    const notes = this.getNotes(userId);
    const newNote = {
      id: `note_${Date.now()}`,
      title: data.title?.trim() || 'Untitled Note',
      category: data.category || 'General',
      content: data.content || '',
      updatedAt: new Date().toISOString()
    };
    notes.unshift(newNote);
    this.saveCollection(userId, 'notes', notes);
    return newNote;
  },

  deleteNote(userId, noteId) {
    const notes = this.getNotes(userId).filter(n => n.id !== noteId);
    this.saveCollection(userId, 'notes', notes);
    return true;
  },

  getDocuments(userId) {
    return this.getCollection(userId, 'documents');
  },

  createDocument(userId, data) {
    const docs = this.getDocuments(userId);
    const newDoc = {
      id: `doc_${Date.now()}`,
      title: data.title?.trim() || 'Document',
      number: data.number || 'DOC-001',
      expiryDate: data.expiryDate || '2030-01-01',
      status: 'Valid',
      tags: data.tags || ['Personal'],
      createdAt: new Date().toISOString()
    };
    docs.unshift(newDoc);
    this.saveCollection(userId, 'documents', docs);
    return newDoc;
  },

  getRelationships(userId) {
    return this.getCollection(userId, 'relationships');
  },

  createRelationship(userId, data) {
    const rels = this.getRelationships(userId);
    const newRel = {
      id: `rel_${Date.now()}`,
      name: data.name?.trim() || 'Contact',
      role: data.role || 'Friend',
      relationship: data.relationship || 'Personal',
      birthday: data.birthday || '',
      notes: data.notes || '',
      lastContacted: 'Recently'
    };
    rels.unshift(newRel);
    this.saveCollection(userId, 'relationships', rels);
    return newRel;
  },

  getNotifications(userId) {
    return this.getCollection(userId, 'notifications');
  },

  addNotification(userId, notif) {
    const notifs = this.getNotifications(userId);
    const newNotif = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      time: 'Just now',
      read: false,
      ...notif
    };
    notifs.unshift(newNotif);
    this.saveCollection(userId, 'notifications', notifs);
    return newNotif;
  },

  markNotificationRead(userId, notifId) {
    const notifs = this.getNotifications(userId);
    const n = notifs.find(item => item.id === notifId);
    if (n) n.read = true;
    this.saveCollection(userId, 'notifications', notifs);
    return n;
  },

  // ==========================================
  // DAILY MOOD & GRATITUDE LOGS
  // ==========================================
  getMoodLogs(userId) {
    return this.getCollection(userId, 'moods');
  },

  logMood(userId, { mood, energy, gratitudeNote, tags }) {
    const moods = this.getMoodLogs(userId);
    const today = new Date().toISOString().split('T')[0];
    const existingIdx = moods.findIndex(m => m.date === today);

    const entry = {
      id: `mood_${Date.now()}`,
      date: today,
      mood: mood || 'Productive', // Inspired, Productive, Balanced, Fatigued, Stressed
      energy: Number(energy) || 8, // 1-10
      gratitudeNote: gratitudeNote?.trim() || '',
      tags: Array.isArray(tags) ? tags : [],
      loggedAt: new Date().toISOString()
    };

    if (existingIdx !== -1) {
      moods[existingIdx] = { ...moods[existingIdx], ...entry };
    } else {
      moods.unshift(entry);
    }

    this.saveCollection(userId, 'moods', moods);
    return entry;
  },

  // ==========================================
  // DYNAMIC METRICS CALCULATOR (NO FAKE NUMBERS)
  // ==========================================
  getCalculatedDashboard(userId, user) {
    const trips = this.getTrips(userId);
    const expenses = this.getExpenses(userId);
    const tasks = this.getTasks(userId);
    const habits = this.getHabits(userId);
    const goals = this.getGoals(userId);
    const decisions = this.getDecisions(userId);
    const financeProfile = this.getFinanceProfile(userId);

    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const taskScore = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const completedHabits = habits.filter(h => h.todayCompleted).length;
    const totalHabits = habits.length;
    const habitScore = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0;

    const totalExpenseAmount = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
    const activeTripsCount = trips.filter(t => t.status === 'In Progress' || t.status === 'Planning' || t.status === 'Booked').length;
    const activeGoalsCount = goals.filter(g => g.status === 'In Progress').length;
    const pendingTasksCount = tasks.filter(t => !t.completed).length;

    // Life score only calculates if user has started logging records
    const hasData = totalTasks > 0 || totalHabits > 0 || totalExpenseAmount > 0 || activeTripsCount > 0;
    const overallLifeScore = hasData 
      ? Math.min(100, Math.round((taskScore * 0.4) + (habitScore * 0.3) + (activeGoalsCount > 0 ? 20 : 0) + (totalExpenseAmount > 0 ? 10 : 0)))
      : 0;

    return {
      user: user || { name: 'LifeOS User', role: 'Explorer' },
      hasData,
      lifeScore: {
        overall: overallLifeScore,
        productivity: taskScore,
        habits: habitScore,
        completedTasks,
        totalTasks,
        pendingTasksCount,
        activeTripsCount,
        activeGoalsCount,
        totalExpenses: totalExpenseAmount
      },
      priorityTasks: tasks.filter(t => !t.completed).slice(0, 5),
      recentExpenses: expenses.slice(0, 5),
      upcomingTrips: trips.filter(t => t.status !== 'Completed' && t.status !== 'Archived').slice(0, 3),
      activeGoals: goals.filter(g => g.status === 'In Progress').slice(0, 3),
      recentDecisions: decisions.slice(0, 3)
    };
  },

  // ==========================================
  // DEMO DATA LOADER & CLEANUP (EXPLICIT USER ACTION)
  // ==========================================
  loadDemoData(userId) {
    this.saveCollection(userId, 'trips', JSON.parse(JSON.stringify(initialSeedData.travel || [])));
    this.saveCollection(userId, 'tasks', JSON.parse(JSON.stringify(initialSeedData.tasks || [])));
    this.saveCollection(userId, 'decisions', JSON.parse(JSON.stringify(initialSeedData.decisions || [])));
    this.saveCollection(userId, 'habits', JSON.parse(JSON.stringify(initialSeedData.health?.habits || [])));
    this.saveCollection(userId, 'notes', JSON.parse(JSON.stringify(initialSeedData.notes || [])));
    this.saveCollection(userId, 'documents', JSON.parse(JSON.stringify(initialSeedData.documents || [])));
    this.saveCollection(userId, 'relationships', JSON.parse(JSON.stringify(initialSeedData.relationships || [])));
    
    // Demo expenses
    const demoExpenses = (initialSeedData.finance?.recentTransactions || []).map(t => ({
      id: t.id,
      title: t.title,
      amount: t.amount,
      category: t.category,
      date: t.date,
      paymentMethod: 'UPI'
    }));
    this.saveCollection(userId, 'expenses', demoExpenses);

    this.saveObject(userId, 'finance_profile', {
      monthlyIncome: initialSeedData.finance?.monthlyIncome || 60000,
      monthlySavingsTarget: initialSeedData.finance?.monthlySavings || 37400,
      budgets: initialSeedData.finance?.budgets || [],
      bills: initialSeedData.finance?.bills || [],
      savingsGoals: initialSeedData.finance?.savingsGoals || []
    });

    this.addNotification(userId, {
      type: 'info',
      title: 'Demo Dataset Loaded',
      message: 'Sample data has been loaded for your tour. You can clear it anytime in Settings.'
    });
    return true;
  },

  clearUserData(userId) {
    const keys = ['trips', 'expenses', 'tasks', 'goals', 'decisions', 'habits', 'notes', 'documents', 'relationships', 'notifications', 'finance_profile'];
    keys.forEach(k => {
      try {
        localStorage.removeItem(buildKey(userId, k));
      } catch (e) {
        console.warn(e);
      }
    });
    return true;
  },

  // ==========================================
  // EXPORT / IMPORT (USER DATA OWNERSHIP)
  // ==========================================
  exportAllUserData(userId) {
    return {
      exportedAt: new Date().toISOString(),
      version: 'LifeOS_v2.0',
      trips: this.getTrips(userId),
      expenses: this.getExpenses(userId),
      tasks: this.getTasks(userId),
      goals: this.getGoals(userId),
      decisions: this.getDecisions(userId),
      habits: this.getHabits(userId),
      notes: this.getNotes(userId),
      documents: this.getDocuments(userId),
      relationships: this.getRelationships(userId),
      financeProfile: this.getFinanceProfile(userId)
    };
  },

  importUserData(userId, payload) {
    if (!payload || typeof payload !== 'object') {
      return { success: false, error: 'Invalid backup format' };
    }

    if (Array.isArray(payload.trips)) this.saveCollection(userId, 'trips', payload.trips);
    if (Array.isArray(payload.expenses)) this.saveCollection(userId, 'expenses', payload.expenses);
    if (Array.isArray(payload.tasks)) this.saveCollection(userId, 'tasks', payload.tasks);
    if (Array.isArray(payload.goals)) this.saveCollection(userId, 'goals', payload.goals);
    if (Array.isArray(payload.decisions)) this.saveCollection(userId, 'decisions', payload.decisions);
    if (Array.isArray(payload.habits)) this.saveCollection(userId, 'habits', payload.habits);
    if (Array.isArray(payload.notes)) this.saveCollection(userId, 'notes', payload.notes);
    if (Array.isArray(payload.documents)) this.saveCollection(userId, 'documents', payload.documents);
    if (Array.isArray(payload.relationships)) this.saveCollection(userId, 'relationships', payload.relationships);
    if (payload.financeProfile) this.saveObject(userId, 'finance_profile', payload.financeProfile);

    return { success: true };
  }
};
