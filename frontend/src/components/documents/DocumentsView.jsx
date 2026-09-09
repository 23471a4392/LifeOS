import React from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import {
  FolderLock,
  FileCheck,
  AlertTriangle,
  Clock,
  Plus,
  ShieldCheck
} from 'lucide-react';

export const DocumentsView = () => {
  const { documents = [], createDocument } = useLifeOS();

  const safeDocs = Array.isArray(documents) && documents.length > 0 ? documents : [
    {
      id: 'doc_1',
      title: 'Passport (Republic of India)',
      number: 'Z8942104',
      expiryDate: '2032-05-14',
      status: 'Valid',
      daysToExpiry: 2073,
      tags: ['Identity', 'Travel', 'Government']
    },
    {
      id: 'doc_2',
      title: 'Permanent Driving License',
      number: 'DL-04201984210',
      expiryDate: '2039-11-20',
      status: 'Valid',
      daysToExpiry: 4820,
      tags: ['Identity', 'Transport']
    },
    {
      id: 'doc_3',
      title: 'B.Tech Degree Certificate & Transcripts',
      number: 'DEG-ENG-2024-88',
      expiryDate: 'Lifetime Valid',
      status: 'Valid',
      tags: ['Education', 'Career']
    },
    {
      id: 'doc_4',
      title: 'Comprehensive Health Insurance Policy',
      number: 'HDFC-ERGO-99201',
      expiryDate: '2027-03-31',
      status: 'Valid',
      daysToExpiry: 568,
      tags: ['Health', 'Insurance', 'Financial']
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-12 transition-colors duration-200">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl transition-colors duration-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400 mb-1">
            <FolderLock className="w-4 h-4" />
            <span>DOCUMENT VAULT & EXPIRY MONITOR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Personal Documents & Certificates
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-1">
            Securely catalog IDs, degrees, contracts, and automatically receive renewal countdown alerts.
          </p>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {safeDocs.map(doc => (
          <div key={doc.id} className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{doc.title}</h3>
                  <span className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono">Doc ID: {doc.number}</span>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border ${
                doc.status === 'Valid'
                  ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                  : 'bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30'
              }`}>
                {doc.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-neutral-400 pt-2 border-t border-slate-100 dark:border-neutral-800">
              <span>Expiry: <strong className="text-slate-900 dark:text-white">{doc.expiryDate}</strong></span>
              {doc.daysToExpiry && (
                <span className="font-mono text-sky-600 dark:text-sky-400 font-semibold">{doc.daysToExpiry} days remaining</span>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {doc.tags?.map((t, i) => (
                <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-neutral-400 border border-slate-200 dark:border-neutral-800">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
