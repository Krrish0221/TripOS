"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";
import { Menu, X, Globe, Sun, Moon, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, openAuthModal } = useAuth();

  // Toggle helpers
  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Brand (Left) */}
        <div className="flex-1 flex justify-start">
          <Link href="/" className="text-2xl font-black tracking-tighter text-blue-600 dark:text-blue-400 flex items-center h-10 hover:opacity-80 transition-opacity">
            TripOS
          </Link>
        </div>
        
        {/* Desktop Links (Center) */}
        <div className="hidden md:flex flex-none justify-center space-x-8">
          <Link href="/" className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center h-10">{t("navHome")}</Link>
          <Link href="/about" className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center h-10">{t("navAbout")}</Link>
          <Link href="/features" className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center h-10">{t("navFeatures")}</Link>
          <Link href="/contact" className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center h-10">{t("navContact")}</Link>
        </div>

        {/* Desktop Toggles & Auth (Right) */}
        <div className="hidden md:flex flex-1 items-center justify-end space-x-3">
          <div className="relative flex items-center h-10 group bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
            <Globe size={16} className="absolute left-3 text-zinc-500 pointer-events-none transition-colors group-hover:text-blue-600" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
              className="pl-9 pr-4 h-full bg-transparent focus:outline-none appearance-none cursor-pointer font-semibold text-sm leading-tight text-zinc-700 dark:text-zinc-300"
              aria-label="Select Language"
            >
              <option value="en" className="text-zinc-900 bg-white">Eng</option>
              <option value="es" className="text-zinc-900 bg-white">Esp</option>
              <option value="hi" className="text-zinc-900 bg-white">Hin</option>
              <option value="gu" className="text-zinc-900 bg-white">Guj</option>
            </select>
          </div>
          
          <button onClick={toggleTheme} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors text-zinc-700 dark:text-zinc-300" aria-label="Toggle Theme" title="Toggle Theme">
            {mounted ? (resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />) : <div className="w-[18px] h-[18px]" />}
          </button>

          <div className="border-l border-zinc-300 dark:border-zinc-700 h-5 mx-1" />

          {isAuthenticated ? (
            <Link href="/profile" className="flex items-center justify-center h-10 space-x-2 bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 px-5 rounded-full font-bold transition-colors hover:bg-blue-200 dark:hover:bg-blue-900/60 shadow-sm text-sm">
              <User size={16} />
              <span>{t("profile")}</span>
            </Link>
          ) : (
            <button onClick={openAuthModal} className="flex items-center justify-center h-10 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-6 rounded-full font-bold hover:opacity-90 transition-opacity whitespace-nowrap shadow-sm text-sm">
              {t("login")} / {t("signup")}
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex-1 flex justify-end">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-6 flex flex-col space-y-4 shadow-lg h-[calc(100vh-73px)] overflow-y-auto">
          <Link href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>{t("navHome")}</Link>
          <Link href="/about" className="text-lg font-medium" onClick={() => setIsOpen(false)}>{t("navAbout")}</Link>
          <Link href="/features" className="text-lg font-medium" onClick={() => setIsOpen(false)}>{t("navFeatures")}</Link>
          <Link href="/contact" className="text-lg font-medium" onClick={() => setIsOpen(false)}>{t("navContact")}</Link>
          
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 flex items-center justify-around">
            <div className="flex flex-col items-center">
              <Globe size={24} className="mb-2 text-zinc-500" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 text-sm focus:outline-none"
              >
                <option value="en" className="text-zinc-900 bg-white">English</option>
                <option value="es" className="text-zinc-900 bg-white">Español</option>
                <option value="hi" className="text-zinc-900 bg-white">हिंदी</option>
                <option value="gu" className="text-zinc-900 bg-white">ગુજરાતી</option>
              </select>
            </div>
            
            <button onClick={toggleTheme} className="flex flex-col items-center text-sm p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
              {mounted ? (resolvedTheme === "dark" ? <Sun size={24} className="mb-2 text-zinc-500" /> : <Moon size={24} className="mb-2 text-zinc-500" />) : <div className="w-[24px] h-[24px] mb-2" />}
              <span>{mounted ? (resolvedTheme === "dark" ? "Light Mode" : "Dark Mode") : "Mode"}</span>
            </button>
          </div>
          
          <div className="pt-6">
            {isAuthenticated ? (
              <Link href="/profile" onClick={() => setIsOpen(false)} className="w-full flex items-center justify-center space-x-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-4 py-3 rounded-xl font-medium">
                <User size={20} />
                <span>{t("profile")}</span>
              </Link>
            ) : (
              <button onClick={() => { openAuthModal(); setIsOpen(false); }} className="w-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-4 py-3 rounded-xl font-medium">
                {t("login")} / {t("signup")}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
