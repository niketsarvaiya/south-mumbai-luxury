"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, ChevronDown, X, LayoutGrid, List } from "lucide-react";
import { PROPERTIES, LOCATIONS, Property } from "@/lib/data";
import PropertyCard from "@/components/client/PropertyCard";
import { configLabel, statusLabel, viewLabel } from "@/lib/utils";

type SortKey = "featured" | "price_asc" | "price_desc" | "area" | "recent";

export default function PropertiesPage() {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    config: searchParams.get("config") || "",
    status: searchParams.get("status") || "",
    view: searchParams.get("view") || "",
    building: "",
  });
  const [sort, setSort] = useState<SortKey>("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let props = PROPERTIES.filter((p) => p.showInListings && p.status === "active");

    if (filters.location) props = props.filter((p) => p.location === filters.location);
    if (filters.config) props = props.filter((p) => p.configuration === filters.config);
    if (filters.status) props = props.filter((p) => p.possessionStatus === filters.status);
    if (filters.view) props = props.filter((p) => p.viewType === filters.view);
    if (filters.building) props = props.filter((p) =>
      p.buildingName.toLowerCase().includes(filters.building.toLowerCase())
    );

    switch (sort) {
      case "featured":
        props = [...props].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || (b.hotProperty ? 1 : 0) - (a.hotProperty ? 1 : 0));
        break;
      case "price_asc":
        props = [...props].sort((a, b) => (a.priceValue ?? 999) - (b.priceValue ?? 999));
        break;
      case "price_desc":
        props = [...props].sort((a, b) => (b.priceValue ?? 0) - (a.priceValue ?? 0));
        break;
      case "recent":
        props = [...props].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }

    return props;
  }, [filters, sort]);

  const clearFilter = (key: keyof typeof filters) => {
    setFilters({ ...filters, [key]: "" });
  };

  const activeFilters = Object.entries(filters).filter(([, v]) => v !== "");

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <div className="bg-navy pt-28 pb-14 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-champagne block mb-3">
            Private Collection
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-white mb-2">
            Luxury Properties in South Mumbai
          </h1>
          <p className="font-sans text-warm-grey-400 text-sm">
            {filtered.length} curated {filtered.length === 1 ? "residence" : "residences"} available
          </p>
        </div>
      </div>

      {/* Controls bar */}
      <div className="bg-white border-b border-warm-grey-100 sticky top-20 z-30 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase text-obsidian hover:text-champagne transition-colors"
          >
            <SlidersHorizontal size={14} />
            Filters
            {activeFilters.length > 0 && (
              <span className="bg-champagne text-obsidian text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                {activeFilters.length}
              </span>
            )}
          </button>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 hidden sm:block">
              Sort:
            </span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none bg-transparent border border-warm-grey-200 text-xs font-sans px-3 py-1.5 pr-6 focus:outline-none focus:border-champagne cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="area">Carpet Area</option>
                <option value="recent">Recently Added</option>
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-warm-grey-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="bg-warm-grey-50 border-b border-warm-grey-100 px-6 py-5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { id: "location", label: "Location", options: ["", ...LOCATIONS], labels: { "": "All Locations" } },
                {
                  id: "config", label: "Configuration",
                  options: ["", "2bhk", "3bhk", "4bhk", "duplex", "penthouse"],
                  labels: { "": "Any Config", "2bhk": "2 BHK", "3bhk": "3 BHK", "4bhk": "4 BHK", duplex: "Duplex", penthouse: "Penthouse" },
                },
                {
                  id: "status", label: "Possession",
                  options: ["", "ready", "under_construction", "resale"],
                  labels: { "": "Any Status", ready: "Ready to Move", under_construction: "Under Construction", resale: "Resale" },
                },
                {
                  id: "view", label: "View Type",
                  options: ["", "sea", "city", "skyline", "garden", "mixed"],
                  labels: { "": "Any View", sea: "Sea View", city: "City View", skyline: "Skyline View", garden: "Garden View", mixed: "Mixed" },
                },
                { id: "building", label: "Building Name", options: [], labels: {} },
              ].map((filter) => (
                <div key={filter.id}>
                  <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">
                    {filter.label}
                  </label>
                  {filter.id === "building" ? (
                    <input
                      type="text"
                      value={filters.building}
                      onChange={(e) => setFilters({ ...filters, building: e.target.value })}
                      placeholder="Search building..."
                      className="w-full border border-warm-grey-200 px-3 py-2 text-xs font-sans focus:outline-none focus:border-champagne bg-white"
                    />
                  ) : (
                    <div className="relative">
                      <select
                        value={(filters as Record<string, string>)[filter.id]}
                        onChange={(e) => setFilters({ ...filters, [filter.id]: e.target.value })}
                        className="w-full appearance-none border border-warm-grey-200 px-3 py-2 pr-7 text-xs font-sans focus:outline-none focus:border-champagne bg-white cursor-pointer"
                      >
                        {filter.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {(filter.labels as Record<string, string>)[opt] ?? opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-warm-grey-400 pointer-events-none" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Active filter pills */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {activeFilters.map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => clearFilter(key as keyof typeof filters)}
                    className="flex items-center gap-1.5 text-[10px] font-sans tracking-wider uppercase bg-champagne/10 border border-champagne/30 text-champagne px-3 py-1 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                  >
                    {val}
                    <X size={10} />
                  </button>
                ))}
                <button
                  onClick={() => setFilters({ location: "", config: "", status: "", view: "", building: "" })}
                  className="text-[10px] font-sans tracking-wider uppercase text-warm-grey-500 hover:text-red-500 transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-3xl text-warm-grey-400 mb-3">No properties found</p>
            <p className="text-sm font-sans text-warm-grey-400">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
