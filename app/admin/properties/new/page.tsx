"use client";
import { useState } from "react";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { ChevronLeft, Save, CheckCircle } from "lucide-react";
import { LOCATIONS, AGENTS } from "@/lib/data";

const SECTIONS = [
  "Basic Details", "Pricing", "Area Details",
  "Floor & View", "Rooms & Config", "Amenities",
  "Content", "Visibility & SEO",
];

const ALL_AMENITIES = [
  "Swimming Pool", "Gymnasium", "Spa", "Concierge", "Valet Parking",
  "Private Lift Lobby", "24x7 Security", "Clubhouse", "Kids Play Area",
  "Business Lounge", "Sea View Deck", "Visitor Parking", "Banquet Area",
  "Library", "Lounge", "Indoor Games", "Outdoor Garden",
];

export default function NewPropertyPage() {
  const [activeSection, setActiveSection] = useState(0);
  const [saved, setSaved] = useState(false);
  const [amenities, setAmenities] = useState<string[]>([]);

  const toggleAmenity = (a: string) => {
    setAmenities((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);
  };

  const handleSave = async () => {
    await new Promise((r) => setTimeout(r, 800));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (saved) {
    return (
      <AdminAuthGuard>
        <div className="flex min-h-screen bg-warm-grey-100">
          <AdminSidebar />
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <CheckCircle size={48} className="text-champagne mx-auto mb-4" />
              <h2 className="font-serif text-2xl text-warm-grey-800 mb-2">Property Saved</h2>
              <p className="text-sm font-sans text-warm-grey-500 mb-6">The property has been added to the collection.</p>
              <Link href="/admin/properties"
                className="bg-champagne text-obsidian text-xs font-sans tracking-widest uppercase px-6 py-2.5 hover:bg-champagne-dark transition-colors">
                Back to Properties
              </Link>
            </div>
          </div>
        </div>
      </AdminAuthGuard>
    );
  }

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
              <h1 className="font-serif text-xl text-warm-grey-900">Add New Property</h1>
            </div>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-champagne text-obsidian text-xs font-sans tracking-widest uppercase px-5 py-2.5 hover:bg-champagne-dark transition-colors"
            >
              <Save size={14} />
              Save Property
            </button>
          </div>

          <div className="flex">
            {/* Section nav */}
            <div className="w-44 shrink-0 bg-white border-r border-warm-grey-200 min-h-screen px-0 py-6">
              {SECTIONS.map((sec, i) => (
                <button
                  key={sec}
                  onClick={() => setActiveSection(i)}
                  className={`w-full text-left px-5 py-3 text-xs font-sans transition-all ${
                    activeSection === i
                      ? "bg-champagne/10 text-champagne border-r-2 border-champagne font-medium"
                      : "text-warm-grey-500 hover:text-warm-grey-800 hover:bg-warm-grey-50"
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>

            {/* Form panels */}
            <div className="flex-1 p-8 max-w-3xl">
              {activeSection === 0 && (
                <FormSection title="Basic Details">
                  <FormRow label="Property Title" required>
                    <input className={inputCls} placeholder="e.g. Lodha Malabar — Sea-Facing Residence" />
                  </FormRow>
                  <FormRow label="Building Name" required>
                    <input className={inputCls} placeholder="Building name" />
                  </FormRow>
                  <div className="grid grid-cols-2 gap-4">
                    <FormRow label="Location" required>
                      <select className={inputCls}>
                        <option value="">Select</option>
                        {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
                      </select>
                    </FormRow>
                    <FormRow label="Micro-Location">
                      <input className={inputCls} placeholder="e.g. Walkeshwar" />
                    </FormRow>
                  </div>
                  <FormRow label="Address">
                    <input className={inputCls} placeholder="Full address" />
                  </FormRow>
                  <div className="grid grid-cols-2 gap-4">
                    <FormRow label="Configuration" required>
                      <select className={inputCls}>
                        {["2 BHK", "3 BHK", "4 BHK", "Duplex", "Penthouse", "Villa"].map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </FormRow>
                    <FormRow label="Property Type">
                      <input className={inputCls} placeholder="e.g. Luxury Apartment" />
                    </FormRow>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <FormRow label="Transaction Type">
                      <select className={inputCls}>
                        <option>Sale</option>
                        <option>Lease</option>
                        <option>Resale</option>
                      </select>
                    </FormRow>
                    <FormRow label="Status">
                      <select className={inputCls}>
                        <option>Active</option>
                        <option>Hidden</option>
                        <option>Archived</option>
                      </select>
                    </FormRow>
                    <FormRow label="Possession">
                      <select className={inputCls}>
                        <option>Ready to Move</option>
                        <option>Under Construction</option>
                        <option>Resale</option>
                      </select>
                    </FormRow>
                  </div>
                  <FormRow label="RERA Number">
                    <input className={inputCls} placeholder="P51900XXXXXX" />
                  </FormRow>
                  <FormRow label="Assigned Agent">
                    <select className={inputCls}>
                      <option value="">— Unassigned —</option>
                      {AGENTS.filter((a) => a.role !== "super_admin").map((a) => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>
                  </FormRow>
                </FormSection>
              )}

              {activeSection === 1 && (
                <FormSection title="Pricing">
                  <FormRow label="Price Display Text" required>
                    <input className={inputCls} placeholder="e.g. ₹28 Cr onwards" />
                  </FormRow>
                  <div className="grid grid-cols-2 gap-4">
                    <FormRow label="Price Value (Cr)">
                      <input className={inputCls} type="number" placeholder="28" />
                    </FormRow>
                    <FormRow label="Price per Sq. Ft.">
                      <input className={inputCls} placeholder="e.g. ₹87,500 per sq. ft." />
                    </FormRow>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormRow label="Maintenance">
                      <input className={inputCls} placeholder="e.g. ₹3.5 Lakh per month" />
                    </FormRow>
                    <FormRow label="Stamp Duty Est.">
                      <input className={inputCls} placeholder="e.g. 5%" />
                    </FormRow>
                  </div>
                  <FormRow label="Brokerage Note">
                    <input className={inputCls} placeholder="e.g. 2% + GST" />
                  </FormRow>
                  <div className="flex items-center gap-3 mt-2">
                    <input type="checkbox" id="hidePrice" className="accent-champagne" />
                    <label htmlFor="hidePrice" className="text-sm font-sans text-warm-grey-700">
                      Hide price publicly (show "Price on Request")
                    </label>
                  </div>
                </FormSection>
              )}

              {activeSection === 2 && (
                <FormSection title="Area Details">
                  <div className="grid grid-cols-2 gap-4">
                    <FormRow label="Carpet Area" required><input className={inputCls} placeholder="e.g. 3,200 sq. ft." /></FormRow>
                    <FormRow label="Built-up Area"><input className={inputCls} placeholder="e.g. 3,800 sq. ft." /></FormRow>
                    <FormRow label="Super Built-up Area"><input className={inputCls} placeholder="e.g. 4,200 sq. ft." /></FormRow>
                    <FormRow label="Deck Area"><input className={inputCls} placeholder="e.g. 320 sq. ft." /></FormRow>
                    <FormRow label="Balcony Area"><input className={inputCls} placeholder="e.g. 180 sq. ft." /></FormRow>
                  </div>
                </FormSection>
              )}

              {activeSection === 3 && (
                <FormSection title="Floor & View">
                  <div className="grid grid-cols-2 gap-4">
                    <FormRow label="Floor Number"><input className={inputCls} placeholder="e.g. 18th" /></FormRow>
                    <FormRow label="Total Floors"><input className={inputCls} type="number" placeholder="22" /></FormRow>
                    <FormRow label="View Type">
                      <select className={inputCls}>
                        {["Sea View", "City View", "Skyline View", "Garden View", "Pool View", "Mixed", "N/A"].map((v) => (
                          <option key={v}>{v}</option>
                        ))}
                      </select>
                    </FormRow>
                    <FormRow label="Facing">
                      <select className={inputCls}>
                        {["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"].map((v) => (
                          <option key={v}>{v}</option>
                        ))}
                      </select>
                    </FormRow>
                  </div>
                  <FormRow label="Vastu Status">
                    <select className={inputCls}>
                      <option>Vastu Compliant</option>
                      <option>Not Vastu</option>
                      <option>Unknown</option>
                    </select>
                  </FormRow>
                  <FormRow label="Parking"><input className={inputCls} placeholder="e.g. 2 designated covered" /></FormRow>
                </FormSection>
              )}

              {activeSection === 4 && (
                <FormSection title="Rooms & Configuration">
                  <div className="grid grid-cols-3 gap-4">
                    <FormRow label="Bedrooms"><input className={inputCls} type="number" min={0} defaultValue={3} /></FormRow>
                    <FormRow label="Bathrooms"><input className={inputCls} type="number" min={0} defaultValue={3} /></FormRow>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-2">
                    {[
                      "Powder Room", "Servant Room", "Study Room",
                      "Family Lounge", "Utility Area",
                    ].map((room) => (
                      <label key={room} className="flex items-center gap-3 text-sm font-sans text-warm-grey-700">
                        <input type="checkbox" className="accent-champagne" />
                        {room}
                      </label>
                    ))}
                  </div>
                </FormSection>
              )}

              {activeSection === 5 && (
                <FormSection title="Amenities">
                  <p className="text-xs font-sans text-warm-grey-500 mb-4">
                    Select all amenities available in this building.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {ALL_AMENITIES.map((a) => (
                      <label key={a} className={`flex items-center gap-3 text-sm font-sans p-3 border cursor-pointer transition-colors ${
                        amenities.includes(a)
                          ? "border-champagne bg-champagne/5 text-obsidian"
                          : "border-warm-grey-200 text-warm-grey-600 hover:border-champagne/40"
                      }`}>
                        <input type="checkbox" checked={amenities.includes(a)} onChange={() => toggleAmenity(a)} className="accent-champagne" />
                        {a}
                      </label>
                    ))}
                  </div>
                  <div className="mt-4">
                    <FormRow label="Custom Amenity">
                      <input className={inputCls} placeholder="Add a custom amenity..." />
                    </FormRow>
                  </div>
                </FormSection>
              )}

              {activeSection === 6 && (
                <FormSection title="Content">
                  <FormRow label="Short Highlight" required>
                    <textarea className={`${inputCls} resize-none`} rows={2}
                      placeholder="One-line highlight shown on property cards..." />
                  </FormRow>
                  <FormRow label="Full Description" required>
                    <textarea className={`${inputCls} resize-none`} rows={6}
                      placeholder="Detailed property description..." />
                  </FormRow>
                  <FormRow label="Lifestyle Description">
                    <textarea className={`${inputCls} resize-none`} rows={4}
                      placeholder="Lifestyle and living experience at this address..." />
                  </FormRow>
                  <FormRow label="Investment Note">
                    <textarea className={`${inputCls} resize-none`} rows={3}
                      placeholder="Investment rationale, appreciation potential..." />
                  </FormRow>
                  <FormRow label="Neighbourhood Note">
                    <textarea className={`${inputCls} resize-none`} rows={3}
                      placeholder="Neighbourhood character, landmarks, connectivity..." />
                  </FormRow>
                  <FormRow label="Agent Remarks">
                    <textarea className={`${inputCls} resize-none`} rows={2}
                      placeholder="Visible to agents only..." />
                  </FormRow>
                  <FormRow label="Internal Notes">
                    <textarea className={`${inputCls} resize-none`} rows={2}
                      placeholder="Admin-only notes. Never shown publicly." />
                  </FormRow>
                </FormSection>
              )}

              {activeSection === 7 && (
                <FormSection title="Visibility & SEO">
                  <div className="space-y-3 mb-6">
                    {[
                      { id: "homepage", label: "Show on Homepage" },
                      { id: "listings", label: "Show in Property Listings" },
                      { id: "featured", label: "Mark as Featured" },
                      { id: "hot", label: "Mark as Hot Property" },
                      { id: "hidePrice", label: "Hide Price (show Price on Request)" },
                      { id: "hideAddress", label: "Hide Exact Address" },
                    ].map((item) => (
                      <label key={item.id} className="flex items-center gap-3 text-sm font-sans text-warm-grey-700">
                        <input type="checkbox" className="accent-champagne" />
                        {item.label}
                      </label>
                    ))}
                  </div>
                  <FormRow label="SEO Title">
                    <input className={inputCls} placeholder="Meta title for this property page" />
                  </FormRow>
                  <FormRow label="SEO Description">
                    <textarea className={`${inputCls} resize-none`} rows={3}
                      placeholder="Meta description (150–160 chars)" />
                  </FormRow>
                  <FormRow label="URL Slug">
                    <input className={inputCls} placeholder="e.g. lodha-malabar-walkeshwar" />
                  </FormRow>
                </FormSection>
              )}

              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                  disabled={activeSection === 0}
                  className="text-xs font-sans tracking-widest uppercase text-warm-grey-500 border border-warm-grey-200 px-5 py-2.5 hover:border-warm-grey-400 transition-colors disabled:opacity-40"
                >
                  Previous
                </button>
                {activeSection < SECTIONS.length - 1 ? (
                  <button
                    onClick={() => setActiveSection(Math.min(SECTIONS.length - 1, activeSection + 1))}
                    className="text-xs font-sans tracking-widest uppercase bg-warm-grey-800 text-white px-5 py-2.5 hover:bg-warm-grey-900 transition-colors"
                  >
                    Next Section
                  </button>
                ) : (
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-champagne text-obsidian text-xs font-sans tracking-widest uppercase px-6 py-2.5 hover:bg-champagne-dark transition-colors"
                  >
                    <Save size={14} />
                    Save Property
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}

const inputCls = "w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white transition-colors";

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-serif text-2xl font-light text-warm-grey-900 mb-6 pb-3 border-b border-warm-grey-200">
        {title}
      </h2>
      <div className="space-y-5">{children}</div>
    </div>
  );
}

function FormRow({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}
