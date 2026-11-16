"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight, Layers, Info, MapPin } from "lucide-react";

interface ZoneData {
  id: string;
  number: string;
  name: string;
  areaHa: number;
  percentage: number;
  color: string;
  badgeColor: string;
  bgActive: string;
  description: string;
  principles: string[];
}

const ZONES: ZoneData[] = [
  {
    id: "zone-1",
    number: "ZONE 01",
    name: "RIMBA INTI",
    areaHa: 420,
    percentage: 35,
    color: "#0F3D2E",
    badgeColor: "bg-[#0F3D2E] text-white",
    bgActive: "border-[#0F3D2E] bg-[#F5F8F6]",
    description: "Buffer satwa dan mata air dengan pembatasan intervensi mekanik.",
    principles: [
      "Perlindungan hulu resapan air dan sempadan jurang alami",
      "Koridor jelajah satwa liar tanpa aktivitas penggembalaan",
      "Nol intervensi alat mekanis dan bebas pestisida sintetis",
    ],
  },
  {
    id: "zone-2",
    number: "ZONE 02",
    name: "AGROFORESTRI MULTI-STRATA",
    areaHa: 380,
    percentage: 31.7,
    color: "#2C6E49",
    badgeColor: "bg-[#2C6E49] text-white",
    bgActive: "border-[#2C6E49] bg-[#F4F9F6]",
    description: "Area budidaya dengan struktur vegetasi bertingkat, tanaman pangan, dan sayuran.",
    principles: [
      "Kanopi pohon peneduh menahan curah hujan ekstrim lereng",
      "Budidaya polikultur sayuran dataran tinggi dan hortikultura",
      "Sabuk tanaman refugia sebagai pemutus siklus hama biologis",
    ],
  },
  {
    id: "zone-3",
    number: "ZONE 03",
    name: "PADANG GEMBALA ROTASIONAL",
    areaHa: 300,
    percentage: 25,
    color: "#7A4B2A",
    badgeColor: "bg-[#7A4B2A] text-white",
    bgActive: "border-[#7A4B2A] bg-[#FAF6F3]",
    description: "Area penggembalaan bergilir untuk menjaga kondisi vegetasi dan pemulihan lahan.",
    principles: [
      "Pembagian blok pasture dengan rotasi pindah gembala 7-14 hari",
      "Menghindari overgrazing demi pemulihan perakaran rumput alami",
      "Penyebaran alami pupuk kandang untuk kesuburan mikrobioma tanah",
    ],
  },
  {
    id: "zone-4",
    number: "ZONE 04",
    name: "BIO-HUB",
    areaHa: 100,
    percentage: 8.3,
    color: "#3F5E52",
    badgeColor: "bg-[#3F5E52] text-white",
    bgActive: "border-[#3F5E52] bg-[#F5F7F6]",
    description: "Pusat pengembangan, riset, dan pemantauan kondisi ekosistem.",
    principles: [
      "Fasilitas pengolahan kompos organik dan laboratorium tanah",
      "Stasiun logistik cold-chain dan pos pengemasan higienis B2B",
      "Sensor mikroklimat pemantau curah hujan dan kelembapan lereng",
    ],
  },
];

const INDICATOR_SPECIES = [
  { name: "Elang Jawa", scientific: "Nisaetus bartelsi", status: "Indikator Tajuk Atas" },
  { name: "Owa Jawa", scientific: "Hylobates moloch", status: "Indikator Koridor Kanopi" },
  { name: "Surili", scientific: "Presbytis comata", status: "Indikator Vegetasi Rimba" },
  { name: "Macan Tutul Jawa", scientific: "Panthera pardus melas", status: "Apex Predator Konservasi" },
];

