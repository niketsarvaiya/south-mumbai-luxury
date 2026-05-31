"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Building2, Users, Key, Activity,
  FileText, LogOut, ChevronRight,
} from "lucide-react";
import { clearAdminSession, getAdminSession } from "@/lib/auth";

const NAV = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/properties", icon: Building2, label: "Properties" },
  { href: "/admin/leads", icon: FileText, label: "Leads" },
  { href: "/admin/agents", icon: Users, label: "Agents" },
  { href: "/admin/access-codes", icon: Key, label: "Access Codes" },
  { href: "/admin/activity", icon: Activity, label: "Activity Log" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const session = getAdminSession();

  const handleLogout = () => {
    clearAdminSession();
    router.push("/admin/login");
  };

  return (
    <aside className="w-56 shrink-0 bg-warm-grey-900 min-h-screen flex flex-col">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-warm-grey-800">
        <div className="font-serif text-sm font-light text-champagne tracking-[0.15em] uppercase">
          South Mumbai
        </div>
        <div className="text-[10px] font-sans text-warm-grey-600 tracking-[0.2em] uppercase mt-0.5">
          Admin Portal
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 text-xs font-sans tracking-wider transition-all group ${
                active
                  ? "bg-champagne/10 text-champagne border-r-2 border-champagne"
                  : "text-warm-grey-400 hover:text-white hover:bg-warm-grey-800"
              }`}
            >
              <Icon size={14} />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight size={12} className="opacity-50" />}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-5 py-4 border-t border-warm-grey-800">
        {session && (
          <div className="mb-3">
            <p className="text-xs font-sans text-white">{session.name}</p>
            <p className="text-[10px] font-sans text-warm-grey-500 capitalize">{session.role.replace("_", " ")}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-[10px] font-sans tracking-widest uppercase text-warm-grey-500 hover:text-red-400 transition-colors"
        >
          <LogOut size={12} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
