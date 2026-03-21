import HeroSection from "@/components/HeroSection";
import WeatherWidget from "@/components/WeatherWidget";
import DestinationGrid from "@/components/DestinationGrid";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-full">
          {/* Weather Widget (Feature Section for remote tips) */}
          <div className="lg:col-span-1 h-full">
            <WeatherWidget />
          </div>
          
          {/* Destination Grid Database Placeholder */}
          <div className="lg:col-span-3 h-full">
            <DestinationGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
