/**
 * Safe Logout & State Sanitizer
 */
import { sessionManager } from './sessionManager';

export const executeLogout = (onSuccess) => {
  sessionManager.clearSession();
  sessionStorage.clear();
  if (typeof onSuccess === 'function') {
    onSuccess();
  }
  return { success: true, message: 'Logged out securely.' };
};
