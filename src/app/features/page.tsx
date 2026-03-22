"use client";

import { useState, useEffect } from "react";
import { Search, Map as MapIcon, Cloud, Wifi, WifiOff, Save, Check, Thermometer, Wind, Droplets, Sparkles, AlertCircle, Plane, Train, Car, Plus, MapPin, Compass } from "lucide-react";
import { generateTravelGuide, generateTransitEstimates, generateTopSpots } from "@/actions/travel";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

interface WeatherData {
  temperature: number;
  windspeed: number;
  condition: string;
}

function FeaturesContent() {
  const { isAuthenticated, openAuthModal } = useAuth();
  const { t, language } = useLanguage();

  const [searchInput, setSearchInput] = useState("");
  const [searchOrigin, setSearchOrigin] = useState("New Delhi");
  const [origin, setOrigin] = useState("New Delhi");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const dest = params.get("destination") || "Srinagar";
    setLocation(dest);
    setSearchInput(dest);
  }, []);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  
  // AI Insights State
  const [aiInsights, setAiInsights] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [activeTheme, setActiveTheme] = useState("general highlights");

  // Advanced Routing & Spots
  const [transitData, setTransitData] = useState<any>(null);
  const [transitLoading, setTransitLoading] = useState(false);
  const [topSpots, setTopSpots] = useState<any[]>([]);
  const [spotsLoading, setSpotsLoading] = useState(false);
  const [savedSpots, setSavedSpots] = useState<string[]>([]);

  // Accessibility & DB features
  const [dataSaver, setDataSaver] = useState(false);
  const [wikiSummary, setWikiSummary] = useState("");
  
  const [isSaved, setIsSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setLocation(searchInput.trim());
    if (searchOrigin.trim()) setOrigin(searchOrigin.trim());
    setIsSaved(false);
    setErrorMsg("");
  };

  const handleSaveToItinerary = () => {
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }
    
    // Simulate DB Push
    const storedObject = {
      destination: location,
      temp: weather?.temperature ? `${weather.temperature}°C` : "Unknown",
      ai_tips: aiInsights.split('\n').filter(l => l.trim() !== ""),
      savedAt: new Date().toISOString()
    };
    
    console.log("Pushing to Mock DB:", storedObject);
    // Pretend Network Request...
    setTimeout(() => setIsSaved(true), 300);
  };

  const handleAiThemeClick = async (theme: string) => {
    setActiveTheme(theme);
    setAiLoading(true);
    setAiInsights("");
    try {
      const insights = await generateTravelGuide(location, theme, language);
      setAiInsights(insights);
    } catch (err) {
      console.error(err);
      setAiInsights("Failed to load AI insights at this time.");
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    if (!location) return;

    async function fetchAllData() {
      setLoading(true);
      setAiLoading(true);
      setErrorMsg("");
      setAiInsights("");
      setWikiSummary("");

      try {
        // 1. Geocode the location
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`);
        const geoData = await geoRes.json();
        
        if (!geoData.results || geoData.results.length === 0) {
          setErrorMsg(`Location "${location}" not found.`);
          setWeather(null);
          setLoading(false);
          setAiLoading(false);
          return;
        }

        const { latitude, longitude, name, country } = geoData.results[0];
        const formattedLocation = searchInput ? `${name}, ${country}` : location;
        setLocation(formattedLocation);

        // 2. Fetch current weather
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await weatherRes.json();
        const code = weatherData.current_weather.weathercode;
        let conditionStr = "Clear";
        if (code > 0 && code <= 3) conditionStr = "Partly Cloudy";
        if (code >= 45 && code <= 48) conditionStr = "Foggy";
        if (code >= 51 && code <= 67) conditionStr = "Rainy";
        if (code >= 71 && code <= 77) conditionStr = "Snowy";
        if (code >= 95) conditionStr = "Thunderstorm";

        const weatherMap: Record<string, Record<string, string>> = {
          en: { Clear: "Clear", "Partly Cloudy": "Partly Cloudy", Foggy: "Foggy", Rainy: "Rainy", Snowy: "Snowy", Thunderstorm: "Thunderstorm" },
          es: { Clear: "Despejado", "Partly Cloudy": "Parcialmente Nublado", Foggy: "Niebla", Rainy: "Lluvioso", Snowy: "Nevado", Thunderstorm: "Tormenta" },
          hi: { Clear: "साफ़", "Partly Cloudy": "आंशिक रूप से बादल", Foggy: "धुंध", Rainy: "बरसात", Snowy: "बर्फबारी", Thunderstorm: "आंधी" },
          gu: { Clear: "સ્પષ્ટ", "Partly Cloudy": "આંશિક વાદળછાયું", Foggy: "ધુમ્મસ", Rainy: "વરસાદી", Snowy: "બરફવર્ષા", Thunderstorm: "વાવાઝોડું" }
        };
        const locCondition = weatherMap[language]?.[conditionStr] || conditionStr;

        setWeather({
          temperature: weatherData.current_weather.temperature,
          windspeed: weatherData.current_weather.windspeed,
          condition: locCondition,
        });

        // 3. Fetch Wikipedia Summary (Data Saver Backend logic)
        try {
          const wikiLang = ["en", "es", "hi", "gu"].includes(language) ? language : "en";
          const wikiRes = await fetch(`https://${wikiLang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`);
          if (wikiRes.ok) {
            const wikiData = await wikiRes.json();
            setWikiSummary(wikiData.extract || "No quick text summary available for this region.");
          }
        } catch (e) {
          console.error("Wiki fetch failed", e);
        }

        setLoading(false);

        // Fetch AI Transit & Spots concurrently without blocking Weather
        setTransitLoading(true);
        setSpotsLoading(true);
        
        const orgForAi = searchOrigin ? searchOrigin.trim() : "New Delhi";
        generateTransitEstimates(orgForAi, formattedLocation, language)
          .then(res => { setTransitData(res); setTransitLoading(false); })
          .catch(() => setTransitLoading(false));

        generateTopSpots(formattedLocation, language)
          .then(res => { setTopSpots(res || []); setSpotsLoading(false); })
          .catch(() => setSpotsLoading(false));

        // 4. Fetch AI Insights securely using Next.js Server Action
        try {
          const insights = await generateTravelGuide(formattedLocation, activeTheme, language);
          setAiInsights(insights);
        } catch (aiErr) {
          console.error(aiErr);
          setAiInsights("Failed to load AI insights at this time.");
        } finally {
          setAiLoading(false);
        }

      } catch (err) {
        console.error("Error fetching data:", err);
        setErrorMsg("Failed to load live data. Retrying...");
        setLoading(false);
        setAiLoading(false);
      }
    }

    fetchAllData();
  }, [location, searchInput]); // activeTheme is intentionally NOT in dependency array for the main fetch to avoid double-loading.

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#131315] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header & Search */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            {t("featuresTitle")}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
            {t("featuresDesc")}
          </p>
          
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto mt-8 relative flex flex-col md:flex-row items-center shadow-lg rounded-[2rem] md:rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 divide-y md:divide-y-0 md:divide-x dark:divide-zinc-800">
            <div className="flex-1 w-full relative flex items-center">
              <MapPin className="absolute left-4 text-zinc-400" size={20} />
              <input 
                type="text" 
                placeholder={t("featuresOrigin")} 
                value={searchOrigin}
                onChange={(e) => setSearchOrigin(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-transparent text-zinc-900 dark:text-white outline-none font-medium placeholder-zinc-400"
              />
            </div>
            <div className="flex-1 w-full relative flex items-center">
              <Search className="absolute left-4 text-zinc-400" size={20} />
              <input 
                type="text" 
                placeholder={t("featuresDest")} 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-12 pr-32 py-4 bg-transparent text-zinc-900 dark:text-white outline-none font-medium placeholder-zinc-400"
              />
              <button type="submit" className="absolute right-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-colors">
                {t("searchBtn")}
              </button>
            </div>
          </form>
        </div>

        {/* Toolbar: Data Saver & Save to DB */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setDataSaver(!dataSaver)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-colors text-sm ${
                dataSaver 
                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/50" 
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
              }`}
            >
              {dataSaver ? <WifiOff size={16} /> : <Wifi size={16} />}
              <span>{dataSaver ? t("dataSaverOn") : t("dataSaverOff")}</span>
            </button>
            <p className="text-xs text-zinc-400 font-medium hidden md:block">
              {dataSaver ? "Map disabled to save bandwidth." : "Full interactive maps and rich data enabled."}
            </p>
          </div>

          <button 
            onClick={handleSaveToItinerary}
            disabled={isSaved || loading || !!errorMsg}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-colors text-sm flex-shrink-0 ${
              isSaved 
                ? "bg-emerald-500 text-white" 
                : loading || !!errorMsg 
                  ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed" 
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
            }`}
          >
            {isSaved ? <Check size={16} /> : <Save size={16} />}
            <span>{isSaved ? t("savedToProfile") : t("saveToItinerary")}</span>
          </button>
        </div>

        {/* Dynamic Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Map Section */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col min-h-[400px] h-full">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between bg-white dark:bg-zinc-900/50">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <MapIcon size={20} className="text-blue-500" />
                {t("explore")} {location.split(',')[0]}
              </h2>
            </div>
            
            <div className="flex-1 relative bg-zinc-100 dark:bg-zinc-950 flex flex-col items-center justify-center p-8">
              {dataSaver ? (
                <div className="w-full max-w-2xl text-left bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center gap-3 mb-4">
                    <WifiOff size={24} className="text-green-600" />
                    <h3 className="text-lg font-bold text-green-700 dark:text-green-500">{t("lowBandwidth")}</h3>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium mb-4">
                    {t("lowBandwidthDesc")}
                  </p>
                  <div className="bg-zinc-50 dark:bg-zinc-950 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800/50">
                    <p className="text-zinc-900 dark:text-zinc-300 leading-relaxed font-serif">
                      {wikiSummary || "Loading simplified regional data..."}
                    </p>
                  </div>
                </div>
              ) : (
                <iframe 
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0 w-full h-full border-0"
                  title="Interactive Map"
                />
              )}
            </div>
          </div>

          {/* Right Column: Climate & AI */}
          <div className="flex flex-col gap-8 h-full">
            
            {/* Climate Check Section */}
            <div className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm p-8 flex flex-col flex-1">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                <Cloud size={20} className="text-blue-500" />
                {t("liveClimate")}
              </h2>

              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 min-h-[200px]">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
                </div>
              ) : errorMsg ? (
                <div className="flex-1 flex items-center justify-center text-red-500 font-medium text-center p-4">
                  {errorMsg}
                </div>
              ) : weather ? (
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-center mb-6">
                    <div className="text-center">
                      <span className="text-7xl font-black text-zinc-900 dark:text-white tracking-tighter">
                        {Math.round(weather.temperature)}°
                      </span>
                      <span className="text-xl font-bold text-zinc-400 ml-1">C</span>
                      <p className="text-xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                        {weather.condition}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mt-auto">
                    <div className="flex justify-between items-center p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800/50">
                      <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 font-medium text-sm">
                        <Thermometer size={16} /> {t("featuresTemp")}
                      </div>
                      <span className="font-bold text-zinc-900 dark:text-white">{weather.temperature}° C</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800/50">
                      <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 font-medium text-sm">
                        <Wind size={16} /> {t("featuresWind")}
                      </div>
                      <span className="font-bold text-zinc-900 dark:text-white">{weather.windspeed} km/h</span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* AI Insights Section */}
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-[2rem] shadow-lg p-8 flex flex-col relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500 rounded-full blur-[50px] opacity-30"></div>
              
              <div className="flex flex-col gap-4 mb-6 relative z-10">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles size={20} className="text-purple-300" />
                  {t("aiGuide")}
                </h2>
                
                {/* AI Theme Pills */}
                <div className="flex flex-wrap gap-2">
                  {["Adventure", "Relaxing", "Photography"].map((theme) => (
                    <button
                      key={theme}
                      onClick={() => handleAiThemeClick(theme)}
                      className={`text-[12px] px-3 py-1.5 rounded-full font-bold border transition-colors ${
                        activeTheme === theme
                          ? "bg-purple-500 border-purple-400 text-white"
                          : "bg-indigo-900/50 border-indigo-700 text-purple-200 hover:bg-indigo-800"
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              {aiLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-purple-200 min-h-[120px] relative z-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-300 mb-3"></div>
                  <p className="font-medium animate-pulse text-sm">AI is researching {activeTheme} in {location.split(',')[0]}...</p>
                </div>
              ) : (
                <div className="relative z-10 text-purple-50 font-medium leading-relaxed text-[15px]">
                  {aiInsights ? (
                    <ul className="space-y-3 list-none">
                      {aiInsights.split('\n')
                        .filter(line => line.trim().length > 0)
                        .map((insight, idx) => {
                          const cleanText = insight.replace(/^[\s\-\*\d\.]+/, '').trim();
                          return (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-purple-300 mt-1">•</span>
                              <span>{cleanText}</span>
                            </li>
                          );
                        })}
                    </ul>
                  ) : (
                    <p>No insights generated.</p>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* --- Advanced AI Data: Routing & Spots --- */}
        <div className="space-y-12 pt-12 border-t border-zinc-200 dark:border-zinc-800">
          
          {/* Transit Estimates */}
          <div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <Compass className="text-blue-500" /> {t("routing")} {origin} to {location.split(',')[0]}
            </h2>
            {transitLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                 {[1,2,3].map(i => <div key={i} className="h-[200px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem]"></div>)}
              </div>
            ) : transitData ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { mode: t("flight"), icon: <Plane size={24} />, data: transitData.flight, color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-950/30", link: "https://www.google.com/flights" },
                  { mode: t("train"), icon: <Train size={24} />, data: transitData.train, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/30", link: "https://www.irctc.co.in" },
                  { mode: t("road"), icon: <Car size={24} />, data: transitData.road, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", link: "https://maps.google.com" }
                ].map((transit, idx) => (
                  <div key={idx} className={`rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 ${transit.bg} transition-transform hover:-translate-y-1 group relative overflow-hidden flex flex-col justify-between`}>
                    <div>
                      <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className={`p-3 rounded-full bg-white dark:bg-zinc-900 shadow-sm ${transit.color}`}>
                          {transit.icon}
                        </div>
                        <span className="font-black text-lg text-zinc-900 dark:text-white">{transit.mode}</span>
                      </div>
                      {transit.data ? (
                        <div className="space-y-1 relative z-10 mb-6">
                          <p className="font-black text-zinc-900 dark:text-white flex items-baseline gap-2 text-2xl">
                            {transit.data.time || "N/A"}
                          </p>
                          <p className="text-zinc-600 dark:text-zinc-400 font-bold text-sm bg-white/50 dark:bg-zinc-900/50 inline-block px-3 py-1 rounded-lg">{t("est")}: {transit.data.cost || "Cost varied"}</p>
                        </div>
                      ) : (
                        <p className="text-zinc-500 relative z-10 mb-6">{t("routeUnavailable")}</p>
                      )}
                    </div>
                    
                    <a href={transit.link} target="_blank" rel="noreferrer" className="mt-auto block text-center w-full py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl font-black text-sm text-zinc-900 dark:text-white shadow-sm hover:ring-2 hover:ring-blue-500 transition-all relative z-10">
                      {t("bookBtn")} {transit.mode}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-zinc-500 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl text-center font-medium">No routing data available.</div>
            )}
          </div>

          {/* Top Spots Horizontal Scroll */}
          <div>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-6 flex items-center gap-3">
              <MapPin className="text-purple-500" /> {t("mustVisit")}
            </h2>
            {spotsLoading ? (
              <div className="flex gap-6 overflow-x-hidden animate-pulse">
                 {[1,2,3,4].map(i => <div key={i} className="min-w-[280px] h-[200px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem]"></div>)}
              </div>
            ) : topSpots && topSpots.length > 0 ? (
              <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory">
                {topSpots.map((spot, idx) => {
                   const isSpotSaved = savedSpots.includes(spot.title);
                   return (
                     <div key={idx} className="snap-start shrink-0 w-[280px] md:w-[320px] bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 flex flex-col justify-between hover:border-purple-500/50 transition-colors">
                       <div>
                         <div className="flex items-start justify-between gap-2 mb-4">
                           <h3 className="font-black text-lg text-zinc-900 dark:text-white leading-tight pr-2">{spot.title}</h3>
                           <button 
                             onClick={() => {
                               if (!isAuthenticated) return openAuthModal();
                               if (!isSpotSaved) setSavedSpots(prev => [...prev, spot.title]);
                             }}
                             title={isSpotSaved ? "Saved to Profile!" : "Add to Itinerary"}
                             className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm ${isSpotSaved ? "bg-green-500 text-white border border-green-600" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-blue-600 hover:text-white hover:scale-105 border border-zinc-200 dark:border-zinc-700"}`}
                           >
                             {isSpotSaved ? <Check size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                           </button>
                         </div>
                         <div className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 font-bold text-xs px-3 py-1 rounded-lg mb-3">
                           ⏱ {spot.time}
                         </div>
                         <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium leading-relaxed">{spot.desc}</p>
                       </div>
                     </div>
                   );
                })}
              </div>
            ) : (
              <div className="text-zinc-500 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl text-center font-medium">No top spots found.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

import ProtectedRoute from "@/components/ProtectedRoute";

export default function FeaturesPage() {
  return (
    <ProtectedRoute>
      <FeaturesContent />
    </ProtectedRoute>
  );
}
