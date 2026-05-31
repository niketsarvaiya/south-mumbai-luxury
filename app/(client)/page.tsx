"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ChevronDown, ArrowRight, Phone, CheckCircle, Star } from "lucide-react";
import { getFeaturedProperties, LOCATION_DESCRIPTIONS, LOCATIONS } from "@/lib/data";
import PropertyCard from "@/components/client/PropertyCard";
import GoldButton from "@/components/ui/GoldButton";
import { configLabel } from "@/lib/utils";
import { useRouter } from "next/navigation";

const LOCATION_IMAGES: Record<string, string> = {
  Worli: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=600",
  Tardeo: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=600",
  Mahalaxmi: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=600",
  Prabhadevi: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=600",
  Colaba: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600",
  "Malabar Hill": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
  "Lower Parel": "https://images.unsplash.com/photo-1614197043100-be4e83e498e0?w=600",
  "Cuffe Parade": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600",
};

export default function HomePage() {
  const router = useRouter();
  const featuredProperties = getFeaturedProperties();

  const [filters, setFilters] = useState({
    location: "",
    budget: "",
    area: "",
    config: "",
    status: "",
    view: "",
  });

  const [leadForm, setLeadForm] = useState({
    name: "", phone: "", email: "",
    location: "", budget: "", requirement: "",
  });
  const [leadSent, setLeadSent] = useState(false);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filters.location) params.set("location", filters.location);
    if (filters.config) params.set("config", filters.config);
    if (filters.status) params.set("status", filters.status);
    if (filters.view) params.set("view", filters.view);
    router.push(`/properties?${params.toString()}`);
  };

  const handleLeadSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 800));
    setLeadSent(true);
  };

  const WHY_US = [
    { title: "Curated Luxury Inventory", desc: "Only the finest properties across South Mumbai's most desirable addresses — carefully selected for quality, location, and exclusivity." },
    { title: "South Mumbai Market Expertise", desc: "Decades of combined experience in the Worli, Malabar Hill, Colaba, and Tardeo micro-markets with deep neighbourhood knowledge." },
    { title: "Verified Property Details", desc: "Every listing is verified with accurate carpet area, RERA numbers, pricing, and floor details — no estimates, no surprises." },
    { title: "Private Advisory & Site Visits", desc: "Your advisor will personally accompany you on every site visit. Appointments are arranged discreetly at your convenience." },
  ];

  return (
    <div className="bg-ivory">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920"
            alt="South Mumbai luxury residences"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/50 to-obsidian/80" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-32 pb-48">
          <div className="inline-block mb-6 animate-fade-in">
            <span className="text-[10px] font-sans tracking-[0.4em] uppercase text-champagne border border-champagne/40 px-5 py-2">
              Private Collection — By Invitation Only
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6 animate-slide-up">
            Luxury Residences in<br />
            <span className="text-champagne">South Mumbai's</span><br />
            Most Prestigious Addresses
          </h1>

          <p className="font-sans text-warm-grey-300 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up animate-delay-200">
            Curated high-end homes across Worli, Tardeo, Mahalaxmi, Prabhadevi, Colaba and beyond.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animate-delay-300">
            <Link href="/properties">
              <GoldButton size="lg">Explore Properties</GoldButton>
            </Link>
            <Link href="/contact">
              <GoldButton size="lg" variant="outline">Speak to an Advisor</GoldButton>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
          <ChevronDown size={20} className="text-champagne/60" />
        </div>
      </section>

      {/* ── Search / Filter Bar ──────────────────────────────────────── */}
      <section className="bg-obsidian py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3 items-end">
            {([
              {
                id: "location",
                label: "Location",
                options: ["", ...LOCATIONS] as string[],
                labels: { "": "All Locations" } as Record<string, string>,
              },
              {
                id: "budget",
                label: "Budget",
                options: ["", "under10", "10to20", "20to40", "40plus"] as string[],
                labels: { "": "Any Budget", under10: "Under ₹10 Cr", "10to20": "₹10–20 Cr", "20to40": "₹20–40 Cr", "40plus": "₹40 Cr+" } as Record<string, string>,
              },
              {
                id: "config",
                label: "Configuration",
                options: ["", "2bhk", "3bhk", "4bhk", "duplex", "penthouse"] as string[],
                labels: { "": "Any Config", "2bhk": "2 BHK", "3bhk": "3 BHK", "4bhk": "4 BHK", duplex: "Duplex", penthouse: "Penthouse" } as Record<string, string>,
              },
              {
                id: "area",
                label: "Carpet Area",
                options: ["", "under2000", "2000to4000", "4000plus"] as string[],
                labels: { "": "Any Area", under2000: "Under 2,000 sq ft", "2000to4000": "2,000–4,000 sq ft", "4000plus": "4,000+ sq ft" } as Record<string, string>,
              },
              {
                id: "status",
                label: "Possession",
                options: ["", "ready", "under_construction", "resale"] as string[],
                labels: { "": "Any Status", ready: "Ready to Move", under_construction: "Under Construction", resale: "Resale" } as Record<string, string>,
              },
              {
                id: "view",
                label: "View Type",
                options: ["", "sea", "city", "skyline", "garden"] as string[],
                labels: { "": "Any View", sea: "Sea View", city: "City View", skyline: "Skyline View", garden: "Garden View" } as Record<string, string>,
              },
            ] as { id: string; label: string; options: string[]; labels: Record<string, string> }[]).map((filter) => (
              <div key={filter.id}>
                <label className="block text-[9px] font-sans tracking-widest uppercase text-warm-grey-500 mb-1.5">
                  {filter.label}
                </label>
                <div className="relative">
                  <select
                    value={(filters as Record<string, string>)[filter.id]}
                    onChange={(e) => setFilters({ ...filters, [filter.id]: e.target.value })}
                    className="w-full appearance-none bg-navy-light border border-warm-grey-700 text-warm-grey-200 text-xs font-sans px-3 py-2.5 pr-7 focus:outline-none focus:border-champagne cursor-pointer"
                  >
                    {filter.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {(filter.labels as Record<string, string>)[opt] ?? opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-warm-grey-500 pointer-events-none" />
                </div>
              </div>
            ))}

            <GoldButton size="md" onClick={handleSearch} className="h-[38px]">
              Search
            </GoldButton>
          </div>
        </div>
      </section>

      {/* ── Featured Properties ──────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-champagne mb-3 block">
                Curated Selection
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-obsidian">
                Featured Residences
              </h2>
            </div>
            <Link href="/properties" className="hidden md:flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-champagne hover:text-champagne-dark transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link href="/properties">
              <GoldButton size="md" variant="outline">View All Properties</GoldButton>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Locations ────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-warm-grey-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-champagne mb-3 block">
              Explore by Location
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-obsidian">
              South Mumbai's Finest Addresses
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(LOCATION_DESCRIPTIONS).map(([location, info]) => (
              <Link
                key={location}
                href={`/properties?location=${location}`}
                className="group relative overflow-hidden aspect-[4/5] block"
              >
                <Image
                  src={LOCATION_IMAGES[location] || "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?w=600"}
                  alt={location}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-serif text-xl text-white font-light mb-1">{location}</h3>
                  <p className="text-[10px] font-sans text-champagne tracking-widest">
                    {info.count} {info.count === 1 ? "Property" : "Properties"}
                  </p>
                  <p className="text-xs text-warm-grey-300 font-sans mt-2 leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {info.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-5xl mx-auto text-center">
          <div className="luxury-divider mb-8">
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-champagne/60">
              Our Advisory
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-6">
            Curated Luxury. Trusted Advisory.
          </h2>
          <p className="font-sans text-warm-grey-300 text-base leading-relaxed max-w-3xl mx-auto mb-8">
            We help homebuyers, investors, and families discover premium residences across South Mumbai's most desirable neighbourhoods. From sea-facing apartments and branded residences to discreet resale opportunities in landmark buildings, our platform brings together carefully selected properties with clear information and expert guidance.
          </p>
          <div className="luxury-divider mt-8">
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-champagne/60">
              Est. South Mumbai
            </span>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-champagne mb-3 block">
              Why Us
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-obsidian">
              The Difference We Bring
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_US.map((item, i) => (
              <div key={i} className="bg-white border border-warm-grey-100 p-8 hover:border-champagne/40 hover:shadow-lg transition-all duration-500 group">
                <div className="w-10 h-10 border border-champagne/30 flex items-center justify-center mb-5 group-hover:border-champagne transition-colors">
                  <Star size={16} className="text-champagne" />
                </div>
                <h3 className="font-serif text-xl font-light text-obsidian mb-3">{item.title}</h3>
                <p className="text-xs font-sans text-warm-grey-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Lead Capture ─────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-warm-grey-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-champagne mb-3 block">
              Advisory Request
            </span>
            <h2 className="font-serif text-4xl font-light text-obsidian mb-3">
              Looking for a Specific Luxury Property?
            </h2>
            <p className="text-sm font-sans text-warm-grey-500">
              Share your requirements and we'll curate the perfect shortlist for you.
            </p>
          </div>

          {leadSent ? (
            <div className="text-center py-12">
              <CheckCircle size={40} className="text-champagne mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-obsidian mb-2">Request Received</h3>
              <p className="text-sm font-sans text-warm-grey-500">
                Your advisor will contact you within 4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="bg-white border border-warm-grey-100 p-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={leadForm.name}
                    onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                    className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">
                    Preferred Location
                  </label>
                  <select
                    value={leadForm.location}
                    onChange={(e) => setLeadForm({ ...leadForm, location: e.target.value })}
                    className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne transition-colors bg-white"
                  >
                    <option value="">Any Location</option>
                    {LOCATIONS.map((l) => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">
                    Budget
                  </label>
                  <select
                    value={leadForm.budget}
                    onChange={(e) => setLeadForm({ ...leadForm, budget: e.target.value })}
                    className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne transition-colors bg-white"
                  >
                    <option value="">Select Budget</option>
                    <option>Under ₹10 Cr</option>
                    <option>₹10–20 Cr</option>
                    <option>₹20–40 Cr</option>
                    <option>₹40 Cr+</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">
                  Requirement
                </label>
                <textarea
                  rows={3}
                  value={leadForm.requirement}
                  onChange={(e) => setLeadForm({ ...leadForm, requirement: e.target.value })}
                  placeholder="Tell us about your ideal property..."
                  className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne transition-colors resize-none"
                />
              </div>
              <GoldButton type="submit" size="lg" className="w-full">
                Request a Callback
              </GoldButton>
            </form>
          )}
        </div>
      </section>

      {/* ── CTA strip ────────────────────────────────────────────────── */}
      <section className="py-12 px-6 bg-champagne">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-light text-obsidian mb-1">
              Ready to explore South Mumbai's finest?
            </h3>
            <p className="text-sm font-sans text-obsidian/70">
              Your dedicated advisor is available for private consultations.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <a href="tel:+919987310760" className="flex items-center gap-2 bg-obsidian text-white text-xs font-sans tracking-widest uppercase px-6 py-3 hover:bg-navy transition-colors">
              <Phone size={14} />
              Call Now
            </a>
            <Link href="/properties">
              <button className="flex items-center gap-2 border border-obsidian text-obsidian text-xs font-sans tracking-widest uppercase px-6 py-3 hover:bg-obsidian hover:text-white transition-colors">
                View Properties <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
