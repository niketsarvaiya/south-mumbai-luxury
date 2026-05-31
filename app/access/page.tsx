"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Shield, Lock } from "lucide-react";
import { validateAccessCode } from "@/lib/data";
import { setClientSession } from "@/lib/auth";
import GoldButton from "@/components/ui/GoldButton";

export default function AccessPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", email: "", code: "" });
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 900));

    const validCode = validateAccessCode(form.code);
    if (!validCode) {
      setError("Invalid access code. Please contact your property advisor.");
      setLoading(false);
      return;
    }

    setClientSession({
      name: form.name,
      phone: form.phone,
      email: form.email,
      accessCode: form.code.toUpperCase(),
      accessedAt: new Date().toISOString(),
    });

    router.push("/");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-navy relative overflow-hidden flex items-center justify-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #C9A96E 0,
              #C9A96E 1px,
              transparent 0,
              transparent 50%
            )`,
            backgroundSize: "30px 30px",
          }}
        />
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-champagne/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-12">
        {/* Logo */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-12 h-12 border border-champagne/40 mb-6">
            <Lock size={18} className="text-champagne" />
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-light text-white tracking-wide mb-3">
            Private South Mumbai
            <br />
            <span className="text-champagne">Luxury Property Collection</span>
          </h1>
          <p className="text-warm-grey-400 font-sans text-sm leading-relaxed max-w-xs mx-auto">
            Access curated residences across Mumbai's most prestigious addresses.
          </p>
        </div>

        {/* Divider */}
        <div className="luxury-divider mb-8">
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-champagne/60">
            Private Access
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 animate-slide-up animate-delay-200">
          <div>
            <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your full name"
              className="w-full bg-navy-light border border-warm-grey-700 text-white placeholder-warm-grey-600 px-4 py-3 text-sm font-sans focus:outline-none focus:border-champagne transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 XXXXX XXXXX"
              className="w-full bg-navy-light border border-warm-grey-700 text-white placeholder-warm-grey-600 px-4 py-3 text-sm font-sans focus:outline-none focus:border-champagne transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="your@email.com"
              className="w-full bg-navy-light border border-warm-grey-700 text-white placeholder-warm-grey-600 px-4 py-3 text-sm font-sans focus:outline-none focus:border-champagne transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">
              Access Code *
            </label>
            <div className="relative">
              <input
                type={showCode ? "text" : "password"}
                required
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                placeholder="Enter your private access code"
                className="w-full bg-navy-light border border-warm-grey-700 text-white placeholder-warm-grey-600 px-4 py-3 pr-12 text-sm font-sans focus:outline-none focus:border-champagne transition-colors uppercase tracking-widest"
              />
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-grey-500 hover:text-champagne transition-colors"
              >
                {showCode ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-950/50 border border-red-800/50 px-4 py-3">
              <Shield size={14} className="text-red-400 shrink-0" />
              <p className="text-xs text-red-300 font-sans">{error}</p>
            </div>
          )}

          <GoldButton
            type="submit"
            size="lg"
            className="w-full mt-2"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border border-obsidian/40 border-t-obsidian rounded-full animate-spin" />
                Verifying...
              </span>
            ) : (
              "Enter Private Collection"
            )}
          </GoldButton>
        </form>

        {/* Hint */}
        <p className="text-center text-[10px] font-sans text-warm-grey-600 mt-6">
          Don't have an access code?{" "}
          <a href="tel:+919820011234" className="text-champagne hover:underline">
            Contact your property advisor
          </a>
        </p>

        {/* Demo codes */}
        <div className="mt-8 border border-warm-grey-800 p-4">
          <p className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-600 mb-2">
            Demo Access Codes
          </p>
          <div className="flex flex-wrap gap-2">
            {["PRIVATE2026", "WORLI50", "VIPCLIENT", "COLABAELITE"].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setForm({ ...form, code })}
                className="text-[10px] font-sans tracking-widest text-champagne/70 hover:text-champagne border border-champagne/20 hover:border-champagne/50 px-2 py-1 transition-colors"
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
