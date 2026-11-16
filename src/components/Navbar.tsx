"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Menu, X, ArrowUpRight, Leaf } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Tentang Kami", href: "/#about" },
    { label: "Ekosistem Konservasi", href: "/ekosistem-konservasi" },
    { label: "Produk Pangan", href: "/produk/daging-sapi-pasture-fed" },
    { label: "Mengapa MAN3", href: "/why-choose-man3" },
    { label: "Kemitraan B2B", href: "/kemitraan-b2b" },
    { label: "Portal Mitra", href: "/portal-mitra" },
    { label: "Berita", href: "/#news" },
    { label: "Kontak", href: "/#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-b border-surface-container-high transition-all">
      <div className="bg-surface-container-high text-on-surface-variant text-[11px] sm:text-xs py-1.5 px-4 text-center font-mono border-b border-surface-container">
        Website ini merupakan purwarupa digital MAN3 yang menampilkan konsep ekosistem bio-agri dan konservasi.
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group text-left">
          <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-primary-fixed shadow-sm group-hover:scale-105 transition-transform">
            <Leaf className="w-5 h-5 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold text-primary leading-tight tracking-tight">
              {siteConfig.name}
            </span>
            <span className="font-mono text-[10px] tracking-wider text-on-surface-variant uppercase font-medium">
              {siteConfig.tagline}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6" aria-label="Navigasi Utama">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[14px] font-medium text-on-surface-variant hover:text-primary transition-colors py-1 relative hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Header Action CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-primary font-mono text-xs uppercase font-semibold transition-colors"
          >
            Masuk
          </Link>
          <Link
            href="/kemitraan-b2b"
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-container text-white font-mono text-xs uppercase font-semibold transition-all hover:shadow-md"
          >
            Kemitraan B2B
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-lg text-primary hover:bg-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-surface-container-lowest border-b border-outline-variant/30 px-6 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-3 pb-6 border-b border-surface-container">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-on-surface hover:text-primary py-2 px-3 rounded-lg hover:bg-surface-container transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="pt-6 flex flex-col gap-3">
            <Link
              href="/corporate-profile"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono text-on-surface-variant hover:text-primary flex items-center justify-between px-3 py-1.5"
            >
              <span>Profil Perusahaan (ID / EN)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/bio-conservation"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs font-mono text-on-surface-variant hover:text-primary flex items-center justify-between px-3 py-1.5"
            >
              <span>Panduan Konsep</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-lg bg-surface-container-high text-primary font-mono text-xs uppercase font-bold"
            >
              Masuk / Daftar
            </Link>
            <Link
              href="/portal-mitra"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-lg bg-surface-container-high text-primary font-mono text-xs uppercase font-bold"
            >
              Masuk Portal Mitra B2B
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 rounded-lg bg-primary text-white font-mono text-xs uppercase font-bold"
            >
              Lihat Kemitraan B2B
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
