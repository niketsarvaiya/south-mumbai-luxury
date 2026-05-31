"use client";
import { useState } from "react";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { PROPERTIES } from "@/lib/data";
import { configLabel, statusLabel } from "@/lib/utils";
import { Plus, Search, Eye, Flame, Star, Edit, Archive, MoreVertical } from "lucide-react";

export default function AdminPropertiesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filtered = PROPERTIES.filter((p) => {
    const matchSearch = !search ||
      p.buildingName.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = !filter || p.location === filter;
    return matchSearch && matchFilter;
  });

  const locations = [...new Set(PROPERTIES.map((p) => p.location))];

  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-warm-grey-100">
        <AdminSidebar />
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-serif text-3xl font-light text-warm-grey-900">Properties</h1>
                <p className="text-sm font-sans text-warm-grey-500 mt-1">{filtered.length} properties</p>
              </div>
              <Link
                href="/admin/properties/new"
                className="flex items-center gap-2 bg-champagne text-obsidian text-xs font-sans tracking-widest uppercase px-5 py-2.5 hover:bg-champagne-dark transition-colors"
              >
                <Plus size={14} />
                Add Property
              </Link>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-grey-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search properties..."
                  className="w-full border border-warm-grey-200 pl-9 pr-4 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white"
              >
                <option value="">All Locations</option>
                {locations.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>

            {/* Table */}
            <div className="bg-white border border-warm-grey-200 overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-warm-grey-100 bg-warm-grey-50">
                    <th className="text-left text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 px-5 py-3">Property</th>
                    <th className="text-left text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 px-5 py-3">Config</th>
                    <th className="text-left text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 px-5 py-3">Price</th>
                    <th className="text-left text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 px-5 py-3">Status</th>
                    <th className="text-left text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 px-5 py-3">Flags</th>
                    <th className="text-left text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-warm-grey-50">
                  {filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-warm-grey-50 transition-colors">
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-sans text-warm-grey-900 font-medium">{p.buildingName}</p>
                          <p className="text-[10px] text-warm-grey-400">{p.microLocation}, {p.location}</p>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-sans text-warm-grey-600">{configLabel(p.configuration)}</span>
                        <p className="text-[10px] text-warm-grey-400">{p.carpetArea}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs font-sans text-champagne font-medium">
                          {p.hidePrice ? "On Request" : p.priceDisplay}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`text-[10px] font-sans tracking-wider uppercase px-2 py-0.5 ${
                          p.status === "active" ? "bg-green-50 text-green-600"
                          : p.status === "archived" ? "bg-warm-grey-100 text-warm-grey-400"
                          : "bg-yellow-50 text-yellow-600"
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex gap-1.5">
                          {p.hotProperty && (
                            <span title="Hot" className="text-orange-400"><Flame size={13} /></span>
                          )}
                          {p.featured && (
                            <span title="Featured" className="text-champagne"><Star size={13} /></span>
                          )}
                          {p.showOnHomepage && (
                            <span title="Homepage" className="text-blue-400"><Eye size={13} /></span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/properties/${p.id}/edit`}
                            className="flex items-center gap-1 text-[10px] font-sans tracking-wider uppercase text-warm-grey-500 hover:text-champagne transition-colors"
                          >
                            <Edit size={12} />
                            Edit
                          </Link>
                          <Link
                            href={`/properties/${p.slug}`}
                            target="_blank"
                            className="flex items-center gap-1 text-[10px] font-sans tracking-wider uppercase text-warm-grey-400 hover:text-blue-500 transition-colors"
                          >
                            <Eye size={12} />
                            View
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
