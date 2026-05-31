"use client";
import { use } from "react";
import { notFound } from "next/navigation";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { ChevronLeft, Save } from "lucide-react";
import { PROPERTIES } from "@/lib/data";
import { configLabel } from "@/lib/utils";

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = PROPERTIES.find((p) => p.id === id);

  if (!property) notFound();

  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-warm-grey-100">
        <AdminSidebar />
        <div className="flex-1 overflow-auto">
          {/* Top bar */}
          <div className="bg-white border-b border-warm-grey-200 px-8 py-4 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-4">
              <Link href="/admin/properties" className="flex items-center gap-1 text-xs font-sans text-warm-grey-400 hover:text-champagne transition-colors">
                <ChevronLeft size={14} /> Properties
              </Link>
              <h1 className="font-serif text-xl text-warm-grey-900">
                Edit: {property.buildingName}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/properties/${property.slug}`}
                target="_blank"
                className="text-xs font-sans tracking-widest uppercase text-warm-grey-500 border border-warm-grey-200 px-4 py-2 hover:border-champagne hover:text-champagne transition-colors"
              >
                Preview
              </Link>
              <button className="flex items-center gap-2 bg-champagne text-obsidian text-xs font-sans tracking-widest uppercase px-5 py-2.5 hover:bg-champagne-dark transition-colors">
                <Save size={14} />
                Save Changes
              </button>
            </div>
          </div>

          <div className="p-8 max-w-4xl">
            {/* Quick visibility toggles */}
            <div className="bg-white border border-warm-grey-200 p-6 mb-6">
              <h2 className="font-serif text-lg font-light text-warm-grey-900 mb-4">Visibility & Flags</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "Show on Homepage", checked: property.showOnHomepage },
                  { label: "Show in Listings", checked: property.showInListings },
                  { label: "Featured", checked: property.featured },
                  { label: "Hot Property", checked: property.hotProperty },
                  { label: "Hide Price", checked: property.hidePrice },
                  { label: "Hide Address", checked: property.hideExactAddress },
                ].map((toggle) => (
                  <label key={toggle.label} className="flex items-center gap-3 text-sm font-sans text-warm-grey-700 cursor-pointer">
                    <input type="checkbox" defaultChecked={toggle.checked} className="accent-champagne" />
                    {toggle.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Key fields */}
            <div className="bg-white border border-warm-grey-200 p-6 mb-6">
              <h2 className="font-serif text-lg font-light text-warm-grey-900 mb-5">Key Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">Property Title</label>
                  <input defaultValue={property.title} className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">Price Display</label>
                    <input defaultValue={property.priceDisplay} className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">Carpet Area</label>
                    <input defaultValue={property.carpetArea} className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">Short Highlight</label>
                  <textarea defaultValue={property.shortHighlight} rows={2} className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white resize-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">Full Description</label>
                  <textarea defaultValue={property.description} rows={8} className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white resize-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">Internal Notes (Admin Only)</label>
                  <textarea defaultValue={property.internalNotes} rows={3} className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-warm-grey-50 resize-none" />
                </div>
              </div>
            </div>

            {/* Property stats summary */}
            <div className="bg-white border border-warm-grey-200 p-6">
              <h2 className="font-serif text-lg font-light text-warm-grey-900 mb-4">Property Summary</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "ID", value: property.id },
                  { label: "Config", value: configLabel(property.configuration) },
                  { label: "Location", value: property.location },
                  { label: "Status", value: property.status },
                  { label: "Possession", value: property.possessionStatus },
                  { label: "Transaction", value: property.transactionType },
                  { label: "RERA", value: property.reraNumber },
                  { label: "Slug", value: property.slug },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-0.5">{label}</p>
                    <p className="text-xs font-sans text-warm-grey-700">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
