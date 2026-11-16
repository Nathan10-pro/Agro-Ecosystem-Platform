"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Thermometer,
  Layers,
  Award,
  CheckCircle2,
  FileText,
  Truck,
  HeartHandshake,
} from "lucide-react";

export default function ProductDetailPage() {
  const [selectedCut, setSelectedCut] = useState("striploin");
  const [orderKg, setOrderKg] = useState(10);

  const cuts = [
    {
      id: "striploin",
      name: "Striploin NY-Strip Reserve",
      badge: "Best Seller B2B",
      price: 265000,
      desc: "Tekstur kenyal pas dengan lapisan lemak penutup tipis kaya aroma herba pegunungan.",
    },
    {
      id: "tenderloin",
      name: "Tenderloin Center-Cut Fillet",
      badge: "Chef Choice",
      price: 345000,
      desc: "Bagian paling empuk dengan kehalusan serat daging khas sapi pasture-fed dataran tinggi.",
    },
    {
      id: "ribeye",
      name: "Ribeye Bone-In / Tomahawk",
      badge: "Artisan Aged",
      price: 310000,
      desc: "Marbling intramuskular alami MB 5+ dengan rasa gurih mentega alami saat dipanggang.",
    },
    {
      id: "brisket",
      name: "Brisket Point & Flat Whole",
      badge: "Slow Smoked",
      price: 185000,
      desc: "Sangat diminati untuk pengasapan lambat (slow smoke BBQ) dengan kolagen larut air.",
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
            <span className="text-primary font-bold">Daging Sapi Pasture-Fed Cuts Presisi</span>
          </nav>
          <div className="flex items-center gap-2 bg-surface-container-highest px-3 py-1 rounded-full text-primary font-semibold">
            <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
            <span>Lot ID: #MAN3-2024-BF09</span>
            <span className="text-on-surface-variant/70">• Terverifikasi Tunggal</span>
          </div>
        </div>
      </div>

      {/* Main Product Showcase */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-surface-container border border-surface-container-high">
              <img
                src="https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1200&q=80"
                alt="Daging Sapi Pasture-Fed Potongan Presisi MAN3"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"></div>

              {/* Badges on Visual */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-white/95 text-primary text-xs font-mono font-bold uppercase shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-tertiary-fixed"></span>
                  Contoh Produk • Simulasi
                </span>
                <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-mono font-bold uppercase shadow-sm flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-tertiary-fixed" />
                  Klaim Produk Belum Diverifikasi
                </span>
              </div>

              {/* Provenance Footer */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-primary-fixed">Asal Produk</p>
                  <h4 className="font-serif text-lg font-semibold">Lokasi belum dikonfirmasi</h4>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-mono">
                  <Thermometer className="w-4 h-4 text-primary-fixed" />
                  <span>Spesifikasi simulasi</span>
                </div>
              </div>
            </div>

            {/* Biological & Culinary Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-surface-container-low p-6 rounded-2xl border border-surface-container">
              <div>
                <span className="text-xs font-mono text-on-surface-variant uppercase">Marbling Level</span>
                <p className="font-serif text-2xl font-bold text-primary mt-0.5">MB 4–6</p>
                <span className="text-xs text-on-surface-variant">Intramuskular Alami</span>
              </div>
              <div>
                <span className="text-xs font-mono text-on-surface-variant uppercase">Maturasi Optimal</span>
                <p className="font-serif text-2xl font-bold text-primary mt-0.5">21–45 Hari</p>
                <span className="text-xs text-on-surface-variant">Dry &amp; Wet Aging</span>
              </div>
              <div>
                <span className="text-xs font-mono text-on-surface-variant uppercase">Yield Efisiensi</span>
                <p className="font-serif text-2xl font-bold text-secondary mt-0.5">98.2%</p>
                <span className="text-xs text-on-surface-variant">Trimming Waste &lt;2%</span>
              </div>
              <div>
                <span className="text-xs font-mono text-on-surface-variant uppercase">Rasio Omega 3:6</span>
                <p className="font-serif text-2xl font-bold text-primary mt-0.5">1 : 1.8</p>
                <span className="text-xs text-on-surface-variant">Profil Lipid Sehat</span>
              </div>
            </div>
          </div>

          {/* Right Spec & Purchasing Panel (5 cols) */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/50 shadow-md space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-secondary font-bold uppercase tracking-wider">Bio-Conservation Grade S+</span>
                <span className="text-primary font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-tertiary-container" /> Stok contoh: simulasi
                </span>
              </div>
              <h1 className="font-serif text-3xl font-bold text-primary leading-tight">
                Pasture-Fed Prime Beef Cuts Presisi
              </h1>
              <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                Daging sapi unggul ras Silangan Bali-Aberdeen Angus yang digembalakan di lereng vulkanik dengan asupan nutrisi pakan rumput organik fermentasi bio-aktif.
              </p>
            </div>

            {/* Cut Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-mono uppercase font-bold text-on-surface">
                Pilih Spesifikasi Bagian (Primal Cut):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {cuts.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCut(c.id)}
                    className={`p-3 rounded-xl text-left border transition-all ${
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
            </div>

            {/* Selected Cut Summary & Calculator */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant">
                <span>Estimasi Pemesanan Batch (kg):</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderKg(Math.max(5, orderKg - 5))}
                    className="w-7 h-7 rounded bg-white border border-outline-variant flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm text-primary w-10 text-center">{orderKg} kg</span>
                  <button
                    type="button"
                    onClick={() => setOrderKg(orderKg + 5)}
                    className="w-7 h-7 rounded bg-white border border-outline-variant flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="pt-2 border-t border-surface-container flex items-center justify-between">
                <span className="text-xs text-on-surface-variant font-mono">Total Estimasi Nilai:</span>
                <span className="font-serif text-2xl font-bold text-primary">
                  Rp {(currentCut.price * orderKg).toLocaleString("id-ID")}
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant/80 italic">
                *Minimum Order Quantity (MOQ) B2B adalah 5 kg per cut. Diskon kuota volume berlaku untuk kontrak bulanan.
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <Link
                href="/portal-mitra"
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <HeartHandshake className="w-4 h-4" />
                Pesan Alokasi via Portal B2B
              </Link>
              <Link
                href="/#contact"
                className="w-full py-3 rounded-xl bg-surface-container-high hover:bg-surface-variant text-primary font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                Minta Sample Pack Restoran (1 kg)
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
