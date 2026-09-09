import React from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import {
  HeartPulse,
  Flame,
  Droplets,
  Moon,
  Activity,
  Plus,
  CheckCircle2,
  Circle,
  Sparkles
} from 'lucide-react';

export const HealthView = () => {
  const { health, toggleHabit, logWater } = useLifeOS();

  const waterIntake = health?.waterIntake || { currentMl: 2250, goalMl: 3000, percentage: 75 };
  const todayWorkout = health?.todayWorkout || { name: 'Full Body Conditioning & Core', durationMinutes: 45, caloriesBurned: 380, status: 'Completed' };
  const habits = health?.habits || [
    { id: 'h1', name: '7+ Hours Deep Sleep', streak: 12, todayCompleted: true, target: '7.5 hrs' },
    { id: 'h2', name: 'Morning Code Mastery (1 hr)', streak: 24, todayCompleted: true, target: 'Daily' },
    { id: 'h3', name: '3L Hydration Intake', streak: 9, todayCompleted: false, target: '3000 ml' },
    { id: 'h4', name: 'Cardio & Strength Training', streak: 5, todayCompleted: true, target: '45 mins' },
    { id: 'h5', name: 'Read 20 Pages of Tech Architecture', streak: 18, todayCompleted: false, target: '20 pages' }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12 transition-colors duration-200">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl transition-colors duration-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 mb-1">
            <HeartPulse className="w-4 h-4" />
            <span>HEALTH, HABITS & VITALITY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Daily Habits & Wellness Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-1">
            Build compounding physical & mental routines with streak heatmaps, hydration counters, and sleep logs.
          </p>
        </div>
      </div>

      {/* Hydration & Workout Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Water Hydration Station */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Daily Hydration Tracker</h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400">Target: 3,000 ml per day</p>
              </div>
            </div>
            <span className="text-2xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">
              {waterIntake.currentMl} <span className="text-xs font-normal text-slate-400">/ 3000 ml</span>
            </span>
          </div>

          <div className="w-full bg-slate-200 dark:bg-neutral-900 rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700"
              style={{ width: `${Math.min(100, Math.round((waterIntake.currentMl / 3000) * 100))}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-500 dark:text-neutral-400">{Math.round((waterIntake.currentMl / 3000) * 100)}% achieved today</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => logWater(250)}
                className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> +250 ml
              </button>
              <button
                type="button"
                onClick={() => logWater(500)}
                className="px-3 py-1.5 rounded-xl bg-cyan-800 hover:bg-cyan-700 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> +500 ml
              </button>
            </div>
          </div>
        </div>

        {/* Workout Activity Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Today's Workout</h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400">{todayWorkout.name}</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold">
              {todayWorkout.status}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 text-center">
              <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">{todayWorkout.durationMinutes} mins</div>
              <span className="text-[10px] text-slate-500 dark:text-neutral-400">Session Duration</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 text-center">
              <div className="text-xl font-bold font-mono text-red-600 dark:text-red-400">{todayWorkout.caloriesBurned} kcal</div>
              <span className="text-[10px] text-slate-500 dark:text-neutral-400">Calories Burned</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Habits & Streaks List */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-500 dark:text-orange-400" />
            <span>Active Habit Streaks</span>
          </h2>
          <span className="text-xs text-orange-600 dark:text-orange-400 font-mono font-semibold">Never Break The Chain</span>
        </div>

        <div className="space-y-2.5 pt-2">
          {habits.map(habit => (
            <div
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-850 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <button type="button" className="text-slate-400 dark:text-neutral-400 group-hover:text-emerald-500 cursor-pointer">
                  {habit.todayCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400 dark:text-neutral-500 group-hover:text-emerald-500" />
                  )}
                </button>
                <div>
                  <h4 className={`text-sm font-semibold ${habit.todayCompleted ? 'line-through text-slate-400 dark:text-neutral-500' : 'text-slate-900 dark:text-white'}`}>
                    {habit.name}
                  </h4>
                  <span className="text-[10px] text-slate-500 dark:text-neutral-400 font-mono">Target: {habit.target}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 px-3 py-1 rounded-xl bg-orange-50 dark:bg-orange-500/10 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-500/30 text-xs font-bold font-mono">
                  <Flame className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400" />
                  {habit.streak} Days
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
