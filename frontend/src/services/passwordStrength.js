/**
 * Password Strength & Entropy Evaluator
 */
export const checkPasswordStrength = (password = '') => {
  let score = 0;
  const checks = {
    length: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password)
  };

  if (checks.length) score += 1;
  if (checks.hasUpper && checks.hasLower) score += 1;
  if (checks.hasNumber) score += 1;
  if (checks.hasSpecial) score += 1;
  if (password.length >= 12) score += 1;

  let label = 'Weak';
  let color = 'bg-red-500';
  if (score >= 4) { label = 'Strong'; color = 'bg-emerald-500'; }
  else if (score >= 3) { label = 'Moderate'; color = 'bg-amber-500'; }

  return { score, label, color, checks, isValid: checks.length && score >= 2 };
};
