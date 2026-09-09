import React, { useState } from 'react';
import { X, Plane, Calendar, DollarSign, MapPin, Users, Luggage, Navigation } from 'lucide-react';

export const AddTripModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [destination, setDestination] = useState(initialData?.destination || '');
  const [startDate, setStartDate] = useState(initialData?.startDate || new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(initialData?.endDate || new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0]);
  const [type, setType] = useState(initialData?.type || 'Vacation');
  const [travelersCount, setTravelersCount] = useState(initialData?.travelersCount || 1);
  const [transportation, setTransportation] = useState(initialData?.transportation || 'Flight');
  const [accommodation, setAccommodation] = useState(initialData?.accommodation || 'Hotel / Resort');
  const [budget, setBudget] = useState(initialData?.budget || 25000);
  const [status, setStatus] = useState(initialData?.status || 'Planning');
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [validationError, setValidationError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!name.trim()) {
      setValidationError('Please enter a trip name.');
      return;
    }
    if (!destination.trim()) {
      setValidationError('Please enter a destination.');
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      setValidationError('End date cannot be earlier than start date.');
      return;
    }
    if (Number(budget) < 0) {
      setValidationError('Budget cannot be negative.');
      return;
    }

    onSave({
      name: name.trim(),
      destination: destination.trim(),
      startDate,
      endDate,
      type,
      travelersCount: Number(travelersCount) || 1,
      transportation,
      accommodation,
      budget: Number(budget) || 0,
      status,
      notes: notes.trim()
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="w-full max-w-xl bg-white dark:bg-[#0D0D0D] border border-slate-200 dark:border-neutral-800 rounded-3xl shadow-2xl overflow-hidden my-8 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-teal-50 dark:bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {initialData ? 'Edit Trip Details' : 'Plan a New Trip'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-neutral-400">Add destination, logistics, itinerary & budget</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {validationError && (
            <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-500/30 text-xs text-red-600 dark:text-red-400 font-medium">
              ⚠️ {validationError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                Trip Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Goa Monsoon Getaway"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                Destination <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={destination}
                onChange={e => setDestination(e.target.value)}
                placeholder="e.g. North Goa, India"
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">Trip Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none"
              >
                <option value="Vacation">🌴 Vacation</option>
                <option value="Adventure">⛰️ Adventure</option>
                <option value="Roadtrip">🚗 Roadtrip</option>
                <option value="Business">💼 Business</option>
                <option value="Family">👨‍👩‍👧 Family</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">Travelers</label>
              <input
                type="number"
                min="1"
                max="50"
                value={travelersCount}
                onChange={e => setTravelersCount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">Estimated Budget (₹)</label>
              <input
                type="number"
                min="0"
                step="500"
                value={budget}
                onChange={e => setBudget(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">Transportation</label>
              <select
                value={transportation}
                onChange={e => setTransportation(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none"
              >
                <option value="Flight">✈️ Flight</option>
                <option value="Train">🚆 Train</option>
                <option value="Self Drive / Car">🚗 Self Drive / Car</option>
                <option value="Bus">🚌 Bus</option>
                <option value="Cruise / Ferry">🚢 Cruise / Ferry</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white focus:border-teal-500 focus:outline-none"
              >
                <option value="Planning">📝 Planning</option>
                <option value="Booked">🎫 Booked</option>
                <option value="In Progress">🚀 In Progress</option>
                <option value="Completed">✅ Completed</option>
                <option value="Archived">📦 Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">Trip Notes & Ideas</label>
            <textarea
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. Must try local seafood, sunset view at Anjuna beach, rent a scooter on day 1..."
              className="w-full px-3.5 py-2 bg-slate-50 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:border-teal-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-300 text-xs font-semibold transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shadow-lg shadow-teal-600/25 transition-all cursor-pointer"
            >
              {initialData ? 'Save Changes' : 'Create Trip Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
