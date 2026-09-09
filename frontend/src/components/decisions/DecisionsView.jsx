import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import {
  Scale,
  Sparkles,
  Plus,
  CheckCircle2,
  TrendingUp,
  Clock,
  Briefcase,
  Layers,
  ArrowRight,
  ShieldAlert,
  DollarSign,
  Check,
  AlertCircle
} from 'lucide-react';

export const DecisionsView = () => {
  const { decisions = [], addDecision } = useLifeOS();
  const [activeSubTab, setActiveSubTab] = useState('job-comparator'); // 'job-comparator', 'journal'

  // Interactive Job Decision State
  const [currentJob, setCurrentJob] = useState({
    name: 'Current Job',
    salary: 30000,
    travelTimeMin: 20,
    travelCost: 1500,
    growthRating: 6, // 1-10
    learningRating: 6,
    monthlyExpense: 12000,
    workLifeRating: 8
  });

  const [newJob, setNewJob] = useState({
    name: 'New Job (Acme Tech)',
    salary: 42000,
    travelTimeMin: 90,
    travelCost: 4500,
    growthRating: 9,
    learningRating: 9,
    monthlyExpense: 18000,
    workLifeRating: 7
  });

  // Weights configuration
  const [weights, setWeights] = useState({
    salary: 30,
    growth: 25,
    learning: 20,
    commute: 15,
    workLife: 10
  });

  // Dynamic Calculation Engine
  const calculateScore = (job) => {
    if (!job) return { total: 0, salaryScore: 0, growthScore: 0, learningScore: 0, commuteScore: 0, workLifeScore: 0 };
    const salaryScore = Math.min(100, ((job.salary || 30000) / 60000) * 100);
    const growthScore = (job.growthRating || 5) * 10;
    const learningScore = (job.learningRating || 5) * 10;
    const commuteScore = Math.max(10, 100 - ((job.travelTimeMin || 30) * 0.75));
    const workLifeScore = (job.workLifeRating || 5) * 10;

    const totalWeight = (weights.salary || 30) + (weights.growth || 25) + (weights.learning || 20) + (weights.commute || 15) + (weights.workLife || 10);

    const weightedScore = Math.round(
      ((salaryScore * weights.salary) +
      (growthScore * weights.growth) +
      (learningScore * weights.learning) +
      (commuteScore * weights.commute) +
      (workLifeScore * weights.workLife)) / totalWeight
    );

    return {
      total: weightedScore,
      salaryScore: Math.round(salaryScore),
      growthScore,
      learningScore,
      commuteScore: Math.round(commuteScore),
      workLifeScore
    };
  };

  const currentScore = calculateScore(currentJob);
  const newScore = calculateScore(newJob);

  const salaryDiff = (newJob?.salary || 0) - (currentJob?.salary || 0);
  const travelCostDiff = (newJob?.travelCost || 0) - (currentJob?.travelCost || 0);
  const netGain = salaryDiff - travelCostDiff;

  // Custom Decision Modal
  const [customTitle, setCustomTitle] = useState('');
  const [customCategory, setCustomCategory] = useState('Career');
  const [opt1Name, setOpt1Name] = useState('Option A');
  const [opt1Score, setOpt1Score] = useState(80);
  const [opt2Name, setOpt2Name] = useState('Option B');
  const [opt2Score, setOpt2Score] = useState(70);
  const [isCreatingCustom, setIsCreatingCustom] = useState(false);

  const handleSaveCustomDecision = async (e) => {
    e.preventDefault();
    if (!customTitle.trim()) return;
    if (addDecision) {
      await addDecision({
        title: customTitle,
        category: customCategory,
        options: [
          { name: opt1Name, overallScore: Number(opt1Score), pros: ['High impact', 'Better fit'] },
          { name: opt2Name, overallScore: Number(opt2Score), pros: ['Familiar baseline'] }
        ]
      });
    }
    setCustomTitle('');
    setIsCreatingCustom(false);
  };

  const safeDecisionsList = Array.isArray(decisions) ? decisions : [];

  return (
    <div className="space-y-6 animate-fade-in pb-12 transition-colors duration-200">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl dark:shadow-2xl transition-colors duration-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 mb-1">
            <Scale className="w-4 h-4" />
            <span>CORE INTELLIGENCE SYSTEM — DECISION SUPPORT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Decision Matrix & Evaluator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-1 max-w-2xl">
            Compare complex life choices with weighted criteria, objective scores, and AI recommendations.
            <span className="text-amber-600 dark:text-amber-300 ml-1 font-medium">LifeOS provides analytical recommendations — the final choice is always yours.</span>
          </p>
        </div>

        {/* Sub-tab controls */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800">
          <button
            type="button"
            onClick={() => setActiveSubTab('job-comparator')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              activeSubTab === 'job-comparator'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Job Offer Comparator
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('journal')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
              activeSubTab === 'journal'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Decision Journal ({safeDecisionsList.length})
          </button>
        </div>
      </div>

      {activeSubTab === 'job-comparator' && (
        <div className="space-y-6">
          {/* Interactive Comparison Card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Option 1: Current Job */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4 transition-colors duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 dark:text-neutral-500">Baseline Choice</span>
                  <input
                    type="text"
                    value={currentJob.name}
                    onChange={e => setCurrentJob({ ...currentJob, name: e.target.value })}
                    className="text-lg font-bold text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-neutral-700 focus:border-emerald-500 outline-none w-full"
                  />
                </div>
                <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-neutral-900 text-slate-700 dark:text-neutral-300 font-mono text-xs font-bold border border-slate-200 dark:border-neutral-800">
                  {currentScore.total}% Score
                </span>
              </div>

              {/* Sliders & Inputs */}
              <div className="space-y-3.5 pt-2">
                <div>
                  <div className="flex justify-between text-xs text-slate-700 dark:text-neutral-300 mb-1">
                    <span>Monthly Salary</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">₹{currentJob.salary.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="15000"
                    max="100000"
                    step="1000"
                    value={currentJob.salary}
                    onChange={e => setCurrentJob({ ...currentJob, salary: Number(e.target.value) })}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 dark:text-neutral-300 mb-1">
                    <span>Travel / Commute Time</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{currentJob.travelTimeMin} mins</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="180"
                    step="5"
                    value={currentJob.travelTimeMin}
                    onChange={e => setCurrentJob({ ...currentJob, travelTimeMin: Number(e.target.value) })}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-500 dark:text-neutral-400 mb-1">Growth (1-10)</label>
                    <select
                      value={currentJob.growthRating}
                      onChange={e => setCurrentJob({ ...currentJob, growthRating: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-800 dark:text-white cursor-pointer"
                    >
                      <option value={4}>4 - Low</option>
                      <option value={6}>6 - Medium</option>
                      <option value={8}>8 - High</option>
                      <option value={10}>10 - Exceptional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 dark:text-neutral-400 mb-1">Learning (1-10)</label>
                    <select
                      value={currentJob.learningRating}
                      onChange={e => setCurrentJob({ ...currentJob, learningRating: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-800 dark:text-white cursor-pointer"
                    >
                      <option value={4}>4 - Low</option>
                      <option value={6}>6 - Medium</option>
                      <option value={8}>8 - High</option>
                      <option value={10}>10 - Exceptional</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-500 dark:text-neutral-400 mb-1">Travel Cost / Month</label>
                    <input
                      type="number"
                      value={currentJob.travelCost}
                      onChange={e => setCurrentJob({ ...currentJob, travelCost: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-800 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 dark:text-neutral-400 mb-1">Work-Life Balance (1-10)</label>
                    <select
                      value={currentJob.workLifeRating}
                      onChange={e => setCurrentJob({ ...currentJob, workLifeRating: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-800 dark:text-white cursor-pointer"
                    >
                      <option value={5}>5 - Average</option>
                      <option value={7}>7 - Good</option>
                      <option value={8}>8 - Great</option>
                      <option value={10}>10 - Excellent</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Option 2: New Job Offer */}
            <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-amber-400 dark:border-amber-500/40 shadow-xl space-y-4 relative transition-colors duration-200">
              <div className="absolute top-3 right-4 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 text-[10px] font-bold">
                NEW PROPOSAL
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">Offer Evaluation</span>
                  <input
                    type="text"
                    value={newJob.name}
                    onChange={e => setNewJob({ ...newJob, name: e.target.value })}
                    className="text-lg font-bold text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-neutral-700 focus:border-amber-500 outline-none w-full"
                  />
                </div>
                <span className="px-3 py-1 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono text-xs font-bold border border-amber-500/40">
                  {newScore.total}% Score
                </span>
              </div>

              {/* Sliders & Inputs */}
              <div className="space-y-3.5 pt-2">
                <div>
                  <div className="flex justify-between text-xs text-slate-700 dark:text-neutral-300 mb-1">
                    <span>Monthly Salary</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">₹{newJob.salary.toLocaleString()} (+₹{salaryDiff.toLocaleString()})</span>
                  </div>
                  <input
                    type="range"
                    min="15000"
                    max="100000"
                    step="1000"
                    value={newJob.salary}
                    onChange={e => setNewJob({ ...newJob, salary: Number(e.target.value) })}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 dark:text-neutral-300 mb-1">
                    <span>Travel / Commute Time</span>
                    <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{newJob.travelTimeMin} mins (Higher)</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="180"
                    step="5"
                    value={newJob.travelTimeMin}
                    onChange={e => setNewJob({ ...newJob, travelTimeMin: Number(e.target.value) })}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-500 dark:text-neutral-400 mb-1">Growth (1-10)</label>
                    <select
                      value={newJob.growthRating}
                      onChange={e => setNewJob({ ...newJob, growthRating: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-800 dark:text-white cursor-pointer"
                    >
                      <option value={4}>4 - Low</option>
                      <option value={6}>6 - Medium</option>
                      <option value={9}>9 - High</option>
                      <option value={10}>10 - Exceptional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 dark:text-neutral-400 mb-1">Learning (1-10)</label>
                    <select
                      value={newJob.learningRating}
                      onChange={e => setNewJob({ ...newJob, learningRating: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-800 dark:text-white cursor-pointer"
                    >
                      <option value={4}>4 - Low</option>
                      <option value={6}>6 - Medium</option>
                      <option value={9}>9 - High</option>
                      <option value={10}>10 - Exceptional</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-500 dark:text-neutral-400 mb-1">Travel Cost / Month</label>
                    <input
                      type="number"
                      value={newJob.travelCost}
                      onChange={e => setNewJob({ ...newJob, travelCost: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-800 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 dark:text-neutral-400 mb-1">Work-Life Balance (1-10)</label>
                    <select
                      value={newJob.workLifeRating}
                      onChange={e => setNewJob({ ...newJob, workLifeRating: Number(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-800 dark:text-white cursor-pointer"
                    >
                      <option value={5}>5 - Average</option>
                      <option value={7}>7 - Good</option>
                      <option value={8}>8 - Great</option>
                      <option value={10}>10 - Excellent</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side-by-Side Comparison Matrix & AI Recommendation */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-6 transition-colors duration-200">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-neutral-800 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500 dark:text-amber-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">System Decision Analysis & Recommendation</h3>
              </div>
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                Net Monthly In-Pocket Gain: +₹{netGain.toLocaleString()}
              </span>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-neutral-800 text-slate-500 dark:text-neutral-400 font-mono">
                    <th className="pb-3 font-semibold">Evaluation Factor</th>
                    <th className="pb-3 font-semibold">{currentJob.name}</th>
                    <th className="pb-3 font-semibold">{newJob.name}</th>
                    <th className="pb-3 font-semibold">Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-neutral-800/80 font-medium text-slate-800 dark:text-neutral-200">
                  <tr>
                    <td className="py-3 font-semibold flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-500" /> Salary
                    </td>
                    <td className="py-3 font-mono">₹{currentJob.salary.toLocaleString()}</td>
                    <td className="py-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">₹{newJob.salary.toLocaleString()}</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400 font-semibold">+₹{salaryDiff.toLocaleString()} (+40%)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-500" /> Travel Time
                    </td>
                    <td className="py-3 font-mono text-emerald-600 dark:text-emerald-400 font-bold">{currentJob.travelTimeMin} mins (Quick)</td>
                    <td className="py-3 font-mono text-amber-600 dark:text-amber-400">{newJob.travelTimeMin} mins</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400">Current Job (-70 mins)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-purple-500" /> Growth Opportunities
                    </td>
                    <td className="py-3">Medium (6/10)</td>
                    <td className="py-3 font-bold text-emerald-600 dark:text-emerald-400">High (9/10)</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400">New Job (+50% velocity)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-indigo-500" /> Learning Opportunities
                    </td>
                    <td className="py-3">Medium (6/10)</td>
                    <td className="py-3 font-bold text-emerald-600 dark:text-emerald-400">High (9/10)</td>
                    <td className="py-3 text-emerald-600 dark:text-emerald-400">New Job (Modern Stack)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-red-500" /> Travel Expense
                    </td>
                    <td className="py-3 font-mono">₹{currentJob.travelCost.toLocaleString()}</td>
                    <td className="py-3 font-mono">₹{newJob.travelCost.toLocaleString()}</td>
                    <td className="py-3 text-amber-600 dark:text-amber-400">+₹{travelCostDiff.toLocaleString()} extra cost</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Overall Score Bars */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold text-slate-800 dark:text-neutral-300 uppercase tracking-wider">Overall Weighted Match</div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700 dark:text-neutral-300">{currentJob.name}</span>
                  <span className="font-mono text-slate-700 dark:text-neutral-300">{currentScore.total}% Match</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-neutral-900 rounded-full h-3 overflow-hidden">
                  <div className="bg-slate-400 dark:bg-neutral-600 h-full rounded-full transition-all duration-700" style={{ width: `${currentScore.total}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-amber-600 dark:text-amber-300">{newJob.name}</span>
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{newScore.total}% Match (Recommended)</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-neutral-900 rounded-full h-3 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-700" style={{ width: `${newScore.total}%` }} />
                </div>
              </div>
            </div>

            {/* Recommendation Box */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
                <Sparkles className="w-4 h-4" />
                <span>LifeOS Smart Verdict:</span>
              </div>
              <p className="leading-relaxed">
                <strong>{newJob.name}</strong> has a significantly superior overall career score (<span className="font-mono font-bold">{newScore.total}%</span> vs <span className="font-mono font-bold">{currentScore.total}%</span>).
                The ₹12,000 monthly compensation increase comfortably absorbs the ₹3,000 extra commute cost, leaving a net gain of <strong>+₹{netGain.toLocaleString()}/month</strong>.
              </p>
              <div className="text-[11px] text-amber-700/80 dark:text-amber-300/80 pt-1 border-t border-amber-200 dark:border-amber-500/20">
                ⚠️ <strong>Key Trade-Off:</strong> The 90-minute commute is the primary drawback. Suggest negotiating 2 remote/WFX days or using travel time for learning podcasts.
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'journal' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Decision History & Outcomes</h2>
            <button
              type="button"
              onClick={() => setIsCreatingCustom(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-xl text-xs transition-all shadow-md cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Record New Decision</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safeDecisionsList.map(d => (
              <div key={d.id} className="p-5 rounded-2xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-neutral-900 text-slate-600 dark:text-neutral-400 border border-slate-200 dark:border-neutral-800">
                    {d.category || 'General'}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    d.status === 'Decided' ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300' : 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                  }`}>
                    {d.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{d.title}</h3>
                {d.summary && <p className="text-xs text-slate-600 dark:text-neutral-400">{d.summary}</p>}

                {d.recommendation && (
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 text-xs text-slate-700 dark:text-neutral-300 space-y-1">
                    <div className="font-semibold text-amber-600 dark:text-amber-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Winner: {d.recommendation.winner} ({d.recommendation.confidencePercentage}%)
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-neutral-400">{d.recommendation.summary}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for Custom Decision */}
      {isCreatingCustom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-md bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-neutral-700 rounded-2xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Create Custom Decision</h3>
            <form onSubmit={handleSaveCustomDecision} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-700 dark:text-neutral-300 mb-1">Decision Title / Question</label>
                <input
                  type="text"
                  placeholder="e.g. Choose between 2 BHK Flat vs 3 BHK Flat"
                  value={customTitle}
                  onChange={e => setCustomTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-700 dark:text-neutral-300 mb-1">Option 1 Name</label>
                  <input
                    type="text"
                    value={opt1Name}
                    onChange={e => setOpt1Name(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-700 dark:text-neutral-300 mb-1">Option 1 Score (0-100)</label>
                  <input
                    type="number"
                    value={opt1Score}
                    onChange={e => setOpt1Score(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-700 dark:text-neutral-300 mb-1">Option 2 Name</label>
                  <input
                    type="text"
                    value={opt2Name}
                    onChange={e => setOpt2Name(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-700 dark:text-neutral-300 mb-1">Option 2 Score (0-100)</label>
                  <input
                    type="number"
                    value={opt2Score}
                    onChange={e => setOpt2Score(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingCustom(false)}
                  className="flex-1 py-2 bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-amber-500 text-black font-semibold rounded-xl text-xs cursor-pointer"
                >
                  Save Decision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
