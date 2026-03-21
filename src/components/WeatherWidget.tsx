"use client";

import { useState, useEffect } from "react";
import { Cloud, Sun, CloudRain, Loader2, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Simple mapping for Open-Meteo weather codes
function getWeatherIcon(code: number) {
  if (code === 0) return <Sun className="text-yellow-500" size={48} />;
  if (code > 0 && code < 40) return <Cloud className="text-gray-400" size={48} />;
  if (code >= 50) return <CloudRain className="text-blue-500" size={48} />;
  return <Sun className="text-yellow-500" size={48} />;
}

export default function WeatherWidget() {
  const { t } = useLanguage();
  const [weather, setWeather] = useState<{ temp: number; code: number; name: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLocation, setActiveLocation] = useState("Reykjavik");

  useEffect(() => {
    fetchWeather(activeLocation);
  }, []);

  async function fetchWeather(loc: string) {
    setLoading(true);
    setError(false);
    try {
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(loc)}&count=1`);
      const geoData = await geoRes.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("Location not found");
      }
      
      const { latitude, longitude, name, country } = geoData.results[0];

      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      if (!res.ok) throw new Error("Failed to fetch weather");
      const data = await res.json();
      
      setWeather({
        temp: data.current_weather.temperature,
        code: data.current_weather.weathercode,
        name: `${name}, ${country}`
      });
      setActiveLocation(name);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeather(searchQuery.trim());
      setSearchQuery("");
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow flex flex-col justify-center h-fit">
      <div className="flex flex-col mb-6">
        <form onSubmit={handleSearch} className="flex items-center space-x-2 w-full mb-4">
          <input 
            type="text" 
            placeholder="Check a city..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white px-4 py-3 rounded-xl outline-none font-medium placeholder-zinc-400 text-sm border border-transparent focus:border-blue-500 transition-colors"
          />
          <button type="submit" className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
        </form>
        
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full shrink-0">
            <MapPin size={24} />
          </div>
          <div className="overflow-hidden">
            <h3 className="text-xl font-bold truncate">{weather ? weather.name : "Location"}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Live Forecast</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center py-4">
        {loading && <Loader2 className="animate-spin text-zinc-400" size={48} />}
        {error && !loading && <p className="text-red-500 font-medium text-center text-sm">Location not found.<br/>Try another city.</p>}
        {weather && !loading && !error && (
          <div className="flex items-center space-x-6">
            {getWeatherIcon(weather.code)}
            <div className="text-6xl font-black tracking-tighter">
              {Math.round(weather.temp)}°<span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-purple-600">C</span>
            </div>
          </div>
        )}
      </div>

      <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 mt-4">
        Live data for remote trip planning.
      </p>
    </div>
  );
}
