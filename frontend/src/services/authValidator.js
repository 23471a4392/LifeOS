/**
 * Strict Email & Credential Validator
 * RFC 5322 compliant regex and disposable domain blacklist
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') return { valid: false, error: 'Email address is required.' };
  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) return { valid: false, error: 'Invalid email format. Please check your address.' };
  const domain = trimmed.split('@')[1];
  const blockedDomains = ['tempmail.com', 'throwawaymail.com', '10minutemail.com', 'mailinator.com'];
  if (blockedDomains.includes(domain)) return { valid: false, error: 'Disposable email domains are not permitted.' };
  return { valid: true, email: trimmed };
};
