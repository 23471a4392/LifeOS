import React, { useState } from 'react';
import { useLifeOS } from '../../context/LifeOSContext';
import { AddTripModal } from './AddTripModal';
import { TripDetailModal } from './TripDetailModal';
import {
  Plane,
  MapPin,
  Calendar,
  DollarSign,
  Plus,
  Luggage,
  Search,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  Copy,
  Edit2,
  Trash2,
  Navigation,
  Compass
} from 'lucide-react';

export const TravelView = () => {
  const {
    travel = [],
    createTrip,
    updateTrip,
    deleteTrip,
    duplicateTrip,
    addTripItineraryItem,
    deleteTripItineraryItem,
    addTripPackingItem,
    toggleTripPackingItem,
    addTripExpense,
    showToast
  } = useLifeOS();

  // Search, Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc'); // 'date-desc', 'date-asc', 'budget-high', 'budget-low', 'name'

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const safeTrips = Array.isArray(travel) ? travel : [];

  // Filter and sort computation
  const filteredTrips = safeTrips
    .filter(trip => {
      const matchSearch =
        trip.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.destination?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'All' || trip.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'date-desc') return new Date(b.startDate) - new Date(a.startDate);
      if (sortBy === 'date-asc') return new Date(a.startDate) - new Date(b.startDate);
      if (sortBy === 'budget-high') return (b.budget || 0) - (a.budget || 0);
      if (sortBy === 'budget-low') return (a.budget || 0) - (b.budget || 0);
      if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
      return 0;
    });

  const handleSaveTrip = (tripData) => {
    if (editingTrip) {
      updateTrip(editingTrip.id, tripData);
      showToast(`Trip "${tripData.name}" updated successfully!`, 'success');
      setEditingTrip(null);
    } else {
      const created = createTrip(tripData);
      showToast(`Trip "${created.name}" created!`, 'success');
    }
  };

  const handleOpenEdit = (trip) => {
    setEditingTrip(trip);
    setIsAddModalOpen(true);
  };

  // Sync selected trip when updated
  const activeSelectedTrip = selectedTrip ? safeTrips.find(t => t.id === selectedTrip.id) || null : null;

  return (
    <div className="space-y-6 animate-fade-in pb-12 transition-colors duration-200">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl transition-colors duration-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400 mb-1">
            <Plane className="w-4 h-4" />
            <span>TRAVEL, VACATIONS & ITINERARIES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Trips Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-1">
            Plan destinations, organize day-by-day itineraries, manage packing checklists, and control travel budgets.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingTrip(null);
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-lg shadow-teal-600/25 transition-all self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Trip</span>
        </button>
      </div>

      {/* Search, Filter & Sort Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-sm">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 dark:text-neutral-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search trips by name or destination..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Planning', 'Booked', 'In Progress', 'Completed'].map(status => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === status
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-neutral-400 hover:bg-slate-100 dark:hover:bg-neutral-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-xl text-xs text-slate-800 dark:text-neutral-200 focus:outline-none cursor-pointer"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="budget-high">Highest Budget</option>
            <option value="budget-low">Lowest Budget</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Trips Grid / List */}
      {filteredTrips.length === 0 ? (
        <div className="text-center py-20 px-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto ring-1 ring-teal-500/20">
            <Compass className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {safeTrips.length === 0 ? 'No trips yet' : 'No matching trips found'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 max-w-md mx-auto">
              {safeTrips.length === 0
                ? 'Add your first trip to start organizing schedules, packing items, and travel budget.'
                : 'Try adjusting your search query or status filter.'}
            </p>
          </div>
          {safeTrips.length === 0 && (
            <button
              type="button"
              onClick={() => {
                setEditingTrip(null);
                setIsAddModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-lg shadow-teal-600/25 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Plan Your First Trip</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map(trip => {
            const totalBudget = Number(trip.budget) || 0;
            const totalSpent = Number(trip.spent) || 0;
            const budgetPerc = totalBudget > 0 ? Math.min(100, Math.round((totalSpent / totalBudget) * 100)) : 0;
            const itineraryCount = trip.itinerary?.length || 0;
            const packedCount = trip.packingList?.filter(p => p.packed).length || 0;
            const totalPackCount = trip.packingList?.length || 0;

            return (
              <div
                key={trip.id}
                onClick={() => setSelectedTrip(trip)}
                className="p-6 rounded-3xl bg-white dark:bg-[#080808] border border-slate-200 dark:border-neutral-800 shadow-xl space-y-4 flex flex-col justify-between hover:border-teal-500/50 transition-all cursor-pointer group relative"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-500/20 text-teal-700 dark:text-teal-300 font-bold uppercase border border-teal-500/30">
                        {trip.status}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1.5 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                        {trip.name}
                      </h3>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-neutral-900 font-mono text-slate-600 dark:text-neutral-400">
                      {trip.type}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600 dark:text-neutral-400">
                    <div className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-teal-500" />
                      <span className="text-slate-900 dark:text-white font-semibold">{trip.destination}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{trip.startDate} — {trip.endDate}</span>
                    </div>
                  </div>

                  {trip.notes && (
                    <p className="text-[11px] text-slate-500 dark:text-neutral-400 line-clamp-2 italic">
                      "{trip.notes}"
                    </p>
                  )}
                </div>

                {/* Logistics & Budget Summary */}
                <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-neutral-800">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-500 dark:text-neutral-400">Budget Spent</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        ₹{totalSpent.toLocaleString()} / ₹{totalBudget.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          budgetPerc > 90 ? 'bg-red-500' : 'bg-teal-500'
                        }`}
                        style={{ width: `${budgetPerc}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-neutral-400">
                    <span>{itineraryCount} activities</span>
                    <span>{packedCount}/{totalPackCount} packed</span>
                  </div>

                  <div className="flex items-center justify-end gap-1.5 pt-1" onClick={e => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(trip)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => duplicateTrip(trip.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-neutral-800 transition-colors"
                      title="Duplicate"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete "${trip.name}"?`)) {
                          deleteTrip(trip.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Modal */}
      <AddTripModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingTrip(null);
        }}
        onSave={handleSaveTrip}
        initialData={editingTrip}
      />

      {/* Trip Details & Workflows Modal */}
      {activeSelectedTrip && (
        <TripDetailModal
          isOpen={!!activeSelectedTrip}
          onClose={() => setSelectedTrip(null)}
          trip={activeSelectedTrip}
          onEditTrip={handleOpenEdit}
          onDuplicateTrip={duplicateTrip}
          onDeleteTrip={deleteTrip}
          onAddItineraryItem={addTripItineraryItem}
          onDeleteItineraryItem={deleteTripItineraryItem}
          onAddPackingItem={addTripPackingItem}
          onTogglePackingItem={toggleTripPackingItem}
          onAddTripExpense={addTripExpense}
        />
      )}
    </div>
  );
};
