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
    descEs: "Playas bañadas por el sol, vibrante vida nocturna y rica herencia europea.",
    descHi: "धूप से नहाये समुद्र तट, जीवंत नाइटलाइफ़, और समृद्ध पुर्तगाली विरासत।",
    descGu: "સૂર્યસ્નાન કરતા દરિયાકિનારા, જીવંત નાઇટલાઇફ અને સમૃદ્ધ પોર્ટુગીઝ વારસો."
  },
  {
    id: 2,
    name: "Jaipur, India",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=2000&auto=format&fit=crop",
    descEn: "The Pink City famous for majestic palaces and vibrant bazaars.",
    descEs: "La Ciudad Rosa, famosa por sus majestuosos palacios y vibrantes bazares.",
    descHi: "राजसी महलों और जीवंत बाजारों के लिए प्रसिद्ध गुलाबी शहर।",
    descGu: "ભવ્ય મહેલો અને જીવંત બજારો માટે પ્રખ્યાત ગુલાબી શહેર."
  },
  {
    id: 3,
    name: "Munnar, Kerala",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2000&auto=format&fit=crop",
    descEn: "Rolling emerald tea plantations hidden in the misty Western Ghats.",
    descEs: "Plantaciones de té esmeraldas ondulantes ocultas en las montañas brumosas.",
    descHi: "धुंध भरे पश्चिमी घाटों में छिपे हरे-भरे चाय के बागान।",
    descGu: "ધુમ્મસવાળા પશ્ચિમી ઘાટમાં છુપાયેલા હરિયાળા ચાના બગીચા."
  },
  {
    id: 4,
    name: "Varanasi, India",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=2000&auto=format&fit=crop",
    descEn: "The spiritual capital along the sacred waters of the Ganges River.",
    descEs: "La capital espiritual a lo largo de las aguas sagradas del río Ganges.",
    descHi: "पवित्र गंगा नदी के जल के किनारे आध्यात्मिक राजधानी।",
    descGu: "પવિત્ર ગંગા નદીના જળ કિનારે આવેલી આધ્યાત્મિક રાજધાની."
  },
  {
    id: 5,
    name: "Ladakh, India",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=80&w=2000&auto=format&fit=crop",
    descEn: "High-altitude deserts, Buddhist monasteries, and crystal blue lakes.",
    descEs: "Desiertos de gran altitud, monasterios budistas y cristalinos lagos azules.",
    descHi: "ऊंचाई वाले रेगिस्तान, बौद्ध मठ, और नीले क्रिस्टल जैसी झीलें।",
    descGu: "ઊંચાઈવાળા રણ, બૌદ્ધ મઠ અને સ્ફટિક જેવા વાદળી તળાવો."
  },
  {
    id: 6,
    name: "Agra, India",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2000&auto=format&fit=crop",
    descEn: "Home to the glorious Taj Mahal, the ultimate monument to love.",
    descEs: "Hogar del glorioso Taj Mahal, el monumento definitivo al amor.",
    descHi: "शानदार ताजमहल का घर, जो प्रेम का अंतिम स्मारक है।",
    descGu: "ગૌરવશાળી તાજમહેલનું ઘર, જે પ્રેમનું અંતિમ સ્મારક છે."
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
                  {language === "en" ? dest.descEn : language === "es" ? dest.descEs : language === "hi" ? dest.descHi : dest.descGu}
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
