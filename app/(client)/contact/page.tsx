"use client";
import { useState, FormEvent } from "react";
import { Phone, Mail, MapPin, CheckCircle } from "lucide-react";
import GoldButton from "@/components/ui/GoldButton";
import { LOCATIONS } from "@/lib/data";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    location: "", budget: "", message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
  };

  return (
    <div className="bg-ivory min-h-screen">
      {/* Header */}
      <div className="bg-navy pt-28 pb-14 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-champagne block mb-3">Get in Touch</span>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-white">
            Speak to an Advisor
          </h1>
          <p className="font-sans text-warm-grey-400 text-sm mt-2 max-w-xl">
            Our South Mumbai luxury property advisors are available for private consultations, site visits, and curated property shortlists.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="font-serif text-3xl font-light text-obsidian mb-8">Send Us a Message</h2>
            {sent ? (
              <div className="text-center py-16">
                <CheckCircle size={48} className="text-champagne mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-obsidian mb-2">Message Received</h3>
                <p className="text-sm font-sans text-warm-grey-500">
                  Your dedicated advisor will contact you within 4 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">Full Name *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-warm-grey-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-champagne bg-white" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">Phone *</label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-warm-grey-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-champagne bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">Email *</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-warm-grey-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-champagne bg-white" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">Preferred Location</label>
                    <select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="w-full border border-warm-grey-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-champagne bg-white">
                      <option value="">Any Location</option>
                      {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">Budget</label>
                    <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full border border-warm-grey-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-champagne bg-white">
                      <option value="">Select</option>
                      <option>Under ₹10 Cr</option>
                      <option>₹10–20 Cr</option>
                      <option>₹20–40 Cr</option>
                      <option>₹40 Cr+</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-1.5">Message</label>
                  <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your ideal property and timeline..."
                    className="w-full border border-warm-grey-200 px-4 py-3 text-sm font-sans focus:outline-none focus:border-champagne bg-white resize-none" />
                </div>
                <GoldButton type="submit" size="lg" className="w-full">Request a Callback</GoldButton>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-3xl font-light text-obsidian mb-6">Contact Information</h2>
              <ul className="space-y-5">
                {[
                  { icon: Phone, label: "Phone", value: "+91 98200 11234", href: "tel:+919820011234" },
                  { icon: Mail, label: "Email", value: "advisory@southmumbailuxury.in", href: "mailto:advisory@southmumbailuxury.in" },
                  { icon: MapPin, label: "Coverage", value: "Worli, Tardeo, Malabar Hill, Prabhadevi, Colaba, Cuffe Parade, Lower Parel", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-champagne/30 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-champagne" />
                    </div>
                    <div>
                      <p className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-400 mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-sm font-sans text-obsidian hover:text-champagne transition-colors">{value}</a>
                      ) : (
                        <p className="text-sm font-sans text-obsidian">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-navy p-8">
              <h3 className="font-serif text-xl font-light text-white mb-3">Our Advisory Hours</h3>
              <div className="space-y-2 text-sm font-sans">
                <div className="flex justify-between text-warm-grey-300">
                  <span>Monday – Saturday</span>
                  <span className="text-champagne">9:00 AM – 7:00 PM</span>
                </div>
                <div className="flex justify-between text-warm-grey-300">
                  <span>Sunday</span>
                  <span className="text-champagne">By Appointment</span>
                </div>
                <div className="flex justify-between text-warm-grey-300">
                  <span>Site Visits</span>
                  <span className="text-champagne">Any Day, By Appt.</span>
                </div>
              </div>
            </div>

            <div className="border border-champagne/30 p-6">
              <p className="text-xs font-sans tracking-widest uppercase text-champagne mb-2">
                Discretion Assured
              </p>
              <p className="text-sm font-sans text-warm-grey-600 leading-relaxed">
                All client interactions are handled with complete confidentiality. We do not share your details with third parties without your explicit consent.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
