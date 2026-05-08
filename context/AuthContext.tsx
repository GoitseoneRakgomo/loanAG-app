import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type AuthContextValue = {
  user: string | null;
  loading: boolean;
  initializing: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = '@loanag:user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const initAuth = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
        if (!active) return;

        if (storedUser) {
          setUser(storedUser);
        }
      } catch (err) {
        console.warn('[AuthContext] Failed to load stored user:', err);
        // Continue anyway - user just won't be persisted
      } finally {
        if (active) {
          setInitializing(false);
        }
      }
    };

    initAuth();

    return () => {
      active = false;
    };
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 650));

    if (username.trim().toLowerCase() === 'groot' && password === '1234groot') {
      await AsyncStorage.setItem(STORAGE_KEY, 'groot');
      setUser('groot');
      setLoading(false);
      return;
    }

    setLoading(false);
    throw new Error('Invalid username or password');
  };

  const logout = async () => {
    setLoading(true);
    await AsyncStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setLoading(false);
  };

  const value = useMemo(
    () => ({ user, loading, initializing, error, login, logout }),
    [user, loading, initializing, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
