"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Produk", href: "/#alokasi" },
    { label: "Zona", href: "/ekosistem-konservasi" },
    { label: "Kemitraan", href: "/kemitraan-b2b" },
    { label: "Ilmu", href: "/#ilmu" },
    { label: "Portal Mitra", href: "/portal-mitra" },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/" && typeof window !== "undefined" && window.location.hash === href.replace("/", "");
    }
    return pathname === href;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E5DE] transition-colors">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Left: Brand Logo + Short Descriptor */}
        <Link href="/" className="flex items-center gap-3 text-left group">
          <div className="w-8 h-8 rounded-[4px] bg-[#0F3D2E] flex items-center justify-center text-white font-serif font-bold text-lg leading-none">
            M
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-tight text-[#0F3D2E] leading-tight">
              MAN3
            </span>
            <span className="text-[10px] font-mono tracking-wider text-[#6B726C] uppercase font-medium">
              Ekosistem Pertanian, Peternakan &amp; Konservasi
            </span>
          </div>
        </Link>

        {/* Center: Clean B2B Navigation */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Navigasi Utama">
          {navLinks.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[13px] font-medium tracking-wide transition-colors py-1 relative ${
                  active
                    ? "text-[#0F3D2E] font-semibold"
                    : "text-[#4E5752] hover:text-[#0F3D2E]"
                }`}
              >
                {item.label}
                {active && (
                  <span className="absolute bottom-[-18px] left-0 right-0 h-[2px] bg-[#0F3D2E]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Primary CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/login"
            className="text-[12px] font-mono font-medium text-[#4E5752] hover:text-[#0F3D2E] px-2 py-1.5 transition-colors"
          >
            Masuk Portal
          </Link>
          <Link
            href="/kemitraan-b2b"
            className="inline-flex items-center justify-center px-4 py-2 rounded-[4px] bg-[#0F3D2E] hover:bg-[#08261C] text-white text-[12px] font-mono uppercase tracking-wider font-semibold transition-colors"
          >
            Mulai Kemitraan
          </Link>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#0F3D2E] hover:bg-[#F5F5F1] rounded-[4px] focus:outline-none"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Tutup navigasi" : "Buka navigasi"}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E5E5DE] px-4 py-5 shadow-lg space-y-4 animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[14px] font-medium text-[#141A17] hover:text-[#0F3D2E] py-2 px-2 rounded-[4px] hover:bg-[#F5F5F1] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#E5E5DE] flex flex-col gap-2.5">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-[13px] font-mono text-[#4E5752] border border-[#E5E5DE] rounded-[4px]"
            >
              Masuk Portal Mitra
            </Link>
            <Link
              href="/kemitraan-b2b"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-[13px] font-mono uppercase tracking-wider font-semibold text-white bg-[#0F3D2E] rounded-[4px]"
            >
              Mulai Kemitraan
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
