import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(value: number | null, display: string): string {
  if (value === null) return display;
  return display;
}

export function configLabel(config: string): string {
  const map: Record<string, string> = {
    "2bhk": "2 BHK",
    "3bhk": "3 BHK",
    "4bhk": "4 BHK",
    duplex: "Duplex",
    penthouse: "Penthouse",
    villa: "Villa",
  };
  return map[config] || config;
}

export function statusLabel(status: string): string {
  const map: Record<string, string> = {
    ready: "Ready to Move",
    under_construction: "Under Construction",
    resale: "Resale",
  };
  return map[status] || status;
}

export function viewLabel(view: string): string {
  const map: Record<string, string> = {
    sea: "Sea View",
    city: "City View",
    garden: "Garden View",
    pool: "Pool View",
    skyline: "Skyline View",
    mixed: "Mixed View",
    na: "N/A",
  };
  return map[view] || view;
}

export function transactionLabel(type: string): string {
  const map: Record<string, string> = {
    sale: "New Sale",
    lease: "Lease",
    resale: "Resale",
  };
  return map[type] || type;
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}
