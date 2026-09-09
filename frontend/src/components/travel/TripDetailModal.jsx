import React, { useState } from 'react';
import {
  X,
  Plane,
  Calendar,
  DollarSign,
  MapPin,
  Users,
  Luggage,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Clock,
  Edit2,
  Copy,
  Tag
} from 'lucide-react';

export const TripDetailModal = ({
  isOpen,
  onClose,
  trip,
  onEditTrip,
  onDuplicateTrip,
  onDeleteTrip,
  onAddItineraryItem,
  onDeleteItineraryItem,
  onAddPackingItem,
  onTogglePackingItem,
  onAddTripExpense
}) => {
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary', 'packing', 'expenses', 'overview'

  // New Itinerary State
  const [itinDay, setItinDay] = useState(1);
  const [itinTitle, setItinTitle] = useState('');
  const [itinTime, setItinTime] = useState('10:00 AM');
  const [itinLocation, setItinLocation] = useState('');

  // New Packing Item State
  const [packItem, setPackItem] = useState('');
  const [packCategory, setPackCategory] = useState('Essentials');

  // New Trip Expense State
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expCategory, setExpCategory] = useState('Food');

  if (!isOpen || !trip) return null;

  // Compute days until trip or status
  const today = new Date();
  const start = new Date(trip.startDate);
  const diffTime = start.getTime() - today.getTime();
  const daysUntil = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const totalBudget = Number(trip.budget) || 0;
  const totalSpent = Number(trip.spent) || 0;
  const budgetPerc = totalBudget > 0 ? Math.min(100, Math.round((totalSpent / totalBudget) * 100)) : 0;

  const handleAddItin = (e) => {
    e.preventDefault();
    if (!itinTitle.trim()) return;
    onAddItineraryItem(trip.id, {
      day: Number(itinDay),
      title: itinTitle.trim(),
      time: itinTime,
      location: itinLocation.trim()
    });
    setItinTitle('');
    setItinLocation('');
  };

  const handleAddPack = (e) => {
    e.preventDefault();
    if (!packItem.trim()) return;
    onAddPackingItem(trip.id, {
      item: packItem.trim(),
      category: packCategory
    });
    setPackItem('');
  };

  const handleAddExp = (e) => {
    e.preventDefault();
    if (!expTitle.trim() || !expAmount) return;
    onAddTripExpense(trip.id, {
      title: expTitle.trim(),
      amount: Number(expAmount),
      category: expCategory
    });
    setExpTitle('');
    setExpAmount('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="w-full max-w-3xl bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-6 animate-slide-up flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 border border-teal-500/30">
                {trip.status}
              </span>
              <span className="text-xs text-slate-500 dark:text-neutral-400 font-mono">
                {trip.startDate} — {trip.endDate}
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{trip.name}</h2>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-neutral-400 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-teal-500" />
              <span>{trip.destination}</span>
              <span>•</span>
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>{trip.travelersCount} Traveler(s)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEditTrip(trip)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-300 text-xs font-semibold flex items-center gap-1 transition-all"
              title="Edit Trip"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Edit</span>
            </button>
            <button
              type="button"
              onClick={() => onDuplicateTrip(trip.id)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-700 dark:text-neutral-300 text-xs font-semibold flex items-center gap-1 transition-all"
              title="Duplicate Trip"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm(`Delete trip "${trip.name}"?`)) {
                  onDeleteTrip(trip.id);
                  onClose();
                }
              }}
              className="p-2 rounded-xl bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 text-xs font-semibold transition-all"
              title="Delete Trip"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Budget & Countdown Progress Strip */}
        <div className="px-6 py-3.5 bg-slate-100/70 dark:bg-neutral-900 border-b border-slate-200 dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 flex-1">
            <div className="min-w-[120px]">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-neutral-400">Budget Usage</span>
              <div className="font-mono font-bold text-slate-900 dark:text-white">
                ₹{totalSpent.toLocaleString()} <span className="text-slate-500 font-normal">/ ₹{totalBudget.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex-1 max-w-xs">
              <div className="w-full bg-slate-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    budgetPerc > 90 ? 'bg-red-500' : 'bg-teal-500'
                  }`}
                  style={{ width: `${budgetPerc}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-neutral-400 mt-0.5 font-mono">
                <span>{budgetPerc}% spent</span>
                <span>₹{Math.max(0, totalBudget - totalSpent).toLocaleString()} left</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            {daysUntil > 0 ? (
              <span className="font-mono font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40 px-2.5 py-1 rounded-lg border border-teal-500/30">
                ⏳ {daysUntil} Days to Departure
              </span>
            ) : daysUntil === 0 ? (
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                🎉 Departs Today!
              </span>
            ) : (
              <span className="text-slate-500 dark:text-neutral-400 font-mono">
                Completed
              </span>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-neutral-800 px-6 bg-white dark:bg-[#0D0D0D]">
          <button
            type="button"
            onClick={() => setActiveTab('itinerary')}
            className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-all ${
              activeTab === 'itinerary'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Day-by-Day Itinerary ({trip.itinerary?.length || 0})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('packing')}
            className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-all ${
              activeTab === 'packing'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Packing Checklist ({trip.packingList?.filter(p => p.packed).length || 0}/{trip.packingList?.length || 0})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('expenses')}
            className={`py-3 px-4 text-xs font-bold border-b-2 cursor-pointer transition-all ${
              activeTab === 'expenses'
                ? 'border-teal-500 text-teal-600 dark:text-teal-400'
                : 'border-transparent text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Trip Expenses ({trip.expenses?.length || 0})
          </button>
        </div>

        {/* Tab Content Panes */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {/* 1. ITINERARY TAB */}
          {activeTab === 'itinerary' && (
            <div className="space-y-4">
              {/* Add Activity Form */}
              <form onSubmit={handleAddItin} className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 space-y-3">
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Plus className="w-3.5 h-3.5 text-teal-500" />
                  <span>Add Itinerary Activity</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                  <div>
                    <select
                      value={itinDay}
                      onChange={e => setItinDay(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-xl text-xs text-slate-900 dark:text-white font-mono"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(d => (
                        <option key={d} value={d}>Day {d}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="e.g. Scuba diving & island boat tour"
                      value={itinTitle}
                      onChange={e => setItinTitle(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Time (e.g. 10:00 AM)"
                      value={itinTime}
                      onChange={e => setItinTime(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-xl text-xs text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-sm transition-all"
                  >
                    + Add to Schedule
                  </button>
                </div>
              </form>

              {/* Itinerary List */}
              {(!trip.itinerary || trip.itinerary.length === 0) ? (
                <div className="text-center py-12 text-slate-400 dark:text-neutral-500 text-xs">
                  No activities planned yet. Add your Day 1 schedule above!
                </div>
              ) : (
                <div className="space-y-2">
                  {trip.itinerary
                    .sort((a, b) => a.day - b.day)
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 hover:border-teal-500/40 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                            D{item.day}
                          </span>
                          <div>
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</h4>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5 font-mono">
                              <Clock className="w-3 h-3 text-teal-500" />
                              <span>{item.time}</span>
                              {item.location && <span>• 📍 {item.location}</span>}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => onDeleteItineraryItem(trip.id, item.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                          title="Delete activity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {/* 2. PACKING CHECKLIST TAB */}
          {activeTab === 'packing' && (
            <div className="space-y-4">
              {/* Add Packing Item */}
              <form onSubmit={handleAddPack} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Passport, Power bank, Beachwear, Sunscreen..."
                  value={packItem}
                  onChange={e => setPackItem(e.target.value)}
                  required
                  className="flex-1 px-3.5 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400"
                />
                <select
                  value={packCategory}
                  onChange={e => setPackCategory(e.target.value)}
                  className="px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white"
                >
                  <option value="Essentials">Essentials</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Toiletries">Toiletries</option>
                  <option value="Documents">Documents</option>
                </select>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all shadow-sm shrink-0"
                >
                  Add Item
                </button>
              </form>

              {/* Checklist Items */}
              {(!trip.packingList || trip.packingList.length === 0) ? (
                <div className="text-center py-12 text-slate-400 dark:text-neutral-500 text-xs">
                  Your packing list is empty. Add essential items above to ensure nothing is left behind!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {trip.packingList.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => onTogglePackingItem(trip.id, idx)}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 hover:bg-slate-100 dark:hover:bg-neutral-850 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {item.packed ? (
                          <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-400 dark:text-neutral-500 shrink-0" />
                        )}
                        <span className={`text-xs truncate ${item.packed ? 'line-through text-slate-400 dark:text-neutral-500' : 'text-slate-900 dark:text-white font-medium'}`}>
                          {item.item}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400">
                        {item.category || 'General'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3. TRIP EXPENSES TAB */}
          {activeTab === 'expenses' && (
            <div className="space-y-4">
              {/* Add Expense Form */}
              <form onSubmit={handleAddExp} className="p-4 rounded-2xl bg-slate-50 dark:bg-neutral-900/60 border border-slate-200 dark:border-neutral-800 space-y-3">
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-teal-500" />
                  <span>Log Trip Expense</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <input
                      type="text"
                      placeholder="e.g. Flight ticket, Resort bill"
                      value={expTitle}
                      onChange={e => setExpTitle(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Amount (₹)"
                      value={expAmount}
                      onChange={e => setExpAmount(e.target.value)}
                      required
                      min="1"
                      className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-xl text-xs text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                  <div>
                    <select
                      value={expCategory}
                      onChange={e => setExpCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-slate-300 dark:border-neutral-700 rounded-xl text-xs text-slate-900 dark:text-white"
                    >
                      <option value="Transport">Transport</option>
                      <option value="Accommodation">Accommodation</option>
                      <option value="Food & Dining">Food & Dining</option>
                      <option value="Activities">Activities / Tickets</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Miscellaneous">Miscellaneous</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-sm transition-all"
                  >
                    + Record Expense
                  </button>
                </div>
              </form>

              {/* Expense List */}
              {(!trip.expenses || trip.expenses.length === 0) ? (
                <div className="text-center py-12 text-slate-400 dark:text-neutral-500 text-xs">
                  No expenses logged for this trip yet. Track flight tickets, hotel bills, and meal costs!
                </div>
              ) : (
                <div className="space-y-2">
                  {trip.expenses.map((exp) => (
                    <div
                      key={exp.id}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800"
                    >
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{exp.title}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-neutral-400 mt-0.5">
                          <span className="font-mono">{exp.date}</span>
                          <span>•</span>
                          <span className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-neutral-800 font-mono">{exp.category}</span>
                        </div>
                      </div>
                      <div className="text-sm font-extrabold text-teal-600 dark:text-teal-400 font-mono">
                        ₹{Number(exp.amount).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
