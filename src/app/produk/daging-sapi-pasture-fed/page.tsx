"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  HeartHandshake,
  ShieldCheck,
  Award,
  Sparkles,
  Phone,
} from "lucide-react";

export default function ProductDetailPage() {
  const [selectedCut, setSelectedCut] = useState("striploin");
  const [orderKg, setOrderKg] = useState(10);

  const cuts = [
    {
      id: "striploin",
      name: "Striploin Pasture-Fed",
      badge: "Sirloin Cut",
      price: 265000,
      desc: "Potongan khas luar dengan lapisan lemak tipis di tepi yang memberi aroma gurih istimewa saat dipanggang.",
    },
    {
      id: "tenderloin",
      name: "Tenderloin Pasture-Fed",
      badge: "Fillet Mignon",
      price: 345000,
      desc: "Potongan paling empuk tanpa lemak berlebih, sangat ideal untuk steak premium dan hidangan khas restoran berkelas.",
    },
    {
      id: "ribeye",
      name: "Ribeye Pasture-Fed",
      badge: "Cube Roll",
      price: 310000,
      desc: "Potongan iga dengan marbling alami di tengah yang menghasilkan kelembutan juicy dan cita rasa daging yang kaya.",
    },
    {
      id: "brisket",
      name: "Brisket Pasture-Fed",
      badge: "Slow Cook Cut",
      price: 185000,
      desc: "Potongan sandung lamur berserat halus, sempurna untuk teknik slow smoking, kaldu kaya nutrisi, maupun hidangan braised.",
    },
  ];

  const currentCut = cuts.find((c) => c.id === selectedCut) || cuts[0];

  return (
    <div className="w-full bg-surface pb-20">
      {/* Breadcrumb Tracker */}
      <div className="w-full bg-surface-container-low border-b border-surface-container py-3">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/#products" className="hover:text-primary transition-colors">
              Katalog Pangan
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-primary font-bold">Daging Sapi Pasture-Fed</span>
          </nav>
          <div className="flex items-center gap-2 bg-surface-container-highest px-3 py-1 rounded-full text-primary font-semibold">
            <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
            <span>100% Pasture-Fed • Potongan Presisi</span>
          </div>
        </div>
      </div>

      {/* Main Product Showcase */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg bg-surface-container border border-surface-container-high">
              <img
                src="https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1200&q=80"
                alt="Produk daging sapi pasture-fed MAN3"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>

              {/* Badges on Visual */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-primary text-xs font-mono font-bold uppercase shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-tertiary-fixed"></span>
                  Pasture-Fed Alami
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-mono font-bold uppercase shadow-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-tertiary-fixed" />
                  Standar Mutu Horeca
                </span>
              </div>

              {/* Provenance Footer */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-primary-fixed">Asal Komoditas</p>
                  <h4 className="font-serif text-lg font-semibold">Dataran Tinggi Jawa Barat</h4>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-mono">
                  <span>Penyimpanan Dingin 0°C – 2°C</span>
                </div>
              </div>
            </div>

            {/* Biological & Culinary Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-surface-container-low p-6 rounded-2xl border border-surface-container">
              <div>
                <span className="text-xs font-mono text-on-surface-variant uppercase">Profil Lemak</span>
                <p className="font-serif text-xl font-bold text-primary mt-0.5">Seimbang</p>
                <span className="text-xs text-on-surface-variant">Kaya Omega-3 Alami</span>
              </div>
              <div>
                <span className="text-xs font-mono text-on-surface-variant uppercase">Pematangan</span>
                <p className="font-serif text-xl font-bold text-primary mt-0.5">Chilled Aging</p>
                <span className="text-xs text-on-surface-variant">Suhu &amp; Kelembapan Terjaga</span>
              </div>
              <div>
                <span className="text-xs font-mono text-on-surface-variant uppercase">Potongan</span>
                <p className="font-serif text-xl font-bold text-secondary mt-0.5">Presisi</p>
                <span className="text-xs text-on-surface-variant">Spesifikasi Chef</span>
              </div>
              <div>
                <span className="text-xs font-mono text-on-surface-variant uppercase">Kemasan</span>
                <p className="font-serif text-xl font-bold text-primary mt-0.5">Vacuum Pack</p>
                <span className="text-xs text-on-surface-variant">Higienis &amp; Terlindung</span>
              </div>
            </div>
          </div>

          {/* Right Spec & Purchasing Panel (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-outline-variant/50 shadow-md space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-secondary font-bold uppercase tracking-wider">Katalog Produk Pilihan</span>
                <span className="text-primary font-semibold">
                  Alokasi Panen Terjadwal
                </span>
              </div>
              <h1 className="font-serif text-3xl font-bold text-primary leading-tight">
                Daging Sapi Pasture-Fed
              </h1>
              <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                Dipelihara di padang rumput alami dataran tinggi tanpa suntikan hormon sintetis. Menghasilkan serat daging padat bernutrisi tinggi dengan kelembutan autentik.
              </p>
            </div>

            {/* Cut Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-mono uppercase font-bold text-on-surface">
                Pilih Varian Potongan:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {cuts.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCut(c.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      selectedCut === c.id
                        ? "border-primary bg-primary text-white shadow-sm"
                        : "border-outline-variant/60 bg-surface-container-low hover:border-primary/40 text-on-surface"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className={selectedCut === c.id ? "text-primary-fixed" : "text-secondary font-bold"}>
                        {c.badge}
                      </span>
                    </div>
                    <p className="font-semibold text-sm leading-tight">{c.name}</p>
                    <p className={`font-mono text-xs mt-1 ${selectedCut === c.id ? "text-primary-fixed" : "text-primary font-bold"}`}>
                      Rp {c.price.toLocaleString("id-ID")} / kg
                    </p>
                  </button>
                ))}
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed pt-1">
                {currentCut.desc}
              </p>
            </div>

            {/* Selected Cut Summary & Calculator */}
            <div className="p-5 rounded-2xl bg-surface-container-low border border-surface-container space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant">
                <span>Estimasi Kebutuhan Batch (kg):</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderKg(Math.max(5, orderKg - 5))}
                    className="w-8 h-8 rounded-lg bg-white border border-outline-variant flex items-center justify-center font-bold text-primary hover:bg-surface-container transition-colors"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm text-primary w-12 text-center">{orderKg} kg</span>
                  <button
                    type="button"
                    onClick={() => setOrderKg(orderKg + 5)}
                    className="w-8 h-8 rounded-lg bg-white border border-outline-variant flex items-center justify-center font-bold text-primary hover:bg-surface-container transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-surface-container flex items-center justify-between">
                <span className="text-xs text-on-surface-variant font-mono">Estimasi Nilai Pasokan:</span>
                <span className="font-serif text-2xl font-bold text-primary">
                  Rp {(currentCut.price * orderKg).toLocaleString("id-ID")}
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                Dukungan pengiriman rantai dingin terjadwal untuk wilayah Jabodetabek dan sekitarnya.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <Link
                href="/kemitraan-b2b#onboarding-form"
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <HeartHandshake className="w-4 h-4" />
                Ajukan Kemitraan Pasokan B2B
              </Link>
              <Link
                href="/#contact"
                className="w-full py-3 rounded-xl bg-surface-container-high hover:bg-surface-variant text-primary font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                Konsultasikan Spesifikasi Menu
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
