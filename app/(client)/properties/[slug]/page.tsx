"use client";
import { useState, FormEvent, use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, ChevronLeft, Phone, MessageCircle, Calendar,
  CheckCircle, Download, ChevronRight, Bed, Bath, Car,
  Square, Building, Eye, Shield,
} from "lucide-react";
import { getPropertyBySlug, AMENITY_ICONS, PROPERTIES } from "@/lib/data";
import { configLabel, statusLabel, viewLabel, transactionLabel } from "@/lib/utils";
import GoldButton from "@/components/ui/GoldButton";
import PropertyCard from "@/components/client/PropertyCard";

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const property = getPropertyBySlug(slug);

  if (!property) notFound();

  const [activeImage, setActiveImage] = useState(0);
  const [activeLayout, setActiveLayout] = useState(0);
  const [enquirySent, setEnquirySent] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", date: "", message: "",
  });

  const related = PROPERTIES.filter(
    (p) => p.location === property.location && p.id !== property.id && p.showInListings
  ).slice(0, 3);

  const handleEnquiry = async (e: FormEvent) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 800));
    setEnquirySent(true);
  };

  const SECTIONS = [
    { label: "Living & Dining", available: true },
    { label: "Bedrooms", available: property.bedrooms > 0, count: property.bedrooms },
    { label: "Kitchen", available: true },
    { label: "Bathrooms", available: property.bathrooms > 0, count: property.bathrooms },
    { label: "Balcony / Deck", available: !!property.deckArea || !!property.balconyArea },
    { label: "Servant Room", available: property.servantRoom },
    { label: "Private Lobby", available: true },
    { label: "Utility Area", available: property.utilityArea },
    { label: "Powder Bathroom", available: property.powderRoom },
    { label: "Study Room", available: property.studyRoom },
    { label: "Family Lounge", available: property.familyLounge },
  ].filter((s) => s.available);

  return (
    <div className="bg-ivory">
      {/* Back */}
      <div className="pt-24 pb-4 px-6 bg-navy">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/properties"
            className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-warm-grey-400 hover:text-champagne transition-colors"
          >
            <ChevronLeft size={14} /> Back to Properties
          </Link>
        </div>
      </div>

      {/* ── Hero Image Carousel ──────────────────────────────────────── */}
      <section className="bg-navy pb-0">
        <div className="max-w-7xl mx-auto px-6 pb-6">
          {/* Main image */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-3">
            {property.images[activeImage] && (
              <Image
                src={property.images[activeImage].url}
                alt={property.images[activeImage].caption}
                fill
                priority
                className="object-cover"
              />
            )}
            {/* Nav arrows */}
            {property.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImage((activeImage - 1 + property.images.length) % property.images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-obsidian/70 hover:bg-champagne hover:text-obsidian text-white flex items-center justify-center transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setActiveImage((activeImage + 1) % property.images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-obsidian/70 hover:bg-champagne hover:text-obsidian text-white flex items-center justify-center transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </>
            )}
            {/* Caption */}
            <div className="absolute bottom-4 left-4">
              <span className="text-[10px] font-sans tracking-widest uppercase text-white/60 bg-obsidian/50 px-2 py-1">
                {property.images[activeImage]?.caption}
              </span>
            </div>
            <div className="absolute bottom-4 right-4">
              <span className="text-[10px] font-sans text-white/60">
                {activeImage + 1} / {property.images.length}
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          {property.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {property.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(i)}
                  className={`relative shrink-0 w-20 h-14 overflow-hidden transition-all ${
                    i === activeImage ? "ring-2 ring-champagne" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img.url} alt={img.caption} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Title + Quick Actions ─────────────────────────────────────── */}
      <section className="bg-white border-b border-warm-grey-100 px-6 py-6 sticky top-20 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={12} className="text-champagne" />
              <span className="text-xs font-sans text-warm-grey-500">
                {property.microLocation}, {property.location}
              </span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-light text-obsidian">
              {property.buildingName}
            </h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs font-sans text-warm-grey-500">{configLabel(property.configuration)}</span>
              <span className="text-warm-grey-300">·</span>
              <span className="text-xs font-sans text-warm-grey-500">{property.carpetArea}</span>
              <span className="text-warm-grey-300">·</span>
              <span className="font-serif text-lg text-champagne">
                {property.hidePrice ? "Price on Request" : property.priceDisplay}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/919920240392?text=I'm interested in ${property.buildingName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-sans tracking-widest uppercase px-4 py-2.5 transition-colors"
            >
              <MessageCircle size={13} />
              WhatsApp
            </a>
            <a href="tel:+919920240392">
              <GoldButton size="sm" variant="outline" className="gap-2">
                <Phone size={12} />
                Call
              </GoldButton>
            </a>
            <a href="#enquire">
              <GoldButton size="sm">Schedule Visit</GoldButton>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ── Left Column ─────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview */}
            <div className="bg-white border border-warm-grey-100 p-8">
              <h2 className="font-serif text-2xl font-light text-obsidian mb-6">
                Property Overview
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
                {[
                  { label: "Building", value: property.buildingName },
                  { label: "Location", value: `${property.microLocation}, ${property.location}` },
                  { label: "Configuration", value: configLabel(property.configuration) },
                  { label: "Carpet Area", value: property.carpetArea },
                  { label: "Built-up Area", value: property.builtUpArea },
                  { label: "Super BU Area", value: property.superBuiltUpArea },
                  { label: "Price", value: property.hidePrice ? "On Request" : property.priceDisplay },
                  { label: "Price/Sq Ft", value: property.hidePrice ? "On Request" : property.pricePerSqFt },
                  { label: "Floor", value: property.floorNumber },
                  { label: "Total Floors", value: `${property.totalFloors} floors` },
                  { label: "View", value: viewLabel(property.viewType) },
                  { label: "Facing", value: property.facing },
                  { label: "Possession", value: statusLabel(property.possessionStatus) },
                  { label: "Transaction", value: transactionLabel(property.transactionType) },
                  { label: "Parking", value: property.parking },
                  { label: "RERA Number", value: property.reraNumber },
                  { label: "Maintenance", value: property.maintenance },
                  { label: "Vastu", value: property.vastuStatus === "yes" ? "Vastu Compliant" : property.vastuStatus === "no" ? "Not Vastu" : "Unknown" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-0.5">{label}</p>
                    <p className="text-sm font-sans text-obsidian">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-serif text-2xl font-light text-obsidian mb-4">
                About This Property
              </h2>
              <div className="prose prose-sm max-w-none">
                {property.description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-sm font-sans text-warm-grey-700 leading-relaxed mb-4">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Lifestyle */}
            {property.lifestyleDescription && (
              <div className="bg-navy p-8">
                <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-champagne block mb-3">
                  Lifestyle
                </span>
                <p className="text-sm font-sans text-warm-grey-300 leading-relaxed">
                  {property.lifestyleDescription}
                </p>
              </div>
            )}

            {/* Property sections */}
            <div>
              <h2 className="font-serif text-2xl font-light text-obsidian mb-6">
                Sections of the Property
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SECTIONS.map((section) => (
                  <div key={section.label} className="flex items-center gap-2.5 bg-white border border-warm-grey-100 px-4 py-3">
                    <CheckCircle size={14} className="text-champagne shrink-0" />
                    <span className="text-xs font-sans text-obsidian">
                      {section.label}
                      {"count" in section && section.count ? ` (×${section.count})` : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Layouts / Floor Plans */}
            {property.floorPlans.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-light text-obsidian mb-6">
                  Floor Plans & Layouts
                </h2>
                <div className="flex gap-3 mb-4 overflow-x-auto pb-1">
                  {property.floorPlans.map((plan, i) => (
                    <button
                      key={plan.id}
                      onClick={() => setActiveLayout(i)}
                      className={`shrink-0 text-xs font-sans tracking-wider uppercase px-4 py-2 transition-all ${
                        i === activeLayout
                          ? "bg-champagne text-obsidian"
                          : "border border-warm-grey-200 text-warm-grey-500 hover:border-champagne hover:text-champagne"
                      }`}
                    >
                      {plan.title}
                    </button>
                  ))}
                </div>

                {property.floorPlans[activeLayout] && (
                  <div className="bg-white border border-warm-grey-100 overflow-hidden">
                    <div className="relative aspect-[4/3] md:aspect-[16/9] bg-warm-grey-50">
                      <Image
                        src={property.floorPlans[activeLayout].imageUrl}
                        alt={property.floorPlans[activeLayout].title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="p-5 flex items-center justify-between">
                      <div>
                        <h4 className="font-serif text-lg text-obsidian">{property.floorPlans[activeLayout].title}</h4>
                        <p className="text-xs font-sans text-warm-grey-500 mt-1">
                          {property.floorPlans[activeLayout].carpetArea} · {property.floorPlans[activeLayout].roomCount} rooms
                        </p>
                        {property.floorPlans[activeLayout].notes && (
                          <p className="text-xs font-sans text-warm-grey-400 mt-1">{property.floorPlans[activeLayout].notes}</p>
                        )}
                      </div>
                      <button className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-champagne border border-champagne/40 px-3 py-2 hover:bg-champagne hover:text-obsidian transition-all">
                        <Download size={12} />
                        Download
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Amenities */}
            <div>
              <h2 className="font-serif text-2xl font-light text-obsidian mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 bg-white border border-warm-grey-100 px-4 py-3 hover:border-champagne/40 transition-colors">
                    <span className="text-lg">{AMENITY_ICONS[amenity] || "✦"}</span>
                    <span className="text-xs font-sans text-obsidian">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Neighbourhood */}
            <div>
              <h2 className="font-serif text-2xl font-light text-obsidian mb-4">
                Neighbourhood
              </h2>
              {property.neighbourhoodNote && (
                <p className="text-sm font-sans text-warm-grey-600 leading-relaxed mb-6">
                  {property.neighbourhoodNote}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.nearbyLandmarks.map((landmark, i) => (
                  <div key={i} className="flex items-center justify-between bg-white border border-warm-grey-100 px-4 py-3">
                    <div>
                      <p className="text-[10px] font-sans tracking-widest uppercase text-champagne mb-0.5">{landmark.category}</p>
                      <p className="text-sm font-sans text-obsidian">{landmark.name}</p>
                    </div>
                    <span className="text-xs font-sans text-warm-grey-400">{landmark.distance}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Investment note */}
            {property.investmentNote && (
              <div className="border-l-2 border-champagne pl-6 py-2">
                <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-champagne block mb-2">
                  Investment Note
                </span>
                <p className="text-sm font-sans text-warm-grey-600 leading-relaxed">
                  {property.investmentNote}
                </p>
              </div>
            )}
          </div>

          {/* ── Right Column — Sticky Contact ──────────────────────── */}
          <div className="space-y-5">
            {/* Quick stats */}
            <div className="bg-white border border-warm-grey-100 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-warm-grey-50">
                  <Bed size={16} className="text-champagne mx-auto mb-1" />
                  <p className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-400">Beds</p>
                  <p className="font-serif text-xl text-obsidian">{property.bedrooms}</p>
                </div>
                <div className="text-center p-3 bg-warm-grey-50">
                  <Bath size={16} className="text-champagne mx-auto mb-1" />
                  <p className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-400">Baths</p>
                  <p className="font-serif text-xl text-obsidian">{property.bathrooms}</p>
                </div>
                <div className="text-center p-3 bg-warm-grey-50">
                  <Square size={16} className="text-champagne mx-auto mb-1" />
                  <p className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-400">Carpet</p>
                  <p className="font-serif text-sm text-obsidian">{property.carpetArea}</p>
                </div>
                <div className="text-center p-3 bg-warm-grey-50">
                  <Building size={16} className="text-champagne mx-auto mb-1" />
                  <p className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-400">Floor</p>
                  <p className="font-serif text-sm text-obsidian">{property.floorNumber}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-sans tracking-widest uppercase border border-champagne/30 text-champagne px-3 py-1">
                {viewLabel(property.viewType)}
              </span>
              <span className="text-[10px] font-sans tracking-widest uppercase border border-warm-grey-200 text-warm-grey-500 px-3 py-1">
                {statusLabel(property.possessionStatus)}
              </span>
              <span className="text-[10px] font-sans tracking-widest uppercase border border-warm-grey-200 text-warm-grey-500 px-3 py-1">
                {transactionLabel(property.transactionType)}
              </span>
              {property.vastuStatus === "yes" && (
                <span className="text-[10px] font-sans tracking-widest uppercase border border-green-200 text-green-600 px-3 py-1">
                  Vastu ✓
                </span>
              )}
            </div>

            {/* Property ID */}
            <div className="flex items-center gap-2 text-[10px] font-sans text-warm-grey-400">
              <Shield size={11} />
              Property ID: {property.id} · {property.reraNumber}
            </div>

            {/* Enquiry form */}
            <div id="enquire" className="bg-navy p-6">
              <h3 className="font-serif text-xl font-light text-white mb-1">Enquire About This Property</h3>
              <p className="text-xs font-sans text-warm-grey-500 mb-5">
                We'll respond within 2 hours.
              </p>

              {enquirySent ? (
                <div className="text-center py-6">
                  <CheckCircle size={32} className="text-champagne mx-auto mb-3" />
                  <p className="text-sm font-sans text-white">Enquiry sent successfully!</p>
                  <p className="text-xs font-sans text-warm-grey-400 mt-1">
                    Your advisor will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquiry} className="space-y-3">
                  <input type="hidden" value={property.id} />
                  {[
                    { id: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                    { id: "phone", label: "Phone", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                    { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                  ].map((field) => (
                    <div key={field.id}>
                      <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-500 mb-1">
                        {field.label} *
                      </label>
                      <input
                        type={field.type}
                        required
                        value={(form as Record<string, string>)[field.id]}
                        onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                        placeholder={field.placeholder}
                        className="w-full bg-navy-light border border-warm-grey-700 text-white placeholder-warm-grey-600 px-3 py-2.5 text-xs font-sans focus:outline-none focus:border-champagne transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-500 mb-1">
                      Preferred Visit Date
                    </label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                      className="w-full bg-navy-light border border-warm-grey-700 text-warm-grey-300 px-3 py-2.5 text-xs font-sans focus:outline-none focus:border-champagne transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-500 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your requirements..."
                      className="w-full bg-navy-light border border-warm-grey-700 text-white placeholder-warm-grey-600 px-3 py-2.5 text-xs font-sans focus:outline-none focus:border-champagne transition-colors resize-none"
                    />
                  </div>
                  <GoldButton type="submit" size="md" className="w-full">
                    Enquire Now
                  </GoldButton>
                </form>
              )}
            </div>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/919920240392?text=Hi, I'm interested in ${property.buildingName} (${property.id})`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white text-xs font-sans tracking-widest uppercase py-3 transition-colors"
            >
              <MessageCircle size={14} />
              WhatsApp Advisor
            </a>
          </div>
        </div>
      </div>

      {/* Related properties */}
      {related.length > 0 && (
        <section className="py-16 px-6 bg-warm-grey-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-3xl font-light text-obsidian mb-8">
              More in {property.location}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
