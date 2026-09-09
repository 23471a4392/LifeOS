import express from 'express';
import * as ctrl from '../controllers/mainController.js';

const router = express.Router();

// Health check
router.get('/health', (req, res) => res.json({ status: 'healthy', timestamp: new Date().toISOString() }));

// Auth & Profile
router.post('/auth/login', ctrl.login);
router.post('/auth/register', ctrl.register);
router.get('/auth/profile', ctrl.getProfile);
router.put('/auth/profile', ctrl.updateProfile);

// Dashboard
router.get('/dashboard', ctrl.getDashboardSummary);
router.get('/dashboard/lifescore', ctrl.getLifeScore);

// Tasks
router.get('/tasks', ctrl.getTasks);
router.post('/tasks', ctrl.createTask);
router.put('/tasks/:id', ctrl.updateTask);
router.delete('/tasks/:id', ctrl.deleteTask);

// Decision Engine 🔥
router.get('/decisions', ctrl.getDecisions);
router.get('/decisions/:id', ctrl.getDecisionById);
router.post('/decisions', ctrl.createDecision);

// Smart Planner 🤖
router.get('/planner', ctrl.getSmartPlanner);

// Finance
router.get('/finance', ctrl.getFinance);
router.post('/finance/transaction', ctrl.addTransaction);
router.put('/finance/bills/:id', ctrl.updateBill);

// Career
router.get('/career', ctrl.getCareer);
router.post('/career/jobs', ctrl.addJobApplication);

// Learning
router.get('/learning', ctrl.getLearning);

// Health & Habits
router.get('/health', ctrl.getHealth);
router.post('/health/habits/:id/toggle', ctrl.toggleHabit);
router.post('/health/water', ctrl.logWater);

// Travel, Documents, Relationships, Notes
router.get('/travel', ctrl.getTravel);
router.get('/documents', ctrl.getDocuments);
router.get('/relationships', ctrl.getRelationships);
router.get('/notes', ctrl.getNotes);
router.post('/notes', ctrl.addNote);

// Notifications
router.get('/notifications', ctrl.getNotifications);
router.put('/notifications/:id/read', ctrl.markNotificationRead);

export default router;
