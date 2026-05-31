"use client";

const CLIENT_SESSION_KEY = "sml_client_session";
const ADMIN_SESSION_KEY = "sml_admin_session";

export interface ClientSession {
  name: string;
  phone: string;
  email: string;
  accessCode: string;
  accessedAt: string;
}

export interface AdminSession {
  agentId: string;
  name: string;
  email: string;
  role: string;
  loggedInAt: string;
}

export function setClientSession(session: ClientSession) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CLIENT_SESSION_KEY, JSON.stringify(session));
}

export function getClientSession(): ClientSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(CLIENT_SESSION_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function clearClientSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CLIENT_SESSION_KEY);
}

export function setAdminSession(session: AdminSession) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
}

export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(ADMIN_SESSION_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

export function clearAdminSession() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

// Mock admin credentials
export const ADMIN_CREDENTIALS = [
  { email: "admin@southmumbailuxury.in", password: "Admin@2026", agentId: "super-1", name: "Admin User", role: "super_admin" },
  { email: "arjun@southmumbailuxury.in", password: "Agent@2026", agentId: "agent-1", name: "Arjun Mehta", role: "admin" },
  { email: "priya@southmumbailuxury.in", password: "Agent@2026", agentId: "agent-2", name: "Priya Kapoor", role: "agent" },
  { email: "rahul@southmumbailuxury.in", password: "Agent@2026", agentId: "agent-3", name: "Rahul Singhania", role: "agent" },
];
