"use client";
import { useState } from "react";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { AGENTS, LEADS, PROPERTIES } from "@/lib/data";
import { Plus, Phone, Mail, CheckCircle, XCircle } from "lucide-react";

export default function AdminAgentsPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-warm-grey-100">
        <AdminSidebar />
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-serif text-3xl font-light text-warm-grey-900">Agents</h1>
                <p className="text-sm font-sans text-warm-grey-500 mt-1">{AGENTS.length} team members</p>
              </div>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 bg-champagne text-obsidian text-xs font-sans tracking-widest uppercase px-5 py-2.5 hover:bg-champagne-dark transition-colors"
              >
                <Plus size={14} />
                Add Agent
              </button>
            </div>

            {/* Add Agent Form */}
            {showForm && (
              <div className="bg-white border border-warm-grey-200 p-6 mb-6">
                <h2 className="font-serif text-xl font-light text-warm-grey-900 mb-5">Add New Agent</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {[
                    { label: "Full Name", type: "text", placeholder: "Agent name" },
                    { label: "Phone", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                    { label: "Email", type: "email", placeholder: "agent@example.com" },
                    { label: "Password", type: "password", placeholder: "Minimum 8 characters" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder}
                        className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white" />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">Role</label>
                    <select className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white">
                      <option value="agent">Agent</option>
                      <option value="admin">Admin</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">Assigned Locations</label>
                    <input type="text" placeholder="e.g. Worli, Tardeo"
                      className="w-full border border-warm-grey-200 px-3 py-2.5 text-sm font-sans focus:outline-none focus:border-champagne bg-white" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="bg-champagne text-obsidian text-xs font-sans tracking-widest uppercase px-5 py-2.5 hover:bg-champagne-dark transition-colors">
                    Save Agent
                  </button>
                  <button onClick={() => setShowForm(false)}
                    className="border border-warm-grey-200 text-warm-grey-500 text-xs font-sans tracking-widest uppercase px-5 py-2.5 hover:border-warm-grey-400 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {AGENTS.map((agent) => {
                const leadCount = LEADS.filter((l) => l.assignedAgentId === agent.id).length;
                const propCount = agent.assignedProperties.length;

                return (
                  <div key={agent.id} className="bg-white border border-warm-grey-200 p-6 hover:border-champagne/40 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-serif text-xl font-light text-warm-grey-900">{agent.name}</h3>
                        <span className={`text-[10px] font-sans tracking-widest uppercase px-2 py-0.5 ${
                          agent.role === "super_admin" ? "text-champagne bg-champagne/10"
                          : agent.role === "admin" ? "text-blue-600 bg-blue-50"
                          : "text-warm-grey-500 bg-warm-grey-100"
                        }`}>
                          {agent.role.replace("_", " ")}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {agent.active
                          ? <CheckCircle size={16} className="text-green-500" />
                          : <XCircle size={16} className="text-red-400" />}
                        <span className="text-[10px] font-sans text-warm-grey-400">
                          {agent.active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <a href={`tel:${agent.phone}`} className="flex items-center gap-2 text-xs font-sans text-warm-grey-500 hover:text-champagne transition-colors">
                        <Phone size={12} className="text-champagne" /> {agent.phone}
                      </a>
                      <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-xs font-sans text-warm-grey-500 hover:text-champagne transition-colors">
                        <Mail size={12} className="text-champagne" /> {agent.email}
                      </a>
                    </div>

                    {agent.assignedLocations.length > 0 && (
                      <div className="mb-4">
                        <p className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-2">Locations</p>
                        <div className="flex flex-wrap gap-1.5">
                          {agent.assignedLocations.map((loc) => (
                            <span key={loc} className="text-[10px] font-sans text-warm-grey-500 border border-warm-grey-200 px-2 py-0.5">
                              {loc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-6 pt-4 border-t border-warm-grey-100">
                      <div>
                        <p className="font-serif text-2xl text-champagne">{leadCount}</p>
                        <p className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-400">Leads</p>
                      </div>
                      <div>
                        <p className="font-serif text-2xl text-champagne">{propCount}</p>
                        <p className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-400">Properties</p>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button className="text-[10px] font-sans tracking-widest uppercase text-champagne border border-champagne/30 px-3 py-1.5 hover:bg-champagne hover:text-obsidian transition-all">
                        Edit
                      </button>
                      <button className="text-[10px] font-sans tracking-widest uppercase text-red-400 border border-red-200 px-3 py-1.5 hover:bg-red-50 transition-all">
                        {agent.active ? "Disable" : "Enable"}
                      </button>
                    </div>
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
