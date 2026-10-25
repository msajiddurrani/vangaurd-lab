"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signOut as firebaseSignOut, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser 
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { User } from '../types';

export const formatAuthError = (err: any): string => {
  if (!err) return 'An unexpected error occurred.';
  const code = err.code || '';
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Invalid email or password. Please verify your credentials.';
    case 'auth/email-already-in-use':
      return 'This email address is already registered. Please log in.';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed before completing.';
    case 'auth/unauthorized-domain':
      return 'Domain not authorized in Firebase Console.';
    case 'auth/too-many-requests':
      return 'Too many failed login attempts. Please wait a moment or reset your password.';
    case 'auth/network-request-failed':
      return 'Network connection error. Please check your internet connection.';
    case 'auth/missing-password':
      return 'Please enter your password.';
    default:
      return err.message ? err.message.replace(/^Firebase:\s*/, '') : 'Authentication failed. Please try again.';
  }
};

const DEMO_USER: User = {
  id: 'vanguard-demo-athlete',
  name: 'Marcus Vance',
  email: 'athlete@vanguardlab.io',
  membershipTier: 'pro'
};

const DEMO_STORAGE_KEY = 'vanguard_demo_athlete_session';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  signupWithEmail: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginAsDemo: () => void;
  sendPasswordReset: (email: string) => Promise<void>;
  formatAuthError: (err: any) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load profile overrides (membership tier) from localStorage for a given UID
  const getStoredProfile = (uid: string): Partial<User> => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = localStorage.getItem(`vanguard_profile_${uid}`);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  useEffect(() => {
    // Check if demo user is active in localStorage
    if (typeof window !== 'undefined') {
      const demoSession = localStorage.getItem(DEMO_STORAGE_KEY);
      if (demoSession) {
        try {
          const parsed = JSON.parse(demoSession);
          setUser(parsed);
          setLoading(false);
        } catch {
          // ignore corrupted JSON
        }
      }
    }

    // Listen for Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Clear any leftover demo session when real Firebase user signs in
        if (typeof window !== 'undefined') {
          localStorage.removeItem(DEMO_STORAGE_KEY);
        }
        const profile = getStoredProfile(firebaseUser.uid);
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || profile.name || 'Athlete',
          email: firebaseUser.email || '',
          membershipTier: profile.membershipTier || 'free'
        });
      } else {
        // Only clear user if not currently in demo mode
        if (typeof window !== 'undefined' && localStorage.getItem(DEMO_STORAGE_KEY)) {
          // Keep demo user active
        } else {
          setUser(null);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email.trim(), password);
  };

  const signupWithEmail = async (name: string, email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
    if (name.trim()) {
      await updateProfile(userCredential.user, { displayName: name.trim() });
    }
  };

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const loginAsDemo = () => {
    setUser(DEMO_USER);
    if (typeof window !== 'undefined') {
      localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(DEMO_USER));
    }
  };

  const sendPasswordReset = async (email: string) => {
    await sendPasswordResetEmail(auth, email.trim());
  };

  const logout = async () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(DEMO_STORAGE_KEY);
    }
    setUser(null);
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      if (typeof window !== 'undefined') {
        if (user.id === DEMO_USER.id) {
          localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(updated));
        } else {
          localStorage.setItem(`vanguard_profile_${user.id}`, JSON.stringify(updated));
        }
      }
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      logout, 
      updateUser,
      loginWithEmail,
      signupWithEmail,
      loginWithGoogle,
      loginAsDemo,
      sendPasswordReset,
      formatAuthError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

