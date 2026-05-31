import Link from "next/link";
import Image from "next/image";
import { LOCATION_DESCRIPTIONS } from "@/lib/data";
import { ArrowRight } from "lucide-react";

const LOCATION_IMAGES: Record<string, string> = {
  Worli: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800",
  Tardeo: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800",
  Mahalaxmi: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800",
  Prabhadevi: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800",
  Colaba: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800",
  "Malabar Hill": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
  "Lower Parel": "https://images.unsplash.com/photo-1614197043100-be4e83e498e0?w=800",
  "Cuffe Parade": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
};

export default function LocationsPage() {
  return (
    <div className="bg-ivory min-h-screen">
      <div className="bg-navy pt-28 pb-14 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-champagne block mb-3">
            South Mumbai
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-white">
            Explore by Location
          </h1>
          <p className="font-sans text-warm-grey-400 text-sm mt-2 max-w-xl">
            Each neighbourhood in South Mumbai has its own character, prestige, and lifestyle. Find the address that fits yours.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(LOCATION_DESCRIPTIONS).map(([location, info]) => (
            <Link
              key={location}
              href={`/properties?location=${location}`}
              className="group block bg-white border border-warm-grey-100 overflow-hidden hover:shadow-xl hover:shadow-warm-grey-200/60 hover:border-champagne/30 transition-all duration-500"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={LOCATION_IMAGES[location] || "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=800"}
                  alt={location}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h2 className="font-serif text-2xl text-white font-light">{location}</h2>
                  <p className="text-[10px] font-sans text-champagne tracking-widest mt-0.5">
                    {info.count} {info.count === 1 ? "Property" : "Properties"} Available
                  </p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm font-sans text-warm-grey-600 leading-relaxed mb-4">
                  {info.description}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-sans tracking-widest uppercase text-champagne group-hover:gap-3 transition-all">
                  View Properties <ArrowRight size={12} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
