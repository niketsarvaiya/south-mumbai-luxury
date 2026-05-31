import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-obsidian text-warm-grey-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <div className="font-serif text-xl font-light text-champagne tracking-[0.15em] uppercase">
                Value Properties
              </div>
              <div className="font-serif text-xs font-light text-warm-grey-400 tracking-[0.3em] uppercase mt-0.5">
                Curated by Sreeja
              </div>
            </div>
            <p className="text-xs font-sans leading-relaxed text-warm-grey-500 mt-4">
              Curated luxury residences across South Mumbai's most prestigious addresses. Private, discreet, and exclusive.
            </p>
          </div>

          {/* Properties */}
          <div>
            <h4 className="text-xs font-sans tracking-widest uppercase text-champagne mb-4">Properties</h4>
            <ul className="space-y-2">
              {["Worli", "Tardeo", "Malabar Hill", "Prabhadevi", "Cuffe Parade"].map((loc) => (
                <li key={loc}>
                  <Link
                    href={`/properties?location=${loc}`}
                    className="text-xs text-warm-grey-400 hover:text-champagne transition-colors"
                  >
                    {loc}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-xs font-sans tracking-widest uppercase text-champagne mb-4">Navigate</h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/properties", label: "All Properties" },
                { href: "/locations", label: "Locations" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-warm-grey-400 hover:text-champagne transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-sans tracking-widest uppercase text-champagne mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-xs text-warm-grey-400">
                <Phone size={12} className="mt-0.5 shrink-0 text-champagne" />
                <span>+91 99873 10760</span>
              </li>
              <li className="flex items-start gap-2 text-xs text-warm-grey-400">
                <Mail size={12} className="mt-0.5 shrink-0 text-champagne" />
                <span>advisory@southmumbailuxury.in</span>
              </li>
              <li className="flex items-start gap-2 text-xs text-warm-grey-400">
                <MapPin size={12} className="mt-0.5 shrink-0 text-champagne" />
                <span>South Mumbai, Maharashtra</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-warm-grey-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-warm-grey-600 font-sans">
            © 2026 Value Properties — Curated by Sreeja. Private & Confidential.
          </p>
          <p className="text-xs text-warm-grey-700 font-sans">
            This portal is invitation-only. Unauthorised access is prohibited.
          </p>
        </div>
      </div>
    </footer>
  );
}
