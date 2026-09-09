import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService.js';
import { storageRepository } from '../services/storageRepository.js';
import { sounds } from '../services/soundService.js';
import confetti from 'canvas-confetti';

const LifeOSContext = createContext();

export const LifeOSProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Core domain entities
  const [lifeScore, setLifeScore] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [decisions, setDecisions] = useState([]);
  const [smartPlanner, setSmartPlanner] = useState(null);
  const [finance, setFinance] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [career, setCareer] = useState(null);
  const [learning, setLearning] = useState(null);
  const [health, setHealth] = useState({ habits: [], waterIntake: { currentMl: 0, goalMl: 3000 } });
  const [travel, setTravel] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [notes, setNotes] = useState([]);
  const [moodLogs, setMoodLogs] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals & Drawers
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Toast dispatch helper
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  // Confetti trigger
  const triggerConfetti = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  // Load all user scoped data from storage repository
  const refreshData = useCallback((currentUser) => {
    const targetUser = currentUser || user;
    if (!targetUser || !targetUser.id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const uId = targetUser.id;
      const calculatedDash = storageRepository.getCalculatedDashboard(uId, targetUser);
      const userTrips = storageRepository.getTrips(uId);
      const userExpenses = storageRepository.getExpenses(uId);
      const userTasks = storageRepository.getTasks(uId);
      const userGoals = storageRepository.getGoals(uId);
      const userDecisions = storageRepository.getDecisions(uId);
      const userHabits = storageRepository.getHabits(uId);
      const userNotes = storageRepository.getNotes(uId);
      const userDocs = storageRepository.getDocuments(uId);
      const userRels = storageRepository.getRelationships(uId);
      const userNotifs = storageRepository.getNotifications(uId);
      const userFinanceProfile = storageRepository.getFinanceProfile(uId);

      setLifeScore(calculatedDash.lifeScore);
      setTasks(userTasks);
      setGoals(userGoals);
      setDecisions(userDecisions);
      setTravel(userTrips);
      setExpenses(userExpenses);
      setNotes(userNotes);
      setDocuments(userDocs);
      setRelationships(userRels);
      setNotifications(userNotifs);

      // Financial bundle
      setFinance({
        ...userFinanceProfile,
        recentTransactions: userExpenses,
        totalExpenses: userExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0)
      });

      // Health bundle
      setHealth(prev => ({
        ...prev,
        habits: userHabits
      }));

      // Smart planner initial placeholder
      setSmartPlanner({
        todaysFocus: userTasks.length > 0 ? userTasks[0].title : 'Set your first goal or task',
        focusTimeMinutes: 180,
        energyLevel: 'High (Optimal)',
        burnoutRisk: 'Low (Well Paced)'
      });

      // Career bundle
      setCareer({
        currentRole: targetUser.role || 'Professional',
        targetRole: 'Distinguished Lead',
        targetDate: 'Q4 2026',
        readinessScore: userGoals.length > 0 ? 75 : 0,
        skillsGap: [
          { skill: 'System Architecture', current: 4, required: 5 },
          { skill: 'Cross-functional Leadership', current: 3, required: 5 },
          { skill: 'Financial Modeling', current: 3, required: 4 }
        ],
        milestones: userGoals
      });

      // Learning bundle
      setLearning({
        weeklyHoursGoal: 8,
        weeklyHoursCompleted: 5.5,
        courses: [
          { id: 'c1', title: 'Distributed Systems & Scaling', platform: 'O\'Reilly', progress: 80 },
          { id: 'c2', title: 'Behavioral Finance & Decision Matrix', platform: 'Coursera', progress: 45 }
        ],
        books: [
          { id: 'b1', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', pagesRead: 310, totalPages: 499, status: 'Reading' },
          { id: 'b2', title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', pagesRead: 560, totalPages: 560, status: 'Completed' }
        ]
      });

    } catch (e) {
      console.error('Failed to load LifeOS user data:', e);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Session check on mount
  useEffect(() => {
    const session = authService.getActiveSession();
    if (session && session.user) {
      setUser(session.user);
      setIsAuthenticated(true);
      refreshData(session.user);
    } else {
      // Default: Clean state, require authentication
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  // Authentication Handlers
  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    if (res.success && res.user) {
      setUser(res.user);
      setIsAuthenticated(true);
      refreshData(res.user);
      showToast(`Welcome back, ${res.user.name}!`, 'success');
      return { success: true };
    } else {
      showToast(res.error || 'Invalid credentials.', 'error');
      return { success: false, error: res.error };
    }
  };

  const register = async ({ name, email, role, password, confirmPassword }) => {
    const res = await authService.register({ name, email, role, password, confirmPassword });
    if (res.success) {
      showToast(res.message || 'Account registered! Please sign in.', 'success');
      return { success: true, message: res.message, email: res.email };
    } else {
      showToast(res.error || 'Registration failed.', 'error');
      return { success: false, error: res.error };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setIsAuthModalOpen(true);
    showToast('Logged out securely. Session ended.', 'info');
  };

  const loadDemoMode = async () => {
    const res = await authService.login({ email: 'demo@lifeos.dev', password: 'demo123' });
    if (res.success && res.user) {
      storageRepository.loadDemoData(res.user.id);
      setUser(res.user);
      setIsAuthenticated(true);
      refreshData(res.user);
      showToast('Loaded demo dataset for tour.', 'success');
      return { success: true };
    }
  };

  const loadDemoDataForCurrentUser = () => {
    if (!user) return;
    storageRepository.loadDemoData(user.id);
    refreshData(user);
    showToast('Sample demo data loaded into your workspace.', 'success');
  };

  const clearCurrentUserData = () => {
    if (!user) return;
    storageRepository.clearUserData(user.id);
    refreshData(user);
    showToast('Workspace reset to clean zero state.', 'info');
  };

  // Global Keyboard Shortcuts (Cmd/Ctrl + K, Cmd/Ctrl + N)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        setIsQuickAddOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ==========================================
  // TRIP HANDLERS (FULL CRUD)
  // ==========================================
  const createTrip = (tripData) => {
    if (!user) return null;
    const created = storageRepository.createTrip(user.id, tripData);
    if (created) {
      setTravel(prev => [created, ...prev]);
      showToast(`Trip to "${created.destination}" created!`, 'success');
      refreshData(user);
    }
    return created;
  };

  const updateTrip = (tripId, updates) => {
    if (!user) return null;
    const updated = storageRepository.updateTrip(user.id, tripId, updates);
    if (updated) {
      setTravel(prev => prev.map(t => t.id === tripId ? updated : t));
      showToast('Trip updated successfully.', 'success');
      refreshData(user);
    }
    return updated;
  };

  const deleteTrip = (tripId) => {
    if (!user) return;
    storageRepository.deleteTrip(user.id, tripId);
    setTravel(prev => prev.filter(t => t.id !== tripId));
    showToast('Trip removed.', 'info');
    refreshData(user);
  };

  const duplicateTrip = (tripId) => {
    if (!user) return null;
    const cloned = storageRepository.duplicateTrip(user.id, tripId);
    if (cloned) {
      setTravel(prev => [cloned, ...prev]);
      showToast(`Trip cloned: "${cloned.name}"`, 'success');
      refreshData(user);
    }
    return cloned;
  };

  const addTripItineraryItem = (tripId, item) => {
    if (!user) return null;
    const updated = storageRepository.addTripItineraryItem(user.id, tripId, item);
    if (updated) {
      setTravel(prev => prev.map(t => t.id === tripId ? updated : t));
      showToast('Itinerary activity added.', 'success');
    }
    return updated;
  };

  const deleteTripItineraryItem = (tripId, itemId) => {
    if (!user) return null;
    const updated = storageRepository.deleteTripItineraryItem(user.id, tripId, itemId);
    if (updated) {
      setTravel(prev => prev.map(t => t.id === tripId ? updated : t));
      showToast('Itinerary item removed.', 'info');
    }
    return updated;
  };

  const toggleTripPackingItem = (tripId, itemIndex) => {
    if (!user) return null;
    const updated = storageRepository.toggleTripPackingItem(user.id, tripId, itemIndex);
    if (updated) {
      setTravel(prev => prev.map(t => t.id === tripId ? updated : t));
    }
    return updated;
  };

  const addTripPackingItem = (tripId, item) => {
    if (!user) return null;
    const updated = storageRepository.addTripPackingItem(user.id, tripId, item);
    if (updated) {
      setTravel(prev => prev.map(t => t.id === tripId ? updated : t));
      showToast('Item added to packing checklist.', 'success');
    }
    return updated;
  };

  const addTripExpense = (tripId, expenseData) => {
    if (!user) return null;
    const updated = storageRepository.addTripExpense(user.id, tripId, expenseData);
    if (updated) {
      setTravel(prev => prev.map(t => t.id === tripId ? updated : t));
      showToast(`Trip expense ₹${expenseData.amount} logged!`, 'success');
      refreshData(user);
    }
    return updated;
  };

  // ==========================================
  // EXPENSE / FINANCE HANDLERS
  // ==========================================
  const createExpense = (expenseData) => {
    if (!user) return null;
    const created = storageRepository.createExpense(user.id, expenseData);
    if (created) {
      setExpenses(prev => [created, ...prev]);
      showToast(`Recorded expense: ₹${created.amount} (${created.title})`, 'success');
      refreshData(user);
    }
    return created;
  };

  const updateExpense = (expenseId, updates) => {
    if (!user) return null;
    const updated = storageRepository.updateExpense(user.id, expenseId, updates);
    if (updated) {
      setExpenses(prev => prev.map(e => e.id === expenseId ? updated : e));
      showToast('Expense updated.', 'success');
      refreshData(user);
    }
    return updated;
  };

  const deleteExpense = (expenseId) => {
    if (!user) return;
    storageRepository.deleteExpense(user.id, expenseId);
    setExpenses(prev => prev.filter(e => e.id !== expenseId));
    showToast('Expense entry deleted.', 'info');
    refreshData(user);
  };

  const updateFinanceProfile = (profile) => {
    if (!user) return;
    const updated = storageRepository.updateFinanceProfile(user.id, profile);
    setFinance(prev => ({ ...prev, ...updated }));
    showToast('Financial budget profile updated.', 'success');
    refreshData(user);
  };

  // ==========================================
  // TASK HANDLERS
  // ==========================================
  const toggleTask = (id) => {
    if (!user) return;
    const target = tasks.find(t => t.id === id);
    if (!target) return;
    const willComplete = !target.completed;

    const updated = storageRepository.updateTask(user.id, id, { completed: willComplete });
    if (updated) {
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
      if (willComplete) {
        sounds.playSuccess();
        triggerConfetti();
        showToast(`🎉 "${updated.title}" Completed! Life Score Updated!`, 'success');
        
        storageRepository.addNotification(user.id, {
          type: 'success',
          title: 'Task Accomplished',
          message: `Finished: "${updated.title}".`
        });
      }
      refreshData(user);
    }
  };

  const createTask = (taskData) => {
    if (!user) return null;
    const created = storageRepository.createTask(user.id, taskData);
    if (created) {
      setTasks(prev => [created, ...prev]);
      showToast(`Task "${created.title}" added to queue.`, 'info');
      refreshData(user);
    }
    return created;
  };

  const updateTask = (taskId, updates) => {
    if (!user) return null;
    const updated = storageRepository.updateTask(user.id, taskId, updates);
    if (updated) {
      setTasks(prev => prev.map(t => t.id === taskId ? updated : t));
      refreshData(user);
    }
    return updated;
  };

  const deleteTask = (id) => {
    if (!user) return;
    storageRepository.deleteTask(user.id, id);
    setTasks(prev => prev.filter(t => t.id !== id));
    showToast('Task removed.', 'info');
    refreshData(user);
  };

  // ==========================================
  // GOAL HANDLERS
  // ==========================================
  const createGoal = (goalData) => {
    if (!user) return null;
    const created = storageRepository.createGoal(user.id, goalData);
    if (created) {
      setGoals(prev => [created, ...prev]);
      showToast(`Goal "${created.title}" initiated!`, 'success');
      refreshData(user);
    }
    return created;
  };

  const updateGoal = (goalId, updates) => {
    if (!user) return null;
    const updated = storageRepository.updateGoal(user.id, goalId, updates);
    if (updated) {
      setGoals(prev => prev.map(g => g.id === goalId ? updated : g));
      showToast('Goal progress saved.', 'success');
      refreshData(user);
    }
    return updated;
  };

  const deleteGoal = (goalId) => {
    if (!user) return;
    storageRepository.deleteGoal(user.id, goalId);
    setGoals(prev => prev.filter(g => g.id !== goalId));
    showToast('Goal removed.', 'info');
    refreshData(user);
  };

  // ==========================================
  // DECISION MATRIX HANDLERS
  // ==========================================
  const createDecision = (decisionData) => {
    if (!user) return null;
    const created = storageRepository.createDecision(user.id, decisionData);
    if (created) {
      setDecisions(prev => [created, ...prev]);
      showToast(`Decision Matrix "${created.title}" evaluated!`, 'success');
      refreshData(user);
    }
    return created;
  };

  const updateDecision = (decisionId, updates) => {
    if (!user) return null;
    const updated = storageRepository.updateDecision(user.id, decisionId, updates);
    if (updated) {
      setDecisions(prev => prev.map(d => d.id === decisionId ? updated : d));
      showToast('Decision matrix updated.', 'success');
      refreshData(user);
    }
    return updated;
  };

  const deleteDecision = (decisionId) => {
    if (!user) return;
    storageRepository.deleteDecision(user.id, decisionId);
    setDecisions(prev => prev.filter(d => d.id !== decisionId));
    showToast('Decision analysis removed.', 'info');
    refreshData(user);
  };

  // ==========================================
  // HABITS & HEALTH HANDLERS
  // ==========================================
  const toggleHabit = (id) => {
    if (!user) return;
    const currentHabits = storageRepository.getHabits(user.id);
    const updatedHabits = currentHabits.map(h => {
      if (h.id === id) {
        const nextCompleted = !h.todayCompleted;
        return {
          ...h,
          todayCompleted: nextCompleted,
          streak: nextCompleted ? (h.streak || 0) + 1 : Math.max(0, (h.streak || 1) - 1)
        };
      }
      return h;
    });

    storageRepository.saveHabits(user.id, updatedHabits);
    setHealth(prev => ({ ...prev, habits: updatedHabits }));
    sounds.playSuccess();
    triggerConfetti();
    refreshData(user);
  };

  const logWater = (amount = 250) => {
    sounds.playWaterDrop();
    setHealth(prev => ({
      ...prev,
      waterIntake: {
        ...prev.waterIntake,
        currentMl: Math.min(prev.waterIntake.goalMl, prev.waterIntake.currentMl + amount)
      }
    }));
    showToast(`💧 Hydration logged: +${amount}ml`, 'info');
  };

  // ==========================================
  // NOTES & DOCUMENTS & RELATIONSHIPS
  // ==========================================
  const createNote = (noteData) => {
    if (!user) return null;
    const created = storageRepository.createNote(user.id, noteData);
    if (created) {
      setNotes(prev => [created, ...prev]);
      showToast('Note created.', 'success');
    }
    return created;
  };

  const deleteNote = (id) => {
    if (!user) return;
    storageRepository.deleteNote(user.id, id);
    setNotes(prev => prev.filter(n => n.id !== id));
    showToast('Note removed.', 'info');
  };

  const createDocument = (docData) => {
    if (!user) return null;
    const created = storageRepository.createDocument(user.id, docData);
    if (created) {
      setDocuments(prev => [created, ...prev]);
      showToast('Document securely cataloged.', 'success');
    }
    return created;
  };

  const createRelationship = (relData) => {
    if (!user) return null;
    const created = storageRepository.createRelationship(user.id, relData);
    if (created) {
      setRelationships(prev => [created, ...prev]);
      showToast('Contact added to CRM.', 'success');
    }
    return created;
  };

  const markNotificationRead = (id) => {
    if (!user) return;
    storageRepository.markNotificationRead(user.id, id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const logMood = (moodData) => {
    if (!user) return null;
    const created = storageRepository.logMood(user.id, moodData);
    if (created) {
      setMoodLogs(prev => [created, ...prev]);
    }
    return created;
  };

  return (
    <LifeOSContext.Provider
      value={{
        activeTab,
        setActiveTab,
        user,
        setUser,
        isAuthenticated,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        register,
        logout,
        loadDemoMode,
        loadDemoDataForCurrentUser,
        clearCurrentUserData,
        lifeScore,
        tasks,
        goals,
        decisions,
        smartPlanner,
        finance,
        expenses,
        career,
        learning,
        health,
        travel,
        documents,
        relationships,
        notes,
        moodLogs,
        notifications,
        isLoading,
        refreshData,
        // Entity Handlers
        createTask,
        addTask: createTask,
        updateTask,
        deleteTask,
        toggleTask,
        createExpense,
        addExpense: createExpense,
        addTransaction: createExpense,
        updateExpense,
        deleteExpense,
        createTrip,
        addTrip: createTrip,
        updateTrip,
        deleteTrip,
        duplicateTrip,
        addTripItineraryItem,
        deleteTripItineraryItem,
        toggleTripPackingItem,
        addTripPackingItem,
        addTripExpense,
        updateFinanceProfile,
        createGoal,
        updateGoal,
        deleteGoal,
        createDecision,
        addDecision: createDecision,
        updateDecision,
        deleteDecision,
        toggleHabit,
        logWater,
        createNote,
        addNote: createNote,
        deleteNote,
        createDocument,
        createRelationship,
        logMood,
        markNotificationRead,
        // UI Helpers
        showToast,
        triggerConfetti,
        toasts,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isNotificationCenterOpen,
        setIsNotificationCenterOpen,
        isQuickAddOpen,
        setIsQuickAddOpen,
        isReportModalOpen,
        setIsReportModalOpen
      }}
    >
      {children}
    </LifeOSContext.Provider>
  );
};

export const useLifeOS = () => useContext(LifeOSContext);
