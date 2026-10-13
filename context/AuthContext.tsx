"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { useRouter } from "next/navigation";

export interface UserSession {
  userId: string;
  id?: string;
  _id?: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  preferredSport?: string;
  age?: number;
  membership?: {
    plan: "NONE" | "STARTER" | "PERFORMANCE" | "ELITE";
    status: "ACTIVE" | "PENDING" | "EXPIRED";
    billingCycle: "MONTHLY" | "ANNUAL";
    startDate?: string;
  };
  metrics?: {
    sessionsCompleted: number;
    attendanceRate: number;
    fitnessScore: number;
    techniqueScore: number;
    tacticalScore: number;
    enduranceScore: number;
  };
}

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword?: string;
    age: number;
    preferredSport: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  requireAuth: (action: () => void, intentDescription?: string) => void;
  openAuthModal: (tab?: "login" | "register", intentDesc?: string, onAuthSuccess?: () => void) => void;
  closeAuthModal: () => void;
  isAuthModalOpen: boolean;
  authModalTab: "login" | "register";
  authIntentText: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login");
  const [authIntentText, setAuthIntentText] = useState("Create your athlete account to continue.");
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);
  const router = useRouter();

  // Load user session on mount
  const checkSession = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { method: "GET" });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user || null);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const openAuthModal = (tab: "login" | "register" = "login", intentDesc?: string, onAuthSuccess?: () => void) => {
    setAuthModalTab(tab);
    if (intentDesc) {
      setAuthIntentText(intentDesc);
    } else {
      setAuthIntentText("Create your athlete account to continue.");
    }
    if (onAuthSuccess) {
      setPendingCallback(() => onAuthSuccess);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setPendingCallback(null);
  };

  const requireAuth = (action: () => void, intentDescription = "Create your athlete account to continue.") => {
    if (user) {
      action();
    } else {
      openAuthModal("login", intentDescription, action);
    }
  };

  const handlePostAuthSuccess = (loggedUser: UserSession) => {
    setUser(loggedUser);
    setIsAuthModalOpen(false);
    if (pendingCallback) {
      const cb = pendingCallback;
      setPendingCallback(null);
      setTimeout(() => {
        cb();
      }, 100);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Login failed" };
      }
      handlePostAuthSuccess(data.user);
      return { success: true };
    } catch {
      return { success: false, error: "Network error during login" };
    }
  };

  const register = async (formData: {
    name: string;
    email: string;
    phone: string;
    password: string;
    age: number;
    preferredSport: string;
  }) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || "Registration failed" };
      }
      handlePostAuthSuccess(data.user);
      return { success: true };
    } catch {
      return { success: false, error: "Network error during registration" };
    }
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      router.push("/");
    } catch {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        requireAuth,
        openAuthModal,
        closeAuthModal,
        isAuthModalOpen,
        authModalTab,
        authIntentText,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
