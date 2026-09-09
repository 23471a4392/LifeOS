import { storage } from '../config/storage.js';

// Auth Controllers
export const login = (req, res) => {
  const { email, password } = req.body;
  const user = storage.getUser();
  // Demo or match
  return res.json({
    success: true,
    message: "Welcome back to LifeOS!",
    token: "demo_jwt_token_lifeos_ramya_2026",
    user
  });
};

export const register = (req, res) => {
  const { name, email, role } = req.body;
  const user = storage.updateUser({
    name: name || "Ramya Sri",
    email: email || "ramya@lifeos.dev",
    role: role || "Software Engineer"
  });
  return res.json({
    success: true,
    message: "Registration successful! Welcome to LifeOS.",
    token: "demo_jwt_token_lifeos_ramya_2026",
    user
  });
};

export const getProfile = (req, res) => {
  return res.json({ success: true, user: storage.getUser() });
};

export const updateProfile = (req, res) => {
  const updated = storage.updateUser(req.body);
  return res.json({ success: true, user: updated });
};

// Dashboard & Life Score
export const getDashboardSummary = (req, res) => {
  const user = storage.getUser();
  const lifeScore = storage.getLifeScore();
  const tasks = storage.getTasks();
  const planner = storage.getSmartPlannerData();
  const finance = storage.getFinanceData();
  const health = storage.getHealthData();
  const career = storage.getCareerData();

  return res.json({
    success: true,
    data: {
      user,
      lifeScore,
      priorityTasks: tasks.filter(t => !t.completed).slice(0, 5),
      aiPlanner: planner,
      upcomingBills: finance.bills.filter(b => b.status !== 'Paid'),
      upcomingExams: storage.getLearningData().upcomingExams,
      habits: health.habits,
      waterIntake: health.waterIntake,
      jobApplications: career.jobApplications.slice(0, 3)
    }
  });
};

export const getLifeScore = (req, res) => {
  return res.json({ success: true, data: storage.getLifeScore() });
};

// Tasks & Time
export const getTasks = (req, res) => {
  return res.json({ success: true, data: storage.getTasks() });
};

export const createTask = (req, res) => {
  const task = storage.addTask(req.body);
  return res.status(201).json({ success: true, data: task });
};

export const updateTask = (req, res) => {
  const task = storage.updateTask(req.params.id, req.body);
  if (!task) return res.status(404).json({ success: false, message: "Task not found" });
  return res.json({ success: true, data: task });
};

export const deleteTask = (req, res) => {
  storage.deleteTask(req.params.id);
  return res.json({ success: true, message: "Task deleted successfully" });
};

// Decisions Engine
export const getDecisions = (req, res) => {
  return res.json({ success: true, data: storage.getDecisions() });
};

export const getDecisionById = (req, res) => {
  const dec = storage.getDecisionById(req.params.id);
  if (!dec) return res.status(404).json({ success: false, message: "Decision not found" });
  return res.json({ success: true, data: dec });
};

export const createDecision = (req, res) => {
  const decision = storage.createDecision(req.body);
  return res.status(201).json({ success: true, data: decision });
};

// Smart Planner
export const getSmartPlanner = (req, res) => {
  return res.json({ success: true, data: storage.getSmartPlannerData() });
};

// Finance
export const getFinance = (req, res) => {
  return res.json({ success: true, data: storage.getFinanceData() });
};

export const addTransaction = (req, res) => {
  const tx = storage.addTransaction(req.body);
  return res.status(201).json({ success: true, data: tx });
};

export const updateBill = (req, res) => {
  const bill = storage.updateBill(req.params.id, req.body);
  return res.json({ success: true, data: bill });
};

// Career
export const getCareer = (req, res) => {
  return res.json({ success: true, data: storage.getCareerData() });
};

export const addJobApplication = (req, res) => {
  const job = storage.addJobApplication(req.body);
  return res.status(201).json({ success: true, data: job });
};

// Learning
export const getLearning = (req, res) => {
  return res.json({ success: true, data: storage.getLearningData() });
};

// Health
export const getHealth = (req, res) => {
  return res.json({ success: true, data: storage.getHealthData() });
};

export const toggleHabit = (req, res) => {
  const habit = storage.toggleHabit(req.params.id);
  if (!habit) return res.status(404).json({ success: false, message: "Habit not found" });
  return res.json({ success: true, data: habit });
};

export const logWater = (req, res) => {
  const amount = req.body.amount || 250;
  const water = storage.addWaterIntake(amount);
  return res.json({ success: true, data: water });
};

// Travel & Docs & Relationships & Notes
export const getTravel = (req, res) => res.json({ success: true, data: storage.getTravelData() });
export const getDocuments = (req, res) => res.json({ success: true, data: storage.getDocuments() });
export const getRelationships = (req, res) => res.json({ success: true, data: storage.getRelationships() });
export const getNotes = (req, res) => res.json({ success: true, data: storage.getNotes() });
export const addNote = (req, res) => res.status(201).json({ success: true, data: storage.addNote(req.body) });

// Notifications
export const getNotifications = (req, res) => res.json({ success: true, data: storage.getNotifications() });
export const markNotificationRead = (req, res) => res.json({ success: true, data: storage.markNotificationRead(req.params.id) });
