"use client";
import { use, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import {
  ChevronLeft, Save, Upload, Trash2, Star, Eye,
  Plus, GripVertical, ImageIcon, Layout, X, Check,
} from "lucide-react";
import { PROPERTIES, PropertyImage, FloorPlan } from "@/lib/data";
import { configLabel } from "@/lib/utils";

const TABS = [
  "Key Details",
  "Gallery",
  "Floor Plans & Layouts",
  "Visibility",
];

const IMAGE_TYPES = ["exterior", "interior", "view", "amenity", "layout"] as const;

export default function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const property = PROPERTIES.find((p) => p.id === id);
  if (!property) notFound();

  const [activeTab, setActiveTab] = useState(0);
  const [saved, setSaved] = useState(false);

  // Gallery state
  const [images, setImages] = useState<PropertyImage[]>(property.images);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageCaption, setNewImageCaption] = useState("");
  const [newImageType, setNewImageType] = useState<PropertyImage["type"]>("exterior");

  // Floor plans state
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>(property.floorPlans);
  const [addingPlan, setAddingPlan] = useState(false);
  const [newPlan, setNewPlan] = useState({
    title: "", type: "primary", imageUrl: "", notes: "", carpetArea: "", roomCount: "",
  });

  const handleSave = async () => {
    await new Promise((r) => setTimeout(r, 600));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  // Gallery actions
  const addImage = () => {
    if (!newImageUrl.trim()) return;
    const img: PropertyImage = {
      id: `img-new-${Date.now()}`,
      url: newImageUrl.trim(),
      caption: newImageCaption,
      type: newImageType,
      isCover: images.length === 0,
    };
    setImages([...images, img]);
    setNewImageUrl("");
    setNewImageCaption("");
  };

  const removeImage = (imgId: string) => {
    const next = images.filter((i) => i.id !== imgId);
    if (next.length > 0 && !next.some((i) => i.isCover)) next[0].isCover = true;
    setImages(next);
  };

  const setCover = (imgId: string) => {
    setImages(images.map((i) => ({ ...i, isCover: i.id === imgId })));
  };

  const updateCaption = (imgId: string, caption: string) => {
    setImages(images.map((i) => i.id === imgId ? { ...i, caption } : i));
  };

  const updateType = (imgId: string, type: PropertyImage["type"]) => {
    setImages(images.map((i) => i.id === imgId ? { ...i, type } : i));
  };

  // Floor plan actions
  const addFloorPlan = () => {
    if (!newPlan.title.trim()) return;
    const plan: FloorPlan = {
      id: `fp-new-${Date.now()}`,
      ...newPlan,
    };
    setFloorPlans([...floorPlans, plan]);
    setNewPlan({ title: "", type: "primary", imageUrl: "", notes: "", carpetArea: "", roomCount: "" });
    setAddingPlan(false);
  };

  const removeFloorPlan = (planId: string) => {
    setFloorPlans(floorPlans.filter((p) => p.id !== planId));
  };

  const updateFloorPlan = (planId: string, field: keyof FloorPlan, value: string) => {
    setFloorPlans(floorPlans.map((p) => p.id === planId ? { ...p, [field]: value } : p));
  };

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
              {saved && (
                <span className="flex items-center gap-1.5 text-xs font-sans text-green-600">
                  <Check size={13} /> Saved
                </span>
              )}
              <Link
                href={`/properties/${property.slug}`}
                target="_blank"
                className="text-xs font-sans tracking-widest uppercase text-warm-grey-500 border border-warm-grey-200 px-4 py-2 hover:border-champagne hover:text-champagne transition-colors"
              >
                Preview
              </Link>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-champagne text-obsidian text-xs font-sans tracking-widest uppercase px-5 py-2.5 hover:bg-champagne-dark transition-colors"
              >
                <Save size={14} />
                Save Changes
              </button>
            </div>
          </div>

          {/* Tab nav */}
          <div className="bg-white border-b border-warm-grey-200 px-8">
            <div className="flex gap-0">
              {TABS.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={`text-xs font-sans tracking-wider uppercase px-5 py-4 border-b-2 transition-all ${
                    activeTab === i
                      ? "border-champagne text-champagne"
                      : "border-transparent text-warm-grey-500 hover:text-warm-grey-800"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8 max-w-4xl">

            {/* ── Tab 0: Key Details ──────────────────────────────────── */}
            {activeTab === 0 && (
              <div className="space-y-5">
                <div className="bg-white border border-warm-grey-200 p-6">
                  <h2 className="font-serif text-lg font-light text-warm-grey-900 mb-5">Key Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className={lbl}>Property Title</label>
                      <input defaultValue={property.title} className={inp} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={lbl}>Price Display</label>
                        <input defaultValue={property.priceDisplay} className={inp} />
                      </div>
                      <div>
                        <label className={lbl}>Carpet Area</label>
                        <input defaultValue={property.carpetArea} className={inp} />
                      </div>
                    </div>
                    <div>
                      <label className={lbl}>Short Highlight</label>
                      <textarea defaultValue={property.shortHighlight} rows={2} className={`${inp} resize-none`} />
                    </div>
                    <div>
                      <label className={lbl}>Full Description</label>
                      <textarea defaultValue={property.description} rows={8} className={`${inp} resize-none`} />
                    </div>
                    <div>
                      <label className={lbl}>Lifestyle Description</label>
                      <textarea defaultValue={property.lifestyleDescription} rows={4} className={`${inp} resize-none`} />
                    </div>
                    <div>
                      <label className={lbl}>Investment Note</label>
                      <textarea defaultValue={property.investmentNote} rows={3} className={`${inp} resize-none`} />
                    </div>
                    <div>
                      <label className={lbl}>Neighbourhood Note</label>
                      <textarea defaultValue={property.neighbourhoodNote} rows={3} className={`${inp} resize-none`} />
                    </div>
                    <div>
                      <label className={lbl}>Agent Remarks</label>
                      <textarea defaultValue={property.agentRemarks} rows={2} className={`${inp} resize-none`} />
                    </div>
                    <div>
                      <label className={lbl}>Internal Notes (Admin Only)</label>
                      <textarea defaultValue={property.internalNotes} rows={3} className={`${inp} resize-none bg-warm-grey-50`} />
                    </div>
                  </div>
                </div>

                {/* Summary */}
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
            )}

            {/* ── Tab 1: Gallery ──────────────────────────────────────── */}
            {activeTab === 1 && (
              <div className="space-y-6">
                <div className="bg-white border border-warm-grey-200 p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-serif text-lg font-light text-warm-grey-900">
                      Property Gallery
                    </h2>
                    <span className="text-xs font-sans text-warm-grey-400">{images.length} photos</span>
                  </div>

                  {/* Existing images */}
                  <div className="space-y-3 mb-8">
                    {images.map((img, idx) => (
                      <div
                        key={img.id}
                        className={`flex items-center gap-4 p-3 border rounded transition-all ${
                          img.isCover ? "border-champagne bg-champagne/5" : "border-warm-grey-200 bg-warm-grey-50"
                        }`}
                      >
                        {/* Drag handle */}
                        <GripVertical size={14} className="text-warm-grey-300 shrink-0 cursor-grab" />

                        {/* Thumbnail */}
                        <div className="relative w-20 h-14 shrink-0 overflow-hidden bg-warm-grey-200">
                          <Image
                            src={img.url}
                            alt={img.caption}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                          {img.isCover && (
                            <div className="absolute inset-0 flex items-center justify-center bg-champagne/40">
                              <Star size={14} className="text-white" />
                            </div>
                          )}
                        </div>

                        {/* Fields */}
                        <div className="flex-1 grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[9px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1">Caption</label>
                            <input
                              value={img.caption}
                              onChange={(e) => updateCaption(img.id, e.target.value)}
                              className="w-full border border-warm-grey-200 px-2 py-1.5 text-xs font-sans focus:outline-none focus:border-champagne bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1">Type</label>
                            <select
                              value={img.type}
                              onChange={(e) => updateType(img.id, e.target.value as PropertyImage["type"])}
                              className="w-full border border-warm-grey-200 px-2 py-1.5 text-xs font-sans focus:outline-none focus:border-champagne bg-white"
                            >
                              {IMAGE_TYPES.map((t) => (
                                <option key={t} value={t} className="capitalize">{t}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-1.5 shrink-0">
                          <button
                            onClick={() => setCover(img.id)}
                            title="Set as cover"
                            className={`flex items-center gap-1 text-[9px] font-sans tracking-widest uppercase px-2 py-1 transition-all ${
                              img.isCover
                                ? "bg-champagne text-obsidian"
                                : "border border-warm-grey-200 text-warm-grey-400 hover:border-champagne hover:text-champagne"
                            }`}
                          >
                            <Star size={9} />
                            {img.isCover ? "Cover" : "Set Cover"}
                          </button>
                          <button
                            onClick={() => removeImage(img.id)}
                            className="flex items-center gap-1 text-[9px] font-sans tracking-widest uppercase px-2 py-1 border border-red-200 text-red-400 hover:bg-red-50 transition-all"
                          >
                            <Trash2 size={9} />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add new image */}
                  <div className="border-t border-warm-grey-100 pt-6">
                    <h3 className="font-serif text-base font-light text-warm-grey-800 mb-4 flex items-center gap-2">
                      <Plus size={14} className="text-champagne" />
                      Add Photo
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className={lbl}>Image URL</label>
                        <input
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          placeholder="https://..."
                          className={inp}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={lbl}>Caption</label>
                          <input
                            value={newImageCaption}
                            onChange={(e) => setNewImageCaption(e.target.value)}
                            placeholder="e.g. Sea-facing living room"
                            className={inp}
                          />
                        </div>
                        <div>
                          <label className={lbl}>Type</label>
                          <select
                            value={newImageType}
                            onChange={(e) => setNewImageType(e.target.value as PropertyImage["type"])}
                            className={inp}
                          >
                            {IMAGE_TYPES.map((t) => (
                              <option key={t} value={t} className="capitalize">{t}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Preview */}
                      {newImageUrl && (
                        <div className="relative h-32 w-48 bg-warm-grey-100 overflow-hidden">
                          <Image
                            src={newImageUrl}
                            alt="Preview"
                            fill
                            className="object-cover"
                            sizes="192px"
                            onError={() => {}}
                          />
                        </div>
                      )}

                      <button
                        onClick={addImage}
                        disabled={!newImageUrl.trim()}
                        className="flex items-center gap-2 bg-obsidian text-white text-xs font-sans tracking-widest uppercase px-5 py-2.5 hover:bg-navy transition-colors disabled:opacity-40"
                      >
                        <ImageIcon size={13} />
                        Add to Gallery
                      </button>
                    </div>
                  </div>
                </div>

                {/* Upload note */}
                <div className="bg-champagne/10 border border-champagne/30 p-4">
                  <p className="text-xs font-sans text-warm-grey-700 leading-relaxed">
                    <span className="font-medium text-champagne">Tip:</span> Upload your images to any hosting service (Cloudinary, Supabase Storage, Google Drive direct link) and paste the public URL above. For best results use 1200×800px or larger JPEGs.
                  </p>
                </div>
              </div>
            )}

            {/* ── Tab 2: Floor Plans & Layouts ─────────────────────── */}
            {activeTab === 2 && (
              <div className="space-y-6">
                <div className="bg-white border border-warm-grey-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-serif text-lg font-light text-warm-grey-900">
                      Floor Plans & Layouts
                    </h2>
                    <button
                      onClick={() => setAddingPlan(true)}
                      className="flex items-center gap-2 bg-champagne text-obsidian text-xs font-sans tracking-widest uppercase px-4 py-2 hover:bg-champagne-dark transition-colors"
                    >
                      <Plus size={13} />
                      Add Layout
                    </button>
                  </div>

                  {/* Existing floor plans */}
                  <div className="space-y-4">
                    {floorPlans.map((plan) => (
                      <div key={plan.id} className="border border-warm-grey-200 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                          {/* Image preview */}
                          <div className="relative bg-warm-grey-50 flex items-center justify-center min-h-[200px] border-r border-warm-grey-200">
                            {plan.imageUrl ? (
                              <Image
                                src={plan.imageUrl}
                                alt={plan.title}
                                fill
                                className="object-contain p-4"
                                sizes="400px"
                              />
                            ) : (
                              <div className="flex flex-col items-center gap-2 text-warm-grey-300">
                                <Layout size={32} />
                                <p className="text-xs font-sans">No image uploaded</p>
                              </div>
                            )}
                          </div>

                          {/* Fields */}
                          <div className="p-5 space-y-3">
                            <div>
                              <label className={lbl}>Layout Title</label>
                              <input
                                value={plan.title}
                                onChange={(e) => updateFloorPlan(plan.id, "title", e.target.value)}
                                className={inp}
                              />
                            </div>
                            <div>
                              <label className={lbl}>Type</label>
                              <select
                                value={plan.type}
                                onChange={(e) => updateFloorPlan(plan.id, "type", e.target.value)}
                                className={inp}
                              >
                                {["primary", "alternate", "duplex", "penthouse", "vastu", "furniture", "custom"].map((t) => (
                                  <option key={t} value={t} className="capitalize">{t}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className={lbl}>Image URL</label>
                              <input
                                value={plan.imageUrl}
                                onChange={(e) => updateFloorPlan(plan.id, "imageUrl", e.target.value)}
                                placeholder="https://..."
                                className={inp}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className={lbl}>Carpet Area</label>
                                <input
                                  value={plan.carpetArea}
                                  onChange={(e) => updateFloorPlan(plan.id, "carpetArea", e.target.value)}
                                  placeholder="e.g. 3,200 sq. ft."
                                  className={inp}
                                />
                              </div>
                              <div>
                                <label className={lbl}>Room Count</label>
                                <input
                                  value={plan.roomCount}
                                  onChange={(e) => updateFloorPlan(plan.id, "roomCount", e.target.value)}
                                  placeholder="e.g. 4+1"
                                  className={inp}
                                />
                              </div>
                            </div>
                            <div>
                              <label className={lbl}>Notes</label>
                              <textarea
                                value={plan.notes}
                                onChange={(e) => updateFloorPlan(plan.id, "notes", e.target.value)}
                                rows={2}
                                className={`${inp} resize-none`}
                              />
                            </div>
                            <button
                              onClick={() => removeFloorPlan(plan.id)}
                              className="flex items-center gap-1.5 text-[10px] font-sans tracking-widest uppercase text-red-400 border border-red-200 px-3 py-1.5 hover:bg-red-50 transition-all"
                            >
                              <Trash2 size={11} />
                              Remove Layout
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {floorPlans.length === 0 && !addingPlan && (
                      <div className="text-center py-12 text-warm-grey-400">
                        <Layout size={32} className="mx-auto mb-3 opacity-30" />
                        <p className="text-sm font-sans">No floor plans added yet.</p>
                        <p className="text-xs font-sans mt-1">Click "Add Layout" to upload your first floor plan.</p>
                      </div>
                    )}
                  </div>

                  {/* Add new layout form */}
                  {addingPlan && (
                    <div className="mt-6 pt-6 border-t border-warm-grey-100">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-serif text-base font-light text-warm-grey-800">New Layout</h3>
                        <button onClick={() => setAddingPlan(false)}>
                          <X size={16} className="text-warm-grey-400 hover:text-warm-grey-700" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className={lbl}>Layout Title *</label>
                            <input
                              value={newPlan.title}
                              onChange={(e) => setNewPlan({ ...newPlan, title: e.target.value })}
                              placeholder="e.g. 4 BHK Standard Layout"
                              className={inp}
                            />
                          </div>
                          <div>
                            <label className={lbl}>Type</label>
                            <select
                              value={newPlan.type}
                              onChange={(e) => setNewPlan({ ...newPlan, type: e.target.value })}
                              className={inp}
                            >
                              {["primary", "alternate", "duplex", "penthouse", "vastu", "furniture", "custom"].map((t) => (
                                <option key={t} value={t} className="capitalize">{t}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className={lbl}>Floor Plan Image URL</label>
                          <input
                            value={newPlan.imageUrl}
                            onChange={(e) => setNewPlan({ ...newPlan, imageUrl: e.target.value })}
                            placeholder="https://..."
                            className={inp}
                          />
                        </div>
                        {newPlan.imageUrl && (
                          <div className="relative h-40 bg-warm-grey-50 flex items-center justify-center overflow-hidden">
                            <Image
                              src={newPlan.imageUrl}
                              alt="Preview"
                              fill
                              className="object-contain p-3"
                              sizes="600px"
                              onError={() => {}}
                            />
                          </div>
                        )}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className={lbl}>Carpet Area</label>
                            <input
                              value={newPlan.carpetArea}
                              onChange={(e) => setNewPlan({ ...newPlan, carpetArea: e.target.value })}
                              placeholder="e.g. 3,200 sq. ft."
                              className={inp}
                            />
                          </div>
                          <div>
                            <label className={lbl}>Rooms</label>
                            <input
                              value={newPlan.roomCount}
                              onChange={(e) => setNewPlan({ ...newPlan, roomCount: e.target.value })}
                              placeholder="e.g. 4+1"
                              className={inp}
                            />
                          </div>
                        </div>
                        <div>
                          <label className={lbl}>Notes</label>
                          <textarea
                            value={newPlan.notes}
                            onChange={(e) => setNewPlan({ ...newPlan, notes: e.target.value })}
                            rows={2}
                            placeholder="e.g. Standard layout with study and servant quarters"
                            className={`${inp} resize-none`}
                          />
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={addFloorPlan}
                            disabled={!newPlan.title.trim()}
                            className="flex items-center gap-2 bg-champagne text-obsidian text-xs font-sans tracking-widest uppercase px-5 py-2.5 hover:bg-champagne-dark transition-colors disabled:opacity-40"
                          >
                            <Check size={13} />
                            Add Layout
                          </button>
                          <button
                            onClick={() => setAddingPlan(false)}
                            className="text-xs font-sans tracking-widest uppercase text-warm-grey-400 border border-warm-grey-200 px-5 py-2.5 hover:border-warm-grey-400 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-champagne/10 border border-champagne/30 p-4">
                  <p className="text-xs font-sans text-warm-grey-700 leading-relaxed">
                    <span className="font-medium text-champagne">Tip:</span> Upload floor plan images to any hosting service and paste the URL. Use white-background floor plan diagrams (PNG or JPEG). Recommended size: 1600×1200px for sharp rendering on all screens.
                  </p>
                </div>
              </div>
            )}

            {/* ── Tab 3: Visibility ───────────────────────────────────── */}
            {activeTab === 3 && (
              <div className="bg-white border border-warm-grey-200 p-6">
                <h2 className="font-serif text-lg font-light text-warm-grey-900 mb-5">Visibility & Flags</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Show on Homepage", checked: property.showOnHomepage },
                    { label: "Show in Listings", checked: property.showInListings },
                    { label: "Mark as Featured", checked: property.featured },
                    { label: "Mark as Hot Property", checked: property.hotProperty },
                    { label: "Hide Price (Price on Request)", checked: property.hidePrice },
                    { label: "Hide Exact Address", checked: property.hideExactAddress },
                  ].map((toggle) => (
                    <label key={toggle.label} className="flex items-center gap-3 text-sm font-sans text-warm-grey-700 cursor-pointer p-3 border border-warm-grey-100 hover:border-champagne/30 transition-colors">
                      <input type="checkbox" defaultChecked={toggle.checked} className="accent-champagne w-4 h-4" />
                      {toggle.label}
                    </label>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}

const lbl = "block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5";
const inp = "w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white transition-colors";
