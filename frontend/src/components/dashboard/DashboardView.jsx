import React from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import { useTheme } from '../../context/ThemeContext';
import { RealHandWave } from '../common/RealHandWave';
import { MoodTrackerWidget } from './MoodTrackerWidget';
import {
  CheckCircle2,
  Circle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Calendar,
  CreditCard,
  Droplets,
  Flame,
  Clock,
  Plus,
  Printer
} from 'lucide-react';

export const DashboardView = () => {
  const {
    user,
    lifeScore,
    tasks = [],
    toggleTask,
    smartPlanner,
    finance,
    learning,
    health,
    logWater,
    setActiveTab,
    setIsQuickAddOpen,
    setIsReportModalOpen
  } = useLifeOS();

  const { theme, setTheme, toggleTheme } = useTheme();

  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const activeTasks = safeTasks.filter(t => !t.completed);
  const completedTasks = safeTasks.filter(t => t.completed);

  return (
    <div className="space-y-6 animate-fade-in pb-12 transition-colors duration-200">
      {/* Top Greeting & Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors duration-200">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-emerald-500/10 to-transparent pointer-events-none" />
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            LIFE ENGINE SYNCHRONIZED
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center">
            <span>Good Morning, {user?.name?.split(' ')[0] || 'Ramya'}</span>
            <RealHandWave className="w-8 h-8 ml-2" />
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-1 max-w-xl">
            You have <strong className="text-slate-900 dark:text-white font-semibold">{activeTasks.length} high-impact tasks</strong> scheduled today. Your holistic Life Score is running high at <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">{lifeScore?.overall || 88}%</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => setIsReportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-800 dark:text-neutral-200 border border-slate-200 dark:border-neutral-800 text-xs font-semibold transition-all shadow-sm cursor-pointer"
          >
            <Printer className="w-4 h-4 text-emerald-500" />
            <span>Generate PDF Report</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('decisions')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all shadow-sm cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <span>Decision Support</span>
          </button>

          <button
            type="button"
            onClick={() => setIsQuickAddOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Item</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Life Score Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-neutral-800 shadow-sm relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-neutral-400">Holistic Life Score</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">{lifeScore?.overall || 88}%</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">+4% this week</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 dark:bg-neutral-900 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-700" style={{ width: `${lifeScore?.overall || 88}%` }} />
          </div>
        </div>

        {/* Focus Tasks Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-neutral-800 shadow-sm relative overflow-hidden group hover:border-blue-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-neutral-400">Tasks Completed</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">{completedTasks.length} <span className="text-sm font-normal text-slate-400">/ {safeTasks.length}</span></span>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              {Math.round((completedTasks.length / (safeTasks.length || 1)) * 100)}% done
            </span>
          </div>
          <div className="mt-3 w-full bg-slate-100 dark:bg-neutral-900 rounded-full h-1.5 overflow-hidden">
            <div className="bg-blue-500 h-full rounded-full transition-all duration-700" style={{ width: `${(completedTasks.length / (safeTasks.length || 1)) * 100}%` }} />
          </div>
        </div>

        {/* Habit Streaks Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-neutral-800 shadow-sm relative overflow-hidden group hover:border-orange-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-neutral-400">Best Habit Streak</span>
            <div className="p-2 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">24 <span className="text-sm font-normal text-slate-400">Days</span></span>
            <span className="text-xs font-semibold text-orange-600 dark:text-orange-400">Coding Streak</span>
          </div>
          <div className="mt-3 text-[11px] text-slate-500 dark:text-neutral-400">
            {health?.habits?.filter(h => h.todayCompleted).length || 2} of {health?.habits?.length || 5} habits ticked today
          </div>
        </div>

        {/* Water Hydration Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-neutral-800 shadow-sm relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-neutral-400">Hydration (3L Goal)</span>
            <button
              type="button"
              onClick={() => logWater(250)}
              className="px-2 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 rounded-lg text-[10px] font-bold border border-cyan-500/30 transition-all flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> 250ml
            </button>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">{health?.waterIntake?.currentMl || 2250} <span className="text-sm font-normal text-slate-400">ml</span></span>
            <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">{health?.waterIntake?.percentage || 75}%</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 dark:bg-neutral-900 rounded-full h-1.5 overflow-hidden">
            <div className="bg-cyan-500 h-full rounded-full transition-all duration-700" style={{ width: `${health?.waterIntake?.percentage || 75}%` }} />
          </div>
        </div>
      </div>

      {/* Main Grid: Priority Tasks + AI Smart Planner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Priority Action Tasks (2 Columns) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Priority Action Queue</span>
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  {activeTasks.length} Pending
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-neutral-400">Sorted by urgency, importance, and deadline impact</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('tasks')}
              className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1 group cursor-pointer"
            >
              <span>View All Tasks</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="space-y-2.5 pt-2">
            {activeTasks.slice(0, 5).map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-850 hover:border-emerald-500/50 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <button type="button" className="text-slate-400 dark:text-neutral-400 group-hover:text-emerald-500 transition-colors">
                    <Circle className="w-5 h-5 text-slate-400 dark:text-neutral-500 group-hover:text-emerald-500" />
                  </button>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-neutral-200 group-hover:text-emerald-600 dark:group-hover:text-white truncate">
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300">
                        {task.category}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-neutral-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {task.estimatedMinutes ? `${task.estimatedMinutes}m` : '30m'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span className={`text-[10px] px-2.5 py-1 rounded-xl font-semibold border ${
                    task.priority === 'Urgent-Important'
                      ? 'bg-red-500/10 text-red-600 dark:text-red-300 border-red-500/30'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/30'
                  }`}>
                    {task.priority === 'Urgent-Important' ? '🔴 Urgent' : '🟡 Focus'}
                  </span>
                </div>
              </div>
            ))}

            {completedTasks.slice(0, 2).map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 dark:bg-neutral-950/40 border border-slate-200 dark:border-neutral-900 opacity-60 hover:opacity-100 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <h3 className="text-xs font-medium text-slate-400 dark:text-neutral-400 line-through truncate">
                      {task.title}
                    </h3>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">Completed today</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400 dark:text-neutral-500">Done</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Life Planner Recommendation Card (1 Column) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl flex flex-col justify-between transition-colors duration-200">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                  <BrainCircuit className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">AI Life Planner</h3>
                  <p className="text-[11px] text-indigo-600 dark:text-indigo-300">Algorithmic Focus Advisor</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/15 text-indigo-600 dark:text-indigo-300">Live</span>
            </div>

            {/* Smart Quote */}
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-neutral-900 border border-indigo-100 dark:border-neutral-800 text-xs text-indigo-900 dark:text-indigo-200 leading-relaxed italic">
              "{smartPlanner?.aiInsight || 'Focus on your assignment first. Complete Office Work by 4 PM and allocate 1 hour for Python learning.'}"
            </div>

            {/* Top Algorithmic Rankings */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-2">
                Today's Ranked Sequence
              </div>
              <div className="space-y-2">
                {smartPlanner?.dailyPriorityList?.slice(0, 4).map((p) => (
                  <div key={p.rank} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-5 h-5 rounded-lg bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                        {p.rank}
                      </span>
                      <span className="text-slate-800 dark:text-neutral-200 font-medium truncate">{p.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 shrink-0">{p.timeAllocated}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('planner')}
            className="w-full mt-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Open Smart Planner Engine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Daily Mood & Gratitude Tracker */}
      <MoodTrackerWidget />

      {/* Bottom Grid: Upcoming Calendar Events & Upcoming Bills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Exams & Milestones */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Upcoming Exams & Commitments</h3>
                <p className="text-[11px] text-slate-500 dark:text-neutral-400">Target dates & countdowns</p>
              </div>
            </div>
            <button type="button" onClick={() => setActiveTab('learning')} className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-semibold cursor-pointer">
              Manage
            </button>
          </div>

          <div className="space-y-2.5">
            {learning?.upcomingExams?.map(exam => (
              <div key={exam.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800">
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-white">{exam.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono mt-0.5">Scheduled for {exam.date}</p>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-xl bg-purple-500/15 text-purple-700 dark:text-purple-300 border border-purple-500/30 text-xs font-bold font-mono">
                    {exam.daysRemaining} days left
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Bills & Finance Alert */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Upcoming Bills & Subscriptions</h3>
                <p className="text-[11px] text-slate-500 dark:text-neutral-400">Avoid late fees & track outflow</p>
              </div>
            </div>
            <button type="button" onClick={() => setActiveTab('finance')} className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-semibold cursor-pointer">
              View Finance
            </button>
          </div>

          <div className="space-y-2.5">
            {finance?.bills?.slice(0, 3).map(bill => (
              <div key={bill.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800">
                <div>
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-white">{bill.name}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono mt-0.5">Due: {bill.dueDate}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-900 dark:text-white font-mono">₹{bill.amount.toLocaleString()}</div>
                  <span className={`text-[10px] font-semibold ${bill.status === 'Pending' ? 'text-red-500' : 'text-amber-600'}`}>
                    {bill.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
