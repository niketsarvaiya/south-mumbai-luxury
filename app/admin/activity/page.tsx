"use client";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { ACTIVITIES, AGENTS } from "@/lib/data";
import { Activity, Building2, User, Key, FileText, Eye } from "lucide-react";
import { timeAgo } from "@/lib/utils";

const TYPE_CONFIG: Record<string, { icon: typeof Activity; color: string; label: string }> = {
  client_access: { icon: Key, color: "text-champagne", label: "Client Access" },
  property_view: { icon: Eye, color: "text-blue-400", label: "Property View" },
  property_update: { icon: Building2, color: "text-purple-400", label: "Property Update" },
  lead_created: { icon: FileText, color: "text-green-400", label: "Lead Created" },
  lead_status_change: { icon: FileText, color: "text-orange-400", label: "Lead Update" },
  default: { icon: Activity, color: "text-warm-grey-400", label: "Activity" },
};

export default function ActivityPage() {
  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-warm-grey-100">
        <AdminSidebar />
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="font-serif text-3xl font-light text-warm-grey-900">Activity Log</h1>
              <p className="text-sm font-sans text-warm-grey-500 mt-1">
                {ACTIVITIES.length} tracked events
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Client Accesses", value: ACTIVITIES.filter((a) => a.type === "client_access").length, color: "text-champagne" },
                { label: "Property Views", value: ACTIVITIES.filter((a) => a.type === "property_view").length, color: "text-blue-400" },
                { label: "Leads Created", value: ACTIVITIES.filter((a) => a.type === "lead_created").length, color: "text-green-400" },
                { label: "Property Updates", value: ACTIVITIES.filter((a) => a.type === "property_update").length, color: "text-purple-400" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white border border-warm-grey-200 p-5">
                  <p className={`font-serif text-3xl font-light ${stat.color}`}>{stat.value}</p>
                  <p className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="bg-white border border-warm-grey-200">
              <div className="px-6 py-4 border-b border-warm-grey-100">
                <h2 className="font-serif text-lg font-light text-warm-grey-900">Event Timeline</h2>
              </div>
              <div className="divide-y divide-warm-grey-50">
                {[...ACTIVITIES].reverse().map((act) => {
                  const config = TYPE_CONFIG[act.type] || TYPE_CONFIG.default;
                  const Icon = config.icon;
                  const agent = act.agentId ? AGENTS.find((a) => a.id === act.agentId) : null;

                  return (
                    <div key={act.id} className="px-6 py-5 flex items-start gap-4">
                      <div className={`w-8 h-8 border border-warm-grey-100 flex items-center justify-center shrink-0 mt-0.5`}>
                        <Icon size={14} className={config.color} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className={`text-[9px] font-sans tracking-widest uppercase ${config.color} mr-2`}>
                              {config.label}
                            </span>
                            <p className="text-sm font-sans text-warm-grey-800 mt-0.5">
                              {act.description}
                            </p>
                            {act.clientName && (
                              <p className="text-[10px] font-sans text-warm-grey-400 mt-1">
                                Client: {act.clientName}
                              </p>
                            )}
                            {agent && (
                              <p className="text-[10px] font-sans text-warm-grey-400 mt-1">
                                Agent: {agent.name}
                              </p>
                            )}
                          </div>
                          <span className="text-[10px] font-sans text-warm-grey-400 shrink-0 mt-1">
                            {timeAgo(act.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
