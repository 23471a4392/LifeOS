export const validateTripPayload = (d) => {
  const errors = {};
  if (!d.name || d.name.trim().length < 2) errors.name = 'Trip name required.';
  if (!d.destination || d.destination.trim().length < 2) errors.destination = 'Destination required.';
  if (!d.startDate) errors.startDate = 'Start date required.';
  if (!d.endDate) errors.endDate = 'End date required.';
  if (d.startDate && d.endDate && new Date(d.endDate) < new Date(d.startDate)) errors.endDate = 'End date must be after start.';
  return { isValid: Object.keys(errors).length === 0, errors };
};
