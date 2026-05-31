"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Shield } from "lucide-react";
import { ADMIN_CREDENTIALS, setAdminSession } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));

    const cred = ADMIN_CREDENTIALS.find(
      (c) => c.email === form.email && c.password === form.password
    );

    if (!cred) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    setAdminSession({
      agentId: cred.agentId,
      name: cred.name,
      email: cred.email,
      role: cred.role,
      loggedInAt: new Date().toISOString(),
    });

    router.push("/admin/dashboard");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-warm-grey-900 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-champagne/10 border border-champagne/30 mb-5">
            <Shield size={20} className="text-champagne" />
          </div>
          <h1 className="font-serif text-2xl font-light text-white mb-1">Admin Portal</h1>
          <p className="text-xs font-sans text-warm-grey-500">Value Properties — Curated by Sreeja</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-500 mb-1.5">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="admin@southmumbailuxury.in"
              className="w-full bg-warm-grey-800 border border-warm-grey-700 text-white placeholder-warm-grey-600 px-4 py-3 text-sm font-sans focus:outline-none focus:border-champagne transition-colors"
            />
          </div>
          <div>
            <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-500 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-warm-grey-800 border border-warm-grey-700 text-white placeholder-warm-grey-600 px-4 py-3 pr-12 text-sm font-sans focus:outline-none focus:border-champagne transition-colors"
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-grey-500 hover:text-champagne">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-400 font-sans bg-red-950/30 border border-red-800/30 px-3 py-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-champagne text-obsidian text-xs font-sans tracking-widest uppercase py-3 hover:bg-champagne-dark transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Demo credentials */}
        <div className="mt-8 border border-warm-grey-700 p-4">
          <p className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-600 mb-3">Demo Credentials</p>
          <div className="space-y-2">
            {ADMIN_CREDENTIALS.map((c) => (
              <button
                key={c.email}
                type="button"
                onClick={() => setForm({ email: c.email, password: c.password })}
                className="w-full text-left px-3 py-2 bg-warm-grey-800 hover:bg-warm-grey-700 transition-colors"
              >
                <p className="text-xs font-sans text-white">{c.name} <span className="text-champagne/60">({c.role})</span></p>
                <p className="text-[10px] text-warm-grey-500">{c.email}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
