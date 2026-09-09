import React from 'react';
import { useLifeOS } from './context/LifeOSContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { CommandPalette } from './components/layout/CommandPalette';
import { NotificationCenter } from './components/layout/NotificationCenter';
import { QuickActionModal } from './components/layout/QuickActionModal';
import { ToastContainer } from './components/common/Toast';
import { AuthModal } from './components/auth/AuthModal';
import { PrintableReportModal } from './components/reports/PrintableReportModal';

// Module Views
import { DashboardView } from './components/dashboard/DashboardView';
import { DecisionsView } from './components/decisions/DecisionsView';
import { SmartPlannerView } from './components/planner/SmartPlannerView';
import { TasksView } from './components/tasks/TasksView';
import { CalendarView } from './components/calendar/CalendarView';
import { CareerView } from './components/career/CareerView';
import { FinanceView } from './components/finance/FinanceView';
import { LearningView } from './components/learning/LearningView';
import { HealthView } from './components/health/HealthView';
import { TravelView } from './components/travel/TravelView';
import { DocumentsView } from './components/documents/DocumentsView';
import { RelationshipsView } from './components/relationships/RelationshipsView';
import { NotesView } from './components/notes/NotesView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { SettingsView } from './components/settings/SettingsView';

export function App() {
  const { activeTab, isLoading, isAuthenticated, isReportModalOpen, setIsReportModalOpen } = useLifeOS();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'decisions': return <DecisionsView />;
      case 'planner': return <SmartPlannerView />;
      case 'tasks': return <TasksView />;
      case 'calendar': return <CalendarView />;
      case 'career': return <CareerView />;
      case 'finance': return <FinanceView />;
      case 'learning': return <LearningView />;
      case 'health': return <HealthView />;
      case 'travel': return <TravelView />;
      case 'documents': return <DocumentsView />;
      case 'relationships': return <RelationshipsView />;
      case 'notes': return <NotesView />;
      case 'analytics': return <AnalyticsView />;
      case 'settings': return <SettingsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#000000] text-slate-900 dark:text-neutral-100 overflow-hidden font-sans transition-colors duration-200">
      {/* Fixed Left Navigation Sidebar */}
      <Sidebar />

      {/* Main App Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#F8FAFC] dark:bg-[#000000] transition-colors duration-200">
        <Navbar />

        <main className="flex-1 overflow-y-auto px-6 py-6 md:px-8 bg-[#F8FAFC] dark:bg-[#000000] transition-colors duration-200">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="flex items-center justify-center h-96">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs font-mono text-slate-500 dark:text-neutral-400">Synchronizing LifeOS Engine...</span>
                </div>
              </div>
            ) : !isAuthenticated ? (
              <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-8">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10">
                  <span className="text-2xl font-bold font-mono">OS</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">LifeOS Workspace Locked</h2>
                <p className="text-sm text-slate-500 dark:text-neutral-400 max-w-md mb-6">
                  Please authenticate with your credentials or explore in Demo Mode to access your personalized life command center.
                </p>
                <AuthModal />
              </div>
            ) : (
              renderActiveView()
            )}
          </div>
        </main>
      </div>

      {/* Overlays, Drawers & Modals */}
      <CommandPalette />
      <NotificationCenter />
      <QuickActionModal />
      <PrintableReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
      <AuthModal />
      <ToastContainer />
    </div>
  );
}

export default App;