export default function EkosistemKonservasiPage() {
  const [selectedZoneId, setSelectedZoneId] = useState<string>("zone-1");
  const activeZone = ZONES.find((z) => z.id === selectedZoneId) || ZONES[0];

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
            <span className="text-[#0F3D2E] font-bold">Zonasi Agro-Ekologi</span>
          </nav>
          <div className="text-[11px] font-mono text-[#6B726C]">
            Purwarupa Spasial • Model Konsep Tata Ruang
          </div>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        {/* Page Header */}
        <div className="max-w-3xl space-y-3 mb-10">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A4B2A] font-semibold block">
            Struktur Spasial Lanskap
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#0F3D2E] tracking-tight leading-tight">
            Konsep Zonasi Agro-Ekologi Terpadu
          </h1>
          <p className="text-base text-[#4E5752] leading-relaxed">
            Eksplorasi pembagian 4 lapisan spasial terhubung pada lanskap produksi pangan dan sabuk konservasi MAN3. Klik zona pada skema diagram atau panel deskripsi untuk meninjau fungsi spesifik tiap kawasan.
          </p>
        </div>

        {/* Total Area Visualization Bar */}
        <div className="mb-12 p-6 bg-[#FBFBF9] border border-[#E5E5DE] rounded-[4px] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#E5E5DE] pb-3">
            <div>
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#0F3D2E]">
                1.200 Hektar
              </span>
              <p className="text-xs sm:text-sm text-[#4E5752] mt-0.5 font-medium">
                Satu koridor agro-ekologi dengan empat fungsi yang saling terhubung.
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#6B726C]">
              Model proporsi spasial terpadu
            </span>
          </div>

          {/* Segmented Bar */}
          <div className="space-y-2">
            <div className="h-6 w-full rounded-[3px] overflow-hidden flex bg-[#E5E5DE] border border-[#E5E5DE]">
              {ZONES.map((zone) => {
                const isSelected = zone.id === selectedZoneId;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setSelectedZoneId(zone.id)}
                    style={{
                      width: `${zone.percentage}%`,
                      backgroundColor: zone.color,
                    }}
                    className={`h-full transition-opacity hover:opacity-90 relative ${
                      isSelected ? "ring-2 ring-offset-1 ring-[#141A17] z-10" : "opacity-85"
                    }`}
                    title={`${zone.name} (${zone.areaHa} ha)`}
                  />
                );
              })}
            </div>

            {/* Bar Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
              {ZONES.map((zone) => (
                <button
                  key={zone.id}
                  type="button"
                  onClick={() => setSelectedZoneId(zone.id)}
                  className={`text-left p-2 rounded-[4px] border transition-all ${
                    zone.id === selectedZoneId
                      ? "border-[#0F3D2E] bg-white shadow-sm font-semibold"
                      : "border-transparent hover:bg-white/60 text-[#4E5752]"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: zone.color }}
                    />
                    <span className="font-mono text-[11px] text-[#141A17]">{zone.number}</span>
                  </div>
                  <span className="block text-[12px] font-medium mt-0.5 text-[#0F3D2E]">
                    {zone.name}
                  </span>
                  <span className="text-[11px] font-mono text-[#6B726C]">
                    {zone.areaHa} ha ({zone.percentage}%)
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Schematic Diagram (7 Cols) */}
          <div className="lg:col-span-7 bg-[#FBFBF9] border border-[#E5E5DE] p-6 rounded-[4px] space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5E5DE] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#6B726C] font-semibold">
                  Skema Zonasi Lanskap Interaktif
                </span>
                <h3 className="font-serif text-lg font-bold text-[#0F3D2E]">
                  Diagram Spasial Koridor Lereng
                </h3>
              </div>
              <span className="text-[11px] font-mono text-[#7A4B2A]">Klik zona pada peta</span>
            </div>

            {/* SVG Interactive Spatial Schematic */}
            <div className="relative w-full aspect-[4/3] bg-white border border-[#E5E5DE] rounded-[4px] overflow-hidden p-2">
              <svg
                viewBox="0 0 600 450"
                className="w-full h-full select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background grid texture */}
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#F0F0EB" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="600" height="450" fill="url(#grid)" />

                {/* ZONE 01: RIMBA INTI (Top Ridge & Watershed Buffer) */}
                <g
                  onClick={() => setSelectedZoneId("zone-1")}
                  className="cursor-pointer group"
                >
                  <path
                    d="M 40,40 L 560,40 L 560,150 Q 300,180 40,150 Z"
                    fill={selectedZoneId === "zone-1" ? "#0F3D2E" : "#1A4E3B"}
                    stroke="#0F3D2E"
                    strokeWidth={selectedZoneId === "zone-1" ? "3" : "1"}
                    className="transition-colors duration-200"
                  />
                  <text x="300" y="85" textAnchor="middle" fill="#FFFFFF" fontFamily="Newsreader, serif" fontSize="18" fontWeight="bold">
                    ZONE 01 — RIMBA INTI
                  </text>
                  <text x="300" y="110" textAnchor="middle" fill="#D1EADB" fontFamily="Space Grotesk, monospace" fontSize="12">
                    420 Hektar • Buffer Rimba &amp; Resapan Mata Air
                  </text>
                </g>

                {/* ZONE 02: AGROFORESTRI MULTI-STRATA (Mid-Upper Slope) */}
                <g
                  onClick={() => setSelectedZoneId("zone-2")}
                  className="cursor-pointer group"
                >
                  <path
                    d="M 40,155 Q 300,185 560,155 L 560,265 Q 300,285 40,265 Z"
                    fill={selectedZoneId === "zone-2" ? "#2C6E49" : "#3B855D"}
                    stroke="#2C6E49"
                    strokeWidth={selectedZoneId === "zone-2" ? "3" : "1"}
                    className="transition-colors duration-200"
                  />
                  <text x="300" y="200" textAnchor="middle" fill="#FFFFFF" fontFamily="Newsreader, serif" fontSize="18" fontWeight="bold">
                    ZONE 02 — AGROFORESTRI MULTI-STRATA
                  </text>
                  <text x="300" y="225" textAnchor="middle" fill="#E8F3ED" fontFamily="Space Grotesk, monospace" fontSize="12">
                    380 Hektar • Vegetasi Pangan &amp; Hortikultura Berlapis
                  </text>
                </g>

                {/* ZONE 03: PADANG GEMBALA ROTASIONAL (Mid-Lower Pasture) */}
                <g
                  onClick={() => setSelectedZoneId("zone-3")}
                  className="cursor-pointer group"
                >
                  <path
                    d="M 40,270 Q 300,290 560,270 L 560,370 Q 380,380 40,365 Z"
                    fill={selectedZoneId === "zone-3" ? "#7A4B2A" : "#94623C"}
                    stroke="#7A4B2A"
                    strokeWidth={selectedZoneId === "zone-3" ? "3" : "1"}
                    className="transition-colors duration-200"
                  />
                  <text x="300" y="310" textAnchor="middle" fill="#FFFFFF" fontFamily="Newsreader, serif" fontSize="18" fontWeight="bold">
                    ZONE 03 — PADANG GEMBALA ROTASIONAL
                  </text>
                  <text x="300" y="335" textAnchor="middle" fill="#FFEDE2" fontFamily="Space Grotesk, monospace" fontSize="12">
                    300 Hektar • Penggembalaan Bergilir Pasture-Fed
                  </text>
                </g>

                {/* ZONE 04: BIO-HUB (Bottom Base Node) */}
                <g
                  onClick={() => setSelectedZoneId("zone-4")}
                  className="cursor-pointer group"
                >
                  <path
                    d="M 40,370 Q 380,385 560,375 L 560,420 L 40,420 Z"
                    fill={selectedZoneId === "zone-4" ? "#3F5E52" : "#517467"}
                    stroke="#3F5E52"
                    strokeWidth={selectedZoneId === "zone-4" ? "3" : "1"}
                    className="transition-colors duration-200"
                  />
                  <text x="300" y="400" textAnchor="middle" fill="#FFFFFF" fontFamily="Newsreader, serif" fontSize="16" fontWeight="bold">
                    ZONE 04 — BIO-HUB &amp; LOGISTIK COLD-CHAIN (100 Hektar)
                  </text>
                </g>
              </svg>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#6B726C] pt-1">
              <span>Elevasi lereng: 850 – 1.600 m dpl</span>
              <span>Skema konseptual non-definitif</span>
            </div>
          </div>

          {/* Right Column: Detailed Zoning Panel (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-6 border rounded-[4px] transition-all bg-white shadow-sm ${activeZone.bgActive}`}>
              <div className="flex items-center justify-between border-b border-[#E5E5DE] pb-3">
                <span className={`px-2.5 py-0.5 rounded-[2px] font-mono text-[11px] font-bold ${activeZone.badgeColor}`}>
                  {activeZone.number}
                </span>
                <span className="font-mono text-xs font-bold text-[#0F3D2E]">
                  {activeZone.areaHa} Hektar ({activeZone.percentage}%)
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <h3 className="font-serif text-2xl font-bold text-[#0F3D2E]">
                  {activeZone.name}
                </h3>
                <p className="text-sm font-medium text-[#141A17] leading-relaxed">
                  &ldquo;{activeZone.description}&rdquo;
                </p>

                <div className="pt-3 border-t border-[#E5E5DE] space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A4B2A] font-semibold block">
                    Prinsip Operasional Zona:
                  </span>
                  <ul className="space-y-2 text-xs text-[#4E5752]">
                    {activeZone.principles.map((pr, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0F3D2E] mt-1.5 flex-shrink-0" />
                        <span>{pr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Proposed Indicator Species Section */}
            <div className="p-6 bg-[#FBFBF9] border border-[#E5E5DE] rounded-[4px] space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A4B2A] font-semibold block">
                  Bio-Indikator Lingkungan
                </span>
                <h4 className="font-serif text-lg font-bold text-[#0F3D2E] mt-0.5">
                  Satwa Indikator Usulan
                </h4>
                <p className="text-xs text-[#4E5752] mt-1">
                  Empat spesies acuan pemantauan integritas koridor kanopi dan sabuk konservasi (usulan kajian hayati):
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {INDICATOR_SPECIES.map((sp) => (
                  <div key={sp.name} className="p-3 bg-white border border-[#E5E5DE] rounded-[4px]">
                    <span className="font-medium text-xs text-[#141A17] block">{sp.name}</span>
                    <span className="font-serif italic text-[11px] text-[#6B726C] block">{sp.scientific}</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#0F3D2E] font-semibold block mt-1">
                      {sp.status}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[11px] font-mono text-[#6B726C] border-t border-[#E5E5DE] pt-3">
                Catatan integritas: Spesies di atas merupakan usulan indikator ekologis, bukan konfirmasi rekam jejak observasi definitif di tapak proyek.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2.5 pt-2">
              <Link
                href="/kemitraan-b2b?path=kunjungan"
                className="w-full py-2.5 text-center rounded-[4px] bg-[#0F3D2E] hover:bg-[#08261C] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
              >
                Jadwalkan Evaluasi Lapangan ke Kawasan
              </Link>
              <Link
                href="/portal-mitra"
                className="w-full py-2 text-center rounded-[4px] border border-[#E5E5DE] bg-white hover:bg-[#F5F5F1] text-[#141A17] text-xs font-mono font-medium transition-colors"
              >
                Tinjau Alokasi Pasokan dari Zona 02 &amp; 03 →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
