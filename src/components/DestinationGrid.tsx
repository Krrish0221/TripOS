"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const MOCK_DESTINATIONS = [
  {
    id: 1,
    name: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop",
    descEn: "Experience the tranquility of ancient shrines and vibrant gardens.",
    descEs: "Experimenta la tranquilidad de los santuarios antiguos y jardines vibrantes."
  },
  {
    id: 2,
    name: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=2070&auto=format&fit=crop",
    descEn: "Stunning sunsets and iconic blue-domed architecture await.",
    descEs: "Impresionantes atardeceres y la icónica arquitectura de cúpulas azules te esperan."
  },
  {
    id: 3,
    name: "Banff, Canada",
    image: "https://images.unsplash.com/photo-1549880181-56a44fc4a6ce?q=80&w=2070&auto=format&fit=crop",
    descEn: "Pristine turquoise lakes set against rugged mountain peaks.",
    descEs: "Lagos turquesas cristalinos enmarcados por escarpadas montañas."
  }
];

export default function DestinationGrid() {
  const { t, language } = useLanguage();

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-black mb-2">{t("destinationsTitle")}</h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl">{t("destinationsDesc")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {MOCK_DESTINATIONS.map((dest) => (
          <div key={dest.id} className="group rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col">
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={dest.image}
                alt={`Beautiful view of ${dest.name}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-2">{dest.name}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3">
                  {language === "en" ? dest.descEn : dest.descEs}
                </p>
              </div>
              <button className="mt-4 text-left font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                Explore &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
