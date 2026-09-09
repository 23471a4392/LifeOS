/**
 * Dedicated Registration Workflow Handler
 * Guarantees zero auto-login after signup
 */
import { validateEmail } from './authValidator';
import { hashPassword } from './cryptoService';

export const processRegistration = async ({ name, email, password, confirmPassword, role }) => {
  const emailRes = validateEmail(email);
  if (!emailRes.valid) return { success: false, error: emailRes.error };
  if (!name || name.trim().length < 2) return { success: false, error: 'Full name must be at least 2 characters.' };
  if (!password || password.length < 8) return { success: false, error: 'Password must be at least 8 characters.' };
  if (password !== confirmPassword) return { success: false, error: 'Passwords do not match.' };

  const passwordHash = await hashPassword(password);
  const newUser = {
    id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
    name: name.trim(),
    email: emailRes.email,
    role: role?.trim() || 'LifeOS Member',
    passwordHash,
    createdAt: new Date().toISOString(),
    isDemo: false
  };

  return {
    success: true,
    user: newUser,
    message: 'Account created successfully! Please sign in with your credentials to access your private workspace.'
  };
};
