export const DEMO_TRIPS = [{
  id: 'demo_trip_manali', name: 'Himalayan Expedition', destination: 'Manali, HP',
  startDate: '2026-10-15', endDate: '2026-10-22', type: 'Adventure', budget: 45000, spent: 32000, status: 'Booked'
}];
export const getScopedTrips = (userId, isDemo, userTrips = []) => isDemo ? DEMO_TRIPS : userTrips;
