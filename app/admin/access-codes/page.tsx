"use client";
import { useState } from "react";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { ACCESS_CODES, AGENTS, LEADS } from "@/lib/data";
import { Plus, Copy, CheckCircle, XCircle, Users } from "lucide-react";

export default function AccessCodesPage() {
  const [showForm, setShowForm] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-warm-grey-100">
        <AdminSidebar />
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-serif text-3xl font-light text-warm-grey-900">Access Codes</h1>
                <p className="text-sm font-sans text-warm-grey-500 mt-1">
                  {ACCESS_CODES.filter((a) => a.active).length} active codes
                </p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 bg-champagne text-obsidian text-xs font-sans tracking-widest uppercase px-5 py-2.5 hover:bg-champagne-dark transition-colors"
              >
                <Plus size={14} />
                Create Code
              </button>
            </div>

            {/* Create form */}
            {showForm && (
              <div className="bg-white border border-warm-grey-200 p-6 mb-6">
                <h2 className="font-serif text-xl font-light text-warm-grey-900 mb-5">Create Access Code</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">Code *</label>
                    <input type="text" placeholder="e.g. WORLI2026" className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white uppercase tracking-widest" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">Label / Campaign</label>
                    <input type="text" placeholder="e.g. Worli Buyers Campaign" className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">Assigned Agent</label>
                    <select className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white">
                      <option value="">— Unassigned —</option>
                      {AGENTS.filter((a) => a.active).map((a) => (
                        <option key={a.id} value={a.id}>{a.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">Expiry Date</label>
                    <input type="date" className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">Usage Limit</label>
                    <input type="number" placeholder="Leave blank for unlimited" className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">Notes</label>
                    <input type="text" placeholder="Internal notes..." className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="bg-champagne text-obsidian text-xs font-sans tracking-widest uppercase px-5 py-2.5 hover:bg-champagne-dark transition-colors">
                    Create Code
                  </button>
                  <button onClick={() => setShowForm(false)}
                    className="border border-warm-grey-200 text-warm-grey-500 text-xs font-sans tracking-widest uppercase px-5 py-2.5 hover:border-warm-grey-400 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Codes List */}
            <div className="space-y-4">
              {ACCESS_CODES.map((ac) => {
                const agent = AGENTS.find((a) => a.id === ac.assignedAgentId);
                const usages = LEADS.filter((l) => l.accessCodeUsed === ac.code);
                const usagePct = ac.usageLimit ? Math.min(100, (ac.usageCount / ac.usageLimit) * 100) : null;

                return (
                  <div key={ac.id} className={`bg-white border ${ac.active ? "border-warm-grey-200" : "border-warm-grey-100 opacity-60"} p-6`}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {/* Code badge */}
                        <div className="bg-obsidian text-champagne font-sans tracking-[0.2em] uppercase text-sm px-4 py-2 font-medium">
                          {ac.code}
                        </div>
                        <button
                          onClick={() => copyCode(ac.code)}
                          className="text-warm-grey-400 hover:text-champagne transition-colors"
                          title="Copy code"
                        >
                          {copied === ac.code ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />}
                        </button>
                        <div>
                          <p className="font-sans text-warm-grey-900 font-medium">{ac.label}</p>
                          {agent && (
                            <p className="text-[10px] font-sans text-warm-grey-400 mt-0.5">
                              Assigned to {agent.name}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-5">
                        {/* Usage */}
                        <div className="text-center">
                          <p className="font-serif text-2xl text-warm-grey-900">{ac.usageCount}</p>
                          <p className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-400">
                            / {ac.usageLimit ?? "∞"} uses
                          </p>
                        </div>

                        {/* Client leads */}
                        <div className="flex items-center gap-1.5 text-sm">
                          <Users size={14} className="text-champagne" />
                          <span className="font-sans text-warm-grey-700">{usages.length} leads</span>
                        </div>

                        {/* Status toggle */}
                        <div className="flex items-center gap-1.5">
                          {ac.active
                            ? <CheckCircle size={16} className="text-green-500" />
                            : <XCircle size={16} className="text-red-400" />}
                          <button className={`text-[10px] font-sans tracking-widest uppercase px-3 py-1.5 border transition-all ${
                            ac.active
                              ? "border-green-200 text-green-600 hover:bg-red-50 hover:border-red-200 hover:text-red-500"
                              : "border-red-200 text-red-400 hover:bg-green-50 hover:border-green-200 hover:text-green-600"
                          }`}>
                            {ac.active ? "Active" : "Inactive"}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Usage bar */}
                    {usagePct !== null && (
                      <div className="mt-4">
                        <div className="flex justify-between text-[10px] font-sans text-warm-grey-400 mb-1">
                          <span>Usage</span>
                          <span>{usagePct.toFixed(0)}%</span>
                        </div>
                        <div className="h-1 bg-warm-grey-100 w-full">
                          <div
                            className="h-1 bg-champagne transition-all"
                            style={{ width: `${usagePct}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Meta */}
                    <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-warm-grey-50">
                      {ac.expiryDate && (
                        <span className="text-[10px] font-sans text-warm-grey-400">
                          Expires: <span className="text-warm-grey-600">{ac.expiryDate}</span>
                        </span>
                      )}
                      {ac.allowedLocations.length > 0 && (
                        <span className="text-[10px] font-sans text-warm-grey-400">
                          Locations: <span className="text-warm-grey-600">{ac.allowedLocations.join(", ")}</span>
                        </span>
                      )}
                      {ac.notes && (
                        <span className="text-[10px] font-sans text-warm-grey-400">
                          Notes: <span className="text-warm-grey-600">{ac.notes}</span>
                        </span>
                      )}
                    </div>

                    {/* Leads from this code */}
                    {usages.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-warm-grey-50">
                        <p className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-2">
                          Clients using this code
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {usages.map((lead) => (
                            <span key={lead.id} className="text-[10px] font-sans text-warm-grey-600 bg-warm-grey-50 border border-warm-grey-100 px-2 py-1">
                              {lead.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
