"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    heroTitle: "Discover Your Next Adventure",
    heroSubtitle: "Explore local spots and plan trips to remote areas with live global data.",
    heroCta: "Start Planning",
    navHome: "Home",
    navAbout: "About",
    navFeatures: "Features",
    navContact: "Contact",
    login: "Login",
    signup: "Sign Up",
    profile: "Profile",
    weatherTitle: "Live Weather",
    destinationsTitle: "Popular Destinations",
    destinationsDesc: "Frontend placeholder for database-driven destinations grid.",
    footerText: "© 2026 TripOS. All rights reserved."
  },
  es: {
    heroTitle: "Descubre Tu Próxima Aventura",
    heroSubtitle: "Explora lugares locales y planea viajes a áreas remotas con datos globales en vivo.",
    heroCta: "Empieza a Planear",
    navHome: "Inicio",
    navAbout: "Acerca de",
    navFeatures: "Características",
    navContact: "Contacto",
    login: "Iniciar Sesión",
    signup: "Registrarse",
    profile: "Perfil",
    weatherTitle: "Clima en Vivo",
    destinationsTitle: "Destinos Populares",
    destinationsDesc: "Marcador de posición del frontend para la cuadrícula de destinos basada en base de datos.",
    footerText: "© 2026 TripOS. Todos los derechos reservados."
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations["en"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
