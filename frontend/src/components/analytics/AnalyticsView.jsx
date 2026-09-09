import React from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import {
  BarChart3,
  TrendingUp,
  Activity,
  Layers,
  Sparkles,
  Calendar
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';

export const AnalyticsView = () => {
  const { lifeScore, health, finance } = useLifeOS();

  const dimensionData = [
    { dimension: 'Career', score: lifeScore?.metrics?.career || 92, target: 95 },
    { dimension: 'Finance', score: lifeScore?.metrics?.finance || 85, target: 90 },
    { dimension: 'Productivity', score: lifeScore?.metrics?.productivity || 89, target: 90 },
    { dimension: 'Learning', score: lifeScore?.metrics?.learning || 90, target: 95 },
    { dimension: 'Health', score: lifeScore?.metrics?.health || 82, target: 88 },
    { dimension: 'Relationships', score: lifeScore?.metrics?.relationships || 86, target: 85 }
  ];

  const sleepData = (health?.sleepHistory && health.sleepHistory.length > 0)
    ? health.sleepHistory.map(s => ({ name: s.day, hours: s.hours }))
    : [
        { name: 'Mon', hours: 7.5 },
        { name: 'Tue', hours: 8.0 },
        { name: 'Wed', hours: 7.2 },
        { name: 'Thu', hours: 7.8 },
        { name: 'Fri', hours: 8.2 },
        { name: 'Sat', hours: 8.5 },
        { name: 'Sun', hours: 8.0 }
      ];

  return (
    <div className="space-y-6 animate-fade-in pb-12 transition-colors duration-200">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl transition-colors duration-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>360° LIFE ANALYTICS & TRENDS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Life Equilibrium & Performance
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-1">
            Quantified insights across career velocity, financial savings, habit consistency, and health recovery.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-center min-w-[160px]">
          <span className="text-[10px] text-slate-500 dark:text-neutral-400 uppercase font-mono tracking-wider">Aggregate Life Score</span>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">{lifeScore?.overall || 88}%</div>
        </div>
      </div>

      {/* 360 Dimension Bar Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">6-Pillar Life Dimension Breakdown</h2>
            <p className="text-xs text-slate-500 dark:text-neutral-400">Current performance vs benchmark targets</p>
          </div>
          <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">High Harmony</span>
        </div>

        <div className="h-64 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dimensionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
              <XAxis dataKey="dimension" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="score" name="Current Score" fill="#10B981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="target" name="Quarterly Target" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 7-Day Sleep & Recovery Trend */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Weekly Sleep & Recovery Trend</h2>
            <p className="text-xs text-slate-500 dark:text-neutral-400">Average: 7.9 hours/night</p>
          </div>
          <span className="text-xs font-mono text-purple-600 dark:text-purple-400 font-semibold">Optimal Recovery</span>
        </div>

        <div className="h-48 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sleepData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[0, 10]} />
              <Tooltip />
              <Bar dataKey="hours" name="Sleep Hours" fill="#8B5CF6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
