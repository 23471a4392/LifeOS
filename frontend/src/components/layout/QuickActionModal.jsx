import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import { speechService } from '../../services/speechService';
import { X, CheckSquare, DollarSign, Scale, FileText, Plus, Mic, MicOff } from 'lucide-react';

export const QuickActionModal = () => {
  const {
    isQuickAddOpen,
    setIsQuickAddOpen,
    createTask,
    addTask,
    createExpense,
    addTransaction,
    createNote,
    addNote,
    showToast
  } = useLifeOS();

  const [tab, setTab] = useState('task'); // 'task', 'expense', 'note'
  const [isListening, setIsListening] = useState(false);

  // Task Form State
  const [taskTitle, setTaskTitle] = useState('');
  const [taskCategory, setTaskCategory] = useState('Finance');
  const [taskPriority, setTaskPriority] = useState('Urgent-Important');
  const [taskMinutes, setTaskMinutes] = useState(15);

  // Expense Form State
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Utilities');

  // Note Form State
  const [noteTitle, setNoteTitle] = useState('');
  const [noteCategory, setNoteCategory] = useState('Tech & Architecture');
  const [noteContent, setNoteContent] = useState('');

  if (!isQuickAddOpen) return null;

  // Toggle Voice Dictation via Web Speech API
  const handleToggleVoice = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
      showToast('Voice dictation stopped.', 'info');
    } else {
      setIsListening(true);
      showToast('🎙️ Listening... Speak your item now.', 'info');
      speechService.startListening({
        onResult: (text) => {
          if (tab === 'task') setTaskTitle(text);
          else if (tab === 'expense') setExpenseTitle(text);
          else if (tab === 'note') setNoteContent(prev => prev ? `${prev} ${text}` : text);
        },
        onError: (err) => {
          setIsListening(false);
          showToast(`Speech error: ${err}`, 'error');
        },
        onEnd: () => {
          setIsListening(false);
        }
      });
    }
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const taskHandler = createTask || addTask;
    if (taskHandler) {
      taskHandler({
        title: taskTitle.trim(),
        category: taskCategory,
        priority: taskPriority,
        urgency: taskPriority.includes('Urgent') ? 9 : 4,
        importance: taskPriority.includes('Important') ? 9 : 4,
        estimatedMinutes: Number(taskMinutes) || 15
      });
    }

    setTaskTitle('');
    setIsQuickAddOpen(false);
  };

  const handleCreateExpense = (e) => {
    e.preventDefault();
    if (!expenseTitle.trim() || !expenseAmount) return;

    const expenseHandler = createExpense || addTransaction;
    if (expenseHandler) {
      expenseHandler({
        title: expenseTitle.trim(),
        amount: Number(expenseAmount),
        category: expenseCategory,
        paymentMethod: 'UPI'
      });
    }

    setExpenseTitle('');
    setExpenseAmount('');
    setIsQuickAddOpen(false);
  };

  const handleCreateNote = (e) => {
    e.preventDefault();
    if (!noteTitle.trim()) return;

    const noteHandler = createNote || addNote;
    if (noteHandler) {
      noteHandler({
        title: noteTitle.trim(),
        category: noteCategory,
        content: noteContent
      });
    }

    setNoteTitle('');
    setNoteContent('');
    setIsQuickAddOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden animate-slide-up relative">
        {/* Header with Switcher Tabs */}
        <div className="p-5 border-b border-slate-200 dark:border-neutral-800 flex items-center justify-between bg-slate-50/50 dark:bg-neutral-900/30">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTab('task')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                tab === 'task' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>New Task</span>
            </button>
            <button
              type="button"
              onClick={() => setTab('expense')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                tab === 'expense' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>Log Expense</span>
            </button>
            <button
              type="button"
              onClick={() => setTab('note')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                tab === 'note' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Quick Note</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Voice Dictation Trigger */}
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-500 text-white border-rose-600 animate-pulse shadow-lg shadow-rose-500/30'
                  : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-300 border-slate-200 dark:border-neutral-700 hover:text-emerald-500'
              }`}
              title={isListening ? 'Stop Listening' : 'Speak to Dictate (Voice Recognition)'}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={() => setIsQuickAddOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {isListening && (
            <div className="mb-3 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs flex items-center gap-2 animate-pulse font-mono">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>Listening to your voice... Speak clearly into microphone.</span>
            </div>
          )}

          {tab === 'task' && (
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">Task Title / Action Item</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Pay electricity bill or Complete API"
                    value={taskTitle}
                    onChange={e => setTaskTitle(e.target.value)}
                    autoFocus
                    required
                    className="w-full pl-3.5 pr-10 py-2.5 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:border-emerald-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleToggleVoice}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-emerald-500 cursor-pointer"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">Category</label>
                  <select
                    value={taskCategory}
                    onChange={e => setTaskCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Finance">Finance & Bills</option>
                    <option value="Career">Career & Work</option>
                    <option value="Learning">Learning & Study</option>
                    <option value="Health">Health & Wellness</option>
                    <option value="Personal">Personal & Errands</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">Estimated Duration</label>
                  <select
                    value={taskMinutes}
                    onChange={e => setTaskMinutes(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value={15}>15 Minutes</option>
                    <option value={30}>30 Minutes</option>
                    <option value={60}>1 Hour</option>
                    <option value={120}>2 Hours</option>
                    <option value={180}>3+ Hours</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">Eisenhower Priority Matrix</label>
                <select
                  value={taskPriority}
                  onChange={e => setTaskPriority(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                >
                  <option value="Urgent-Important">🔴 Urgent & Important (Do First)</option>
                  <option value="NotUrgent-Important">🟡 Important, Not Urgent (Schedule Deep Work)</option>
                  <option value="Urgent-NotImportant">🟠 Urgent, Not Important (Delegate/Quick Hit)</option>
                  <option value="NotUrgent-NotImportant">⚪ Low Impact (Eliminate)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>+ Add Task to Queue</span>
              </button>
            </form>
          )}

          {tab === 'expense' && (
            <form onSubmit={handleCreateExpense} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">Expense Description</label>
                <input
                  type="text"
                  placeholder="e.g. Swiggy Dinner, Groceries, Amazon"
                  value={expenseTitle}
                  onChange={e => setExpenseTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">Amount (₹)</label>
                  <input
                    type="number"
                    placeholder="450"
                    value={expenseAmount}
                    onChange={e => setExpenseAmount(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:border-emerald-500 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">Category</label>
                  <select
                    value={expenseCategory}
                    onChange={e => setExpenseCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Utilities">Utilities & Bills</option>
                    <option value="Food">Food & Dining</option>
                    <option value="Housing">Housing & Rent</option>
                    <option value="Travel">Travel & Fuel</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Savings">Savings & Investments</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Record Expense</span>
              </button>
            </form>
          )}

          {tab === 'note' && (
            <form onSubmit={handleCreateNote} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">Note Title</label>
                <input
                  type="text"
                  placeholder="e.g. System Design Key Notes"
                  value={noteTitle}
                  onChange={e => setNoteTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-neutral-300 mb-1.5">Content (Markdown supported)</label>
                <textarea
                  rows={4}
                  placeholder="Type or click the microphone to speak your ideas..."
                  value={noteContent}
                  onChange={e => setNoteContent(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Save Note</span>
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="fixed inset-0 -z-10" onClick={() => setIsQuickAddOpen(false)} />
    </div>
  );
};
