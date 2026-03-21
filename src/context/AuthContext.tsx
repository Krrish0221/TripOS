"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AuthModal from "@/components/AuthModal";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  openAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Simulate checking for a stored session in mock database
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Check local storage for existing session
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("tripos_auth");
      if (stored === "true") setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    setIsModalOpen(false);
    if (typeof window !== "undefined") localStorage.setItem("tripos_auth", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") localStorage.setItem("tripos_auth", "false");
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      login,
      logout,
      openAuthModal: () => setIsModalOpen(true)
    }}>
      {children}
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onLogin={login} 
      />
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
