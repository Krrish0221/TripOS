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
    footerText: "© 2026 TripOS. All rights reserved.",
    
    // About
    aboutTitle: "About TripOS",
    aboutDesc: "We are a passionate team dedicated to uncovering the world's most breathtaking destinations. Our platform serves as your ultimate guide to discovering local businesses, planning trips to remote areas, and experiencing the globe like never before.",
    aboutPillar1Title: "Accessibility First",
    aboutPillar1Desc: "Designed for all connections, featuring our ultra-fast Data Saver mode that intelligently strips bandwidth-heavy assets for text-based geographic summaries.",
    aboutPillar2Title: "AI-Powered Planning",
    aboutPillar2Desc: "Smart, dynamic itineraries generated instantly for any destination. Leveraging advanced models for accurate transit estimating and targeted locale curation.",
    aboutPillar3Title: "Localized Discovery",
    aboutPillar3Desc: "Uncovering hidden gems and supporting localized businesses worldwide. Explore deeper than the tourist traps with interactive routing and live conditions.",
    aboutTechTitle: "The Tech Under the Hood",
    aboutTechDesc: "TripOS is built with a relentless focus on full-stack optimization and high-performance, open-source-friendly architecture. Our infrastructure is completely scalable, utilizing Next.js Server Actions to safely orchestrate complex parallel API fetches.",
    aboutLead: "Lead Engineer & Architect",
    aboutCreatorDesc: "I am a passionate full-stack developer driven by the desire to engineer intelligent, AI-driven solutions that solve real-world problems. TripOS is a culmination of my obsession with seamless user experiences, deeply accessible web infrastructure, and scalable, futuristic web architectures.",
    aboutReady: "Ready to test the engine?",
    aboutReadyDesc: "Head over to the Trip Planner. Search for a destination, toggle the Data Saver, and let our AI calculate your routes and curate your top spots instantly.",
    aboutStartBtn: "Start Your Journey",

    // Features
    featuresTitle: "Trip Planner",
    featuresDesc: "Discover local spots, check live conditions, get AI recommendations, and save itineraries directly to your profile.",
    featuresOrigin: "Origin (e.g. New Delhi)",
    featuresDest: "Destination (e.g. Srinagar)",
    searchBtn: "Search",
    dataSaverOn: "Data Saver: ON",
    dataSaverOff: "Data Saver: OFF",
    saveToItinerary: "Save to Itinerary",
    savedToProfile: "Saved to Profile",
    explore: "Explore",
    lowBandwidth: "Low-Bandwidth Mode Active",
    liveClimate: "Live Climate",
    aiGuide: "AI Groq Guide",
    routing: "Routing:",
    mustVisit: "Must-Visit Spots",
    bookBtn: "Book",
    featuresTemp: "Temp",
    featuresWind: "Wind",
    flight: "Flight",
    train: "Train",
    road: "Road",
    lowBandwidthDesc: "Heavy map tiles have been disabled. Here is a lightweight geographical summary instead:",
    est: "Est",
    routeUnavailable: "Route unavailable."
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
    footerText: "© 2026 TripOS. Todos los derechos reservados.",
    
    // About
    aboutTitle: "Acerca de TripOS",
    aboutDesc: "Somos un equipo apasionado dedicado a descubrir los destinos más impresionantes del mundo. Nuestra plataforma sirve como su guía definitiva para descubrir negocios locales, planificar viajes a áreas remotas y experimentar el globo como nunca antes.",
    aboutPillar1Title: "Accesibilidad Primero",
    aboutPillar1Desc: "Diseñado para todas las conexiones, con nuestro modo súper rápido de Ahorro de Datos que inteligentemente elimina los recursos pesados de ancho de banda para mostrar resúmenes geográficos basados en texto.",
    aboutPillar2Title: "Planificación con IA",
    aboutPillar2Desc: "Itinerarios inteligentes y dinámicos generados al instante para cualquier destino. Aprovechando modelos avanzados para una estimación precisa del tránsito y una curación de ubicaciones orientada.",
    aboutPillar3Title: "Descubrimiento Localizado",
    aboutPillar3Desc: "Descubriendo joyas escondidas y apoyando a empresas locales en todo el mundo. Explora más a fondo que las típicas trampas turísticas con enrutamiento interactivo y condiciones en vivo.",
    aboutTechTitle: "La Tecnología Debajo del Capó",
    aboutTechDesc: "TripOS está construido con un enfoque implacable en la optimización full-stack y una arquitectura de alto rendimiento y amigable con el código abierto. Nuestra infraestructura es completamente escalable, utilizando Server Actions de Next.js.",
    aboutLead: "Ingeniero Principal y Arquitecto",
    aboutCreatorDesc: "Soy un desarrollador full-stack apasionado impulsado por el deseo de diseñar soluciones inteligentes y controladas por IA que resuelvan problemas del mundo real. TripOS es una culminación de mi obsesión por experiencias de usuario impecables.",
    aboutReady: "¿Listo para probar el motor?",
    aboutReadyDesc: "Dirígete al Planificador de Viajes. Busca un destino, activa el Ahorro de Datos y deja que nuestra IA calcule tus rutas y organice tus mejores lugares de forma instantánea.",
    aboutStartBtn: "Comienza Tu Viaje",

    // Features
    featuresTitle: "Planificador de Viajes",
    featuresDesc: "Descubre lugares locales, verifica las condiciones en vivo, obtén recomendaciones de la IA y guarda itinerarios directamente en tu perfil.",
    featuresOrigin: "Origen (e.g. Nueva Delhi)",
    featuresDest: "Destino (e.g. Srinagar)",
    searchBtn: "Buscar",
    dataSaverOn: "Ahorro de Datos: ENCENDIDO",
    dataSaverOff: "Ahorro de Datos: APAGADO",
    saveToItinerary: "Guardar en Itinerario",
    savedToProfile: "Guardado en el Perfil",
    explore: "Explorar",
    lowBandwidth: "Modo de Bajo Ancho de Banda Activo",
    liveClimate: "Clima en Vivo",
    aiGuide: "Guía de IA",
    routing: "Rutas:",
    mustVisit: "Lugares Imperdibles",
    bookBtn: "Reservar",
    featuresTemp: "Temp",
    featuresWind: "Viento",
    flight: "Vuelo",
    train: "Tren",
    road: "Auto",
    lowBandwidthDesc: "Los mapas pesados se han desactivado. Aquí hay un resumen geográfico en su lugar:",
    est: "Est",
    routeUnavailable: "Ruta no disponible."
  },
  hi: {
    heroTitle: "अपने अगले रोमांच की खोज करें",
    heroSubtitle: "स्थानीय स्थानों का अन्वेषण करें और लाइव डेटा के साथ दूरस्थ क्षेत्रों की यात्राओं की योजना बनाएं।",
    heroCta: "योजना बनाना शुरू करें",
    navHome: "मुख पृष्ठ",
    navAbout: "हमारे बारे में",
    navFeatures: "सुविधाएँ",
    navContact: "संपर्क",
    login: "लॉग इन",
    signup: "साइन अप",
    profile: "प्रोफ़ाइल",
    weatherTitle: "लाइव मौसम",
    destinationsTitle: "लोकप्रिय गंतव्य",
    destinationsDesc: "डेटाबेस-संचालित गंतव्य ग्रिड के लिए फ्रंटएंड प्लेसहोल्डर।",
    footerText: "© 2026 TripOS. सर्वाधिकार सुरक्षित।",
    
    // About
    aboutTitle: "TripOS के बारे में",
    aboutDesc: "हम एक उत्साही टीम हैं जो दुनिया के सबसे लुभावने गंतव्यों को उजागर करने के लिए समर्पित हैं। यह प्लेटफ़ॉर्म स्थानीय व्यवसायों की खोज करने और यात्राओं की योजना बनाने के लिए आपके अंतिम मार्गदर्शक के रूप में कार्य करता है।",
    aboutPillar1Title: "सुलभता (Accessibility)",
    aboutPillar1Desc: "सभी प्रकार के कनेक्शनों के लिए डिज़ाइन किया गया, जिसमें हमारा डेटा सेवर मोड है जो समझदारी से भारी डेटा को हटा कर भौगोलिक सारांश दिखाता है।",
    aboutPillar2Title: "AI-संचालित योजना",
    aboutPillar2Desc: "किसी भी गंतव्य के लिए स्मार्ट, गतिशील यात्रा कार्यक्रम। सटीक परिवहन अनुमानों के लिए उन्नत AI मॉडल का उपयोग।",
    aboutPillar3Title: "स्थानीय खोज",
    aboutPillar3Desc: "छिपे हुए रत्नों को उजागर करना और दुनिया भर में स्थानीय व्यवसायों का समर्थन करना। लाइव स्थितियों के साथ गहराई से अन्वेषण करें।",
    aboutTechTitle: "तकनीक (Tech Under the Hood)",
    aboutTechDesc: "TripOS को फुल-स्टैक अनुकूलन और उच्च-प्रदर्शन वाले ओपन-सोर्स आर्किटेक्चर के साथ बनाया गया है। बुनियादी ढांचा पूरी तरह से स्केलेबल है।",
    aboutLead: "प्रमुख इंजीनियर और आर्किटेक्ट",
    aboutCreatorDesc: "मैं एक फुल-स्टैक डेवलपर हूं जो AI-संचालित समाधानों को तैयार करने की इच्छा से प्रेरित है। TripOS निर्बाध उपयोगकर्ता अनुभव और सुलभ वेब बुनियादी ढांचे का परिणाम है।",
    aboutReady: "क्या आप परीक्षण के लिए तैयार हैं?",
    aboutReadyDesc: "ट्रिप प्लानर पर जाएं। कोई गंतव्य खोजें, डेटा सेवर चालू करें, और हमारे AI को आपके मार्गों और शीर्ष स्थानों की गणना करने दें।",
    aboutStartBtn: "अपनी यात्रा शुरू करें",

    // Features
    featuresTitle: "ट्रिप प्लानर",
    featuresDesc: "स्थानीय स्थानों की खोज करें, लाइव स्थिति जांचें, एआई सिफारिशें प्राप्त करें और सीधे अपनी प्रोफ़ाइल में यात्रा कार्यक्रम सहेजें।",
    featuresOrigin: "शुरुआती बिंदु (जैसे, नई दिल्ली)",
    featuresDest: "मंज़िल (जैसे, श्रीनगर)",
    searchBtn: "खोजें",
    dataSaverOn: "डेटा सेवर: चालू",
    dataSaverOff: "डेटा सेवर: बंद",
    saveToItinerary: "इटिनररी में सहेजें",
    savedToProfile: "प्रोफ़ाइल में सहेजा गया",
    explore: "अन्वेषण करें",
    lowBandwidth: "कम बैंडविड्थ मोड सक्रिय",
    liveClimate: "लाइव मौसम",
    aiGuide: "एआई गाइड",
    routing: "मार्गों:",
    mustVisit: "ज़रूर जाने योग्य स्थान",
    bookBtn: "बुक करें",
    featuresTemp: "तापमान",
    featuresWind: "हवा",
    flight: "उड़ान",
    train: "ट्रेन",
    road: "सड़क",
    lowBandwidthDesc: "भारी मानचित्र बंद कर दिए गए हैं। यहाँ भौगोलिक सारांश है:",
    est: "अनुमान",
    routeUnavailable: "मार्ग उपलब्ध नहीं है।"
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
    footerText: "© 2026 TripOS. સર્વાધિકાર સુરક્ષિત.",
    
    // About
    aboutTitle: "TripOS વિશે",
    aboutDesc: "અમે એક ઉત્સાહી ટીમ છીએ જેની મદદથી વિશ્વના સૌથી સુંદર સ્થળોની શોધ કરી શકાય છે. અમારું પ્લેટફોર્મ તમને સ્થાનિક વ્યવસાયો શોધવામાં અને સાહસિક યાત્રાઓની યોજના બનાવવામાં મદદ કરે છે.",
    aboutPillar1Title: "સુલભતા (Accessibility)",
    aboutPillar1Desc: "તમામ કનેક્શન્સ માટે ડિઝાઇન કરેલ, આ ડેટા સેવર મોડ ભારે ડેટાને હટાવીને ભૌગોલિક સારાંશ બતાવે છે.",
    aboutPillar2Title: "AI-આધારિત પલાનિંગ",
    aboutPillar2Desc: "કોઈપણ ગંતવ્ય માટે સ્માર્ટ અને ડાયનેમિક યાત્રાક્રમ. સચોટ પરિવહન અનુમાન માટે શક્તિશાળી મોડલ્સનો ઉપયોગ.",
    aboutPillar3Title: "સ્થાનિક શોધ",
    aboutPillar3Desc: "છુપાયેલા રત્નો શોધવા અને દુનિયાભરમાં સ્થાનિક વ્યવસાયોને ટેકો આપવો. લાઇવ અપડેટ્સ સાથે ઉંડાણમાં અન્વેષણ કરો.",
    aboutTechTitle: "ટેકનોલોજી (Tech Under the Hood)",
    aboutTechDesc: "TripOS ઉચ્ચ-પ્રદર્શન અને ઓપન સોર્સ આર્કિટેક્ચર પર બનાવવામાં આવ્યું છે. સર્વર એક્શન્સ અને Next.js દ્વારા સંચાલિત.",
    aboutLead: "મુખ્ય એન્જિનિયર અને આર્કિટેક્ટ",
    aboutCreatorDesc: "હું એક ફુલ-સ્ટેક ડેવલપર છું જે વાસ્તવિક દુનિયાના પ્રશ્નો ઉકેલવા AI સોલ્યુશન્સ બનાવવાની ઈચ્છા ધરાવે છે. આ પ્રોજેક્ટ મારા અનુભવનું પરિણામ છે.",
    aboutReady: "શું તમે તૈયાર છો?",
    aboutReadyDesc: "ટ્રિપ પ્લાનર પર જાઓ. તમારું સ્થળ શોધો, ડેટા સેવર ઓન કરો અને અમારા AI ને તમારા માટે શ્રેષ્ઠ સ્થળો પસંદ કરવા દો.",
    aboutStartBtn: "તમારી યાત્રા શરૂ કરો",

    // Features
    featuresTitle: "ટ્રિપ પ્લાનર",
    featuresDesc: "સ્થાનિક સ્થળો શોધો, લાઇવ હવામાન તપાસો, AI ની ભલામણો મેળવો અને તમારી યાત્રા સીધી પ્રોફાઇલમાં સેવ કરો.",
    featuresOrigin: "શરૂઆત (જેમ કે નવી દિલ્હી)",
    featuresDest: "ગંતવ્ય (જેમ કે શ્રીનગર)",
    searchBtn: "શોધો",
    dataSaverOn: "ડેટા સેવર: ચાલુ",
    dataSaverOff: "ડેટા સેવર: બંધ",
    saveToItinerary: "સેવ કરો",
    savedToProfile: "પ્રોફાઈલમાં સેવ થયું",
    explore: "અન્વેષણ કરો",
    lowBandwidth: "લો બેન્ડવિડ્થ મોડ ચાલુ છે",
    liveClimate: "લાઇવ હવામાન",
    aiGuide: "AI ગાઇડ",
    routing: "રૂટીંગ:",
    mustVisit: "મુલાકાત લેવા લાયક સ્થળો",
    bookBtn: "બુક કરો",
    featuresTemp: "તાપમાન",
    featuresWind: "પવન",
    flight: "ફ્લાઇટ",
    train: "ટ્રેન",
    road: "રસ્તો",
    lowBandwidthDesc: "ભારે નકશા બંધ કરવામાં આવ્યા છે. અહીં ભૌગોલિક સારાંશ છે:",
    est: "અંદાજ",
    routeUnavailable: "માર્ગ ઉપલબ્ધ નથી."
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
