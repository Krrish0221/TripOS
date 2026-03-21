"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useFontSize } from "@/context/FontSizeContext";
import { useTheme } from "next-themes";
import { Menu, X, Globe, Sun, Moon, Type, User } from "lucide-react";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { fontSize, toggleFontSize } = useFontSize();
  const { theme, setTheme } = useTheme();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Toggle helpers
  const toggleLanguage = () => setLanguage(language === "en" ? "es" : "en");
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleAuth = () => setIsAuthenticated(!isAuthenticated);

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Brand */}
        <Link href="/" className="text-xl font-bold tracking-tighter text-blue-600 dark:text-blue-400">
          TripOS
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex flex-1 justify-center space-x-6">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t("navHome")}</Link>
          <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t("navAbout")}</Link>
          <Link href="/features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t("navFeatures")}</Link>
          <Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{t("navContact")}</Link>
        </div>

        {/* Desktop Toggles & Auth */}
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Toggle Language" title="Toggle Language">
            <Globe size={20} />
            <span className="sr-only">Language: {language.toUpperCase()}</span>
          </button>
          
          <button onClick={toggleFontSize} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Toggle Font Size" title="Toggle Font Size">
            <Type size={20} className={fontSize === "large" ? "text-blue-600" : ""} />
            <span className="sr-only">Font Size: {fontSize}</span>
          </button>

          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors" aria-label="Toggle Dark Mode" title="Toggle Dark Mode">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="border-l border-zinc-300 dark:border-zinc-700 h-6 mx-2" />

          {isAuthenticated ? (
            <button onClick={toggleAuth} className="flex items-center space-x-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-4 py-2 rounded-full font-medium transition-colors hover:bg-blue-200 dark:hover:bg-blue-900/50">
              <User size={18} />
              <span>{t("profile")}</span>
            </button>
          ) : (
            <button onClick={toggleAuth} className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity">
              {t("login")} / {t("signup")}
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-6 flex flex-col space-y-4 shadow-lg h-screen">
          <Link href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>{t("navHome")}</Link>
          <Link href="/about" className="text-lg font-medium" onClick={() => setIsOpen(false)}>{t("navAbout")}</Link>
          <Link href="/features" className="text-lg font-medium" onClick={() => setIsOpen(false)}>{t("navFeatures")}</Link>
          <Link href="/contact" className="text-lg font-medium" onClick={() => setIsOpen(false)}>{t("navContact")}</Link>
          
          <div className="border-t border-zinc-200 dark:border-zinc-800 pt-4 flex items-center justify-around">
            <button onClick={toggleLanguage} className="flex flex-col items-center text-sm p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
              <Globe size={24} className="mb-1" />
              <span>{language.toUpperCase()}</span>
            </button>
            <button onClick={toggleFontSize} className="flex flex-col items-center text-sm p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
              <Type size={24} className={`mb-1 ${fontSize === "large" ? "text-blue-600" : ""}`} />
              <span>Size</span>
            </button>
            <button onClick={toggleTheme} className="flex flex-col items-center text-sm p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg">
              {theme === "dark" ? <Sun size={24} className="mb-1" /> : <Moon size={24} className="mb-1" />}
              <span>Theme</span>
            </button>
          </div>
          
          <div className="pt-4">
            {isAuthenticated ? (
              <button onClick={() => { toggleAuth(); setIsOpen(false); }} className="w-full flex items-center justify-center space-x-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-4 py-3 rounded-xl font-medium">
                <User size={20} />
                <span>{t("profile")} (Sign Out)</span>
              </button>
            ) : (
              <button onClick={() => { toggleAuth(); setIsOpen(false); }} className="w-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-4 py-3 rounded-xl font-medium">
                {t("login")} / {t("signup")}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
