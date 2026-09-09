export const cloneTrip = (trip) => trip ? { ...trip, id: `trip_${Date.now()}_copy`, name: `${trip.name} (Copy)`, spent: 0, expenses: [] } : null;
