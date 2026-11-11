import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ChevronRight,
  Mountain,
  Trees,
  Footprints,
  Compass,
  ArrowRight,
  CheckCircle2,
  Leaf,
  Binary,
} from "lucide-react";

export default function EkosistemKonservasiPage() {
  const zones = [
    {
      num: "Zona 01",
      name: "Rimba Perlindungan Satwa Liar (Buffer Inti)",
      area: "420 Hektar",
      role: "Penjaga Tata Air & Koridor Elang Jawa",
      desc: "Hutan tutupan primer sub-alpin yang berbatasan langsung dengan Taman Nasional Gunung Gede-Pangrango. Dilarang keras untuk budidaya mekanis; difungsikan sebagai reservoir tangkapan air alami dan koridor perlintasan satwa langka seperti Owa Jawa dan Macan Tutul Jawa.",
      highlights: ["Hutan primer terlindungi", "Zero intervensi mekanik", "Mata air murni gravitasi"],
    },
    {
      num: "Zona 02",
      name: "Agroforestri Multi-Strata & Herba Eksotis",
      area: "380 Hektar",
      role: "Siklus Kanopi Berkelanjutan",
      desc: "Pertanian bertingkat di bawah naungan pohon kanopi puspa dan damar. Membudidayakan herba obat tradisional, tanaman penahan erosi lereng, dan komoditas mikrogreens dengan mikroklimat stabil.",
      highlights: ["Kanopi 4 strata", "Herba liar dataran tinggi", "Serapan karbon optimal"],
    },
    {
      num: "Zona 03",
      name: "Padang Gembala Rotasional (Pasture Paddock)",
      area: "300 Hektar",
      role: "Habitat Etis Kawanan Ternak",
      desc: "Padang rumput berlereng dengan rumput alami alfalfa dan clover. Pola rotasi 21 petak gembala memastikan tanah tidak mengalami pemadatan (soil compaction) dan mendapat pupuk alami secara merata.",
      highlights: ["Rotasi 21 paddock", "Bebas pakan sintetis", "Siklus hidup hewan sejahtera"],
    },
    {
      num: "Zona 04",
      name: "Bio-Hub Riset & Mikrobioma Tanah",
      area: "100 Hektar",
      role: "Pusat Inovasi Regeneratif",
      desc: "Pusat formulasi mikroorganisme lokal (IMO), stasiun telemetri kualitas tanah, dan pembibitan varietas tanaman refugia alami yang bertindak sebagai repellent hama alami bagi seluruh ekosistem.",
      highlights: ["48 Strain mikroba lokal", "Audit harian nutrisi tanah", "Bank benih endemik"],
    },
  ];

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
            <span className="text-primary font-bold">Ekosistem &amp; Konservasi</span>
          </nav>
          <div className="flex items-center gap-2 bg-surface-container-highest px-3 py-1 rounded-full text-primary font-semibold">
            <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
            <span>Total Area: 1.200 Hektar Terlindungi</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wider">
            Tata Kelola Spasial Berkelanjutan
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-primary tracking-tight leading-tight">
            Koridor Biosfer 1.200 Hektar Cisarua-Pangrango
          </h1>
          <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
            Struktur zonasi ilmiah membagi wilayah konservasi kami ke dalam empat ranah terpadu untuk menjamin kontinuitas habitat satwa liar sekaligus menyediakan bahan pangan berdensitas nutrisi tertinggi bagi masyarakat.
          </p>
        </div>

        {/* Map & Flora-Fauna Indicator Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-12">
          {/* Visual Simulation Map */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-xl bg-surface-container border border-surface-container-high">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
                alt="Peta lanskap pegunungan konservasi MAN3"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/30 mix-blend-multiply"></div>

              {/* Pin Hotspots */}
              <div className="absolute top-6 left-8 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-md border border-white/40">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  Zona 01: Rimba Inti (420 Ha)
                </div>
                <span className="text-[11px] text-on-surface-variant block mt-0.5">
                  Koridor Elang &amp; Satwa Endemik
                </span>
              </div>

              <div className="absolute top-1/2 left-1/3 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-md border border-white/40">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  Zona 02: Agroforestri (380 Ha)
                </div>
                <span className="text-[11px] text-on-surface-variant block mt-0.5">
                  Herba Eksotis &amp; Sayuran Terroir
                </span>
              </div>

              <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-md border border-white/40">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container"></span>
                  Zona 04: Bio-Hub Lab (100 Ha)
                </div>
                <span className="text-[11px] text-on-surface-variant block mt-0.5">
                  Sentra Riset Bioteknologi Organik
                </span>
              </div>
            </div>

            {/* Biodiversity Matrix */}
            <div className="bg-white rounded-2xl p-6 border border-outline-variant/40 shadow-sm">
              <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider block mb-4 font-bold">
                Spesies Indikator Kesehatan Ekosistem Kawasan
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container">
                  <span className="text-xs font-mono text-secondary font-bold">Fauna Langka</span>
                  <p className="font-bold text-sm text-primary mt-1">Elang Jawa</p>
                  <span className="text-[11px] text-on-surface-variant italic">Spizaetus bartelsi</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container">
                  <span className="text-xs font-mono text-secondary font-bold">Primata Endemik</span>
                  <p className="font-bold text-sm text-primary mt-1">Owa Jawa</p>
                  <span className="text-[11px] text-on-surface-variant italic">Hylobates moloch</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container">
                  <span className="text-xs font-mono text-primary font-bold">Flora Indikator</span>
                  <p className="font-bold text-sm text-primary mt-1">Anggrek Hutan</p>
                  <span className="text-[11px] text-on-surface-variant italic">Bulbophyllum spp.</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container">
                  <span className="text-xs font-mono text-primary font-bold">Bakteri Tanah</span>
                  <p className="font-bold text-sm text-primary mt-1">Indigenous IMO</p>
                  <span className="text-[11px] text-on-surface-variant">48 Strain Alami</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Zonasi Cards */}
          <div className="lg:col-span-5 space-y-4">
            {zones.map((z) => (
              <div
                key={z.num}
                className="bg-white p-5 rounded-2xl border border-outline-variant/40 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-secondary font-bold">{z.num}</span>
                  <span className="bg-surface-container px-2.5 py-0.5 rounded text-primary font-semibold">
                    {z.area}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-primary mt-1">{z.name}</h3>
                <p className="text-xs text-secondary font-medium font-mono mt-0.5">{z.role}</p>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">{z.desc}</p>
                <div className="mt-3 pt-3 border-t border-surface-container flex flex-wrap gap-1.5">
                  {z.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-[10px] font-mono bg-surface-container-low px-2 py-0.5 rounded text-primary font-medium flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-tertiary-container" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
