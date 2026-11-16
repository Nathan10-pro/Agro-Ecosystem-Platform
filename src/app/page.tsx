"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  FileText,
  MapPin,
  Shield,
  Truck,
  X,
  ExternalLink,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { initialNews } from "@/data/news";

interface AllocationProduct {
  id: string;
  name: string;
  stock: string;
  price: string;
  unit: string;
  spec: string;
  category: string;
}

const ALLOCATION_PRODUCTS: AllocationProduct[] = [
  {
    id: "p1",
    name: "Tenderloin Pasture-Fed",
    stock: "180 kg",
    price: "Rp385.000",
    unit: "/kg",
    spec: "Whole muscle, vacuum",
    category: "Daging Sapi",
  },
  {
    id: "p2",
    name: "Ribeye Lip-on",
    stock: "240 kg",
    price: "Rp340.000",
    unit: "/kg",
    spec: "Portion cut 300g",
    category: "Daging Sapi",
  },
  {
    id: "p3",
    name: "Ayam Kampung Bio-Probiotik",
    stock: "45 ekor",
    price: "Rp82.000",
    unit: "/ekor",
    spec: "Utuh bersih",
    category: "Unggas",
  },
  {
    id: "p4",
    name: "Paket Sayuran Daun Dataran Tinggi",
    stock: "50 pack",
    price: "Rp65.000",
    unit: "/pack",
    spec: "Curated box 5kg",
    category: "Sayuran",
  },
];

