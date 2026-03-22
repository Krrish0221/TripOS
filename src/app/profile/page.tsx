"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { User, MapPin, Compass, Settings, History, LogOut, Heart, FileText, Sun, Moon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

function ProfileContent() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulated Database User Data
  const [userData, setUserData] = useState({
    name: "Krish",
    email: "krish@gmai.com",
    city: "Ahmedabad, Gujarat, India",
    travelStyle: "Adventure & Photography",
  });

  useEffect(() => {
    setMounted(true);
    // Simulate database network request
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="bg-white dark:bg-[#131315] rounded-[2rem] p-8 md:p-10 shadow-sm border border-zinc-200 dark:border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <User size={40} strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                Welcome back, {userData.name.split(' ')[0]}!
              </h1>
              <p className="text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-2 mt-1">
                <FileText size={16} /> {userData.email}
              </p>
            </div>
          </div>

          <button
            className="flex items-center gap-2 px-6 py-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-full font-bold transition-colors"
            onClick={() => window.location.href = "/"} // Temporary signout simulation
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Personal Info & Settings */}
            <div className="space-y-8">

              {/* Demographics Card */}
              <div className="bg-white dark:bg-[#131315] rounded-[2rem] p-8 shadow-sm border border-zinc-200 dark:border-zinc-800/50">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                  <User size={20} className="text-blue-500" /> Personal Bio
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-1">Home City</label>
                    <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700/50">
                      <MapPin size={18} className="text-zinc-400" />
                      <input
                        type="text"
                        value={userData.city}
                        onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                        className="bg-transparent border-none outline-none w-full font-medium text-zinc-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-1">Travel Style</label>
                    <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700/50">
                      <Compass size={18} className="text-zinc-400" />
                      <input
                        type="text"
                        value={userData.travelStyle}
                        onChange={(e) => setUserData({ ...userData, travelStyle: e.target.value })}
                        className="bg-transparent border-none outline-none w-full font-medium text-zinc-900 dark:text-white"
                      />
                    </div>
                  </div>
                  <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>

              {/* Accessibility Settings Card */}
              <div className="bg-white dark:bg-[#131315] rounded-[2rem] p-8 shadow-sm border border-zinc-200 dark:border-zinc-800/50">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                  <Settings size={20} className="text-blue-500" /> Accessibility
                </h3>
                <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/50 px-5 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-700/50">
                  <div className="flex items-center gap-3">
                    {theme === "dark" ? <Moon size={20} className="text-zinc-400" /> : <Sun size={20} className="text-zinc-400" />}
                    <div>
                      <p className="font-bold text-zinc-900 dark:text-white text-sm">Theme Preference</p>
                      <p className="text-xs text-zinc-500">Saved to your profile</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="px-4 py-2 bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white text-sm font-bold rounded-lg hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors"
                  >
                    Toggle
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Dynamic Data (Trips & History) */}
            <div className="lg:col-span-2 space-y-8">

              {/* Saved Itineraries */}
              <div className="bg-white dark:bg-[#131315] rounded-[2rem] p-8 shadow-sm border border-zinc-200 dark:border-zinc-800/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Heart size={20} className="text-blue-500" /> Saved Itineraries
                  </h3>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                    2 Trips
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Trip Card 1 */}
                  <div className="group relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800/50 hover:shadow-lg transition-all">
                    <div className="aspect-video relative bg-zinc-200 dark:bg-zinc-800">
                      <Image
                        src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Winter in Kashmir"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-5">
                        <h4 className="text-white font-black text-lg">Winter Trip to Kashmir</h4>
                        <p className="text-zinc-300 text-sm font-medium flex items-center gap-1 mt-1">
                          <MapPin size={14} /> Gulmarg & Srinagar
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Trip Card 2 */}
                  <div className="group relative rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800/50 hover:shadow-lg transition-all">
                    <div className="aspect-video relative bg-zinc-200 dark:bg-zinc-800">
                      <Image
                        src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Goa Beaches"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-5">
                        <h4 className="text-white font-black text-lg">Summer Retreat in Goa</h4>
                        <p className="text-zinc-300 text-sm font-medium flex items-center gap-1 mt-1">
                          <MapPin size={14} /> South Goa Beaches
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback History */}
              <div className="bg-white dark:bg-[#131315] rounded-[2rem] p-8 shadow-sm border border-zinc-200 dark:border-zinc-800/50">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
                  <History size={20} className="text-blue-500" /> Support & Feedback History
                </h3>

                <div className="space-y-4">
                  {/* History Item */}
                  <div className="bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-700/50">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-zinc-900 dark:text-white">Inquiry about Kashmir Package</h4>
                      <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-md">Resolved</span>
                    </div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      "Hello, I am looking to understand if the Gulmarg Gondola tickets are included in the premium package..."
                    </p>
                    <p className="text-xs text-zinc-400 mt-3 font-medium">Submitted on Oct 12, 2025</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
