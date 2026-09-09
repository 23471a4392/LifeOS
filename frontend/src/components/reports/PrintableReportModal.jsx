import React from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import {
  Printer,
  Download,
  X,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  DollarSign,
  HeartPulse,
  Plane,
  FolderLock,
  Calendar
} from 'lucide-react';

export const PrintableReportModal = ({ isOpen, onClose }) => {
  const {
    user,
    lifeScore,
    tasks = [],
    expenses = [],
    finance,
    travel = [],
    health,
    documents = []
  } = useLifeOS();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const completedTasks = safeTasks.filter(t => t.completed);
  const pendingTasks = safeTasks.filter(t => !t.completed);
  const totalExpense = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const monthlyIncome = finance?.monthlyIncome || 60000;
  const netSavings = Math.max(0, monthlyIncome - totalExpense);
  const savingsRate = monthlyIncome > 0 ? Math.round((netSavings / monthlyIncome) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white animate-fade-in">
      {/* Container */}
      <div className="w-full max-w-4xl bg-white dark:bg-[#0C0C0C] text-slate-900 dark:text-neutral-100 border border-slate-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-8 print:my-0 print:border-none print:shadow-none print:bg-white print:text-black">
        {/* Top Control Bar (Hidden on print) */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/50 print:hidden">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-wider">LifeOS Executive Monthly Performance Report</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save to PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Report Document Body */}
        <div className="p-8 space-y-6 print:p-6 print:space-y-4 font-sans">
          {/* Header Banner */}
          <div className="flex items-start justify-between border-b border-slate-200 dark:border-neutral-800 pb-6 print:border-slate-300">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold mb-1">
                <span>LIFEOS PERSONAL INTELLIGENCE REPORT</span>
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white print:text-black">
                {user?.name || 'Ramya Sri'} — Executive Summary
              </h1>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
                Role: <strong className="text-slate-800 dark:text-neutral-200">{user?.role || 'Senior Software Engineer'}</strong> • Generated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}
              </p>
            </div>

            <div className="text-right">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center">
                <span className="text-[10px] uppercase font-mono font-bold text-emerald-600 dark:text-emerald-400">Holistic Life Score</span>
                <div className="text-3xl font-extrabold font-mono text-emerald-600 dark:text-emerald-400">{lifeScore?.overall || 88}%</div>
              </div>
            </div>
          </div>

          {/* Key Performance Indicators */}
          <div className="grid grid-cols-4 gap-3 print:grid-cols-4">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 print:border-slate-200">
              <span className="text-[10px] text-slate-500 dark:text-neutral-400 font-medium">Task Velocity</span>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white print:text-black mt-1">
                {completedTasks.length} <span className="text-xs text-slate-400">/ {safeTasks.length}</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">{Math.round((completedTasks.length / (safeTasks.length || 1)) * 100)}% Finished</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 print:border-slate-200">
              <span className="text-[10px] text-slate-500 dark:text-neutral-400 font-medium">Net Savings Rate</span>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white print:text-black mt-1">{savingsRate}%</div>
              <span className="text-[10px] text-blue-600 font-semibold">₹{netSavings.toLocaleString()} Saved</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 print:border-slate-200">
              <span className="text-[10px] text-slate-500 dark:text-neutral-400 font-medium">Habit Consistency</span>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white print:text-black mt-1">24 Days</div>
              <span className="text-[10px] text-orange-600 font-semibold">Longest Active Streak</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 print:border-slate-200">
              <span className="text-[10px] text-slate-500 dark:text-neutral-400 font-medium">Active Expeditions</span>
              <div className="text-lg font-bold font-mono text-slate-900 dark:text-white print:text-black mt-1">{travel.length} Trips</div>
              <span className="text-[10px] text-purple-600 font-semibold">In Planner</span>
            </div>
          </div>

          {/* Section 1: Financial Performance Summary */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/40 border border-slate-200 dark:border-neutral-800 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
              <span>Financial Ledger & Expense Breakdown</span>
            </h3>
            <div className="grid grid-cols-3 gap-3 text-xs pt-1">
              <div>Monthly Income: <strong className="font-mono">₹{monthlyIncome.toLocaleString()}</strong></div>
              <div>Total Outflow: <strong className="font-mono text-rose-500">₹{totalExpense.toLocaleString()}</strong></div>
              <div>Net Retained Capital: <strong className="font-mono text-emerald-600">₹{netSavings.toLocaleString()}</strong></div>
            </div>
          </div>

          {/* Section 2: Priority Tasks & Execution */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-neutral-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
              <span>Key Focus Tasks & Execution Queue</span>
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {safeTasks.slice(0, 6).map((task, idx) => (
                <div key={task.id || idx} className="p-2.5 rounded-xl border border-slate-200 dark:border-neutral-800 flex items-center justify-between">
                  <span className={`truncate font-medium ${task.completed ? 'line-through text-slate-400' : ''}`}>{task.title}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 shrink-0">
                    {task.completed ? 'Done' : task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Trips & Document Expiries */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-neutral-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-neutral-200 flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5 text-purple-500" />
                <span>Upcoming Expeditions</span>
              </h4>
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-neutral-400">
                {travel.slice(0, 2).map((t, i) => (
                  <div key={t.id || i} className="flex justify-between border-b border-slate-100 dark:border-neutral-900 pb-1">
                    <span>{t.destination} ({t.name})</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">₹{t.budget?.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-neutral-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-neutral-200 flex items-center gap-1.5">
                <FolderLock className="w-3.5 h-3.5 text-sky-500" />
                <span>Document Expiry Alerts</span>
              </h4>
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-neutral-400">
                {documents.slice(0, 2).map((doc, i) => (
                  <div key={doc.id || i} className="flex justify-between border-b border-slate-100 dark:border-neutral-900 pb-1">
                    <span>{doc.title}</span>
                    <span className="font-mono text-emerald-600 font-semibold">{doc.status || 'Valid'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Document Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-neutral-800 text-center text-[10px] text-slate-400 dark:text-neutral-500 font-mono">
            LifeOS Automated Personal Intelligence Engine • 100% Client-Side Privacy Scoped
          </div>
        </div>
      </div>
    </div>
  );
};
