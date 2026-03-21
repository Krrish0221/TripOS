"use client";

import Link from "next/link";
import { Wifi, Sparkles, Globe, Code2, Paintbrush, Map, Cloud, Cpu, ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#131315] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-24">
        
        {/* Header Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto pt-10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
          <h1 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-white tracking-tight relative z-10">
            About TripOS
          </h1>
          <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed relative z-10">
            We are a passionate team dedicated to uncovering the world's most breathtaking destinations. Our platform serves as your ultimate guide to discovering local businesses, planning trips to remote areas, and experiencing the globe like never before.
          </p>
        </section>

        {/* 1. Core Pillars Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mb-6">
                <Wifi size={28} />
              </div>
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-3">Accessibility First</h3>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                Designed for all connections, featuring our ultra-fast Data Saver mode that intelligently strips bandwidth-heavy assets for text-based geographic summaries.
              </p>
            </div>
            
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles size={28} />
              </div>
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-3">AI-Powered Planning</h3>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                Smart, dynamic itineraries generated instantly for any destination. Leveraging advanced models for accurate transit estimating and targeted locale curation.
              </p>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-sm transition-transform hover:-translate-y-1">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                <Globe size={28} />
              </div>
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-3">Localized Discovery</h3>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                Uncovering hidden gems and supporting localized businesses worldwide. Explore deeper than the tourist traps with interactive routing and live conditions.
              </p>
            </div>
          </div>
        </section>

        {/* 2. The Tech Under the Hood */}
        <section className="bg-zinc-100 dark:bg-zinc-900/50 rounded-[3rem] p-10 md:p-16 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden">
          <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <h2 className="text-4xl font-black text-zinc-900 dark:text-white">The Tech Under the Hood</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                TripOS is built with a relentless focus on full-stack optimization and high-performance, open-source-friendly architecture. 
                Our infrastructure is completely scalable, utilizing Next.js Server Actions to safely orchestrate complex parallel API fetches.
              </p>
            </div>
            
            <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
              {[
                { name: "Next.js", icon: <Code2 size={24} />, color: "text-zinc-900 dark:text-white hidden group-hover:block", defaultColor: "text-zinc-400" },
                { name: "Tailwind CSS", icon: <Paintbrush size={24} />, color: "text-sky-500 hidden group-hover:block", defaultColor: "text-zinc-400" },
                { name: "Google Maps API", icon: <Map size={24} />, color: "text-green-500 hidden group-hover:block", defaultColor: "text-zinc-400" },
                { name: "Open-Meteo API", icon: <Cloud size={24} />, color: "text-blue-400 hidden group-hover:block", defaultColor: "text-zinc-400" },
                { name: "Groq LLaMA 3 API", icon: <Cpu size={24} />, color: "text-amber-500 hidden group-hover:block", defaultColor: "text-zinc-400" },
                { name: "Wikipedia API", icon: <Globe size={24} />, color: "text-zinc-600 dark:text-zinc-300 hidden group-hover:block", defaultColor: "text-zinc-400" },
              ].map((tech, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group cursor-default">
                  <div className="mb-3 relative h-6 w-6 flex items-center justify-center">
                    <span className={tech.defaultColor + " block group-hover:hidden transition-opacity"}>{tech.icon}</span>
                    <span className={tech.color + " transition-opacity"}>{tech.icon}</span>
                  </div>
                  <span className="font-bold text-zinc-900 dark:text-white text-[13px] text-center">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Meet the Creator */}
        <section>
          <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-[3rem] border border-zinc-200 dark:border-zinc-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none overflow-hidden flex flex-col md:flex-row items-stretch">
            <div className="md:w-2/5 min-h-[350px] md:min-h-full relative bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
              <Image 
                src="/krish.jpg" 
                alt="Krish - Creator Profile" 
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
              />
            </div>
            <div className="p-10 md:p-14 md:w-3/5 flex flex-col justify-center bg-white dark:bg-zinc-900 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-[80px] opacity-10 pointer-events-none"></div>
              
              <div className="uppercase tracking-widest text-[11px] font-black text-blue-600 dark:text-blue-400 mb-3 border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20 self-start px-3 py-1 rounded-full">
                Lead Engineer & Architect
              </div>
              <h2 className="text-4xl font-black text-zinc-900 dark:text-white mb-6">Krish</h2>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed mb-8">
                I am a passionate full-stack developer driven by the desire to engineer intelligent, AI-driven solutions that solve real-world problems. TripOS is a culmination of my obsession with seamless user experiences, deeply accessible web infrastructure, and scalable, futuristic web architectures.
              </p>
              
              <div className="flex items-center gap-3">
                <a href="#" className="w-12 h-12 rounded-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-zinc-900 transition-all hover:-translate-y-1">
                  <Github size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all hover:-translate-y-1">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all hover:-translate-y-1">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Call to Action */}
        <section className="text-center py-12 md:py-24 relative">
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight">Ready to test the engine?</h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium max-w-xl mx-auto mb-10 leading-relaxed">
            Head over to the Trip Planner. Search for a destination, toggle the Data Saver, and let our AI calculate your routes and curate your top spots instantly.
          </p>
          <Link 
            href="/features" 
            className="inline-flex items-center gap-3 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-10 py-5 rounded-[2rem] font-black text-lg hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-xl dark:shadow-white/10"
          >
            Start Your Journey <ArrowRight size={22} className="text-blue-500" />
          </Link>
        </section>

      </div>
    </div>
  );
}
