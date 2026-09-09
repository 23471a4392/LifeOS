import React from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import {
  GraduationCap,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  Plus
} from 'lucide-react';

export const LearningView = () => {
  const { learning } = useLifeOS();

  const upcomingExams = learning?.upcomingExams || [
    {
      id: 'ex1',
      name: 'System Design & High Availability Architecture',
      date: '2026-09-28',
      daysRemaining: 19,
      targetScore: 'Top 5%',
      status: 'Revision Phase'
    },
    {
      id: 'ex2',
      name: 'AWS Certified Solutions Architect - Professional',
      date: '2026-10-15',
      daysRemaining: 36,
      targetScore: '850/1000',
      status: 'Practice Tests'
    }
  ];

  const courses = learning?.courses || [
    {
      id: 'c1',
      title: 'Advanced Python Design Patterns & Concurrency',
      instructor: 'Dr. Aris Vance',
      completedModules: 14,
      totalModules: 18,
      progress: 78,
      status: 'In Progress',
      certificateEarned: false
    },
    {
      id: 'c2',
      title: 'Distributed Systems & Microservices Engineering',
      instructor: 'Martin Kleppmann',
      completedModules: 12,
      totalModules: 12,
      progress: 100,
      status: 'Completed',
      certificateEarned: true
    },
    {
      id: 'c3',
      title: 'Behavioral Finance & Decision Mathematics',
      instructor: 'Prof. S. Rao',
      completedModules: 6,
      totalModules: 10,
      progress: 60,
      status: 'In Progress',
      certificateEarned: false
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12 transition-colors duration-200">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl transition-colors duration-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>LEARNING & CERTIFICATIONS ENGINE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Curriculum & Exam Readiness
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-1">
            Track active courses, prepare for professional certification exams, and log deep study plans.
          </p>
        </div>
      </div>

      {/* Upcoming Exams Countdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {upcomingExams.map(exam => (
          <div key={exam.id} className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300">
                  Target Score: {exam.targetScore}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">{exam.name}</h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400 font-mono mt-0.5">Test Date: {exam.date}</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">
                  {exam.daysRemaining}
                </span>
                <div className="text-[10px] uppercase font-bold text-slate-400 dark:text-neutral-500">Days Left</div>
              </div>
            </div>

            <div className="w-full bg-slate-200 dark:bg-neutral-900 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full"
                style={{ width: `${Math.max(15, 100 - exam.daysRemaining * 2)}%` }}
              />
            </div>
            <div className="text-[11px] text-slate-500 dark:text-neutral-400 flex items-center justify-between">
              <span>Status: <strong className="text-purple-600 dark:text-purple-300">{exam.status}</strong></span>
              <span>Daily target: 1.5 hrs deep revision</span>
            </div>
          </div>
        ))}
      </div>

      {/* Courses Progress Cards */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Active Courses & Curricula</h2>
          <span className="text-xs text-purple-600 dark:text-purple-400 font-mono font-semibold">{courses.length} Courses Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {courses.map(c => (
            <div key={c.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    c.status === 'Completed' ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' : 'bg-purple-50 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300'
                  }`}>
                    {c.status}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">{c.progress}%</span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{c.title}</h3>
                <p className="text-[11px] text-slate-500 dark:text-neutral-400">Led by {c.instructor}</p>
              </div>

              <div className="space-y-2 pt-2">
                <div className="w-full bg-slate-200 dark:bg-neutral-900 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-purple-500 rounded-full transition-all duration-700"
                    style={{ width: `${c.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 dark:text-neutral-400 font-mono">
                  <span>{c.completedModules} / {c.totalModules} Modules</span>
                  {c.certificateEarned && <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Verified 🎓</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
