import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import {
  FileText,
  Plus,
  Tag,
  Clock,
  Sparkles,
  BookOpen,
  Trash2
} from 'lucide-react';

export const NotesView = () => {
  const { notes = [], createNote, deleteNote, setIsQuickAddOpen } = useLifeOS();

  const defaultNotes = [
    {
      id: 'note_1',
      title: 'Microservices & Distributed Systems Principles',
      category: 'Architecture',
      updatedAt: '2026-09-08T14:30:00Z',
      content: `1. Idempotency Keys:\nAlways design write operations with unique idempotency keys to avoid duplicate execution in unreliable networks.\n\n2. Event-Driven Architecture:\nUse decoupled publish-subscribe topics (Kafka/RabbitMQ) for asynchronous domain events.\n\n3. Circuit Breakers:\nImplement automated fallback strategies when third-party microservices experience elevated latency.`
    },
    {
      id: 'note_2',
      title: 'Career Progression Strategy - 2026',
      category: 'Career',
      updatedAt: '2026-09-07T18:00:00Z',
      content: `Core Focus Areas:\n- Lead technical architecture for mission-critical distributed platforms\n- Mentor junior engineers & conduct system design workshops\n- Deepen expertise in high-concurrency event streaming`
    },
    {
      id: 'note_3',
      title: 'Personal Financial Independence Roadmap',
      category: 'Finance',
      updatedAt: '2026-09-05T09:15:00Z',
      content: `Monthly Rules:\n- Maintain 60%+ savings rate across diversified equity mutual funds & index funds\n- Keep emergency fund of 6 months in liquid assets\n- Review insurance policies annually`
    }
  ];

  const safeNotes = Array.isArray(notes) && notes.length > 0 ? notes : defaultNotes;
  const [selectedNote, setSelectedNote] = useState(safeNotes[0]);

  return (
    <div className="space-y-6 animate-fade-in pb-12 transition-colors duration-200">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl transition-colors duration-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>KNOWLEDGE BASE & SCRATCHPAD</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Notes, Ideas & Journals
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-1">
            Capture architectural notes, technical takeaways, and personal growth reflections.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsQuickAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </button>
      </div>

      {/* 2-Pane Editor View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notes List */}
        <div className="p-4 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-2.5">
          <div className="px-2 py-1 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
            All Notes ({safeNotes.length})
          </div>
          <div className="space-y-2">
            {safeNotes.map(n => (
              <div
                key={n.id}
                onClick={() => setSelectedNote(n)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedNote?.id === n.id
                    ? 'bg-emerald-50 dark:bg-emerald-950/25 border-emerald-400 dark:border-emerald-500/50 text-slate-900 dark:text-white shadow-sm'
                    : 'bg-slate-50 dark:bg-neutral-900/60 border-slate-200 dark:border-neutral-800 text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-neutral-850'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300">
                    {n.category}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-neutral-400 font-mono">
                    {new Date(n.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xs font-bold mt-2 truncate text-slate-900 dark:text-white">{n.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Note Reader / Markdown Preview */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4">
          {selectedNote ? (
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-neutral-800">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
                    {selectedNote.category}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{selectedNote.title}</h2>
                </div>
                <span className="text-xs text-slate-400 dark:text-neutral-400 font-mono">
                  {new Date(selectedNote.updatedAt).toLocaleString()}
                </span>
              </div>

              <div className="pt-4 text-xs text-slate-800 dark:text-neutral-300 leading-relaxed font-mono whitespace-pre-line">
                {selectedNote.content}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 dark:text-neutral-500 text-xs">
              Select a note to view or create a new one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
