"use client";

import { useState, useEffect } from "react";
import { Search, Map as MapIcon, Cloud, Wifi, WifiOff, Save, Check, Thermometer, Wind, Droplets, Sparkles } from "lucide-react";
import { generateTravelGuide } from "@/actions/travel";

interface WeatherData {
  temperature: number;
  windspeed: number;
  condition: string;
}

export default function FeaturesPage() {
  const [searchInput, setSearchInput] = useState("");
  const [location, setLocation] = useState("Srinagar");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  
  // AI Insights State
  const [aiInsights, setAiInsights] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // Accessibility & DB features
  const [dataSaver, setDataSaver] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setLocation(searchInput.trim());
    setIsSaved(false);
    setErrorMsg("");
  };

  useEffect(() => {
    async function fetchAllData() {
      setLoading(true);
      setAiLoading(true);
      setErrorMsg("");
      setAiInsights("");

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

        // Map Open-Meteo WMO code
        const code = weatherData.current_weather.weathercode;
        let conditionStr = "Clear";
        if (code > 0 && code <= 3) conditionStr = "Partly Cloudy";
        if (code >= 45 && code <= 48) conditionStr = "Foggy";
        if (code >= 51 && code <= 67) conditionStr = "Rainy";
        if (code >= 71 && code <= 77) conditionStr = "Snowy";
        if (code >= 95) conditionStr = "Thunderstorm";

        setWeather({
          temperature: weatherData.current_weather.temperature,
          windspeed: weatherData.current_weather.windspeed,
          condition: conditionStr,
        });

        setLoading(false); // Weather is done loading

        // 3. Fetch AI Insights securely using Next.js Server Action
        try {
          const insights = await generateTravelGuide(formattedLocation);
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
  }, [location, searchInput]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#131315] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header & Search */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
            Trip Planner
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
            Discover local spots, check live conditions, get AI recommendations, and save itineraries directly to your profile.
          </p>
          
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mt-8 relative flex items-center shadow-lg rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-800">
            <Search className="absolute left-4 text-zinc-400" size={20} />
            <input 
              type="text" 
              placeholder="Where do you want to go?" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-12 pr-32 py-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white outline-none font-medium placeholder-zinc-400"
            />
            <button type="submit" className="absolute right-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-colors">
              Search
            </button>
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
              <span>Data Saver: {dataSaver ? "ON" : "OFF"}</span>
            </button>
            <p className="text-xs text-zinc-400 font-medium hidden md:block">
              {dataSaver ? "Map disabled to save bandwidth." : "Full interactive maps and rich data enabled."}
            </p>
          </div>

          <button 
            onClick={() => setIsSaved(true)}
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
            <span>{isSaved ? "Saved to Profile" : "Save to Itinerary"}</span>
          </button>
        </div>

        {/* Dynamic Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Map Section */}
          <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col min-h-[400px] h-[500px]">
            <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/50 flex items-center justify-between bg-white dark:bg-zinc-900/50">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <MapIcon size={20} className="text-blue-500" />
                Explore {location.split(',')[0]}
              </h2>
            </div>
            
            <div className="flex-1 relative bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center">
              {dataSaver ? (
                <div className="text-center p-8">
                  <WifiOff size={48} className="mx-auto text-zinc-400 mb-4 opacity-50" />
                  <h3 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mb-2">Map Disabled</h3>
                  <p className="text-zinc-500 dark:text-zinc-500 max-w-sm mx-auto">
                    Data Saver mode is currently active. The interactive map tile load has been skipped to optimize performance on slow connections.
                  </p>
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
                Live Climate
              </h2>

              {loading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 min-h-[200px]">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
                  <p className="font-medium animate-pulse">Fetching live data...</p>
                </div>
              ) : errorMsg ? (
                <div className="flex-1 flex items-center justify-center text-red-500 font-medium text-center p-4">
                  {errorMsg}
                </div>
              ) : weather ? (
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center justify-center mb-8">
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

                  <div className="space-y-4 mt-auto">
                    <div className="flex justify-between items-center p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800/50">
                      <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 font-medium">
                        <Thermometer size={18} /> Temperature
                      </div>
                      <span className="font-bold text-zinc-900 dark:text-white">{weather.temperature}° C</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800/50">
                      <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 font-medium">
                        <Wind size={18} /> Wind Speed
                      </div>
                      <span className="font-bold text-zinc-900 dark:text-white">{weather.windspeed} km/h</span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* AI Insights Section */}
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-[2rem] shadow-lg p-8 flex flex-col relative overflow-hidden">
              {/* Decorative AI Glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500 rounded-full blur-[50px] opacity-30"></div>
              
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                <Sparkles size={20} className="text-purple-300" />
                AI Groq Guide
              </h2>

              {aiLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center text-purple-200 min-h-[120px] relative z-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-300 mb-3"></div>
                  <p className="font-medium animate-pulse text-sm">Groq AI is analyzing {location.split(',')[0]}...</p>
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
      </div>
    </div>
  );
}
