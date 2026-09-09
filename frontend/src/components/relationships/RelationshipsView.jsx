import React from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import {
  Users,
  Cake,
  Calendar,
  PhoneCall,
  Clock,
  Plus
} from 'lucide-react';

export const RelationshipsView = () => {
  const { relationships = [] } = useLifeOS();

  const safeRels = Array.isArray(relationships) && relationships.length > 0 ? relationships : [
    {
      id: 'rel_1',
      name: 'Vikram Reddy',
      role: 'Principal Architect & Career Mentor',
      relationship: 'Mentor',
      birthday: 'September 22',
      notes: 'Monthly sync on system design & distributed systems roadmap.',
      lastContacted: 'Last week'
    },
    {
      id: 'rel_2',
      name: 'Ananya Sharma',
      role: 'Lead Data Scientist',
      relationship: 'Colleague',
      birthday: 'November 14',
      notes: 'Collaborating on LifeOS intelligence algorithms.',
      lastContacted: '3 days ago'
    },
    {
      id: 'rel_3',
      name: 'Suresh Kumar',
      role: 'Childhood Best Friend',
      relationship: 'Close Friend',
      birthday: 'December 04',
      notes: 'Planning Ladakh motor expedition.',
      lastContacted: 'Yesterday'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12 transition-colors duration-200">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl transition-colors duration-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-pink-600 dark:text-pink-400 mb-1">
            <Users className="w-4 h-4" />
            <span>PERSONAL CRM & RELATIONSHIPS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Key Connections & Mentors
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-1">
            Keep track of meaningful relationships, upcoming birthdays, and mentorship cadences.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {safeRels.map(rel => (
          <div key={rel.id} className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-pink-600 dark:text-pink-400 font-bold">
                    {rel.relationship}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{rel.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400">{rel.role}</p>
                </div>
                <div className="p-2 rounded-xl bg-pink-50 dark:bg-pink-500/10 text-pink-600 dark:text-pink-400">
                  <Cake className="w-4 h-4" />
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 text-xs text-slate-700 dark:text-neutral-300 leading-relaxed">
                "{rel.notes}"
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-neutral-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400 font-mono">
              <span>Birthday: {rel.birthday}</span>
              <span>Last: {rel.lastContacted}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
