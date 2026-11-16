"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Truck,
  Layers,
  Thermometer,
} from "lucide-react";

export default function ProductDetailPage() {
  const [selectedCut, setSelectedCut] = useState("striploin");
  const [orderKg, setOrderKg] = useState(10);

  const cuts = [
    {
      id: "striploin",
      name: "Striploin Pasture-Fed",
      badge: "Sirloin Cut",
      price: 310000,
      desc: "Potongan has luar dengan marbling alami halus di tepi. Menghasilkan aroma khas karamelisasi dan kelembutan optimal saat dipanggang.",
    },
    {
      id: "tenderloin",
      name: "Tenderloin Pasture-Fed",
      badge: "Fillet Mignon",
      price: 385000,
      desc: "Potongan paling empuk tanpa jaringan ikat berlebih, sangat ideal untuk steak premium dan hidangan khas fine dining.",
    },
    {
      id: "ribeye",
      name: "Ribeye Pasture-Fed Lip-on",
      badge: "Cube Roll",
      price: 340000,
      desc: "Potongan iga dengan marbling alami seimbang di tengah yang menghasilkan kelembutan juicy dan cita rasa gurih autentik.",
    },
    {
      id: "brisket",
      name: "Brisket Sandung Lamur",
      badge: "Slow Cook Cut",
      price: 185000,
      desc: "Potongan sandung lamur berserat halus, cocok untuk teknik slow smoking temperatur rendah, kaldu nutrisi, maupun braised.",
    },
  ];

  const currentCut = cuts.find((c) => c.id === selectedCut) || cuts[0];

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
            <Link href="/#alokasi" className="hover:text-[#0F3D2E] transition-colors">
              Produk
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0F3D2E] font-bold">Daging Sapi Pasture-Fed</span>
          </nav>
          <div className="text-[11px] font-mono text-[#6B726C]">
            Spesifikasi Kuliner &amp; Batch Ready
          </div>
        </div>
      </div>

      {/* Main Product Showcase */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative w-full aspect-[4/3] rounded-[4px] overflow-hidden border border-[#E5E5DE] bg-[#EFEFEA]">
              <Image
                src="https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=1200&q=80"
                alt="Potongan daging sapi pasture-fed segar"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute top-4 left-4 px-2.5 py-1 rounded-[2px] bg-white/95 text-[#0F3D2E] text-xs font-mono font-bold uppercase shadow-sm">
                100% Pasture-Fed Single Estate
              </div>
            </div>

            {/* Scientific & Culinary Specifications Table */}
            <div className="p-6 bg-[#FBFBF9] border border-[#E5E5DE] rounded-[4px] space-y-4">
              <h3 className="font-serif text-xl font-bold text-[#0F3D2E]">
                Spesifikasi Teknis Potongan
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono border border-[#E5E5DE] bg-white">
                  <tbody className="divide-y divide-[#E5E5DE]">
                    <tr>
                      <td className="py-2.5 px-4 font-semibold text-[#141A17] w-1/3 bg-[#F5F5F1]">Metode Pakan</td>
                      <td className="py-2.5 px-4 text-[#4E5752]">100% Hijauan Alami Dataran Tinggi (Zero Grains / No Hormones)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-semibold text-[#141A17] bg-[#F5F5F1]">Proses Aging</td>
                      <td className="py-2.5 px-4 text-[#4E5752]">Wet-Aged Cold Chilled 14 Hari (0°C – 2°C)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-semibold text-[#141A17] bg-[#F5F5F1]">Standar Kemasan</td>
                      <td className="py-2.5 px-4 text-[#4E5752]">Vacuum Skin Pack (VSP) Higienis per 1–2 kg atau Whole Muscle</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-semibold text-[#141A17] bg-[#F5F5F1]">Ketertelusuran Lot</td>
                      <td className="py-2.5 px-4 text-[#4E5752]">QR Batch ID memuat tanggal panen dan blok padang rotasi</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-semibold text-[#141A17] bg-[#F5F5F1]">Suhu Simpan</td>
                      <td className="py-2.5 px-4 text-[#4E5752]">Chilled: 0°C hingga +2°C | Frozen: -18°C</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Selector & Purchase Intent (5 cols) */}
          <div className="lg:col-span-5 bg-[#FBFBF9] border border-[#E5E5DE] p-6 sm:p-8 rounded-[4px] shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A4B2A] font-bold block">
                Katalog Potongan Prime
              </span>
              <h1 className="font-serif text-3xl font-bold text-[#0F3D2E] mt-1">
                {currentCut.name}
              </h1>
              <p className="text-xs text-[#4E5752] mt-2 leading-relaxed">
                {currentCut.desc}
              </p>
            </div>

            {/* Cut Selection Tabs */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#141A17] font-semibold">
                Pilih Tipe Potongan:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                {cuts.map((cut) => (
                  <button
                    key={cut.id}
                    type="button"
                    onClick={() => setSelectedCut(cut.id)}
                    className={`p-3 rounded-[2px] border text-left transition-all ${
                      selectedCut === cut.id
                        ? "border-[#0F3D2E] bg-white shadow-sm font-bold text-[#0F3D2E]"
                        : "border-[#E5E5DE] bg-white/60 text-[#4E5752] hover:bg-white"
                    }`}
                  >
                    <span className="block text-[11px]">{cut.name}</span>
                    <span className="text-[10px] text-[#7A4B2A] font-normal">
                      Rp{cut.price.toLocaleString("id-ID")}/kg
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Quantity Simulator */}
            <div className="p-4 bg-white border border-[#E5E5DE] rounded-[2px] space-y-3 text-xs font-mono">
              <div className="flex justify-between items-center">
                <span className="text-[#6B726C]">Harga B2B Per Kilogram:</span>
                <span className="font-bold text-[#0F3D2E] text-sm">
                  Rp{currentCut.price.toLocaleString("id-ID")}
                </span>
              </div>

              <div className="flex justify-between items-center border-t border-[#E5E5DE] pt-2">
                <span className="text-[#6B726C]">Kebutuhan Alokasi (kg):</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="5"
                    max="100"
                    step="5"
                    value={orderKg}
                    onChange={(e) => setOrderKg(parseInt(e.target.value, 10) || 5)}
                    className="w-16 px-2 py-1 text-right border border-[#E5E5DE] rounded-[2px] font-bold text-[#0F3D2E]"
                  />
                  <span>kg</span>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-[#E5E5DE] pt-2 font-bold text-[#0F3D2E] text-sm">
                <span>Estimasi Nilai Batch:</span>
                <span className="font-serif text-lg">
                  Rp{(currentCut.price * orderKg).toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              <Link
                href="/portal-mitra"
                className="w-full py-3 rounded-[4px] bg-[#0F3D2E] hover:bg-[#08261C] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Buka Portal &amp; Reservasi Kuota</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/kemitraan-b2b?path=chef"
                className="w-full py-2.5 rounded-[4px] border border-[#E5E5DE] bg-white hover:bg-[#F5F5F1] text-[#141A17] font-mono text-xs uppercase tracking-wider font-medium transition-colors flex items-center justify-center gap-2"
              >
                <span>Minta Sample Box untuk Chef</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
