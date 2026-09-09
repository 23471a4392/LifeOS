import React, { useState, useEffect } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import { sounds } from '../../services/soundService';
import {
  CheckSquare,
  Circle,
  CheckCircle2,
  Trash2,
  Plus,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  LayoutGrid,
  List,
  Columns,
  Clock,
  Flame
} from 'lucide-react';

export const TasksView = () => {
  const { tasks = [], toggleTask, deleteTask, setIsQuickAddOpen } = useLifeOS();
  const [viewMode, setViewMode] = useState('list'); // 'list', 'eisenhower', 'kanban'

  // Pomodoro Focus Timer State
  const [pomoSeconds, setPomoSeconds] = useState(25 * 60);
  const [isPomoRunning, setIsPomoRunning] = useState(false);
  const [pomoMode, setPomoMode] = useState('focus'); // 'focus' (25m), 'shortBreak' (5m)

  useEffect(() => {
    let interval = null;
    if (isPomoRunning && pomoSeconds > 0) {
      interval = setInterval(() => {
        setPomoSeconds(prev => prev - 1);
      }, 1000);
    } else if (pomoSeconds === 0) {
      sounds.playPomodoroFinish();
      setIsPomoRunning(false);
    }
    return () => clearInterval(interval);
  }, [isPomoRunning, pomoSeconds]);

  const togglePomoTimer = () => setIsPomoRunning(prev => !prev);

  const resetPomo = (mode = 'focus') => {
    setIsPomoRunning(false);
    setPomoMode(mode);
    setPomoSeconds(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const formatPomoTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const activeTasks = safeTasks.filter(t => !t.completed);
  const completedTasks = safeTasks.filter(t => t.completed);

  // Eisenhower Buckets
  const urgentImportant = safeTasks.filter(t => t.priority === 'Urgent-Important' && !t.completed);
  const notUrgentImportant = safeTasks.filter(t => t.priority === 'NotUrgent-Important' && !t.completed);
  const urgentNotImportant = safeTasks.filter(t => t.priority === 'Urgent-NotImportant' && !t.completed);
  const lowImpact = safeTasks.filter(t => t.priority === 'NotUrgent-NotImportant' && !t.completed);

  return (
    <div className="space-y-6 animate-fade-in pb-12 transition-colors duration-200">
      {/* Header & Focus Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl transition-colors duration-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <CheckSquare className="w-4 h-4" />
            <span>TIME & FOCUS MANAGEMENT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Tasks & Execution Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-1">
            Eisenhower Quadrants, Kanban Boards, and Pomodoro Deep Focus engine.
          </p>
        </div>

        {/* Pomodoro Focus Timer Widget */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0F0F0F] border border-slate-200 dark:border-neutral-800 shadow-md">
          <div className="text-center pr-3 border-r border-slate-200 dark:border-neutral-800">
            <div className="text-xl font-bold font-mono text-emerald-600 dark:text-emerald-400">{formatPomoTime(pomoSeconds)}</div>
            <span className="text-[10px] text-slate-500 dark:text-neutral-400 font-medium uppercase tracking-wider">{pomoMode}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={togglePomoTimer}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm cursor-pointer"
              title={isPomoRunning ? 'Pause' : 'Start Focus'}
            >
              {isPomoRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => resetPomo(pomoMode)}
              className="p-2 rounded-xl text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              title="Reset Timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* View Switcher & Add Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-sm">
          <button
            type="button"
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'list' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            <span>List View</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('eisenhower')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'eisenhower' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Eisenhower Matrix</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('kanban')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'kanban' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Kanban Board</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsQuickAddOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* 1. LIST VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-slate-500 dark:text-neutral-500 uppercase tracking-wider">Active Tasks ({activeTasks.length})</h3>
            <div className="space-y-2.5">
              {activeTasks.map(task => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-850 transition-all group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <button type="button" onClick={() => toggleTask(task.id)} className="text-slate-400 dark:text-neutral-400 group-hover:text-emerald-500 transition-colors cursor-pointer">
                      <Circle className="w-5 h-5" />
                    </button>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-neutral-100 group-hover:text-emerald-600 dark:group-hover:text-white truncate">{task.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300">{task.category}</span>
                        <span className="text-[10px] text-slate-500 dark:text-neutral-400 flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3" /> {task.estimatedMinutes ? `${task.estimatedMinutes}m` : '30m'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] px-2.5 py-1 rounded-xl font-semibold border ${
                      task.priority === 'Urgent-Important' ? 'bg-red-500/10 text-red-600 dark:text-red-300 border-red-500/30' : 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/30'
                    }`}>
                      {task.priority || 'Normal'}
                    </span>
                    <button
                      type="button"
                      onClick={() => deleteTask(task.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {completedTasks.length > 0 && (
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#060606] border border-slate-200 dark:border-neutral-900 space-y-3">
              <h3 className="text-xs font-bold text-slate-500 dark:text-neutral-500 uppercase tracking-wider">Completed Tasks ({completedTasks.length})</h3>
              <div className="space-y-2">
                {completedTasks.map(task => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-900 opacity-70 hover:opacity-100 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={() => toggleTask(task.id)} className="cursor-pointer">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      </button>
                      <span className="text-xs text-slate-500 dark:text-neutral-400 line-through truncate">{task.title}</span>
                    </div>
                    <button type="button" onClick={() => deleteTask(task.id)} className="text-slate-400 hover:text-red-500 cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. EISENHOWER MATRIX VIEW */}
      {viewMode === 'eisenhower' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Q1: Urgent & Important */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#080808] border border-red-500/30 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-red-500/20">
              <h3 className="text-xs font-bold text-red-600 dark:text-red-300 uppercase tracking-wider flex items-center gap-1.5">
                <span>🔴 Do First (Urgent & Important)</span>
              </h3>
              <span className="text-xs font-mono text-red-600 dark:text-red-300">{urgentImportant.length} items</span>
            </div>
            <div className="space-y-2">
              {urgentImportant.map(t => (
                <div key={t.id} onClick={() => toggleTask(t.id)} className="p-3 rounded-xl bg-red-50/50 dark:bg-neutral-900 border border-red-500/20 text-xs text-slate-900 dark:text-white cursor-pointer hover:bg-red-100/50 dark:hover:bg-neutral-800 transition-all flex items-center gap-2">
                  <Circle className="w-4 h-4 text-red-500 shrink-0" />
                  <span className="truncate">{t.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Q2: Important, Not Urgent */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#080808] border border-emerald-500/30 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
              <h3 className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <span>🟢 Schedule Deep Work (Important, Not Urgent)</span>
              </h3>
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-300">{notUrgentImportant.length} items</span>
            </div>
            <div className="space-y-2">
              {notUrgentImportant.map(t => (
                <div key={t.id} onClick={() => toggleTask(t.id)} className="p-3 rounded-xl bg-emerald-50/50 dark:bg-neutral-900 border border-emerald-500/20 text-xs text-slate-900 dark:text-white cursor-pointer hover:bg-emerald-100/50 dark:hover:bg-neutral-800 transition-all flex items-center gap-2">
                  <Circle className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span className="truncate">{t.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Q3: Urgent, Not Important */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#080808] border border-amber-500/30 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
              <h3 className="text-xs font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <span>🟠 Delegate / Quick Hit (Urgent, Not Important)</span>
              </h3>
              <span className="text-xs font-mono text-amber-700 dark:text-amber-300">{urgentNotImportant.length} items</span>
            </div>
            <div className="space-y-2">
              {urgentNotImportant.length === 0 ? <p className="text-[11px] text-slate-500 dark:text-neutral-500 italic">No tasks in this quadrant.</p> : urgentNotImportant.map(t => (
                <div key={t.id} onClick={() => toggleTask(t.id)} className="p-3 rounded-xl bg-amber-50/50 dark:bg-neutral-900 border border-amber-500/20 text-xs text-slate-900 dark:text-white cursor-pointer hover:bg-amber-100/50 dark:hover:bg-neutral-800 transition-all flex items-center gap-2">
                  <Circle className="w-4 h-4 text-amber-500 shrink-0" />
                  <span className="truncate">{t.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Q4: Low Impact */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-neutral-800">
              <h3 className="text-xs font-bold text-slate-600 dark:text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>⚪ Eliminate / Low Priority</span>
              </h3>
              <span className="text-xs font-mono text-slate-600 dark:text-neutral-400">{lowImpact.length} items</span>
            </div>
            <div className="space-y-2">
              {lowImpact.length === 0 ? <p className="text-[11px] text-slate-500 dark:text-neutral-500 italic">Zero low-impact busywork. Clean queue!</p> : lowImpact.map(t => (
                <div key={t.id} onClick={() => toggleTask(t.id)} className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-slate-900 dark:text-white cursor-pointer hover:bg-slate-100 dark:hover:bg-neutral-800 transition-all flex items-center gap-2">
                  <Circle className="w-4 h-4 text-slate-400 dark:text-neutral-500 shrink-0" />
                  <span className="truncate">{t.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. KANBAN BOARD */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Backlog / To Do */}
          <div className="p-4 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-neutral-800">
              <span className="text-xs font-bold text-slate-800 dark:text-neutral-300">To Do ({activeTasks.length})</span>
            </div>
            <div className="space-y-2">
              {activeTasks.map(t => (
                <div key={t.id} onClick={() => toggleTask(t.id)} className="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-slate-900 dark:text-white cursor-pointer hover:border-emerald-500/50 transition-all">
                  <div className="font-semibold">{t.title}</div>
                  <div className="text-[10px] text-slate-500 dark:text-neutral-400 mt-1">{t.category}</div>
                </div>
              ))}
            </div>
          </div>

          {/* In Progress */}
          <div className="p-4 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-neutral-800">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-300">In Focus (1)</span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-500/30 text-xs text-slate-900 dark:text-white">
              <div className="font-semibold text-amber-800 dark:text-amber-200">Office Work - Sprint Feature Release</div>
              <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-1">Pomodoro Timer Active</div>
            </div>
          </div>

          {/* Done */}
          <div className="p-4 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-neutral-800">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">Completed ({completedTasks.length})</span>
            </div>
            <div className="space-y-2">
              {completedTasks.map(t => (
                <div key={t.id} className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-500/20 text-xs text-slate-700 dark:text-neutral-300">
                  <div className="line-through">{t.title}</div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400/80 mt-1">Done 🎉</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
