'use client';

import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  miaPreferences: {
    personality: 'flirty' | 'friendly' | 'professional' | 'sassy';
    interests: string[];
    responseLength: 'short' | 'medium' | 'long';
    reminderFrequency: 'low' | 'medium' | 'high';
  };
  subscription: {
    plan: 'free' | 'premium';
    stripeCustomerId?: string;
    subscriptionId?: string;
    currentPeriodEnd?: string;
  };
  isEmailVerified: boolean;
  lastActiveAt: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  updateMiaPreferences: (preferences: Partial<User['miaPreferences']>) => Promise<void>;
  refreshToken: () => Promise<boolean>;
  clearError: () => void;
  getAccessToken: () => string | null;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Access token lives in memory only. The refresh token is an httpOnly
  // cookie the browser attaches automatically — JS never reads or stores it.
  const accessTokenRef = useRef<string | null>(null);

  const parseJson = async (response: Response) => {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }
    return { error: await response.text() };
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include', // sends the httpOnly refresh cookie
      });
      if (!response.ok) {
        accessTokenRef.current = null;
        setUser(null);
        return false;
      }
      const data = await parseJson(response);
      accessTokenRef.current = data.accessToken;
      return true;
    } catch {
      accessTokenRef.current = null;
      setUser(null);
      return false;
    }
  };

  // Attaches the in-memory access token; on a 401, refreshes once and retries.
  const apiRequest = async (url: string, options: RequestInit = {}) => {
    const makeRequest = (authToken: string | null) => {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
      };
      if (authToken) headers['Authorization'] = `Bearer ${authToken}`;
      return fetch(`${API_BASE_URL}${url}`, { ...options, headers, credentials: 'include' });
    };

    let response = await makeRequest(accessTokenRef.current);

    if (response.status === 401) {
      const refreshed = await refreshToken();
      if (refreshed) response = await makeRequest(accessTokenRef.current);
    }
    return response;
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await parseJson(response);
      if (response.ok) {
        accessTokenRef.current = data.accessToken;
        setUser(data.user);
        window.location.replace('/chats');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData),
      });
      const data = await parseJson(response);
      if (response.ok) {
        accessTokenRef.current = data.accessToken;
        setUser(data.user);
        window.location.replace('/chats');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await apiRequest('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore network errors on logout
    } finally {
      accessTokenRef.current = null;
      setUser(null);
      setIsLoading(false);
      router.push('/');
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<void> => {
    try {
      setError(null);
      const response = await apiRequest('/api/user/profile', {
        method: 'PUT',
        body: JSON.stringify(updates),
      });
      const data = await parseJson(response);
      if (response.ok) setUser(data.user);
      else setError(data.error || 'Profile update failed');
    } catch {
      setError('Profile update failed. Please try again.');
    }
  };

  const updateMiaPreferences = async (
    preferences: Partial<User['miaPreferences']>
  ): Promise<void> => {
    try {
      setError(null);
      const response = await apiRequest('/api/user/mia-preferences', {
        method: 'PUT',
        body: JSON.stringify(preferences),
      });
      const data = await parseJson(response);
      if (response.ok) {
        setUser(prev =>
          prev ? { ...prev, miaPreferences: { ...prev.miaPreferences, ...data.miaPreferences } } : null
        );
      } else {
        setError(data.error || 'Preferences update failed');
      }
    } catch {
      setError('Preferences update failed. Please try again.');
    }
  };

  const getCurrentUser = async (): Promise<void> => {
    try {
      const response = await apiRequest('/api/auth/me');
      const data = await parseJson(response);
      if (response.ok) {
        setUser(data.user);
      } else {
        accessTokenRef.current = null;
        setUser(null);
      }
    } catch {
      accessTokenRef.current = null;
      setUser(null);
    }
  };

  const clearError = () => setError(null);

  // On mount, /me returns 401 (no token in memory yet); apiRequest then
  // silently refreshes off the cookie and retries, restoring the session.
  useEffect(() => {
    (async () => {
      await getCurrentUser();
      setIsLoading(false);
    })();
  }, []);

  const getAccessToken = () => accessTokenRef.current;

  const value: AuthContextType = {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    updateMiaPreferences,
    refreshToken,
    clearError,
    getAccessToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};