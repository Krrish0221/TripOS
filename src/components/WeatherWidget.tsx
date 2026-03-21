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
  const [weather, setWeather] = useState<{ temp: number; code: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchWeather() {
      try {
        // Fetching weather for a default remote area (e.g., Reykjavik, Iceland)
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=64.1466&longitude=-21.9426&current_weather=true"
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setWeather({
          temp: data.current_weather.temperature,
          code: data.current_weather.weathercode,
        });
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow flex flex-col justify-between h-full">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
          <MapPin size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-bold">{t("weatherTitle")}</h3>
          <p className="text-zinc-500 dark:text-zinc-400">Reykjavik, Iceland</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center py-8">
        {loading && <Loader2 className="animate-spin text-zinc-400" size={48} />}
        {error && <p className="text-red-500 font-medium">Unable to load weather data.</p>}
        {weather && !loading && !error && (
          <div className="flex items-center space-x-6">
            {getWeatherIcon(weather.code)}
            <div className="text-5xl font-black tracking-tighter">
              {weather.temp}°<span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-purple-600">C</span>
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
