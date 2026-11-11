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
            <span className="text-primary font-bold">Corporate Profile</span>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-surface-container-highest px-3 py-1 rounded-full text-xs font-mono">
            <span className="text-on-surface-variant">Bahasa:</span>
            <button
              type="button"
              onClick={() => setLang("id")}
              className={`px-2 py-0.5 rounded font-bold transition-colors ${
                lang === "id" ? "bg-primary text-white" : "text-primary hover:bg-surface-container"
              }`}
            >
              ID
            </button>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`px-2 py-0.5 rounded font-bold transition-colors ${
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
              {lang === "id" ? "Kelembagaan & Tata Kelola Korporat" : "Institutional & Corporate Governance"}
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-primary tracking-tight leading-tight">
              {lang === "id"
                ? "Pelopor Agro-Ekologi Terintegrasi & Konservasi Hayati Indonesia"
                : "Pioneering Integrated Agro-Ecology & Biodiversity Conservation"}
            </h1>

            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              {lang === "id"
                ? "MAN3 didirikan dengan mandat tunggal: membuktikan bahwa restorasi lanskap alam dan suplai pangan komersial bernilai tinggi dapat berjalan harmonis tanpa mengeksploitasi kesuburan bumi."
                : "MAN3 was founded with a single mandate: to prove that ecological restoration and high-value commercial food supply can thrive in synergy without depleting the living soil."}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-surface-container">
              <div>
                <span className="text-xs font-mono text-on-surface-variant">
                  {lang === "id" ? "Didirikan" : "Established"}
                </span>
                <p className="font-serif text-xl font-bold text-primary">2021</p>
                <span className="text-[11px] text-on-surface-variant">Gunung Gede-Pangrango</span>
              </div>
              <div>
                <span className="text-xs font-mono text-on-surface-variant">
                  {lang === "id" ? "Legalitas" : "Accreditation"}
                </span>
                <p className="font-serif text-xl font-bold text-primary">PT &amp; Yayasan</p>
                <span className="text-[11px] text-on-surface-variant">HACCP &amp; SNI Organik</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-xs font-mono text-on-surface-variant">
                  {lang === "id" ? "Fokus Inti" : "Core Focus"}
                </span>
                <p className="font-serif text-xl font-bold text-secondary">Soil to Plate</p>
                <span className="text-[11px] text-on-surface-variant">100% Traceable</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-surface-container border border-surface-container-high">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80"
                alt="MAN3 Corporate Headquarters Terroir Reserve"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono">
                <span className="text-primary-fixed uppercase font-bold">MAN3 Terroir Research Facility</span>
                <p className="text-[11px] text-inverse-on-surface mt-0.5">
                  Cisarua Highland Agro-Hub, West Java, Indonesia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Empirical Verification Banner */}
      <section className="w-full py-16 bg-primary text-white">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-mono text-xs uppercase tracking-wider text-primary-fixed block mb-1">
              {lang === "id" ? "Verifikasi Empiris Lapangan" : "Empirical Verification"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium">
              {lang === "id" ? "Divalidasi Sains & Standar Mutu Mandiri" : "Measured by Nature and Precision Science"}
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-primary-container/40 border border-primary-container">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-tertiary-fixed block">1.200+</span>
              <span className="text-xs font-mono uppercase tracking-wider text-primary-fixed block mt-2 font-bold">
                {lang === "id" ? "Hektar Terlindungi" : "Hectares Protected"}
              </span>
              <p className="text-xs text-primary-fixed-dim/80 mt-1">
                {lang === "id" ? "Zonasi konservasi permanen" : "Under active conservation easement"}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-primary-container/40 border border-primary-container">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-tertiary-fixed block">0.0%</span>
              <span className="text-xs font-mono uppercase tracking-wider text-primary-fixed block mt-2 font-bold">
                {lang === "id" ? "Residu Kimia Sintetis" : "Chemical Residue"}
              </span>
              <p className="text-xs text-primary-fixed-dim/80 mt-1">
                {lang === "id" ? "Diuji laboratorium independen" : "Independent laboratory tested"}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-primary-container/40 border border-primary-container">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-tertiary-fixed block">45+</span>
              <span className="text-xs font-mono uppercase tracking-wider text-primary-fixed block mt-2 font-bold">
                {lang === "id" ? "Mitra Kuliner HoReCa" : "Hospitality Partners"}
              </span>
              <p className="text-xs text-primary-fixed-dim/80 mt-1">
                {lang === "id" ? "Pasokan terjadwal tiap minggu" : "Supplying leading kitchens weekly"}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-primary-container/40 border border-primary-container">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-tertiary-fixed block">ISO 22000</span>
              <span className="text-xs font-mono uppercase tracking-wider text-primary-fixed block mt-2 font-bold">
                {lang === "id" ? "Sistem Manajemen Pangan" : "Food Safety Management"}
              </span>
              <p className="text-xs text-primary-fixed-dim/80 mt-1">
                {lang === "id" ? "Fasilitas higienitas Grade A" : "Full certified processing facility"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Value Protocol */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <ShieldCheck className="w-5 h-5 text-tertiary-container" />
            </div>
            <h3 className="font-serif text-xl font-bold text-primary">
              {lang === "id" ? "Sertifikasi Nasional & Global" : "National & Global Accreditation"}
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Memenuhi standar SNI Organik Indonesia, Halal BPJPH, HACCP keamanan pangan internasional, dan protokol Good Agricultural Practices (GAP).
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <BarChart3 className="w-5 h-5 text-tertiary-container" />
            </div>
            <h3 className="font-serif text-xl font-bold text-primary">
              {lang === "id" ? "Transparansi Rantai Pasok" : "End-to-End Traceability"}
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Setiap batch produk pangan membawa ID lot tunggal yang dapat diverifikasi oleh konsumen maupun chef guna memastikan keaslian asal terroir.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <Award className="w-5 h-5 text-tertiary-container" />
            </div>
            <h3 className="font-serif text-xl font-bold text-primary">
              {lang === "id" ? "Dampak Sosial Komunitas" : "Community Social Impact"}
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Memberdayakan lebih dari 120 kepala keluarga petani dan peternak lokal di Cisarua melalui pelatihan teknik bio-agro dan bagi hasil yang adil.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
