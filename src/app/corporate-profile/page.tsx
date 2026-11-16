"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ChevronRight,
  Globe2,
  Award,
  BarChart3,
  Building,
  CheckCircle2,
  ArrowRight,
  Layers,
  Sparkles,
  Leaf,
  Target,
  HeartHandshake,
} from "lucide-react";

export default function CorporateProfilePage() {
  const [lang, setLang] = useState<"id" | "en">("id");

  return (
    <div className="w-full bg-surface pb-20">
      {/* Breadcrumb Header */}
      <div className="w-full bg-surface-container-low border-b border-surface-container py-3">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-primary font-bold">
              {lang === "id" ? "Profil Perusahaan" : "Corporate Profile"}
            </span>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-surface-container-highest px-3 py-1 rounded-full text-xs font-mono">
            <span className="text-on-surface-variant">Bahasa:</span>
            <button
              type="button"
              onClick={() => setLang("id")}
              className={`px-2.5 py-0.5 rounded font-bold transition-colors ${
                lang === "id" ? "bg-primary text-white" : "text-primary hover:bg-surface-container"
              }`}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2.5 py-0.5 rounded font-bold transition-colors ${
                lang === "en" ? "bg-primary text-white" : "text-primary hover:bg-surface-container"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* Hero Corporate */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wider">
              {lang === "id" ? "Profil Perusahaan" : "Corporate Overview"}
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-primary tracking-tight leading-tight">
              {lang === "id"
                ? "MAN3 — Ekosistem Pertanian, Peternakan, dan Konservasi"
                : "MAN3 — Agriculture, Livestock & Conservation Ecosystem"}
            </h1>

            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              {lang === "id"
                ? "MAN3 mendedikasikan diri untuk merevolusi tata kelola produksi pangan dengan mengintegrasikan pertanian regeneratif, peternakan etis alami, dan konservasi sabuk hijau. Kami percaya mutu pangan tertinggi lahir dari alam yang diperlakukan dengan penuh integritas dan harmoni ilmiah."
                : "MAN3 is dedicated to transforming food production systems by integrating regenerative farming, ethical natural livestock, and green belt conservation. We believe peak food quality stems from nature nurtured with scientific harmony and uncompromising integrity."}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-surface-container">
              <div>
                <span className="text-xs font-mono text-on-surface-variant block">
                  {lang === "id" ? "Fokus Usaha" : "Core Focus"}
                </span>
                <p className="font-serif text-xl font-bold text-primary mt-1">
                  {lang === "id" ? "Bio-Agri Premium" : "Premium Bio-Agri"}
                </p>
                <span className="text-[11px] text-on-surface-variant">
                  {lang === "id" ? "Pangan bernutrisi utuh" : "Whole nutritious food"}
                </span>
              </div>
              <div>
                <span className="text-xs font-mono text-on-surface-variant block">
                  {lang === "id" ? "Pendekatan" : "Methodology"}
                </span>
                <p className="font-serif text-xl font-bold text-primary mt-1">
                  {lang === "id" ? "Agro-Ekologi" : "Agro-Ecology"}
                </p>
                <span className="text-[11px] text-on-surface-variant">
                  {lang === "id" ? "Siklus tertutup alami" : "Closed natural cycle"}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-xs font-mono text-on-surface-variant block">
                  {lang === "id" ? "Standar Operasi" : "Operating Standard"}
                </span>
                <p className="font-serif text-xl font-bold text-secondary mt-1">
                  {lang === "id" ? "Rantai Dingin" : "Cold Chain"}
                </p>
                <span className="text-[11px] text-on-surface-variant">
                  {lang === "id" ? "Segar hingga ke meja" : "Fresh farm to table"}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-surface-container border border-surface-container-high">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"
                alt="Bentang alam lanskap ekosistem MAN3"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent"></div>
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-xs font-mono uppercase tracking-wider text-primary-fixed block font-bold">
                  {lang === "id" ? "Prinsip Landsekap Hijau" : "Green Landscape Principle"}
                </span>
                <p className="text-xs text-inverse-on-surface mt-1 leading-snug">
                  {lang === "id"
                    ? "Mengabadikan koridor hayati dan vegetasi refugia di setiap zona budidaya aktif."
                    : "Preserving ecological corridors and refugia vegetation within every active cultivation zone."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Pillars Banner */}
      <section className="w-full py-16 bg-primary text-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-mono text-xs uppercase tracking-wider text-primary-fixed block mb-1">
              {lang === "id" ? "Pilar Strategis" : "Strategic Pillars"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium">
              {lang === "id" ? "Fondasi Mutu & Keberlanjutan" : "Foundations of Quality & Sustainability"}
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-primary-container/40 border border-primary-container">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-tertiary-fixed block">100%</span>
              <span className="text-xs font-mono uppercase tracking-wider text-primary-fixed block mt-2 font-bold">
                {lang === "id" ? "Bebas Pestisida Sintetis" : "Zero Synthetic Pesticides"}
              </span>
              <p className="text-xs text-primary-fixed-dim/80 mt-1">
                {lang === "id" ? "Pengendalian hama alami berbasis refugia" : "Biological pest control via refugia flora"}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-primary-container/40 border border-primary-container">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-tertiary-fixed block">Pasture</span>
              <span className="text-xs font-mono uppercase tracking-wider text-primary-fixed block mt-2 font-bold">
                {lang === "id" ? "Pakan Rumput Alami" : "100% Pasture-Fed"}
              </span>
              <p className="text-xs text-primary-fixed-dim/80 mt-1">
                {lang === "id" ? "Tanpa hormon pemicu pertumbuhan" : "No added hormones or routine antibiotics"}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-primary-container/40 border border-primary-container">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-tertiary-fixed block">Batch</span>
              <span className="text-xs font-mono uppercase tracking-wider text-primary-fixed block mt-2 font-bold">
                {lang === "id" ? "Ketertelusuran Lot" : "Lot Traceability"}
              </span>
              <p className="text-xs text-primary-fixed-dim/80 mt-1">
                {lang === "id" ? "Riwayat panen dan penggembalaan transparan" : "Transparent harvest & grazing logging"}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-primary-container/40 border border-primary-container">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-tertiary-fixed block">Siklus</span>
              <span className="text-xs font-mono uppercase tracking-wider text-primary-fixed block mt-2 font-bold">
                {lang === "id" ? "Sirkularitas Nutrisi" : "Nutrient Circularity"}
              </span>
              <p className="text-xs text-primary-fixed-dim/80 mt-1">
                {lang === "id" ? "Kompos organik kembali menyuburkan tanah" : "Organic compost revitalizes farm soils"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Value Protocol */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-bold text-primary">
              {lang === "id" ? "Integritas & Keamanan Pangan" : "Food Safety & Integrity"}
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {lang === "id"
                ? "Setiap komoditas diproses mengikuti prosedur sanitasi ketat dan pengujian berkala untuk menjamin kemurnian pangan dari residu kimia berbahaya."
                : "Every harvest is handled under rigorous hygiene protocols and regular quality inspections to ensure absolute purity free from harmful synthetic residues."}
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-bold text-primary">
              {lang === "id" ? "Transparansi Asal Produk" : "Transparent Origin"}
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {lang === "id"
                ? "Informasi tanggal panen, blok padang gembala, dan metode budidaya dicatat secara sistematis untuk memberikan kejelasan utuh kepada konsumen dan mitra kuliner."
                : "Harvest date, grazing paddock block, and cultivation techniques are logged systematically to provide full clarity for culinary partners and consumers."}
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <HeartHandshake className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-xl font-bold text-primary">
              {lang === "id" ? "Kolaborasi Berkelanjutan" : "Sustainable Partnership"}
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {lang === "id"
                ? "Membangun hubungan jangka panjang dengan chef, pelaku industri kuliner, dan komunitas agrikultur lokal dengan dasar keterbukaan dan nilai manfaat bersama."
                : "Fostering long-term relationships with chefs, culinary entrepreneurs, and local agricultural communities based on transparency and shared mutual values."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
