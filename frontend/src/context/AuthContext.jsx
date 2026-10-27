// ─── AuthContext.jsx ───────────────────────────────────────────────────────────
// Provides demo authentication state and actions with localStorage persistence.
// IMPORTANT: This is frontend-only demo auth — not production secure.
// ─────────────────────────────────────────────────────────────────────────────

import { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext(null);

const STORAGE_KEY = 'mealwise_user';
const TOKEN_KEY = 'mealwise_token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  const login = useCallback((userData) => {
    setUser(userData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      localStorage.setItem(TOKEN_KEY, `demo-token-${userData.role}-${Date.now()}`);
    } catch (e) {
      console.warn('Failed to save user session to localStorage', e);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      console.warn('Failed to clear user session from localStorage', e);
    }
  }, []);

  // Listen for unauthorized events from api.js
  useEffect(() => {
    const handleUnauthorized = () => logout();
    window.addEventListener('mealwise:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('mealwise:unauthorized', handleUnauthorized);
  }, [logout]);

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
