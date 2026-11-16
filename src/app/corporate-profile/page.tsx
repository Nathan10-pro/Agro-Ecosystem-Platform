"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  ChevronRight,
  BarChart3,
  HeartHandshake,
} from "lucide-react";

export default function CorporateProfilePage() {
  const [lang, setLang] = useState<"id" | "en">("id");

  return (
    <div className="w-full bg-white text-[#141A17] pb-24">
      {/* Breadcrumb Header */}
      <div className="w-full bg-[#FBFBF9] border-b border-[#E5E5DE] py-3">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[#6B726C]">
            <Link href="/" className="hover:text-[#0F3D2E] transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0F3D2E] font-bold">
              {lang === "id" ? "Profil Perusahaan" : "Corporate Profile"}
            </span>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-[#F5F5F1] px-2.5 py-1 rounded-[4px] text-xs font-mono border border-[#E5E5DE]">
            <span className="text-[#6B726C]">Bahasa:</span>
            <button
              type="button"
              onClick={() => setLang("id")}
              className={`px-2 py-0.5 rounded-[2px] font-bold transition-colors ${
                lang === "id" ? "bg-[#0F3D2E] text-white" : "text-[#141A17] hover:bg-white"
              }`}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2 py-0.5 rounded-[2px] font-bold transition-colors ${
                lang === "en" ? "bg-[#0F3D2E] text-white" : "text-[#141A17] hover:bg-white"
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
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A4B2A] font-semibold block">
              {lang === "id" ? "Profil Perusahaan" : "Corporate Overview"}
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#0F3D2E] tracking-tight leading-tight">
              {lang === "id"
                ? "MAN3 — Ekosistem Pertanian, Peternakan, dan Konservasi"
                : "MAN3 — Agriculture, Livestock & Conservation Ecosystem"}
            </h1>

            <p className="text-base sm:text-lg text-[#4E5752] leading-relaxed">
              {lang === "id"
                ? "MAN3 mendedikasikan diri untuk merevolusi tata kelola produksi pangan dengan mengintegrasikan pertanian regeneratif, peternakan etis alami, dan konservasi sabuk hijau. Kami percaya mutu pangan tertinggi lahir dari alam yang diperlakukan dengan penuh integritas dan harmoni ilmiah."
                : "MAN3 is dedicated to transforming food production systems by integrating regenerative farming, ethical natural livestock, and green belt conservation. We believe peak food quality stems from nature nurtured with scientific harmony and uncompromising integrity."}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-[#E5E5DE]">
              <div>
                <span className="text-[11px] font-mono text-[#6B726C] block uppercase">
                  {lang === "id" ? "Fokus Usaha" : "Core Focus"}
                </span>
                <p className="font-serif text-xl font-bold text-[#0F3D2E] mt-1">
                  {lang === "id" ? "Bio-Agri Premium" : "Premium Bio-Agri"}
                </p>
                <span className="text-[11px] text-[#4E5752]">
                  {lang === "id" ? "Pangan bernutrisi utuh" : "Whole nutritious food"}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#6B726C] block uppercase">
                  {lang === "id" ? "Pendekatan" : "Methodology"}
                </span>
                <p className="font-serif text-xl font-bold text-[#0F3D2E] mt-1">
                  {lang === "id" ? "Agro-Ekologi" : "Agro-Ecology"}
                </p>
                <span className="text-[11px] text-[#4E5752]">
                  {lang === "id" ? "Siklus tertutup alami" : "Closed natural cycle"}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[11px] font-mono text-[#6B726C] block uppercase">
                  {lang === "id" ? "Standar Operasi" : "Operating Standard"}
                </span>
                <p className="font-serif text-xl font-bold text-[#7A4B2A] mt-1">
                  {lang === "id" ? "Rantai Dingin" : "Cold Chain"}
                </p>
                <span className="text-[11px] text-[#4E5752]">
                  {lang === "id" ? "Segar hingga ke dapur" : "Fresh farm to table"}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-[4px] overflow-hidden border border-[#E5E5DE] shadow-sm bg-[#EFEFEA]">
              <Image
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"
                alt="Bentang alam lanskap ekosistem MAN3"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D1EADB] font-bold block">
                  {lang === "id" ? "Prinsip Koridor Hijau" : "Green Landscape Principle"}
                </span>
                <p className="text-xs text-white/90 mt-1">
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
      <section className="w-full py-16 bg-[#0F3D2E] text-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-mono text-xs uppercase tracking-wider text-[#A3D4B6] block mb-1">
              {lang === "id" ? "Pilar Strategis" : "Strategic Pillars"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium">
              {lang === "id" ? "Fondasi Mutu & Keberlanjutan" : "Foundations of Quality & Sustainability"}
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-[4px] bg-[#1C5944]/40 border border-[#1C5944]">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#A3D4B6] block">100%</span>
              <span className="text-xs font-mono uppercase tracking-wider text-white block mt-2 font-bold">
                {lang === "id" ? "Bebas Pestisida Sintetis" : "Zero Synthetic Pesticides"}
              </span>
              <p className="text-xs text-white/70 mt-1">
                {lang === "id" ? "Pengendalian hama alami berbasis refugia" : "Biological pest control via refugia flora"}
              </p>
            </div>

            <div className="p-6 rounded-[4px] bg-[#1C5944]/40 border border-[#1C5944]">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#A3D4B6] block">Pasture</span>
              <span className="text-xs font-mono uppercase tracking-wider text-white block mt-2 font-bold">
                {lang === "id" ? "Pakan Rumput Alami" : "100% Pasture-Fed"}
              </span>
              <p className="text-xs text-white/70 mt-1">
                {lang === "id" ? "Tanpa hormon pemicu pertumbuhan" : "No added hormones or routine antibiotics"}
              </p>
            </div>

            <div className="p-6 rounded-[4px] bg-[#1C5944]/40 border border-[#1C5944]">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#A3D4B6] block">Batch</span>
              <span className="text-xs font-mono uppercase tracking-wider text-white block mt-2 font-bold">
                {lang === "id" ? "Ketertelusuran Lot" : "Lot Traceability"}
              </span>
              <p className="text-xs text-white/70 mt-1">
                {lang === "id" ? "Riwayat panen dan penggembalaan transparan" : "Transparent harvest & grazing logging"}
              </p>
            </div>

            <div className="p-6 rounded-[4px] bg-[#1C5944]/40 border border-[#1C5944]">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#A3D4B6] block">Siklus</span>
              <span className="text-xs font-mono uppercase tracking-wider text-white block mt-2 font-bold">
                {lang === "id" ? "Sirkularitas Nutrisi" : "Nutrient Circularity"}
              </span>
              <p className="text-xs text-white/70 mt-1">
                {lang === "id" ? "Kompos organik kembali menyuburkan tanah" : "Organic compost revitalizes farm soils"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Value Protocol */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#FBFBF9] p-6 sm:p-8 rounded-[4px] border border-[#E5E5DE] space-y-3">
            <div className="w-10 h-10 rounded-[2px] bg-[#E8F3ED] flex items-center justify-center text-[#0F3D2E]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F3D2E]">
              {lang === "id" ? "Integritas & Keamanan Pangan" : "Food Safety & Integrity"}
            </h3>
            <p className="text-xs sm:text-sm text-[#4E5752] leading-relaxed">
              {lang === "id"
                ? "Setiap komoditas diproses mengikuti prosedur sanitasi ketat dan pengujian berkala untuk menjamin kemurnian pangan dari residu kimia berbahaya."
                : "Every harvest is handled under rigorous hygiene protocols and regular quality inspections to ensure absolute purity free from harmful synthetic residues."}
            </p>
          </div>

          <div className="bg-[#FBFBF9] p-6 sm:p-8 rounded-[4px] border border-[#E5E5DE] space-y-3">
            <div className="w-10 h-10 rounded-[2px] bg-[#E8F3ED] flex items-center justify-center text-[#0F3D2E]">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F3D2E]">
              {lang === "id" ? "Transparansi Asal Produk" : "Transparent Origin"}
            </h3>
            <p className="text-xs sm:text-sm text-[#4E5752] leading-relaxed">
              {lang === "id"
                ? "Informasi tanggal panen, blok padang gembala, dan metode budidaya dicatat secara sistematis untuk memberikan kejelasan utuh kepada mitra kuliner."
                : "Harvest date, grazing paddock block, and cultivation techniques are logged systematically to provide full clarity for culinary partners and consumers."}
            </p>
          </div>

          <div className="bg-[#FBFBF9] p-6 sm:p-8 rounded-[4px] border border-[#E5E5DE] space-y-3">
            <div className="w-10 h-10 rounded-[2px] bg-[#E8F3ED] flex items-center justify-center text-[#0F3D2E]">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F3D2E]">
              {lang === "id" ? "Kolaborasi Berkelanjutan" : "Sustainable Partnership"}
            </h3>
            <p className="text-xs sm:text-sm text-[#4E5752] leading-relaxed">
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
