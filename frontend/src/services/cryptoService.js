/**
 * Cryptographic Hashing Service
 * Utilizes Web Crypto API SHA-256 with project salt
 */
const SALT = '_lifeos_secure_salt_2026_v2';

export const hashPassword = async (password) => {
  if (!password) return '';
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + SALT);
    const hash = await window.crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  // Fallback hash for node environment / testing
  let hash = 0;
  const str = password + SALT;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return 'fallback_' + Math.abs(hash).toString(16);
};

export const verifyPassword = async (rawPassword, storedHash) => {
  const computed = await hashPassword(rawPassword);
  return computed === storedHash;
};
