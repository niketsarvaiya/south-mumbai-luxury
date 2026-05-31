"use client";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { PROPERTIES, LEADS, AGENTS, ACCESS_CODES, ACTIVITIES } from "@/lib/data";
import { timeAgo } from "@/lib/utils";
import {
  Building2, FileText, Users, Key, TrendingUp,
  Flame, Eye, ArrowRight, Activity,
} from "lucide-react";

export default function DashboardPage() {
  const activeProperties = PROPERTIES.filter((p) => p.status === "active");
  const hotProperties = PROPERTIES.filter((p) => p.hotProperty);
  const newLeads = LEADS.filter((l) => l.status === "new");
  const hotLeads = LEADS.filter((l) => l.leadTemperature === "hot");

  const stats = [
    { label: "Total Properties", value: PROPERTIES.length, icon: Building2, href: "/admin/properties", color: "text-champagne" },
    { label: "Active Listings", value: activeProperties.length, icon: Eye, href: "/admin/properties", color: "text-green-400" },
    { label: "Hot Properties", value: hotProperties.length, icon: Flame, href: "/admin/properties", color: "text-orange-400" },
    { label: "Total Leads", value: LEADS.length, icon: FileText, href: "/admin/leads", color: "text-blue-400" },
    { label: "New Leads", value: newLeads.length, icon: TrendingUp, href: "/admin/leads", color: "text-purple-400" },
    { label: "Hot Leads", value: hotLeads.length, icon: Flame, href: "/admin/leads", color: "text-red-400" },
    { label: "Active Agents", value: AGENTS.filter((a) => a.active).length, icon: Users, href: "/admin/agents", color: "text-teal-400" },
    { label: "Access Codes", value: ACCESS_CODES.filter((a) => a.active).length, icon: Key, href: "/admin/access-codes", color: "text-yellow-400" },
  ];

  const agentLeadCount = AGENTS.filter((a) => a.role === "agent").map((agent) => ({
    agent,
    count: LEADS.filter((l) => l.assignedAgentId === agent.id).length,
  }));

  return (
    <AdminAuthGuard>
      <div className="flex min-h-screen bg-warm-grey-100">
        <AdminSidebar />
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="font-serif text-3xl font-light text-warm-grey-900">Dashboard</h1>
              <p className="text-sm font-sans text-warm-grey-500 mt-1">
                Value Properties — Curated by Sreeja · Overview
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => (
                <Link key={stat.label} href={stat.href}
                  className="bg-white border border-warm-grey-200 p-5 hover:border-champagne/40 hover:shadow-sm transition-all group">
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon size={18} className={stat.color} />
                    <ArrowRight size={14} className="text-warm-grey-300 group-hover:text-champagne transition-colors" />
                  </div>
                  <p className="font-serif text-3xl font-light text-warm-grey-900">{stat.value}</p>
                  <p className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mt-1">{stat.label}</p>
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Recent Leads */}
              <div className="bg-white border border-warm-grey-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-warm-grey-100">
                  <h2 className="font-serif text-lg font-light text-warm-grey-900">Recent Leads</h2>
                  <Link href="/admin/leads" className="text-[10px] font-sans tracking-widest uppercase text-champagne hover:text-champagne-dark">
                    View All
                  </Link>
                </div>
                <div className="divide-y divide-warm-grey-50">
                  {LEADS.slice(0, 5).map((lead) => (
                    <div key={lead.id} className="px-6 py-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-sans text-warm-grey-800">{lead.name}</p>
                        <p className="text-[10px] font-sans text-warm-grey-400">{lead.preferredLocation} · {lead.budget}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-sans tracking-wider uppercase px-2 py-0.5 ${
                          lead.leadTemperature === "hot" ? "bg-red-50 text-red-500"
                          : lead.leadTemperature === "warm" ? "bg-orange-50 text-orange-500"
                          : "bg-blue-50 text-blue-500"
                        }`}>
                          {lead.leadTemperature}
                        </span>
                        <span className={`text-[10px] font-sans tracking-wider uppercase px-2 py-0.5 ${
                          lead.status === "new" ? "bg-purple-50 text-purple-600"
                          : lead.status === "negotiation" ? "bg-green-50 text-green-600"
                          : "bg-warm-grey-100 text-warm-grey-500"
                        }`}>
                          {lead.status.replace("_", " ")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hot Properties */}
              <div className="bg-white border border-warm-grey-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-warm-grey-100">
                  <h2 className="font-serif text-lg font-light text-warm-grey-900">Hot Properties</h2>
                  <Link href="/admin/properties" className="text-[10px] font-sans tracking-widest uppercase text-champagne hover:text-champagne-dark">
                    View All
                  </Link>
                </div>
                <div className="divide-y divide-warm-grey-50">
                  {hotProperties.map((p) => (
                    <div key={p.id} className="px-6 py-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-sans text-warm-grey-800">{p.buildingName}</p>
                        <p className="text-[10px] font-sans text-warm-grey-400">{p.location} · {p.priceDisplay}</p>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] font-sans tracking-wider uppercase text-orange-500 bg-orange-50 px-2 py-0.5">
                        <Flame size={9} /> Hot
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Agent Performance */}
              <div className="bg-white border border-warm-grey-200">
                <div className="px-6 py-4 border-b border-warm-grey-100">
                  <h2 className="font-serif text-lg font-light text-warm-grey-900">Agent Lead Count</h2>
                </div>
                <div className="divide-y divide-warm-grey-50">
                  {agentLeadCount.map(({ agent, count }) => (
                    <div key={agent.id} className="px-6 py-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-sans text-warm-grey-800">{agent.name}</p>
                        <p className="text-[10px] font-sans text-warm-grey-400">{agent.assignedLocations.join(", ")}</p>
                      </div>
                      <span className="font-serif text-2xl text-champagne">{count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Feed */}
              <div className="bg-white border border-warm-grey-200">
                <div className="flex items-center justify-between px-6 py-4 border-b border-warm-grey-100">
                  <h2 className="font-serif text-lg font-light text-warm-grey-900">Recent Activity</h2>
                  <Link href="/admin/activity" className="text-[10px] font-sans tracking-widest uppercase text-champagne hover:text-champagne-dark">
                    View All
                  </Link>
                </div>
                <div className="divide-y divide-warm-grey-50">
                  {ACTIVITIES.slice(0, 6).map((act) => (
                    <div key={act.id} className="px-6 py-3 flex items-start gap-3">
                      <Activity size={12} className="text-champagne mt-1 shrink-0" />
                      <div>
                        <p className="text-xs font-sans text-warm-grey-700">{act.description}</p>
                        <p className="text-[10px] font-sans text-warm-grey-400 mt-0.5">{timeAgo(act.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminAuthGuard>
  );
}
