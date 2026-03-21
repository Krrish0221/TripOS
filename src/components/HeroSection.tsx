"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
          alt="People exploring a majestic landscape"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-75 dark:brightness-50"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg mb-6 tracking-tight">
          {t("heroTitle")}
        </h1>
        <p className="text-lg md:text-2xl text-white/90 font-medium mb-10 drop-shadow-md max-w-2xl mx-auto">
          {t("heroSubtitle")}
        </p>
        <Link href="/features" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl hover:shadow-blue-500/25">
          {t("heroCta")}
        </Link>
      </div>
    </section>
  );
}
