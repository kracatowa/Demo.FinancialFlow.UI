import { useEffect } from 'react';
import { useAuth } from './AuthContext';
import type { User } from './AuthContext';

/**
 * Hook that guarantees a user is authenticated and returns user data.
 * Automatically triggers login if user is not authenticated.
 * Should be used in components that require authentication.
 */
export function useCurrentUser(): User {
  const auth = useAuth();
  const user = auth.getAccount?.();
  
  useEffect(() => {
    if (!auth.isAuthenticated() || !user) {
      auth.login();
    }
  }, [auth, user]);
  
  if (!user) {
    throw new Error('User not authenticated. Login process should have been triggered.');
  }
  
  return user;
}