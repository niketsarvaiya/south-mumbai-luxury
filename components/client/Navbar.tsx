"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import GoldButton from "@/components/ui/GoldButton";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { clearClientSession } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleExit = () => {
    clearClientSession();
    router.push("/access");
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
    { href: "/locations", label: "Locations" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-obsidian/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-serif text-xl font-light text-champagne tracking-[0.15em] uppercase">
              Value Properties
            </span>
            <span className="font-serif text-xs font-light text-warm-grey-300 tracking-[0.3em] uppercase mt-0.5">
              Curated by Sreeja
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-sans tracking-widest uppercase text-warm-grey-200 hover:text-champagne transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeSwitcher />
            <a
              href="tel:+919987310760"
              className="flex items-center gap-2 text-xs font-sans tracking-widest text-warm-grey-300 hover:text-champagne transition-colors"
            >
              <Phone size={13} />
              <span>+91 99873 10760</span>
            </a>
            <GoldButton size="sm" onClick={handleExit} variant="outline">
              Exit
            </GoldButton>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden text-warm-grey-200 hover:text-champagne transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-obsidian/98 border-t border-warm-grey-800 px-6 py-6">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-sans tracking-widest uppercase text-warm-grey-200 hover:text-champagne transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-warm-grey-800">
              <div className="mb-4">
                <p className="text-[10px] font-sans tracking-widest uppercase text-warm-grey-500 mb-2">Theme</p>
                <ThemeSwitcher />
              </div>
              <a
                href="tel:+919987310760"
                className="flex items-center gap-2 text-sm text-warm-grey-300 mb-4"
              >
                <Phone size={14} />
                +91 99873 10760
              </a>
              <GoldButton size="sm" onClick={handleExit} variant="outline" className="w-full">
                Exit Private Collection
              </GoldButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
