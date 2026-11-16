'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Profile } from '../lib/data';

type AppContextType = {
  profile: Profile | null;
  loaded: boolean;
  signIn: (email: string) => { ok: boolean; error?: string };
  register: (data: Omit<Profile, 'id' | 'createdAt' | 'allocation' | 'onboardingComplete' | 'paymentVerified'>) => { ok: boolean; error?: string };
  signOut: () => void;
  completeOnboarding: () => void;
  markPaymentVerified: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('profile');
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch {
        localStorage.removeItem('profile');
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      if (profile) {
        localStorage.setItem('profile', JSON.stringify(profile));
      } else {
        localStorage.removeItem('profile');
      }
    }
  }, [profile, loaded]);

  const signIn = (email: string) => {
    const saved = localStorage.getItem('profile');
    if (!saved) return { ok: false, error: 'No account found' };
    try {
      const p: Profile = JSON.parse(saved);
      if (p.email.toLowerCase() === email.toLowerCase()) {
        setProfile(p);
        return { ok: true };
      }
      return { ok: false, error: 'Account not found' };
    } catch {
      return { ok: false, error: 'Invalid account data' };
    }
  };

  const register = (data: Omit<Profile, 'id' | 'createdAt' | 'allocation' | 'onboardingComplete' | 'paymentVerified'>) => {
    const existing = localStorage.getItem('profile');
    if (existing) return { ok: false, error: 'Account already exists on this device' };
    const newProfile: Profile = {
      id: Date.now().toString(),
      ...data,
      createdAt: Date.now(),
      allocation: 2700,
      onboardingComplete: false,
      paymentVerified: false,
    };
    setProfile(newProfile);
    return { ok: true };
  };

  const signOut = () => {
    setProfile(null);
  };

  const completeOnboarding = () => {
    if (profile) {
      setProfile({ ...profile, onboardingComplete: true });
    }
  };

  const markPaymentVerified = () => {
    if (profile) {
      setProfile({ ...profile, paymentVerified: true });
    }
  };

  return (
    <AppContext.Provider value={{
      profile,
      loaded,
      signIn,
      register,
      signOut,
      completeOnboarding,
      markPaymentVerified,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}