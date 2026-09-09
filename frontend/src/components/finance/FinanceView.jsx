import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import { AddExpenseModal } from './AddExpenseModal';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Target,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Filter,
  Trash2,
  PieChart as PieIcon,
  Calendar,
  Tag,
  ArrowUpDown
} from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const CATEGORY_COLORS = {
  'Food & Dining': '#10B981',
  'Housing & Rent': '#3B82F6',
  'Utilities & Bills': '#F59E0B',
  'Travel & Fuel': '#EC4899',
  'Learning & Books': '#8B5CF6',
  'Health & Medical': '#EF4444',
  'Entertainment': '#06B6D4',
  'Shopping': '#F97316',
  'Investments': '#14B8A6',
  'Miscellaneous': '#64748B'
};

export const FinanceView = () => {
  const {
    expenses = [],
    createExpense,
    deleteExpense,
    financeProfile,
    updateFinanceProfile,
    travel = [],
    showToast
  } = useLifeOS();

  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');

  // Income configuration modal
  const [isEditingIncome, setIsEditingIncome] = useState(false);
  const [monthlyIncomeInput, setMonthlyIncomeInput] = useState(financeProfile?.monthlyIncome || 0);

  const safeExpenses = Array.isArray(expenses) ? expenses : [];

  // Filter and sort
  const filteredExpenses = safeExpenses
    .filter(e => {
      const matchSearch = e.title?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === 'All' || e.category === selectedCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
      if (sortBy === 'amount-high') return (b.amount || 0) - (a.amount || 0);
      if (sortBy === 'amount-low') return (a.amount || 0) - (b.amount || 0);
      return 0;
    });

  // Calculate actual numbers from entered data
  const totalOutflow = safeExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const monthlyIncome = Number(financeProfile?.monthlyIncome) || 0;
  const netSavings = monthlyIncome - totalOutflow;
  const savingsRate = monthlyIncome > 0 ? Math.max(0, Math.round((netSavings / monthlyIncome) * 100)) : 0;

  // Compute category breakdown from actual user expenses
  const categoryTotals = {};
  safeExpenses.forEach(e => {
    const cat = e.category || 'Miscellaneous';
    categoryTotals[cat] = (categoryTotals[cat] || 0) + (Number(e.amount) || 0);
  });

  const chartData = Object.keys(categoryTotals).map(cat => ({
    name: cat,
    value: categoryTotals[cat],
    color: CATEGORY_COLORS[cat] || '#64748B'
  }));

  const handleSaveExpense = (data) => {
    createExpense(data);
    showToast(`Expense of ₹${Number(data.amount).toLocaleString()} recorded!`, 'success');
  };

  const handleSaveIncome = (e) => {
    e.preventDefault();
    updateFinanceProfile({
      ...(financeProfile || {}),
      monthlyIncome: Number(monthlyIncomeInput) || 0
    });
    setIsEditingIncome(false);
    showToast('Monthly income baseline updated!', 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-12 transition-colors duration-200">
      {/* Finance Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl transition-colors duration-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">
            <DollarSign className="w-4 h-4" />
            <span>FINANCIAL LEDGER & EXPENSE INTELLIGENCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Financial Health & Outflow Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-1">
            Track daily expenses, categorize transactions, and inspect transparent cash flow derived strictly from your data.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setMonthlyIncomeInput(monthlyIncome);
              setIsEditingIncome(true);
            }}
            className="px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 border border-slate-300 dark:border-neutral-700 text-xs font-semibold text-slate-800 dark:text-neutral-200 transition-all cursor-pointer"
          >
            {monthlyIncome > 0 ? `Income: ₹${monthlyIncome.toLocaleString()}` : '+ Set Monthly Income'}
          </button>

          <button
            type="button"
            onClick={() => setIsAddExpenseOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-600/25 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Expense</span>
          </button>
        </div>
      </div>

      {/* KPI Cards (Derived Strictly from Actual Data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Monthly Income */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-neutral-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
            <span>Configured Income</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            ₹{monthlyIncome.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-neutral-400">
            {monthlyIncome > 0 ? 'Monthly baseline' : 'Click "Set Income" to configure'}
          </div>
        </div>

        {/* Total Actual Expenses */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-neutral-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
            <span>Total Logged Outflow</span>
            <div className="p-1.5 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            ₹{totalOutflow.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-neutral-400">
            {safeExpenses.length} transaction(s) recorded
          </div>
        </div>

        {/* Net Savings */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-neutral-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
            <span>Calculated Net Savings</span>
            <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-2xl font-extrabold font-mono ${netSavings >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600'}`}>
            ₹{netSavings.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-neutral-400 font-semibold">
            {monthlyIncome > 0 ? `${savingsRate}% savings rate` : 'Set income to calculate rate'}
          </div>
        </div>

        {/* Category Count */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-slate-200 dark:border-neutral-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
            <span>Active Categories</span>
            <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
            {Object.keys(categoryTotals).length} <span className="text-xs font-normal text-slate-500">Categories</span>
          </div>
          <div className="text-[11px] text-slate-500 dark:text-neutral-400">
            Across your recent spending
          </div>
        </div>
      </div>

      {/* Main Grid: Visual Breakdown & Searchable Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-500" />
              <span>Spending by Category</span>
            </h3>

            {chartData.length === 0 ? (
              <div className="text-center py-16 text-slate-400 dark:text-neutral-500 text-xs">
                No expense data available yet.
              </div>
            ) : (
              <>
                <div className="h-48 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        innerRadius={45}
                        paddingAngle={3}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-1.5 text-xs">
                  {chartData.map((b, i) => (
                    <div key={i} className="flex items-center justify-between text-[11px] text-slate-600 dark:text-neutral-400">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: b.color }} />
                        <span>{b.name}</span>
                      </div>
                      <span className="font-mono text-slate-900 dark:text-white font-semibold">
                        ₹{b.value.toLocaleString()} ({Math.round((b.value / (totalOutflow || 1)) * 100)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Searchable Transaction Ledger (2 Columns) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-neutral-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Transaction Ledger</h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400">History of all user-entered expenses</p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-neutral-300">
              {filteredExpenses.length} Records
            </span>
          </div>

          {/* Ledger Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by description..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white"
            >
              <option value="All">All Categories</option>
              {Object.keys(CATEGORY_COLORS).map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white"
            >
              <option value="date-desc">Newest Date</option>
              <option value="date-asc">Oldest Date</option>
              <option value="amount-high">Highest Amount</option>
              <option value="amount-low">Lowest Amount</option>
            </select>
          </div>

          {/* Ledger List */}
          {filteredExpenses.length === 0 ? (
            <div className="text-center py-16 text-slate-400 dark:text-neutral-500 text-xs space-y-2">
              <p>No expenses recorded yet.</p>
              <button
                type="button"
                onClick={() => setIsAddExpenseOpen(true)}
                className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
              >
                + Record Your First Expense
              </button>
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
              {filteredExpenses.map(exp => (
                <div
                  key={exp.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-850 transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="w-2.5 h-8 rounded-full shrink-0"
                      style={{ backgroundColor: CATEGORY_COLORS[exp.category] || '#10B981' }}
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{exp.title}</h4>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-neutral-400 mt-0.5 font-mono">
                        <span>{exp.date}</span>
                        <span>•</span>
                        <span>{exp.category}</span>
                        {exp.paymentMethod && (
                          <>
                            <span>•</span>
                            <span>{exp.paymentMethod}</span>
                          </>
                        )}
                        {exp.tripName && (
                          <>
                            <span>•</span>
                            <span className="text-teal-600 dark:text-teal-400">✈️ {exp.tripName}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white font-mono">
                      ₹{Number(exp.amount).toLocaleString()}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete expense "${exp.title}"?`)) {
                          deleteExpense(exp.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                      title="Delete expense"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Expense Modal */}
      <AddExpenseModal
        isOpen={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        onSave={handleSaveExpense}
        trips={travel}
      />

      {/* Income Baseline Edit Modal */}
      {isEditingIncome && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-neutral-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Configure Monthly Income</h3>
            <form onSubmit={handleSaveIncome} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-700 dark:text-neutral-300 mb-1">Estimated Monthly Income (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={monthlyIncomeInput}
                  onChange={e => setMonthlyIncomeInput(e.target.value)}
                  required
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white font-mono"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingIncome(false)}
                  className="flex-1 py-2 bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl"
                >
                  Save Baseline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
