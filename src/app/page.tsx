"use client";

import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { initialProducts } from "@/data/products";
import {
  ShieldCheck,
  Mountain,
  Sprout,
  ArrowRight,
  ExternalLink,
  Calendar,
  User,
  CheckCircle2,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Send,
  Building2,
} from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  thumbnail_path: string;
  category: string;
  created_at: string;
  author_name: string;
}

export default function HomePage() {
  const [newsItems, setNewsItems] = useState<NewsArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState("");
  const [contactDemoSent, setContactDemoSent] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/news", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Berita gagal dimuat.");
        return data.news as NewsArticle[];
      })
      .then((items) => {
        if (active) setNewsItems(items);
      })
      .catch((error: unknown) => {
        if (active) setNewsError(error instanceof Error ? error.message : "Berita gagal dimuat.");
      })
      .finally(() => {
        if (active) setNewsLoading(false);
      });

    return () => { active = false; };
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative w-full py-12 md:py-20 lg:py-24 bg-surface overflow-hidden">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Col: Text */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high text-primary w-fit text-xs font-mono font-semibold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
                Agro-Ekologi Regeneratif • Lereng Gn. Gede-Pangrango
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-primary tracking-tight leading-[1.12]">
                Harmoni dengan Alam, Pangan Kualitas Premium.
              </h1>

              <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
                {siteConfig.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-primary hover:bg-primary-container text-white font-mono text-sm uppercase tracking-wider font-semibold transition-all shadow-sm hover:-translate-y-0.5"
                >
                  Jelajahi Produk
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/ekosistem-konservasi"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-primary font-mono text-sm uppercase tracking-wider font-semibold transition-colors"
                >
                  Program Konservasi
                </Link>
              </div>

              {/* Key Highlights Metrics */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-surface-container-high">
                <div>
                  <span className="block font-mono text-xl sm:text-2xl font-bold text-primary">
                    Konsep
                  </span>
                  <span className="text-xs text-on-surface-variant">Lokasi dalam validasi</span>
                </div>
                <div>
                  <span className="block font-mono text-xl sm:text-2xl font-bold text-primary">
                    Rancangan
                  </span>
                  <span className="text-xs text-on-surface-variant">Ketertelusuran lot</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="block font-mono text-xl sm:text-2xl font-bold text-secondary">
                    Tahap demo
                  </span>
                  <span className="text-xs text-on-surface-variant">Praktik operasional belum diklaim</span>
                </div>
              </div>
            </div>

            {/* Right Col: Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-surface-container border border-surface-container-high">
                <img
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80"
                  alt="Padang rumput rotasional di kaki pegunungan dengan ternak alami dan panorama hijau"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-primary-fixed uppercase">
                    <span className="w-2 h-2 rounded-full bg-tertiary-fixed"></span>
                    Terroir Reserve Zone A
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold">
                    Kawasan Konservasi Gede-Pangrango
                  </h3>
                  <p className="text-xs sm:text-sm text-inverse-on-surface/90 leading-relaxed">
                    Sistem rotasi paddock terpadu melindungi mata air alami, mempertahankan kesuburan tanah humus, dan memelihara kesejahteraan kawanan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEDICATED PAGES DIRECTORY (7 Halaman Khusus Referensi Desain) */}
      <section className="w-full py-12 bg-surface-container-low border-y border-surface-container-high">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-secondary font-bold">
                Pratinjau Halaman
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-primary mt-1">
                Jelajahi konsep ekosistem MAN3
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-md">
              Halaman berikut adalah prototipe antarmuka. Data produk, sertifikasi, lokasi, stok, dan harga masih berupa simulasi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/produk/daging-sapi-pasture-fed"
              className="p-5 rounded-xl bg-white border border-outline-variant/40 hover:border-tertiary-container shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-secondary font-bold">01 / PRODUK</span>
                <h3 className="font-serif text-lg font-semibold text-primary mt-1 group-hover:text-primary-container">
                  Detail Daging Sapi Pasture-Fed
                </h3>
                <p className="text-xs text-on-surface-variant mt-2 line-clamp-2">
                  Spesifikasi potongan presisi, marbling alami, dan sistem ketertelusuran lot.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-mono font-semibold text-primary gap-1 group-hover:translate-x-1 transition-transform">
                <span>Lihat Detail</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/ekosistem-konservasi"
              className="p-5 rounded-xl bg-white border border-outline-variant/40 hover:border-tertiary-container shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-secondary font-bold">02 / ZONASI</span>
                <h3 className="font-serif text-lg font-semibold text-primary mt-1 group-hover:text-primary-container">
                  Ekosistem Konservasi
                </h3>
                <p className="text-xs text-on-surface-variant mt-2 line-clamp-2">
                  Pemetaan 4 zona konservasi, perlindungan mata air, dan koridor satwa liar.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-mono font-semibold text-primary gap-1 group-hover:translate-x-1 transition-transform">
                <span>Pelajari Ekosistem</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/kemitraan-b2b"
              className="p-5 rounded-xl bg-white border border-outline-variant/40 hover:border-tertiary-container shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-secondary font-bold">03 / KEMITRAAN</span>
                <h3 className="font-serif text-lg font-semibold text-primary mt-1 group-hover:text-primary-container">
                  Kemitraan B2B Restoran
                </h3>
                <p className="text-xs text-on-surface-variant mt-2 line-clamp-2">
                  Program pasokan ritme mingguan bagi hotel berbintang, chef, dan restoran fine-dining.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-mono font-semibold text-primary gap-1 group-hover:translate-x-1 transition-transform">
                <span>Jalin Kerjasama</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/corporate-profile"
              className="p-5 rounded-xl bg-white border border-outline-variant/40 hover:border-tertiary-container shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-secondary font-bold">04 / KORPORAT</span>
                <h3 className="font-serif text-lg font-semibold text-primary mt-1 group-hover:text-primary-container">
                  Corporate Profile
                </h3>
                <p className="text-xs text-on-surface-variant mt-2 line-clamp-2">
                  Ikhtisar komprehensif struktur kelembagaan, visi regenerasi, dan standar tata kelola.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-mono font-semibold text-primary gap-1 group-hover:translate-x-1 transition-transform">
                <span>Buka Profil</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/bio-conservation"
              className="p-5 rounded-xl bg-white border border-outline-variant/40 hover:border-tertiary-container shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-secondary font-bold">05 / SAINS</span>
                <h3 className="font-serif text-lg font-semibold text-primary mt-1 group-hover:text-primary-container">
                  Bio-Conservation Science
                </h3>
                <p className="text-xs text-on-surface-variant mt-2 line-clamp-2">
                  Metodologi ilmiah keseimbangan mikrobioma, fotosintesis tajuk, dan pertahanan refugia.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-mono font-semibold text-primary gap-1 group-hover:translate-x-1 transition-transform">
                <span>Baca Metodologi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/portal-mitra"
              className="p-5 rounded-xl bg-white border border-outline-variant/40 hover:border-tertiary-container shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-secondary font-bold">06 / PROTOTIPE B2B</span>
                <h3 className="font-serif text-lg font-semibold text-primary mt-1 group-hover:text-primary-container">
                  Portal Mitra Pemesanan
                </h3>
                <p className="text-xs text-on-surface-variant mt-2 line-clamp-2">
                  Katalog alokasi batch, pemesanan kuota panen, dan tracking logistik rantai dingin.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-mono font-semibold text-primary gap-1 group-hover:translate-x-1 transition-transform">
                <span>Lihat Simulasi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/why-choose-man3"
              className="p-5 rounded-xl bg-white border border-outline-variant/40 hover:border-tertiary-container shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-secondary font-bold">07 / KEUNGGULAN</span>
                <h3 className="font-serif text-lg font-semibold text-primary mt-1 group-hover:text-primary-container">
                  Why Choose MAN3
                </h3>
                <p className="text-xs text-on-surface-variant mt-2 line-clamp-2">
                  Perbandingan komprehensif terhadap produk konvensional &amp; komitmen mutu tanpa kompromi.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-mono font-semibold text-primary gap-1 group-hover:translate-x-1 transition-transform">
                <span>Pelajari Nilai</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/#contact"
              className="p-5 rounded-xl bg-primary text-white hover:bg-primary-container shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-tertiary-fixed font-bold">KONSULTASI</span>
                <h3 className="font-serif text-lg font-semibold text-white mt-1">
                  Mulai Kemitraan Langsung
                </h3>
                <p className="text-xs text-primary-fixed-dim/90 mt-2">
                  Hubungi tim agronomi kami untuk penjadwalan kunjungan lapangan atau uji sampel produk.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-mono font-semibold text-tertiary-fixed gap-1 group-hover:translate-x-1 transition-transform">
                <span>Kontak Kami</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION & 3 CONSERVATION PILLARS */}
      <section id="about" className="w-full py-16 sm:py-24 bg-surface-container-lowest">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="font-mono text-xs uppercase tracking-wider text-secondary font-bold block mb-2">
              Tentang MAN3 &amp; Filosofi Regeneratif
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-primary tracking-tight">
              Menjaga Kehidupan, Menghasilkan Kemurnian.
            </h2>
            <p className="text-base text-on-surface-variant mt-4 leading-relaxed">
              {siteConfig.about.story}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pilar 1 */}
            <div className="flex flex-col bg-surface-container-low rounded-2xl p-8 transition-transform hover:-translate-y-1 border border-surface-container">
              <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-[32px]">pest_control</span>
              </div>
              <span className="font-mono text-xs uppercase font-bold text-secondary">Pilar 01</span>
              <h3 className="font-serif text-2xl font-semibold text-primary mt-2 mb-3">
                Bio-Security &amp; Pertahanan Hama Hayati
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Menanam koridor refugia tanaman berbunga dan memelihara koloni predator alami untuk menjaga keseimbangan populasi serangga tanpa semprotan pestisida beracun.
              </p>
              <div className="mt-auto pt-4 border-t border-surface-container flex items-center text-primary font-mono text-xs uppercase font-bold gap-2">
                <span>Non-Toxic Buffer Zone</span>
                <CheckCircle2 className="w-4 h-4 text-tertiary-container" />
              </div>
            </div>

            {/* Pilar 2 */}
            <div className="flex flex-col bg-surface-container-low rounded-2xl p-8 transition-transform hover:-translate-y-1 border border-surface-container">
              <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-[32px]">pets</span>
              </div>
              <span className="font-mono text-xs uppercase font-bold text-secondary">Pilar 02</span>
              <h3 className="font-serif text-2xl font-semibold text-primary mt-2 mb-3">
                Peternakan Beretika &amp; Bebas Stres
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Ternak bergerak bebas di padang rumput bertingkat dengan rotasi paddock harian. Tanpa hormon pertumbuhan dan tanpa antibiotik profilaksis sintetis.
              </p>
              <div className="mt-auto pt-4 border-t border-surface-container flex items-center text-primary font-mono text-xs uppercase font-bold gap-2">
                <span>Welfare Terverifikasi</span>
                <CheckCircle2 className="w-4 h-4 text-tertiary-container" />
              </div>
            </div>

            {/* Pilar 3 */}
            <div className="flex flex-col bg-surface-container-low rounded-2xl p-8 transition-transform hover:-translate-y-1 border border-surface-container">
              <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-6">
                <span className="material-symbols-outlined text-[32px]">compost</span>
              </div>
              <span className="font-mono text-xs uppercase font-bold text-secondary">Pilar 03</span>
              <h3 className="font-serif text-2xl font-semibold text-primary mt-2 mb-3">
                Regenerasi Humus &amp; Siklus Tertutup
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Limbah organik peternakan diolah menjadi kompos vermikultur kaya nutrisi mikroba untuk menyuburkan kembali kebun sayur dan padang rumput.
              </p>
              <div className="mt-auto pt-4 border-t border-surface-container flex items-center text-primary font-mono text-xs uppercase font-bold gap-2">
                <span>Circular Soil Ecosystem</span>
                <CheckCircle2 className="w-4 h-4 text-tertiary-container" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCTS & HARVEST SHOWCASE (Service Section) */}
      <section id="products" className="w-full py-16 sm:py-24 bg-surface">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-secondary font-bold">
                Katalog Konsep • Data Simulasi
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-primary mt-2">
                Panen Dataran Tinggi &amp; Daging Terstandar
              </h2>
            </div>
            <Link
              href="/portal-mitra"
              className="inline-flex items-center gap-2 text-sm font-mono font-bold text-primary hover:text-primary-container"
            >
              <span>Lihat Prototipe B2B</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {initialProducts.map((prod) => (
              <div
                key={prod.id}
                className="flex flex-col bg-white rounded-2xl overflow-hidden border border-outline-variant/50 shadow-sm hover:shadow-lg transition-all group"
              >
                <div className="relative w-full aspect-[4/3] bg-surface-container overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    <span className="px-2.5 py-1 rounded-full bg-primary/90 text-white font-mono text-[10px] uppercase font-semibold">
                      {prod.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-on-surface-variant block mb-1">
                      {prod.origin}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-primary group-hover:text-primary-container">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant mt-2 line-clamp-2 leading-relaxed">
                      {prod.subtitle}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {prod.badges.slice(0, 2).map((b) => (
                        <span
                          key={b}
                          className="px-2 py-0.5 rounded bg-surface-container text-primary font-mono text-[10px] font-medium"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-surface-container flex items-center justify-between">
                    <div>
                      <span className="text-xs text-on-surface-variant">Harga contoh (simulasi)</span>
                      <p className="font-mono text-base font-bold text-primary">
                        {prod.price} <span className="text-xs font-normal text-on-surface-variant">{prod.unit}</span>
                      </p>
                    </div>

                    <Link
                      href={`/produk/daging-sapi-pasture-fed`}
                      className="p-2 rounded-lg bg-surface-container hover:bg-primary hover:text-white text-primary transition-colors"
                      title="Lihat spesifikasi"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NEWS / PUBLICATIONS SECTION */}
      <section id="news" className="w-full py-16 sm:py-24 bg-surface-container-lowest">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-secondary font-bold">
                Warta &amp; Publikasi Lapangan
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-primary mt-2">
                Kabar Terkini dari Terroir Reserve
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant max-w-md">
              Contoh tampilan artikel untuk pratinjau desain. Konten dan tanggal mengikuti data simulasi pengembangan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsLoading ? (
              <p className="md:col-span-3 rounded-xl border border-surface-container bg-surface-container-low p-8 text-center text-sm text-on-surface-variant">
                Memuat berita…
              </p>
            ) : newsError ? (
              <p role="alert" className="md:col-span-3 rounded-xl border border-red-200 bg-red-50 p-8 text-center text-sm text-red-700">
                {newsError}
              </p>
            ) : newsItems.length === 0 ? (
              <p className="md:col-span-3 rounded-xl border border-surface-container bg-surface-container-low p-8 text-center text-sm text-on-surface-variant">
                Belum ada berita yang dipublikasikan.
              </p>
            ) : newsItems.map((item) => (
              <article
                key={item.id}
                className="flex flex-col bg-surface-container-low rounded-2xl overflow-hidden border border-surface-container shadow-sm hover:shadow-md transition-all group"
              >
                <div className="relative w-full aspect-[16/9] bg-surface-container overflow-hidden">
                  <img
                    src={item.thumbnail_path}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-primary font-mono text-[10px] font-bold uppercase">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-on-surface-variant mb-2 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <time dateTime={item.created_at}>
                          {new Date(item.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          })}
                        </time>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        {item.author_name}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-primary group-hover:text-primary-container leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-sm text-on-surface-variant mt-3 line-clamp-3 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-surface-container flex items-center justify-between text-xs font-mono font-bold text-primary">
                    <span className="group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Baca Selengkapnya
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-on-surface-variant/70 font-normal">3 min read</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT & GOOGLE MAPS SECTION */}
      <section id="contact" className="w-full py-16 sm:py-24 bg-surface">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Contact Form & Info */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-secondary font-bold">
                  Hubungi Kami &amp; Kerjasama
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-primary mt-2">
                  Mulai Dialog Kolaborasi Pangan Sehat
                </h2>
                <p className="text-base text-on-surface-variant mt-4 leading-relaxed">
                  Apakah Anda perwakilan restoran, hotel, komunitas pangan sehat, atau individu yang peduli keberlanjutan lingkungan? Tim MAN3 siap menyambut konsultasi Anda.
                </p>
              </div>

              {/* Direct Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-outline-variant/40">
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-2">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-on-surface-variant font-mono">Email prototipe</span>
                  <p className="text-sm font-semibold text-primary">{siteConfig.contact.email}</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-outline-variant/40">
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-2">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-on-surface-variant font-mono">Kontak prototipe</span>
                  <p className="text-sm font-semibold text-primary">{siteConfig.contact.phone}</p>
                </div>
              </div>

              {/* Interactive Contact Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactDemoSent(true);
                }}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-outline-variant/40 shadow-sm space-y-4"
              >
                <h3 className="font-serif text-xl font-bold text-primary">Kirimkan Permintaan / Pertanyaan</h3>
                <p className="text-xs text-on-surface-variant">
                  Formulir demo: data tidak dikirim atau disimpan. Kontak resmi akan ditambahkan setelah tersedia.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono text-on-surface-variant mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Budi Santoso"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-surface-container-low"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-entity" className="block text-xs font-mono text-on-surface-variant mb-1">
                      Instansi / Usaha / Resto
                    </label>
                    <input
                      id="contact-entity"
                      type="text"
                      placeholder="e.g. Restoran Nusa Rasa"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-surface-container-low"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono text-on-surface-variant mb-1">
                      Email Aktif *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="nama@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-surface-container-low"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs font-mono text-on-surface-variant mb-1">
                      Nomor WhatsApp *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="08123456789"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-surface-container-low"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono text-on-surface-variant mb-1">
                    Pesan / Kebutuhan Pasokan
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    placeholder="Ceritakan jenis produk, kebutuhan kuota panen, atau pertanyaan mengenai program konservasi kami..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-surface-container-low"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-primary hover:bg-primary-container text-white font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  Simulasikan Pengiriman
                </button>
                {contactDemoSent && (
                  <p role="status" className="text-sm text-primary">
                    Simulasi berhasil. Tidak ada pesan yang dikirim.
                  </p>
                )}
              </form>
            </div>

            {/* Google Maps Embed & Location Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-outline-variant/40 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-secondary font-bold uppercase">
                  <MapPin className="w-4 h-4 text-secondary" />
                  Peta Referensi • Lokasi Simulasi
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary">
                  Kawasan Gunung Gede-Pangrango
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {siteConfig.contact.address}
                </p>

                {/* Google Maps Iframe Embed with accessibility & lazy loading */}
                <div className="w-full h-[380px] rounded-xl overflow-hidden border border-outline-variant/60 shadow-inner relative bg-surface-container">
                  <iframe
                    title="Peta Lokasi Kawasan Konservasi MAN3 Gunung Gede-Pangrango"
                    aria-label="Peta referensi kawasan Gunung Gede-Pangrango; bukan lokasi operasional MAN3 yang terverifikasi"
                    src={siteConfig.contact.googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  ></iframe>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-on-surface-variant gap-2">
                  <span>
                    Peta hanya referensi kawasan umum; lokasi operasional MAN3 belum dikonfirmasi.
                  </span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Gunung+Gede+Pangrango"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary font-bold hover:underline"
                  >
                    Buka di Aplikasi Google Maps
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