export default function HomePage() {
  const [cartCount, setCartCount] = useState<number>(0);
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<(typeof initialNews)[0] | null>(null);

  // Sync with localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("man3_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCartCount(parsed.length);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleAddToCart = (product: AllocationProduct) => {
    try {
      const current = localStorage.getItem("man3_cart");
      const list = current ? JSON.parse(current) : [];
      const existingIndex = list.findIndex((item: { id: string }) => item.id === product.id);
      if (existingIndex >= 0) {
        list[existingIndex].qty = (list[existingIndex].qty || 1) + 1;
      } else {
        list.push({
          id: product.id,
          name: product.name,
          spec: product.spec,
          price: parseInt(product.price.replace(/[^\d]/g, ""), 10) || 0,
          qty: 1,
        });
      }
      localStorage.setItem("man3_cart", JSON.stringify(list));
      setCartCount(list.length);
    } catch {
      // Fallback
    }

    setAddedItem(product.name);
    setTimeout(() => {
      setAddedItem(null);
    }, 2800);
  };

  return (
    <div className="w-full bg-white text-[#141A17]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full border-b border-[#E5E5DE] bg-[#FBFBF9] py-16 sm:py-20 lg:py-28">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#0F3D2E]" />
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B726C] font-semibold">
                  Koridor Dataran Tinggi • Single Estate Agro-Ecosystem
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-medium leading-[1.12] text-[#0F3D2E] tracking-tight">
                Pasture-Fed Single Estate dari Koridor Konservasi Gunung Gede–Pangrango
              </h1>

              <p className="text-base sm:text-lg text-[#4E5752] leading-relaxed max-w-2xl font-normal">
                Daging sapi yang dikelola di dalam sistem zonasi 4 lapisan. Ketelusuran lot,
                jadwal pengiriman subuh, dan kontribusi konservasi yang terukur.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="#alokasi"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[4px] bg-[#0F3D2E] hover:bg-[#08261C] text-white text-[13px] font-mono uppercase tracking-wider font-semibold transition-colors shadow-sm"
                >
                  <span>Lihat Alokasi Batch Minggu Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  href="/kemitraan-b2b?path=kunjungan"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[4px] border border-[#E5E5DE] bg-white hover:bg-[#F5F5F1] text-[#141A17] text-[13px] font-mono uppercase tracking-wider font-medium transition-colors"
                >
                  <span>Jadwalkan Kunjungan Lapangan</span>
                </Link>
              </div>

              {/* Operational / Concept Transparency Note */}
              <p className="text-[11px] font-mono text-[#6B726C] pt-2">
                Informasi zonasi kawasan dan kuota pasokan merupakan data rancangan model operasional terpadu MAN3.
              </p>
            </div>

            {/* Right Visual (5 Cols) - Editorial Landscape Composition */}
            <div className="lg:col-span-5">
              <div className="relative border border-[#E5E5DE] bg-white p-2 rounded-[4px] shadow-sm">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-[#EFEFEA]">
                  <Image
                    src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1200&q=80"
                    alt="Padang rumput penggembalaan sapi di lereng dataran tinggi"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#D1EADB] font-bold block">
                      Zona 03 • Rotational Pasture
                    </span>
                    <span className="text-sm font-serif font-medium mt-0.5 block">
                      Padang Gembala Rotasional Dataran Tinggi
                    </span>
                  </div>
                </div>

                {/* Micro Key Facts Bar */}
                <div className="mt-2.5 grid grid-cols-3 divide-x divide-[#E5E5DE] text-center py-1.5 text-[#141A17]">
                  <div>
                    <span className="text-[10px] font-mono text-[#6B726C] uppercase block">Elevasi</span>
                    <span className="text-[13px] font-mono font-bold text-[#0F3D2E]">1.100 m dpl</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#6B726C] uppercase block">Siklus Pakan</span>
                    <span className="text-[13px] font-mono font-bold text-[#0F3D2E]">100% Hijauan</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#6B726C] uppercase block">Distribusi</span>
                    <span className="text-[13px] font-mono font-bold text-[#0F3D2E]">Cold-Chain</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRODUCT ALLOCATION SECTION */}
      <section id="alokasi" className="w-full py-16 lg:py-24 border-b border-[#E5E5DE]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Notification feedback when item is added */}
          {addedItem && (
            <div className="mb-6 p-3 bg-[#0F3D2E] text-white text-xs font-mono rounded-[4px] flex items-center justify-between animate-in fade-in">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D1EADB]" />
                <strong>{addedItem}</strong> berhasil ditambahkan ke draf alokasi B2B.
              </span>
              <Link
                href="/portal-mitra"
                className="underline hover:text-[#D1EADB] ml-4 font-bold"
              >
                Lihat di Portal Mitra →
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: 60% Structured Product Table */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E5E5DE] pb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A4B2A] font-semibold">
                    Katalog Pasokan Terverifikasi
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#0F3D2E] mt-1">
                    Alokasi Produk Minggu Ini
                  </h2>
                </div>
                <div className="text-[11px] font-mono text-[#6B726C]">
                  Status per Senin, 08:00 WIB
                </div>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto border border-[#E5E5DE] rounded-[4px] bg-white">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#F5F5F1] border-b border-[#E5E5DE] text-[11px] font-mono text-[#6B726C] uppercase">
                      <th className="py-3 px-4 font-semibold">Produk</th>
                      <th className="py-3 px-3 font-semibold">Stok</th>
                      <th className="py-3 px-3 font-semibold">Harga B2B</th>
                      <th className="py-3 px-3 font-semibold">Spesifikasi</th>
                      <th className="py-3 px-4 font-semibold text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5DE]">
                    {ALLOCATION_PRODUCTS.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#FBFBF9] transition-colors">
                        <td className="py-3.5 px-4">
                          <span className="font-medium text-[#141A17] text-[13px] block">
                            {prod.name}
                          </span>
                          <span className="text-[10px] font-mono text-[#6B726C]">
                            {prod.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-[2px] bg-[#E8F3ED] text-[#0F3D2E] font-mono font-medium text-[11px]">
                            {prod.stock}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-mono font-bold text-[#0F3D2E] text-[12px]">
                          {prod.price}
                          <span className="text-[10px] text-[#6B726C] font-normal">{prod.unit}</span>
                        </td>
                        <td className="py-3.5 px-3 text-[#4E5752] text-[11px]">
                          {prod.spec}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleAddToCart(prod)}
                            className="inline-flex items-center justify-center px-3 py-1.5 rounded-[4px] bg-[#0F3D2E] hover:bg-[#08261C] text-white font-mono text-[11px] font-semibold tracking-wide transition-colors"
                          >
                            Tambah
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <Link
                  href="/portal-mitra"
                  className="inline-flex items-center gap-1.5 text-[#0F3D2E] font-mono font-semibold hover:underline"
                >
                  <span>Lihat semua potongan &amp; spesifikasi teknis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                {cartCount > 0 && (
                  <Link
                    href="/portal-mitra"
                    className="text-[11px] font-mono text-[#7A4B2A] font-semibold"
                  >
                    {cartCount} komoditas di draf pemesanan →
                  </Link>
                )}
              </div>
            </div>

            {/* Right Column: 40% Mengapa MAN3 Berbeda */}
            <div className="lg:col-span-5 bg-[#FBFBF9] border border-[#E5E5DE] p-6 sm:p-8 rounded-[4px] space-y-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A4B2A] font-semibold">
                  Keunggulan Suplai
                </span>
                <h3 className="font-serif text-2xl font-medium text-[#0F3D2E] mt-1">
                  Mengapa MAN3 Berbeda
                </h3>
              </div>

              <div className="space-y-4 divide-y divide-[#E5E5DE]">
                <div className="pt-3 first:pt-0">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-[#0F3D2E] mt-0.5">01</span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#141A17]">Single Estate + 4 Zona Konservasi</h4>
                      <p className="text-xs text-[#4E5752] mt-0.5 leading-relaxed">
                        Pengelolaan hulu terintegrasi memastikan kestabilan mutu pakan hijauan dan higienitas peternakan tanpa perantara tengkulak.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-[#0F3D2E] mt-0.5">02</span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#141A17]">Pengiriman Subuh Terjadwal (04:30–06:00)</h4>
                      <p className="text-xs text-[#4E5752] mt-0.5 leading-relaxed">
                        Armada berpendingin tiba sebelum dapur restoran beroperasi, menjaga kesegaran chilled tanpa fluktuasi suhu.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-[#0F3D2E] mt-0.5">03</span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#141A17]">Ketertelusuran Lot Digital</h4>
                      <p className="text-xs text-[#4E5752] mt-0.5 leading-relaxed">
                        Setiap karkas dan panen dilengkapi batch ID transparan yang memuat riwayat padang gembala dan tanggal proses.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-[#0F3D2E] mt-0.5">04</span>
                    <div>
                      <h4 className="text-sm font-semibold text-[#141A17]">Kontrak Kuota dan Harga B2B</h4>
                      <p className="text-xs text-[#4E5752] mt-0.5 leading-relaxed">
                        Kepastian volume panen mingguan dan stabilitas harga kontrak semester untuk proteksi food cost mitra.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E5DE]">
                <button
                  type="button"
                  onClick={() => setShowComparisonModal(true)}
                  className="w-full py-2.5 px-4 rounded-[4px] border border-[#0F3D2E] text-[#0F3D2E] hover:bg-[#0F3D2E] hover:text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Bandingkan dengan Supply Konvensional
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. AGRO-ECOLOGICAL ZONING TEASER */}
      <section className="w-full py-16 lg:py-24 border-b border-[#E5E5DE] bg-[#FBFBF9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A4B2A] font-semibold">
                Struktur Lanskap Kawasan
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#0F3D2E] leading-tight">
                Satu Koridor Agro-Ekologi dengan Empat Lapisan Fungsi
              </h2>
              <p className="text-sm sm:text-base text-[#4E5752] leading-relaxed">
                Produksi pangan MAN3 bertumpu pada lanskap 1.200 hektar yang memisahkan dan
                menghubungkan zona konservasi rimba, agroforestri bertingkat, padang gembala rotasional,
                dan pusat riset biologi.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 bg-white border border-[#E5E5DE] rounded-[4px]">
                  <span className="text-xs font-mono font-bold text-[#0F3D2E] block">420 ha</span>
                  <span className="text-xs text-[#141A17] font-medium mt-0.5 block">Zona 01 — Rimba Inti</span>
                  <span className="text-[11px] text-[#6B726C] mt-0.5 block">Buffer satwa &amp; resapan</span>
                </div>
                <div className="p-3.5 bg-white border border-[#E5E5DE] rounded-[4px]">
                  <span className="text-xs font-mono font-bold text-[#0F3D2E] block">380 ha</span>
                  <span className="text-xs text-[#141A17] font-medium mt-0.5 block">Zona 02 — Agroforestri</span>
                  <span className="text-[11px] text-[#6B726C] mt-0.5 block">Vegetasi pangan berlapis</span>
                </div>
                <div className="p-3.5 bg-white border border-[#E5E5DE] rounded-[4px]">
                  <span className="text-xs font-mono font-bold text-[#0F3D2E] block">300 ha</span>
                  <span className="text-xs text-[#141A17] font-medium mt-0.5 block">Zona 03 — Padang Gembala</span>
                  <span className="text-[11px] text-[#6B726C] mt-0.5 block">Rotasi pasture-fed alami</span>
                </div>
                <div className="p-3.5 bg-white border border-[#E5E5DE] rounded-[4px]">
                  <span className="text-xs font-mono font-bold text-[#0F3D2E] block">100 ha</span>
                  <span className="text-xs text-[#141A17] font-medium mt-0.5 block">Zona 04 — Bio-Hub</span>
                  <span className="text-[11px] text-[#6B726C] mt-0.5 block">Riset &amp; pemantauan ekologis</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/ekosistem-konservasi"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#0F3D2E] hover:bg-[#08261C] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
                >
                  <span>Buka Peta Interaktif &amp; Rincian Zonasi</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="border border-[#E5E5DE] bg-white p-4 rounded-[4px] shadow-sm space-y-4">
                <div className="relative aspect-[16/10] w-full bg-[#EFEFEA] rounded-[2px] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
                    alt="Panorama lanskap pegunungan koridor konservasi"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#D1EADB] font-bold">
                      Spatial Overview
                    </span>
                    <h4 className="font-serif text-lg font-medium text-white">
                      Koridor Dataran Tinggi Jawa Barat
                    </h4>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-[#6B726C] px-1">
                  <span>Total Kawasan: <strong className="text-[#0F3D2E]">1.200 Hektar</strong></span>
                  <span>Status: <strong className="text-[#0F3D2E]">Purwarupa Spasial</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ILMU & WARTA LAPANGAN SECTION */}
      <section id="ilmu" className="w-full py-16 lg:py-24 border-b border-[#E5E5DE]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[#E5E5DE] pb-4 mb-8">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A4B2A] font-semibold">
                Warta &amp; Edukasi Agro-Ekologi
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#0F3D2E] mt-1">
                Catatan Lapangan &amp; Sains Produksi
              </h2>
            </div>
            <span className="text-xs font-mono text-[#6B726C]">
              Publikasi editorial berkala
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initialNews.map((article) => (
              <article
                key={article.id}
                className="border border-[#E5E5DE] rounded-[4px] bg-white flex flex-col justify-between overflow-hidden hover:border-[#0F3D2E] transition-colors"
              >
                <div>
                  <div className="relative aspect-[16/9] w-full bg-[#EFEFEA] overflow-hidden">
                    <Image
                      src={article.thumbnail_path}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-[2px] bg-white/95 text-[#0F3D2E] text-[10px] font-mono font-semibold uppercase">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <span className="text-[11px] font-mono text-[#6B726C]">
                      {article.created_at} • {article.author_name}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#0F3D2E] leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-[#4E5752] leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#0F3D2E] hover:underline"
                  >
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. B2B PARTNERSHIP CALLOUT */}
      <section className="w-full py-16 lg:py-20 bg-[#FBFBF9]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A4B2A] font-semibold">
            Saluran Kerjasama B2B
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#0F3D2E]">
            Mulai Kemitraan Pasokan Langsung dengan MAN3
          </h2>
          <p className="text-sm sm:text-base text-[#4E5752] leading-relaxed">
            Tersedia tiga jalur kemitraan: Alokasi Dapur Restoran &amp; Hotel, Kunjungan Evaluasi Lapangan,
            atau Permintaan Sample Box untuk Chef &amp; F&amp;B Director.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="/kemitraan-b2b"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[4px] bg-[#0F3D2E] hover:bg-[#08261C] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-colors"
            >
              <span>Pilih Jalur Kemitraan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portal-mitra"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[4px] border border-[#E5E5DE] bg-white hover:bg-[#F5F5F1] text-[#141A17] text-xs font-mono uppercase tracking-wider font-medium transition-colors"
            >
              <span>Buka Portal Pemesanan</span>
            </Link>
          </div>
        </div>
      </section>

      {/* MODAL 1: COMPARISON TABLE MODAL */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-[#E5E5DE] rounded-[4px] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-[#E5E5DE] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A4B2A] font-bold">
                  Komparasi Pasokan
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#0F3D2E]">
                  MAN3 Single Estate vs. Supply Konvensional
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowComparisonModal(false)}
                className="p-1.5 rounded-[4px] text-[#6B726C] hover:bg-[#F5F5F1] hover:text-[#141A17]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-x-auto">
              <table className="w-full text-left text-xs border border-[#E5E5DE]">
                <thead>
                  <tr className="bg-[#F5F5F1] border-b border-[#E5E5DE] font-mono text-[11px] uppercase">
                    <th className="py-3 px-4 font-bold text-[#141A17] w-1/4">Parameter</th>
                    <th className="py-3 px-4 font-bold text-[#0F3D2E] w-3/8 bg-[#E8F3ED]">
                      MAN3 Single Estate
                    </th>
                    <th className="py-3 px-4 font-bold text-[#6B726C] w-3/8">
                      Supply Komersial Konvensional
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5DE]">
                  <tr>
                    <td className="py-3 px-4 font-semibold text-[#141A17]">Metode Pakan</td>
                    <td className="py-3 px-4 bg-[#FBFDFB] text-[#0F3D2E]">
                      100% pasture-fed (hijauan alami dataran tinggi), tanpa pakan konsentrat olahan.
                    </td>
                    <td className="py-3 px-4 text-[#4E5752]">
                      Feedlot berbasis butiran biji-bijian sintetis dan aditif pemicu bobot.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-[#141A17]">Ketertelusuran Asal</td>
                    <td className="py-3 px-4 bg-[#FBFDFB] text-[#0F3D2E]">
                      Satu kawasan tunggal (single estate) dengan ID batch lot dan riwayat penggembalaan.
                    </td>
                    <td className="py-3 px-4 text-[#4E5752]">
                      Agregasi multi-peternak tanpa catatan jelas asal-usul ternak per individu.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-[#141A17]">Jadwal Distribusi</td>
                    <td className="py-3 px-4 bg-[#FBFDFB] text-[#0F3D2E]">
                      Pengiriman subuh (04:30–06:00) cold-chain langsung sebelum jam operasional dapur.
                    </td>
                    <td className="py-3 px-4 text-[#4E5752]">
                      Pengiriman kurir reguler fluktuatif tanpa pemantauan suhu rantai dingin konstan.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-[#141A17]">Stabilitas Harga</td>
                    <td className="py-3 px-4 bg-[#FBFDFB] text-[#0F3D2E]">
                      Kontrak alokasi kuota mingguan dengan harga tetap per periode (3–6 bulan).
                    </td>
                    <td className="py-3 px-4 text-[#4E5752]">
                      Harga pasar harian yang fluktuatif mengikuti tren spekulasi pasar komoditas.
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold text-[#141A17]">Dampak Konservasi</td>
                    <td className="py-3 px-4 bg-[#FBFDFB] text-[#0F3D2E]">
                      Terintegrasi sabuk hijau 420 ha rimba dan koridor habitat satwa Gunung Gede–Pangrango.
                    </td>
                    <td className="py-3 px-4 text-[#4E5752]">
                      Umumnya tidak memiliki program terukur terhadap restorasi habitat atau keanekaragaman hayati.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-6 pt-0 flex justify-end">
              <button
                type="button"
                onClick={() => setShowComparisonModal(false)}
                className="px-5 py-2 rounded-[4px] bg-[#0F3D2E] text-white text-xs font-mono font-semibold"
              >
                Tutup Komparasi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: ARTICLE DETAIL READER */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-[#E5E5DE] rounded-[4px] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative aspect-[16/9] w-full bg-[#EFEFEA]">
              <Image
                src={selectedArticle.thumbnail_path}
                alt={selectedArticle.title}
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 rounded-[4px] bg-black/70 text-white hover:bg-black transition-colors"
                aria-label="Tutup artikel"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#6B726C]">
                <span className="px-2 py-0.5 rounded-[2px] bg-[#E8F3ED] text-[#0F3D2E] font-bold uppercase">
                  {selectedArticle.category}
                </span>
                <span>•</span>
                <span>{selectedArticle.created_at}</span>
                <span>•</span>
                <span>{selectedArticle.author_name}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F3D2E] leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="text-sm text-[#4E5752] leading-relaxed space-y-3 pt-2 border-t border-[#E5E5DE]">
                <p className="font-medium text-[#141A17]">{selectedArticle.excerpt}</p>
                <p>
                  {selectedArticle.content ||
                    "Pendekatan regeneratif dalam ekosistem MAN3 memastikan bahwa setiap tahap produksi—dari pemilihan hijauan, rotasi padang gembala, hingga pemanfaatan sisa bahan organik—berfungsi saling melengkapi untuk memulihkan kesuburan tanah dan keseimbangan biologi kawasan."}
                </p>
                <p>
                  Melalui sistem tertutup ini, kebutuhan input sintetis ditekan sepenuhnya, sekaligus menghasilkan mutu daging dan sayuran yang memiliki profil nutrisi optimal serta keamanan konsumsi prima bagi para mitra kuliner.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E5DE] flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="px-5 py-2 rounded-[4px] bg-[#0F3D2E] text-white font-mono text-xs font-semibold"
                >
                  Selesai Membaca
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
