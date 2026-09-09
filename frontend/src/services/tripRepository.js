export const tripRepository = {
  getTrips(userId) {
    try { const r = localStorage.getItem(`lifeos_user_${userId}_trips`); return r ? JSON.parse(r) : []; } catch { return []; }
  },
  saveTrips(userId, trips) { localStorage.setItem(`lifeos_user_${userId}_trips`, JSON.stringify(trips)); },
  addTrip(userId, trip) {
    const trips = this.getTrips(userId);
    const newT = { id: `trip_${Date.now()}`, itinerary: [], packingList: [], expenses: [], spent: 0, ...trip };
    trips.unshift(newT); this.saveTrips(userId, trips); return newT;
  },
  deleteTrip(userId, tripId) {
    this.saveTrips(userId, this.getTrips(userId).filter(t => t.id !== tripId));
    return true;
  }
};
