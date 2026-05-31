import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight, Flame } from "lucide-react";
import { Property } from "@/lib/data";
import { configLabel, statusLabel, viewLabel } from "@/lib/utils";
import GoldButton from "@/components/ui/GoldButton";

export default function PropertyCard({ property }: { property: Property }) {
  const coverImage = property.images.find((i) => i.isCover) || property.images[0];

  return (
    <div className="property-card group bg-white border border-warm-grey-100 overflow-hidden hover:shadow-xl hover:shadow-warm-grey-200/60 transition-all duration-500">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        {coverImage && (
          <Image
            src={coverImage.url}
            alt={property.buildingName}
            fill
            className="property-image object-cover transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {property.hotProperty && (
            <span className="flex items-center gap-1 bg-champagne text-obsidian text-[10px] font-sans tracking-widest uppercase px-2 py-1 font-medium">
              <Flame size={9} />
              Hot
            </span>
          )}
          {property.featured && (
            <span className="bg-navy text-champagne text-[10px] font-sans tracking-widest uppercase px-2 py-1">
              Featured
            </span>
          )}
        </div>

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <p className="font-serif text-lg text-white font-light">
            {property.hidePrice ? "Price on Request" : property.priceDisplay}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-serif text-lg font-light text-obsidian leading-tight">
            {property.buildingName}
          </h3>
          <span className="shrink-0 text-[10px] font-sans tracking-widest uppercase text-champagne border border-champagne/40 px-2 py-0.5 mt-0.5">
            {configLabel(property.configuration)}
          </span>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <MapPin size={11} className="text-champagne shrink-0" />
          <span className="text-xs text-warm-grey-500 font-sans">
            {property.microLocation}, {property.location}
          </span>
        </div>

        <p className="text-xs text-warm-grey-600 font-sans leading-relaxed mb-4 line-clamp-2">
          {property.shortHighlight}
        </p>

        {/* Specs row */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-warm-grey-100">
          <div className="text-center">
            <p className="text-[10px] font-sans tracking-wider uppercase text-warm-grey-400 mb-0.5">Carpet</p>
            <p className="text-xs font-sans text-obsidian">{property.carpetArea}</p>
          </div>
          <div className="h-6 w-px bg-warm-grey-100" />
          <div className="text-center">
            <p className="text-[10px] font-sans tracking-wider uppercase text-warm-grey-400 mb-0.5">Status</p>
            <p className="text-xs font-sans text-obsidian">{statusLabel(property.possessionStatus)}</p>
          </div>
          <div className="h-6 w-px bg-warm-grey-100" />
          <div className="text-center">
            <p className="text-[10px] font-sans tracking-wider uppercase text-warm-grey-400 mb-0.5">View</p>
            <p className="text-xs font-sans text-obsidian">{viewLabel(property.viewType)}</p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link href={`/properties/${property.slug}`} className="flex-1">
            <GoldButton size="sm" className="w-full">
              View Details
            </GoldButton>
          </Link>
          <Link href={`/properties/${property.slug}#enquire`}>
            <GoldButton size="sm" variant="outline">
              Enquire
            </GoldButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
