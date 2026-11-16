"use client";

import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { initialProducts } from "@/data/products";
import { initialNews } from "@/data/news";
import {
  ShieldCheck,
  Mountain,
  Sprout,
  ArrowRight,
  ExternalLink,
  Calendar,
  User,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Send,
  Building2,
  Flower2,
  PawPrint,
  Recycle,
  Leaf,
  CheckCircle2,
  X,
} from "lucide-react";

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  thumbnail_path: string;
  category: string;
  created_at: string;
  author_name: string;
  content?: string;
}

export default function HomePage() {
  const [newsItems, setNewsItems] = useState<NewsArticle[]>(initialNews);
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsError, setNewsError] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
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
        if (active && Array.isArray(items) && items.length > 0) {
          setNewsItems(items);
        }
      })
      .catch((error: unknown) => {
        // Fallback sudah aman menggunakan initialNews
        console.warn("API news fetch failed, relying on initial fallback:", error);
      });

    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const cards = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
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
                MAN3 — Ekosistem Pertanian, Peternakan &amp; Konservasi
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium text-primary tracking-tight leading-[1.12]">
                Harmoni Alam Menghadirkan Pangan Berkualitas Premium
              </h1>

              <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed max-w-2xl">
                MAN3 memadukan budidaya alami, peternakan ramah alam berbasis padang rumput, dan pelestarian koridor konservasi hayati untuk menyediakan bahan pangan segar bermutu tinggi bagi mitra kuliner.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/kemitraan-b2b#onboarding-form"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-primary hover:bg-primary-container text-white font-mono text-sm uppercase tracking-wider font-semibold transition-all shadow-sm hover:-translate-y-0.5"
                >
                  Pelajari Kemitraan B2B
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container-high hover:bg-surface-variant text-primary font-mono text-sm uppercase tracking-wider font-semibold transition-colors"
                >
                  Jelajahi Produk Kami
                </Link>
              </div>

              {/* Key Highlights Metrics */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-surface-container-high">
                <div>
                  <span className="block font-mono text-xl sm:text-2xl font-bold text-primary">
                    100% Pasture-Fed
                  </span>
                  <span className="text-xs text-on-surface-variant">Pakan rumput alami bernutrisi</span>
                </div>
                <div>
                  <span className="block font-mono text-xl sm:text-2xl font-bold text-primary">
                    Sistem Terpadu
                  </span>
                  <span className="text-xs text-on-surface-variant">Agro-ekologi &amp; siklus hayati</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="block font-mono text-xl sm:text-2xl font-bold text-secondary">
                    Konservasi Alam
                  </span>
                  <span className="text-xs text-on-surface-variant">Menjaga koridor keanekaragaman hayati</span>
                </div>
              </div>
            </div>

            {/* Right Col: Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-surface-container border border-surface-container-high">
                <img
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80"
                  alt="Lanskap pertanian pegunungan MAN3"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono tracking-wider text-primary-fixed uppercase">
                    <span className="w-2 h-2 rounded-full bg-tertiary-fixed"></span>
                    Bentang Alam Dataran Tinggi
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold">
                    Harmoni Alam &amp; Produksi Pangan
                  </h3>
                  <p className="text-xs sm:text-sm text-inverse-on-surface/90 leading-relaxed">
                    Pendekatan agro-ekologi terpadu yang memadukan kesuburan tanah pegunungan dan kesejahteraan ternak alami.
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
                Eksplorasi Layanan &amp; Ekosistem
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-primary mt-1">
                Jelajahi Ekosistem Terpadu MAN3
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-md">
              Akses cepat ke seluruh pilar ekosistem bio-agri, katalog pangan segar, kemitraan usaha, dan sains konservasi kami.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/produk/daging-sapi-pasture-fed"
              data-reveal
              className="p-5 rounded-xl bg-white border border-outline-variant/40 hover:border-tertiary-container shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-secondary font-bold">01 / PRODUK</span>
                <h3 className="font-serif text-lg font-semibold text-primary mt-1 group-hover:text-primary-container">
                  Daging Sapi Pasture-Fed
                </h3>
                <p className="text-xs text-on-surface-variant mt-2 line-clamp-2">
                  Daging sapi pilihan dari padang rumput alami dengan standar pemotongan presisi.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-mono font-semibold text-primary gap-1 group-hover:translate-x-1 transition-transform">
                <span>Lihat Detail</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/ekosistem-konservasi"
              data-reveal
              className="p-5 rounded-xl bg-white border border-outline-variant/40 hover:border-tertiary-container shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-secondary font-bold">02 / ZONASI</span>
                <h3 className="font-serif text-lg font-semibold text-primary mt-1 group-hover:text-primary-container">
                  Ekosistem Konservasi
                </h3>
                <p className="text-xs text-on-surface-variant mt-2 line-clamp-2">
                  Rancangan zonasi perlindungan alam, koridor hijau, dan siklus air pegunungan.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-mono font-semibold text-primary gap-1 group-hover:translate-x-1 transition-transform">
                <span>Pelajari Ekosistem</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/kemitraan-b2b"
              data-reveal
              className="interactive-card p-5 rounded-xl bg-white border border-outline-variant/40 hover:border-tertiary-container shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-secondary font-bold">03 / KEMITRAAN</span>
                <h3 className="font-serif text-lg font-semibold text-primary mt-1 group-hover:text-primary-container">
                  Kemitraan B2B Restoran
                </h3>
                <p className="text-xs text-on-surface-variant mt-2 line-clamp-2">
                  Program kemitraan pasokan bahan pangan bermutu untuk restoran, hotel, dan usaha kuliner.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-mono font-semibold text-primary gap-1 group-hover:translate-x-1 transition-transform">
                <span>Lihat Kemitraan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/corporate-profile"
              data-reveal
              className="p-5 rounded-xl bg-white border border-outline-variant/40 hover:border-tertiary-container shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-secondary font-bold">04 / KORPORAT</span>
                <h3 className="font-serif text-lg font-semibold text-primary mt-1 group-hover:text-primary-container">
                  Profil Perusahaan
                </h3>
                <p className="text-xs text-on-surface-variant mt-2 line-clamp-2">
                  Visi, komitmen tata kelola, dan pendekatan holistik MAN3 dalam bio-agrikultur.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-mono font-semibold text-primary gap-1 group-hover:translate-x-1 transition-transform">
                <span>Buka Profil</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/bio-conservation"
              data-reveal
              className="p-5 rounded-xl bg-white border border-outline-variant/40 hover:border-tertiary-container shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-secondary font-bold">05 / SAINS</span>
                <h3 className="font-serif text-lg font-semibold text-primary mt-1 group-hover:text-primary-container">
                  Budidaya dan Konservasi
                </h3>
                <p className="text-xs text-on-surface-variant mt-2 line-clamp-2">
                  Prinsip sains agro-ekologi, kesehatan mikrobioma tanah, dan tanaman refugia.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-mono font-semibold text-primary gap-1 group-hover:translate-x-1 transition-transform">
                <span>Lihat Panduan Konsep</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/portal-mitra"
              data-reveal
              className="p-5 rounded-xl bg-white border border-outline-variant/40 hover:border-tertiary-container shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-secondary font-bold">06 / PEMESANAN B2B</span>
                <h3 className="font-serif text-lg font-semibold text-primary mt-1 group-hover:text-primary-container">
                  Portal Mitra B2B
                </h3>
                <p className="text-xs text-on-surface-variant mt-2 line-clamp-2">
                  Antarmuka pemesanan batch terstandar dengan informasi ketersediaan berkala.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-mono font-semibold text-primary gap-1 group-hover:translate-x-1 transition-transform">
                <span>Buka Portal Mitra</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/why-choose-man3"
              data-reveal
              className="p-5 rounded-xl bg-white border border-outline-variant/40 hover:border-tertiary-container shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-secondary font-bold">07 / KEUNGGULAN</span>
                <h3 className="font-serif text-lg font-semibold text-primary mt-1 group-hover:text-primary-container">
                  Mengapa MAN3
                </h3>
                <p className="text-xs text-on-surface-variant mt-2 line-clamp-2">
                  Nilai unggul model regeneratif MAN3 untuk mutu pangan dan keberlanjutan alam.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-mono font-semibold text-primary gap-1 group-hover:translate-x-1 transition-transform">
                <span>Pelajari Keunggulan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/#contact"
              data-reveal
              className="p-5 rounded-xl bg-primary text-white hover:bg-primary-container shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-tertiary-fixed font-bold">KONSULTASI</span>
                <h3 className="font-serif text-lg font-semibold text-white mt-1">
                  Mulai Kemitraan
                </h3>
                <p className="text-xs text-primary-fixed-dim/90 mt-2">
                  Diskusikan spesifikasi kebutuhan pasokan pangan dengan tim konsultan kami.
                </p>
              </div>
              <div className="mt-4 flex items-center text-xs font-mono font-semibold text-tertiary-fixed gap-1 group-hover:translate-x-1 transition-transform">
                <span>Hubungi Kami</span>
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
              Tentang Ekosistem MAN3
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-primary tracking-tight">
              Sistem Pertanian, Peternakan &amp; Konservasi Terpadu
            </h2>
            <p className="text-base text-on-surface-variant mt-4 leading-relaxed">
              {siteConfig.about.story}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pilar 1 */}
            <div data-reveal className="interactive-card flex flex-col bg-surface-container-low rounded-2xl p-8 transition-transform hover:-translate-y-1 border border-surface-container">
              <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-6">
                <Flower2 className="w-8 h-8 text-primary" />
              </div>
              <span className="font-mono text-xs uppercase font-bold text-secondary">Pertahanan Alami</span>
              <h3 className="font-serif text-2xl font-semibold text-primary mt-2 mb-3">
                Tanaman Refugia
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Kami menanam bunga refugia di sekitar lahan untuk mengundang serangga penyerbuk dan pemangsa alami, menjaga tanaman tetap subur dan terlindungi tanpa pestisida berbahaya.
              </p>
              <div className="mt-auto pt-4 border-t border-surface-container text-primary font-mono text-xs uppercase font-bold">
                Prinsip: Keseimbangan Hayati
              </div>
            </div>

            {/* Pilar 2 */}
            <div data-reveal className="interactive-card flex flex-col bg-surface-container-low rounded-2xl p-8 transition-transform hover:-translate-y-1 border border-surface-container">
              <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-6">
                <PawPrint className="w-8 h-8 text-primary" />
              </div>
              <span className="font-mono text-xs uppercase font-bold text-secondary">Peternakan Ramah Alam</span>
              <h3 className="font-serif text-2xl font-semibold text-primary mt-2 mb-3">
                Penggembalaan Bergilir
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Sistem penggembalaan bergilir di padang rumput alami memastikan ternak tumbuh sehat, bebas stres, dan memberikan waktu yang cukup bagi lahan untuk pulih.
              </p>
              <div className="mt-auto pt-4 border-t border-surface-container text-primary font-mono text-xs uppercase font-bold">
                Prinsip: Kesejahteraan Ternak
              </div>
            </div>

            {/* Pilar 3 */}
            <div data-reveal className="interactive-card flex flex-col bg-surface-container-low rounded-2xl p-8 transition-transform hover:-translate-y-1 border border-surface-container">
              <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-6">
                <Recycle className="w-8 h-8 text-primary" />
              </div>
              <span className="font-mono text-xs uppercase font-bold text-secondary">Kesuburan Tanah</span>
              <h3 className="font-serif text-2xl font-semibold text-primary mt-2 mb-3">
                Kompos Organik Alami
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Pupuk organik berbasis kompos mengembalikan nutrisi penting ke dalam tanah, menjaga kegemburan dan mendukung pertumbuhan tanaman secara alami dan berkelanjutan.
              </p>
              <div className="mt-auto pt-4 border-t border-surface-container text-primary font-mono text-xs uppercase font-bold">
                Prinsip: Siklus Nutrisi Tertutup
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Standar Integritas & Nilai Mutu */}
      <section className="w-full py-14 sm:py-16 bg-surface-container-low border-y border-surface-container-high" aria-labelledby="trust-heading">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="font-mono text-xs uppercase tracking-wider text-secondary font-bold">
              Standar Integritas &amp; Mutu Pangan
            </span>
            <h2 id="trust-heading" className="font-serif text-3xl sm:text-4xl font-medium text-primary mt-2">
              Prinsip Kualitas yang Menjadi Fondasi MAN3
            </h2>
            <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
              Komitmen kami dalam menghadirkan bahan pangan berkualitas tinggi dibangun di atas transparansi, higienitas, dan kepedulian terhadap lingkungan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div data-reveal className="interactive-card rounded-xl border border-outline-variant/60 bg-white p-6 shadow-sm">
              <span className="text-xs font-mono font-bold uppercase text-secondary">Standar Higienitas</span>
              <p className="mt-2 font-semibold text-primary text-base">Keamanan Pangan Terstandar</p>
              <p className="mt-1 text-sm text-on-surface-variant leading-relaxed">
                Menerapkan prosedur penanganan higienis dan rantai dingin terawat untuk menjaga nutrisi serta kesegaran optimal produk pangan.
              </p>
            </div>
            <div data-reveal className="interactive-card rounded-xl border border-outline-variant/60 bg-white p-6 shadow-sm">
              <span className="text-xs font-mono font-bold uppercase text-secondary">Kemitraan Terpercaya</span>
              <p className="mt-2 font-semibold text-primary text-base">Kolaborasi Industri Kuliner</p>
              <p className="mt-1 text-sm text-on-surface-variant leading-relaxed">
                Menjadi mitra terpercaya bagi para chef, pemilik restoran, dan hotel yang mengutamakan cita rasa autentik serta bahan baku ramah lingkungan.
              </p>
            </div>
            <div data-reveal className="interactive-card rounded-xl border border-outline-variant/60 bg-white p-6 shadow-sm">
              <span className="text-xs font-mono font-bold uppercase text-secondary">Transparansi Asal</span>
              <p className="mt-2 font-semibold text-primary text-base">Ketertelusuran Berbasis Batch</p>
              <p className="mt-1 text-sm text-on-surface-variant leading-relaxed">
                Sistem pencatatan terstruktur yang memastikan kejelasan asal-usul, riwayat perawatan, dan jadwal panen setiap produk pangan.
              </p>
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
                Pangan Segar &amp; Berkualitas
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-primary mt-2">
                Koleksi Produk Pangan MAN3
              </h2>
            </div>
            <Link
              href="/kemitraan-b2b"
              className="inline-flex items-center gap-2 text-sm font-mono font-bold text-primary hover:text-primary-container"
            >
              <span>Pelajari Kemitraan B2B</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {initialProducts.map((prod) => (
              <div
                key={prod.id}
                data-reveal
                className="interactive-card flex flex-col bg-white rounded-2xl overflow-hidden border border-outline-variant/50 shadow-sm hover:shadow-lg transition-all group"
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
                      <span className="text-xs text-on-surface-variant">Mulai dari</span>
                      <p className="font-mono text-base font-bold text-primary">
                        {prod.price} <span className="text-xs font-normal text-on-surface-variant">{prod.unit}</span>
                      </p>
                    </div>

                    <Link
                      href={`/produk/daging-sapi-pasture-fed`}
                      className="p-2 rounded-lg bg-surface-container hover:bg-primary hover:text-white text-primary transition-colors"
                      title="Lihat spesifikasi produk"
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
                Wawasan Pangan &amp; Kelestarian Hayati
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant max-w-md">
              Artikel edukasi seputar agro-ekologi, sistem peternakan ramah alam, dan praktik konservasi berkelanjutan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((item) => (
              <article
                key={item.id}
                data-reveal
                className="interactive-card flex flex-col bg-surface-container-low rounded-2xl overflow-hidden border border-surface-container shadow-sm hover:shadow-md transition-all group"
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

                  <div className="mt-6 pt-4 border-t border-surface-container flex items-center justify-between text-xs font-mono font-bold">
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(item)}
                      className="inline-flex items-center gap-1.5 text-primary hover:text-primary-container group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Article Detail Modal */}
          {selectedArticle && (
            <div
              role="dialog"
              aria-modal="true"
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            >
              <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-outline-variant max-h-[90vh] flex flex-col">
                <div className="relative w-full aspect-[16/9] bg-surface-container shrink-0">
                  <img
                    src={selectedArticle.thumbnail_path}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                    aria-label="Tutup artikel"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-primary text-white font-mono text-xs font-bold uppercase shadow-sm">
                      {selectedArticle.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
                  <div className="flex items-center gap-3 text-xs text-on-surface-variant font-mono">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <time dateTime={selectedArticle.created_at}>
                        {new Date(selectedArticle.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {selectedArticle.author_name}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary leading-snug">
                    {selectedArticle.title}
                  </h3>

                  <p className="text-base text-on-surface-variant leading-relaxed font-medium">
                    {selectedArticle.excerpt}
                  </p>

                  <div className="pt-2 border-t border-surface-container text-sm sm:text-base text-on-surface leading-relaxed space-y-3">
                    <p>
                      {selectedArticle.content || selectedArticle.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(null)}
                      className="px-6 py-2.5 rounded-xl bg-primary text-white font-mono text-xs uppercase font-bold hover:bg-primary-container transition-colors"
                    >
                      Tutup Artikel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
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
                  Apakah Anda perwakilan restoran, hotel, komunitas pangan sehat, atau pelaku bisnis kuliner? Tim kemitraan MAN3 siap mendiskusikan kebutuhan pasokan Anda.
                </p>
              </div>

              {/* Direct Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-outline-variant/40">
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-2">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-on-surface-variant font-mono">Email Kemitraan</span>
                  <p className="text-sm font-semibold text-primary">{siteConfig.contact.email}</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-outline-variant/40">
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary mb-2">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-on-surface-variant font-mono">Kontak WhatsApp</span>
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
                  Sampaikan jenis komoditas, kebutuhan kuota pasokan, atau pertanyaan mengenai kemitraan ekosistem kami.
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
                      placeholder="Nama Anda"
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
                      placeholder="Nama usaha Anda"
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
                      placeholder="08xx-xxxx-xxxx"
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
                    placeholder="Ceritakan jenis produk pangan, volume pasokan yang diharapkan, atau konsultasi kemitraan..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-surface-container-low"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-lg bg-primary hover:bg-primary-container text-white font-mono text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  Kirim Permintaan Konsultasi
                </button>
                {contactDemoSent && (
                  <div role="status" className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-primary text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span>Terima kasih. Permintaan konsultasi kemitraan Anda telah kami terima. Tim MAN3 akan segera menghubungi Anda.</span>
                  </div>
                )}
              </form>
            </div>

            {/* Google Maps Embed & Location Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-white border border-outline-variant/40 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-secondary font-bold uppercase">
                  <MapPin className="w-4 h-4 text-secondary" />
                  Kawasan Konservasi &amp; Dataran Tinggi
                </div>
                <h3 className="font-serif text-2xl font-bold text-primary">
                  Kawasan Agrikultur Terpadu Jawa Barat
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {siteConfig.contact.address}
                </p>

                {/* Google Maps Iframe Embed with accessibility & lazy loading */}
                <div className="w-full h-[380px] rounded-xl overflow-hidden border border-outline-variant/60 shadow-inner relative bg-surface-container">
                  <iframe
                    title="Peta Lokasi Kawasan Konservasi MAN3 Jawa Barat"
                    aria-label="Peta kawasan agrikultur dan konservasi MAN3"
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
                    Akses lokasi terintegrasi dengan jalur distribusi strategis ke wilayah Jabodetabek.
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
