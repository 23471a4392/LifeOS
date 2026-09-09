import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import {
  Briefcase,
  Code,
  Layers,
  Award,
  Plus,
  ExternalLink,
  MapPin,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

export const CareerView = () => {
  const { career } = useLifeOS();
  const [tab, setTab] = useState('jobs'); // 'jobs', 'skills', 'projects'

  const jobApplications = career?.jobApplications || [
    {
      id: 'job_1',
      company: 'Acme Technologies',
      role: 'Staff Software Architect',
      status: 'Offer Received',
      salaryOffered: '₹42,000 / mo',
      location: 'Bangalore (Hybrid)',
      appliedDate: '2026-08-15',
      nextStep: 'Offer Letter Signed & Date of Joining Finalized',
      notes: 'Excellent engineering culture & clear growth path.'
    },
    {
      id: 'job_2',
      company: 'Starlight Cloud Systems',
      role: 'Senior Full Stack Lead',
      status: 'Interviewing',
      salaryOffered: '₹38,000 / mo',
      location: 'Remote',
      appliedDate: '2026-08-20',
      nextStep: 'System Design Interview Round 2 on Friday',
      notes: '100% remote flexibility.'
    }
  ];

  const skills = career?.skills || [
    { name: 'React & Modern Frontend Architecture', level: 'Expert', proficiency: 94, category: 'Engineering' },
    { name: 'Node.js & Microservices API Design', level: 'Advanced', proficiency: 90, category: 'Backend' },
    { name: 'Distributed Systems & Scaling', level: 'Advanced', proficiency: 85, category: 'Architecture' },
    { name: 'Multi-Criteria Decision Analysis', level: 'Advanced', proficiency: 88, category: 'Strategy' }
  ];

  const projects = career?.projects || [
    {
      id: 'p1',
      title: 'LifeOS Platform',
      status: 'Active Production',
      progress: 95,
      description: 'Humanized personal life management, multi-criteria decision matrix & financial command center.',
      tech: ['React', 'TailwindCSS', 'Node.js', 'WebCrypto', 'WebAudio'],
      github: 'https://github.com'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12 transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl transition-colors duration-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
            <Briefcase className="w-4 h-4" />
            <span>CAREER ENGINE & PROFESSIONAL GROWTH</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Career Command & Applications Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-1">
            Manage job interview pipelines, showcase portfolio projects, and monitor skill proficiency.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
          <button
            type="button"
            onClick={() => setTab('jobs')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              tab === 'jobs' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Job Applications ({jobApplications.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('skills')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              tab === 'skills' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Skills Matrix ({skills.length})
          </button>
          <button
            type="button"
            onClick={() => setTab('projects')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              tab === 'projects' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Projects Portfolio ({projects.length})
          </button>
        </div>
      </div>

      {/* 1. JOB APPLICATIONS PIPELINE */}
      {tab === 'jobs' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobApplications.map(job => (
              <div
                key={job.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4 flex flex-col justify-between hover:border-blue-500/50 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">Company</span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {job.company}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-neutral-300 font-medium mt-0.5">{job.role}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border ${
                      job.status === 'Offer Received'
                        ? 'bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                        : job.status === 'Interviewing'
                        ? 'bg-amber-50 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30'
                        : 'bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30'
                    }`}>
                      {job.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-neutral-400">
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-slate-900 dark:text-white font-bold">{job.salaryOffered}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400 dark:text-neutral-500" />
                        {job.location}
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-neutral-900/80 border border-slate-200 dark:border-neutral-800 text-[11px] text-slate-700 dark:text-neutral-300">
                      <strong>Next Step:</strong> {job.nextStep}
                    </div>
                    {job.notes && <p className="text-[11px] text-slate-500 dark:text-neutral-400 italic">"{job.notes}"</p>}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-neutral-800 text-[10px] text-slate-400 dark:text-neutral-500 font-mono">
                  Applied: {job.appliedDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. SKILLS MATRIX */}
      {tab === 'skills' && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Technical Proficiency & Skill Level</h2>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-mono font-semibold">Continuous Mastery</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {skills.map((skill, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">{skill.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300">
                      {skill.level}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{skill.proficiency}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-neutral-900 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-teal-400 rounded-full transition-all duration-700"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
                <div className="text-[10px] text-slate-500 dark:text-neutral-400">{skill.category} Track</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. PROJECTS PORTFOLIO */}
      {tab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(proj => (
            <div key={proj.id} className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-neutral-900 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-neutral-800">
                    {proj.status}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">{proj.progress}%</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{proj.title}</h3>
                <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">{proj.description}</p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.tech?.map((t, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-neutral-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {proj.github && (
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-900 dark:text-white text-xs font-semibold transition-colors"
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 dark:text-neutral-400" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
