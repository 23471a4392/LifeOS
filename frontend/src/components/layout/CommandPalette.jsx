import React, { useState, useEffect } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import { 
  Search, 
  CheckSquare, 
  Scale, 
  DollarSign, 
  Droplets, 
  Sparkles, 
  ArrowRight, 
  Briefcase, 
  GraduationCap 
} from 'lucide-react';

export const CommandPalette = () => {
  const { 
    isCommandPaletteOpen, 
    setIsCommandPaletteOpen, 
    setActiveTab, 
    tasks = [], 
    logWater,
    setIsQuickAddOpen
  } = useLifeOS();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const quickNavs = [
    { label: 'Go to Dashboard', icon: Sparkles, action: () => { setActiveTab('dashboard'); setIsCommandPaletteOpen(false); } },
    { label: 'Open Decision Comparator', icon: Scale, action: () => { setActiveTab('decisions'); setIsCommandPaletteOpen(false); } },
    { label: 'View Smart Priority Tasks', icon: CheckSquare, action: () => { setActiveTab('tasks'); setIsCommandPaletteOpen(false); } },
    { label: 'Check Finance & Bills', icon: DollarSign, action: () => { setActiveTab('finance'); setIsCommandPaletteOpen(false); } },
    { label: 'Job Applications Hub', icon: Briefcase, action: () => { setActiveTab('career'); setIsCommandPaletteOpen(false); } },
    { label: 'Courses & Exam Schedule', icon: GraduationCap, action: () => { setActiveTab('learning'); setIsCommandPaletteOpen(false); } },
    { label: 'Quick Action: +250ml Water', icon: Droplets, action: () => { logWater(250); setIsCommandPaletteOpen(false); } },
    { label: 'Create New Task / Item', icon: CheckSquare, action: () => { setIsCommandPaletteOpen(false); setIsQuickAddOpen(true); } },
  ];

  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const filteredTasks = safeTasks.filter(t => t.title.toLowerCase().includes(query.toLowerCase()));
  const filteredNavs = quickNavs.filter(n => n.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-xl bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/50">
          <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <input
            type="text"
            placeholder="Type a command, task, or page to jump..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400"
          />
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 border border-slate-300 dark:border-neutral-700">ESC</span>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredNavs.length > 0 && (
            <div>
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">Navigation & Actions</div>
              {filteredNavs.map((nav, idx) => {
                const Icon = nav.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={nav.action}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition-all group text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                      <span>{nav.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 opacity-0 group-hover:opacity-100 transition-all" />
                  </button>
                );
              })}
            </div>
          )}

          {filteredTasks.length > 0 && (
            <div className="pt-2 border-t border-slate-100 dark:border-neutral-800">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">Matching Tasks</div>
              {filteredTasks.slice(0, 4).map(task => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => {
                    setActiveTab('tasks');
                    setIsCommandPaletteOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition-all text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className={`w-2 h-2 rounded-full ${task.completed ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <span className="truncate">{task.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-neutral-500 font-mono">{task.category}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-neutral-950/60 border-t border-slate-200 dark:border-neutral-800/60 text-[11px] text-slate-500 dark:text-neutral-400">
          <span>Navigate with <kbd className="px-1 bg-slate-200 dark:bg-neutral-800 rounded">↑</kbd> <kbd className="px-1 bg-slate-200 dark:bg-neutral-800 rounded">↓</kbd></span>
          <span>Press <kbd className="px-1 bg-slate-200 dark:bg-neutral-800 rounded">ESC</kbd> to close</span>
        </div>
      </div>
      <div className="fixed inset-0 -z-10" onClick={() => setIsCommandPaletteOpen(false)} />
    </div>
  );
};
