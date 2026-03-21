"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

import Link from "next/link";

const MOCK_DESTINATIONS = [
  {
    id: 1,
    name: "Goa, India",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2000&auto=format&fit=crop",
    descEn: "Sun-kissed beaches, vibrant nightlife, and rich Portuguese heritage.",
    descEs: "Playas bañadas por el sol, vibrante vida nocturna y rica herencia europea."
  },
  {
    id: 2,
    name: "Jaipur, India",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2000&auto=format&fit=crop",
    descEn: "The Pink City famous for majestic palaces and vibrant bazaars.",
    descEs: "La Ciudad Rosa, famosa por sus majestuosos palacios y vibrantes bazares."
  },
  {
    id: 3,
    name: "Munnar, Kerala",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2000&auto=format&fit=crop",
    descEn: "Rolling emerald tea plantations hidden in the misty Western Ghats.",
    descEs: "Plantaciones de té esmeraldas ondulantes ocultas en las montañas brumosas."
  },
  {
    id: 4,
    name: "Varanasi, India",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=2000&auto=format&fit=crop",
    descEn: "The spiritual capital along the sacred waters of the Ganges River.",
    descEs: "La capital espiritual a lo largo de las aguas sagradas del río Ganges."
  },
  {
    id: 5,
    name: "Ladakh, India",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=2000&auto=format&fit=crop",
    descEn: "High-altitude deserts, Buddhist monasteries, and crystal blue lakes.",
    descEs: "Desiertos de gran altitud, monasterios budistas y cristalinos lagos azules."
  },
  {
    id: 6,
    name: "Agra, India",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2000&auto=format&fit=crop",
    descEn: "Home to the glorious Taj Mahal, the ultimate monument to love.",
    descEs: "Hogar del glorioso Taj Mahal, el monumento definitivo al amor."
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
              <Link href={`/features?destination=${encodeURIComponent(dest.name.split(',')[0])}`} className="mt-4 text-left font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                Explore &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
