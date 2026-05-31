"use client";
import { useState } from "react";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { LEADS, AGENTS, PROPERTIES } from "@/lib/data";
import { timeAgo } from "@/lib/utils";
import { Search, Download, Flame, Thermometer, Snowflake } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-purple-50 text-purple-600",
  contacted: "bg-blue-50 text-blue-600",
  visit_scheduled: "bg-teal-50 text-teal-600",
  interested: "bg-green-50 text-green-600",
  negotiation: "bg-orange-50 text-orange-600",
  closed: "bg-emerald-50 text-emerald-700",
  lost: "bg-warm-grey-100 text-warm-grey-400",
};

export default function AdminLeadsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [tempFilter, setTempFilter] = useState("");
  const [selectedLead, setSelectedLead] = useState<string | null>(null);

  const filtered = LEADS.filter((l) => {
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || l.status === statusFilter;
    const matchTemp = !tempFilter || l.leadTemperature === tempFilter;
    return matchSearch && matchStatus && matchTemp;
  });

  const selected = LEADS.find((l) => l.id === selectedLead);
  const selectedProperty = selected ? PROPERTIES.find((p) => p.id === selected.propertyId) : null;
  const selectedAgent = selected ? AGENTS.find((a) => a.id === selected.assignedAgentId) : null;

  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-warm-grey-100">
        <AdminSidebar />
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-serif text-3xl font-light text-warm-grey-900">Leads</h1>
                <p className="text-sm font-sans text-warm-grey-500 mt-1">
                  {filtered.length} leads
                </p>
              </div>
              <button className="flex items-center gap-2 border border-warm-grey-200 bg-white text-xs font-sans tracking-widest uppercase px-4 py-2.5 text-warm-grey-600 hover:border-champagne hover:text-champagne transition-colors">
                <Download size={13} />
                Export CSV
              </button>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-warm-grey-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search leads..."
                  className="w-full border border-warm-grey-200 pl-9 pr-4 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white"
                />
              </div>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white">
                <option value="">All Statuses</option>
                {["new", "contacted", "visit_scheduled", "interested", "negotiation", "closed", "lost"].map((s) => (
                  <option key={s} value={s}>{s.replace("_", " ")}</option>
                ))}
              </select>
              <select value={tempFilter} onChange={(e) => setTempFilter(e.target.value)}
                className="border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white">
                <option value="">All Temperatures</option>
                <option value="hot">Hot</option>
                <option value="warm">Warm</option>
                <option value="cold">Cold</option>
              </select>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Leads Table */}
              <div className="xl:col-span-2 bg-white border border-warm-grey-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-warm-grey-100 bg-warm-grey-50">
                      <th className="text-left text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 px-5 py-3">Lead</th>
                      <th className="text-left text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 px-5 py-3 hidden md:table-cell">Source</th>
                      <th className="text-left text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 px-5 py-3">Status</th>
                      <th className="text-left text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 px-5 py-3">Temp</th>
                      <th className="text-left text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 px-5 py-3 hidden lg:table-cell">Added</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-warm-grey-50">
                    {filtered.map((lead) => (
                      <tr
                        key={lead.id}
                        onClick={() => setSelectedLead(lead.id === selectedLead ? null : lead.id)}
                        className={`cursor-pointer hover:bg-warm-grey-50 transition-colors ${
                          selectedLead === lead.id ? "bg-champagne/5 border-l-2 border-champagne" : ""
                        }`}
                      >
                        <td className="px-5 py-4">
                          <p className="font-sans text-warm-grey-900 font-medium">{lead.name}</p>
                          <p className="text-[10px] text-warm-grey-400">{lead.phone}</p>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          <span className="text-xs font-sans text-warm-grey-500 capitalize">
                            {lead.source.replace(/_/g, " ")}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-[10px] font-sans tracking-wider uppercase px-2 py-0.5 ${STATUS_COLORS[lead.status]}`}>
                            {lead.status.replace("_", " ")}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          {lead.leadTemperature === "hot" && <Flame size={14} className="text-red-500" />}
                          {lead.leadTemperature === "warm" && <Thermometer size={14} className="text-orange-400" />}
                          {lead.leadTemperature === "cold" && <Snowflake size={14} className="text-blue-400" />}
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <span className="text-xs text-warm-grey-400">{timeAgo(lead.createdAt)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Lead detail panel */}
              <div className="bg-white border border-warm-grey-200 p-6">
                {selected ? (
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-serif text-xl font-light text-warm-grey-900">{selected.name}</h3>
                      <span className={`text-[10px] font-sans tracking-wider uppercase px-2 py-0.5 ${STATUS_COLORS[selected.status]}`}>
                        {selected.status.replace("_", " ")}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      {[
                        { label: "Phone", value: selected.phone },
                        { label: "Email", value: selected.email },
                        { label: "Budget", value: selected.budget },
                        { label: "Location", value: selected.preferredLocation },
                        { label: "Source", value: selected.source.replace(/_/g, " ") },
                        { label: "Access Code", value: selected.accessCodeUsed },
                        { label: "Temperature", value: selected.leadTemperature },
                        { label: "Follow-up", value: selected.followUpDate || "Not set" },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex items-start justify-between gap-3">
                          <span className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 shrink-0">{label}</span>
                          <span className="text-xs font-sans text-warm-grey-700 text-right">{value}</span>
                        </div>
                      ))}
                    </div>

                    {selected.message && (
                      <div className="bg-warm-grey-50 p-3 mb-4">
                        <p className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1">Message</p>
                        <p className="text-xs font-sans text-warm-grey-700 leading-relaxed">{selected.message}</p>
                      </div>
                    )}

                    {selectedProperty && (
                      <div className="border border-champagne/30 p-3 mb-4">
                        <p className="text-[10px] font-sans tracking-widest uppercase text-champagne mb-1">Interested In</p>
                        <p className="text-sm font-sans text-warm-grey-800">{selectedProperty.buildingName}</p>
                        <p className="text-[10px] text-warm-grey-400">{selectedProperty.location}</p>
                      </div>
                    )}

                    {selectedAgent && (
                      <div className="mb-4">
                        <p className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1">Assigned Agent</p>
                        <p className="text-sm font-sans text-warm-grey-800">{selectedAgent.name}</p>
                      </div>
                    )}

                    {selected.notes && (
                      <div>
                        <p className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1">Notes</p>
                        <p className="text-xs font-sans text-warm-grey-600">{selected.notes}</p>
                      </div>
                    )}

                    {/* Status update */}
                    <div className="mt-6 pt-5 border-t border-warm-grey-100 space-y-3">
                      <div>
                        <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">
                          Update Status
                        </label>
                        <select className="w-full border border-warm-grey-200 px-3 py-2 text-sm font-sans focus:outline-none focus:border-champagne bg-white">
                          {["new", "contacted", "visit_scheduled", "interested", "negotiation", "closed", "lost"].map((s) => (
                            <option key={s} value={s} selected={s === selected.status}>{s.replace("_", " ")}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">
                          Add Note
                        </label>
                        <textarea rows={2} className="w-full border border-warm-grey-200 px-3 py-2 text-sm font-sans focus:outline-none focus:border-champagne resize-none" />
                      </div>
                      <button className="w-full bg-champagne text-obsidian text-xs font-sans tracking-widest uppercase py-2.5 hover:bg-champagne-dark transition-colors">
                        Update Lead
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-sm font-sans text-warm-grey-400">
                      Select a lead to view details
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
