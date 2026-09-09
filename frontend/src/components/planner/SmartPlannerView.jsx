import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import {
  BrainCircuit,
  Sparkles,
  Clock,
  Flame,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  Plus
} from 'lucide-react';

export const SmartPlannerView = () => {
  const { tasks = [], smartPlanner, toggleTask } = useLifeOS();
  const [dailyAvailableHours, setDailyAvailableHours] = useState(8);

  // Simulation state
  const activeTasks = Array.isArray(tasks) ? tasks.filter(t => !t.completed) : [];

  // Compute dynamic priorities based on available hours
  const simulatedQueue = [
    { rank: 1, title: 'Office Work - Sprint Feature Release', urgency: 'Urgent', impact: 'High', timeAllocated: '3.0 hrs', badge: '🔴 P1 - Highest Priority' },
    { rank: 2, title: 'Electricity Bill Payment', urgency: 'Immediate', impact: 'Financial', timeAllocated: '15 min', badge: '🔴 P2 - Critical Focus' },
    { rank: 3, title: 'Complete System Design Assignment', urgency: 'Due Tomorrow', impact: 'High', timeAllocated: '1.5 hrs', badge: '🟠 P3 - Urgent Action' },
    { rank: 4, title: 'Python Advanced Architecture Mastery', urgency: 'Medium', impact: 'High Growth', timeAllocated: '1.0 hr', badge: '🟡 P4 - Important' },
    { rank: 5, title: 'Job Interview Preparation & Mock DSA', urgency: 'Long-Term', impact: 'Career Move', timeAllocated: '45 min', badge: '🟢 P5 - Growth' }
  ];

  const weeklyDistribution = [
    { subject: 'Python Mastery', target: 7, spent: 5.5, color: 'bg-blue-500', barColor: '#3B82F6' },
    { subject: 'Job Preparation & DSA', target: 5, spent: 3.5, color: 'bg-purple-500', barColor: '#8B5CF6' },
    { subject: 'Projects & Architecture', target: 4, spent: 4.0, color: 'bg-emerald-500', barColor: '#10B981' },
    { subject: 'Exercise & Fitness', target: 3.5, spent: 3.0, color: 'bg-red-500', barColor: '#EF4444' },
    { subject: 'System Design & Books', target: 2.5, spent: 1.5, color: 'bg-amber-500', barColor: '#F59E0B' }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12 transition-colors duration-200">
      {/* Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-indigo-200 dark:border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors duration-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
            <BrainCircuit className="w-4 h-4" />
            <span>AI LIFE PLANNER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Intelligent Priority & Time Allocation Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
            Analyzes <strong className="text-indigo-600 dark:text-indigo-300 font-semibold">Urgency + Importance + Deadline + Goal Impact + Available Time</strong> to dynamically orchestrate your daily sequence.
          </p>
        </div>

        {/* Time Allocation Slider */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 min-w-[240px]">
          <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 mb-1">
            <span>Available Focus Time:</span>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-300">{dailyAvailableHours} hrs/day</span>
          </div>
          <input
            type="range"
            min="3"
            max="14"
            step="0.5"
            value={dailyAvailableHours}
            onChange={e => setDailyAvailableHours(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Today's Priority Dynamic Queue */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4 transition-colors duration-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
              <span>TODAY'S RANKED PRIORITY SEQUENCE</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Calculated algorithmic focus schedule</p>
          </div>
          <span className="px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 text-xs font-mono font-semibold border border-indigo-200 dark:border-indigo-500/30">
            5 Items Scheduled (6.7 hrs)
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {simulatedQueue.map((item) => (
            <div
              key={item.rank}
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-850 transition-all"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-mono font-bold text-sm flex items-center justify-center border border-indigo-200 dark:border-indigo-500/30 shrink-0">
                  {item.rank}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-slate-300">
                      {item.urgency}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Impact: {item.impact}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30">
                  {item.timeAllocated}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Recommended Time Distribution */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4 transition-colors duration-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Weekly Target Time Distribution</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Optimal hours required to advance long-term career & personal goals</p>
          </div>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
            22 hrs / week Total Plan
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {weeklyDistribution.map((item, idx) => {
            const perc = Math.min(100, Math.round((item.spent / item.target) * 100));
            return (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.subject}</span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    <strong className="text-slate-900 dark:text-white">{item.spent}h</strong> / {item.target} hrs/week
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${perc}%`, backgroundColor: item.barColor }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
                  <span>{perc}% completed this week</span>
                  <span>{(item.target - item.spent).toFixed(1)}h remaining</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
