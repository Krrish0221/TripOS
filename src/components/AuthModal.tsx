"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Lock, ChevronDown, UserPlus } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [view, setView] = useState<"login" | "signup">("login");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-zinc-50 dark:bg-[#131315] w-full max-w-sm rounded-[2rem] pt-12 pb-6 px-8 shadow-2xl flex flex-col transform transition-all border border-zinc-200 dark:border-zinc-800/50">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-[2.5rem] leading-none font-black text-zinc-900 dark:text-white mb-3 tracking-tight">
            {view === "login" ? "Login" : "Sign Up"}
          </h2>
          <p className="text-[15px] text-zinc-500 dark:text-zinc-400 font-medium">
            {view === "login" 
              ? "Securely access your dashboard." 
              : "Create an account to continue."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-4">
          
          {view === "signup" && (
            <input 
              type="text" 
              placeholder="Full Name" 
              required
              className="w-full bg-zinc-200/50 dark:bg-zinc-800/60 border border-transparent dark:border-zinc-800 focus:border-zinc-300 dark:focus:border-zinc-600 text-zinc-900 dark:text-white px-5 py-4 rounded-2xl outline-none text-[15px] placeholder-zinc-500 font-medium transition-colors"
            />
          )}

          <input 
            type="text" 
            placeholder="Phone Number / Email" 
            required
            className="w-full bg-zinc-200/50 dark:bg-zinc-800/60 border border-transparent dark:border-zinc-800 focus:border-zinc-300 dark:focus:border-zinc-600 text-zinc-900 dark:text-white px-5 py-4 rounded-2xl outline-none text-[15px] placeholder-zinc-500 font-medium transition-colors"
          />

          <input 
            type="password" 
            placeholder="Password / OTP" 
            required
            className="w-full bg-zinc-200/50 dark:bg-zinc-800/60 border border-transparent dark:border-zinc-800 focus:border-zinc-300 dark:focus:border-zinc-600 text-zinc-900 dark:text-white px-5 py-4 rounded-2xl outline-none text-[15px] placeholder-zinc-500 font-medium transition-colors"
          />

          <button 
            type="submit"
            className={`w-full flex items-center justify-center space-x-2 py-4 rounded-full font-bold transition-all mt-8 mb-8
              bg-zinc-900 text-white dark:bg-white dark:text-black
              shadow-[0_0_20px_rgba(0,0,0,0.15)] dark:shadow-[0_0_25px_rgba(255,255,255,0.15)]
              hover:shadow-[0_0_30px_rgba(0,0,0,0.25)] dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]
              active:scale-[0.98]
            `}
          >
            <span>{view === "login" ? "Authenticate" : "Create Profile"}</span>
            {view === "login" ? <Lock size={18} strokeWidth={2.5} /> : <UserPlus size={18} strokeWidth={2.5} />}
          </button>
        </form>

        {/* Footer Links */}
        <div className="flex flex-col items-center space-y-4">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
            {view === "login" ? "First time here? " : "Already have an account? "}
            <button 
              type="button"
              onClick={() => setView(view === "login" ? "signup" : "login")} 
              className="text-zinc-900 dark:text-white font-bold underline hover:opacity-80 transition-opacity"
            >
              {view === "login" ? "Create Profile" : "Login"}
            </button>
          </p>
          
          {view === "login" && (
            <button type="button" className="text-zinc-500 dark:text-zinc-500 text-sm font-medium hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors">
              Reset Password
            </button>
          )}
        </div>

        {/* Bottom Chevron (Close) */}
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 flex justify-center w-full">
          <button 
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <ChevronDown size={32} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
