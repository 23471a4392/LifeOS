import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const CalendarView = () => {
  const { tasks, learning, finance } = useLifeOS();
  const [currentMonth, setCurrentMonth] = useState('September 2026');

  const daysInMonth = [
    { day: 1, events: [] },
    { day: 2, events: [] },
    { day: 3, events: [] },
    { day: 4, events: [] },
    { day: 5, events: [] },
    { day: 6, events: [] },
    { day: 7, events: [] },
    { day: 8, events: [] },
    { day: 9, isToday: true, events: ['Sprint Feature Release (Office Work)', 'Review Mutual Funds SIP'] },
    { day: 10, events: ['System Design Assignment Due'] },
    { day: 11, events: [] },
    { day: 12, events: ['Electricity Bill Payment Due (₹1,420)'] },
    { day: 13, events: [] },
    { day: 14, events: [] },
    { day: 15, events: [] },
    { day: 16, events: [] },
    { day: 17, events: [] },
    { day: 18, events: ['Airtel Fiber Broadband Bill'] },
    { day: 19, events: [] },
    { day: 20, events: [] },
    { day: 21, events: [] },
    { day: 22, events: ['Vikram Birthday 🎂'] },
    { day: 23, events: [] },
    { day: 24, events: [] },
    { day: 25, events: ['Apartment Maintenance Due'] },
    { day: 26, events: [] },
    { day: 27, events: [] },
    { day: 28, events: ['Enterprise System Design Exam'] },
    { day: 29, events: [] },
    { day: 30, events: [] },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12 transition-colors duration-200">
      {/* Calendar Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl transition-colors duration-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <CalendarIcon className="w-4 h-4" />
            <span>TIME & COMMITMENTS CALENDAR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Interactive Schedule
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-1">
            Unified view of deadlines, exams, bills, and high-impact appointments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" className="p-2 rounded-xl bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-neutral-800 cursor-pointer">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-neutral-900 text-slate-900 dark:text-white text-xs font-bold font-mono">
            {currentMonth}
          </span>
          <button type="button" className="p-2 rounded-xl bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-neutral-800 cursor-pointer">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Monthly Grid */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl">
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500 pb-3 border-b border-slate-200 dark:border-neutral-800">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>

        <div className="grid grid-cols-7 gap-2 pt-3">
          {daysInMonth.map((d) => (
            <div
              key={d.day}
              className={`min-h-[90px] p-2.5 rounded-2xl border transition-all flex flex-col justify-between ${
                d.isToday
                  ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-400 dark:border-emerald-500/50 shadow-inner'
                  : 'bg-slate-50 dark:bg-neutral-900/50 border-slate-200 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold font-mono ${d.isToday ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-700 dark:text-neutral-300'}`}>
                  {d.day}
                </span>
                {d.isToday && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500 text-white font-bold">
                    TODAY
                  </span>
                )}
              </div>

              <div className="space-y-1 mt-1">
                {d.events.map((ev, i) => (
                  <div
                    key={i}
                    className="text-[10px] p-1 rounded-md bg-white dark:bg-neutral-800 text-slate-800 dark:text-neutral-200 border border-slate-200 dark:border-neutral-700 truncate font-medium"
                    title={ev}
                  >
                    {ev}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
