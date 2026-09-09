import React from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import {
  LayoutDashboard,
  Scale,
  BrainCircuit,
  CheckSquare,
  Calendar,
  Briefcase,
  DollarSign,
  GraduationCap,
  HeartPulse,
  Plane,
  FolderLock,
  Users,
  FileText,
  BarChart3,
  Settings,
  Sparkles,
  LogOut
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, tasks = [], logout, isAuthenticated } = useLifeOS();

  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const pendingTasksCount = safeTasks.filter(t => !t.completed).length;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'decisions', label: 'Decisions', icon: Scale, badge: 'Support', badgeColor: 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/30' },
    { id: 'planner', label: 'AI Planner', icon: BrainCircuit, badge: 'Smart', badgeColor: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-500/30' },
    { id: 'tasks', label: 'Tasks & Focus', icon: CheckSquare, badge: pendingTasksCount > 0 ? pendingTasksCount : null, badgeColor: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30' },
    { id: 'calendar', label: 'Calendar', icon: Calendar, badge: null },
    { id: 'career', label: 'Career Hub', icon: Briefcase, badge: 'Jobs' },
    { id: 'finance', label: 'Finance Engine', icon: DollarSign, badge: null },
    { id: 'learning', label: 'Learning & Exams', icon: GraduationCap, badge: null },
    { id: 'health', label: 'Health & Habits', icon: HeartPulse, badge: 'Streak' },
    { id: 'travel', label: 'Travel & Trips', icon: Plane, badge: null },
    { id: 'documents', label: 'Document Vault', icon: FolderLock, badge: null },
    { id: 'relationships', label: 'Relationships CRM', icon: Users, badge: null },
    { id: 'notes', label: 'Notes & Ideas', icon: FileText, badge: null },
    { id: 'analytics', label: '360° Life Analytics', icon: BarChart3, badge: null },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
  ];

  return (
    <aside className="w-64 flex flex-col h-screen bg-white dark:bg-[#080808] border-r border-slate-200 dark:border-neutral-800/80 select-none transition-colors duration-200">
      {/* Brand Header */}
      <div 
        onClick={() => setActiveTab('dashboard')} 
        className="flex items-center gap-3 px-6 h-16 border-b border-slate-200 dark:border-neutral-800/80 cursor-pointer hover:bg-slate-50 dark:hover:bg-neutral-900/40 transition-colors"
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/40">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-1.5 font-bold text-base tracking-tight text-slate-900 dark:text-white">
            <span>LifeOS</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">Pro</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-neutral-400 font-medium">Personal Life Command</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">Core Systems</div>
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium cursor-pointer transition-all group ${
                isActive
                  ? 'bg-emerald-50 dark:bg-emerald-600/15 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-500/30 shadow-sm'
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-900/60'
              }`}
            >
              <div className="flex items-center gap-3 pointer-events-none">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-neutral-500 group-hover:text-slate-700 dark:group-hover:text-neutral-200'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono font-medium border pointer-events-none ${item.badgeColor || 'bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-neutral-300 border-slate-200 dark:border-neutral-700'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom User / Logout Status Box */}
      <div className="p-3.5 border-t border-slate-200 dark:border-neutral-800/80 bg-slate-50 dark:bg-[#050505] space-y-2 transition-colors duration-200">
        <div 
          onClick={() => setActiveTab('planner')}
          className="cursor-pointer hover:bg-slate-100 dark:hover:bg-neutral-900/50 p-2 rounded-xl transition-colors"
        >
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400 mb-1">
            <span>Daily Momentum</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold font-mono">88%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-neutral-900 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500" style={{ width: '88%' }} />
          </div>
        </div>

        {isAuthenticated && (
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 text-xs font-semibold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout Session</span>
          </button>
        )}
      </div>
    </aside>
  );
};
