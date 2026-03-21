"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "es" | "hi" | "gu";

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
  },
  hi: {
    heroTitle: "अपने अगले रोमांच की खोज करें",
    heroSubtitle: "स्थानीय स्थानों का अन्वेषण करें और लाइव डेटा के साथ दूरस्थ क्षेत्रों की यात्राओं की योजना बनाएं।",
    heroCta: "योजना बनाना शुरू करें",
    navHome: "मुख्य पृष्ठ",
    navAbout: "हमारे बारे में",
    navFeatures: "सुविधाएँ",
    navContact: "संपर्क",
    login: "लॉग इन",
    signup: "साइन अप",
    profile: "प्रोफ़ाइल",
    weatherTitle: "लाइव मौसम",
    destinationsTitle: "लोकप्रिय गंतव्य",
    destinationsDesc: "डेटाबेस-संचालित गंतव्य ग्रिड के लिए फ्रंटएंड प्लेसहोल्डर।",
    footerText: "© 2026 TripOS. सर्वाधिकार सुरक्षित।"
  },
  gu: {
    heroTitle: "તમારા આગલા સાહસની શોધ કરો",
    heroSubtitle: "સ્થાનિક સ્થળોનું અન્વેષણ કરો અને લાઇવ ડેટા સાથે દૂરસ્થ વિસ્તારોની સફરનું આયોજન કરો.",
    heroCta: "આયોજન શરૂ કરો",
    navHome: "હોમ",
    navAbout: "અમારા વિશે",
    navFeatures: "સુવિધાઓ",
    navContact: "સંપર્ક",
    login: "લૉગિન",
    signup: "સાઇન અપ",
    profile: "પ્રોફાઇલ",
    weatherTitle: "લાઇવ હવામાન",
    destinationsTitle: "લોકપ્રિય સ્થળો",
    destinationsDesc: "ડેટાબેઝ-સંચાલિત ગંતવ્ય ગ્રીડ માટે ફ્રન્ટએન્ડ પ્લેસહોલ્ડર.",
    footerText: "© 2026 TripOS. સર્વાધિકાર સુરક્ષિત."
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
