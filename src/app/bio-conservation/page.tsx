import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Sparkles,
  Leaf,
  Microscope,
} from "lucide-react";

export default function BioConservationPage() {
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
            <span className="text-[#0F3D2E] font-bold">Panduan Konsep &amp; Desain</span>
          </nav>
          <div className="text-[11px] font-mono text-[#6B726C]">
            Standar Integritas &amp; Komunikasi
          </div>
        </div>
      </div>

      {/* Hero Manifesto */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="max-w-3xl space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A4B2A] font-semibold block">
            Panduan Brand &amp; Komunikasi
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#0F3D2E] tracking-tight leading-tight">
            Prinsip Desain &amp; Komunikasi MAN3
          </h1>
          <p className="text-base text-[#4E5752] leading-relaxed">
            Panduan prinsip komunikasi visual dan integritas informasi dalam ekosistem MAN3 — mengedepankan kejelasan data, kejujuran sains, dan kesederhanaan bahasa bagi konsumen maupun mitra Horeca.
          </p>
        </div>

        {/* Content principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-[#FBFBF9] p-6 sm:p-8 rounded-[4px] border border-[#E5E5DE] space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-[2px] bg-[#E8F3ED] flex items-center justify-center text-[#0F3D2E]">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F3D2E]">Jelas &amp; Terukur</h3>
            <p className="text-xs text-[#4E5752] leading-relaxed">
              Gunakan kalimat lugas untuk menjelaskan metode pemeliharaan, spesifikasi potongan daging, serta jadwal distribusi tanpa istilah berlebihan.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#7A4B2A] font-semibold">
              • Hindari klaim tanpa data faktual
            </div>
          </div>

          <div className="bg-[#FBFBF9] p-6 sm:p-8 rounded-[4px] border border-[#E5E5DE] space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-[2px] bg-[#E8F3ED] flex items-center justify-center text-[#0F3D2E]">
              <Microscope className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F3D2E]">Jujur &amp; Transparan</h3>
            <p className="text-xs text-[#4E5752] leading-relaxed">
              Identifikasi status data secara terbuka antara model konsep spasial, purwarupa sistem, dan data operasional definitif.
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#7A4B2A] font-semibold">
              • Menolak manipulasi klaim keberlanjutan
            </div>
          </div>

          <div className="bg-[#FBFBF9] p-6 sm:p-8 rounded-[4px] border border-[#E5E5DE] space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-[2px] bg-[#E8F3ED] flex items-center justify-center text-[#0F3D2E]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F3D2E]">Sederhana &amp; Berorientasi Solusi</h3>
            <p className="text-xs text-[#4E5752] leading-relaxed">
              Fokus pada penyediaan pasokan bernilai tambah, stabilitas harga kontrak B2B, dan jaminan kesegaran rantai dingin (cold chain).
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#7A4B2A] font-semibold">
              • Mengutamakan kebutuhan dapur mitra
            </div>
          </div>
        </div>
      </section>

      {/* Palette & Tokens Showcase */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-[#E5E5DE]">
        <h2 className="font-serif text-2xl font-bold text-[#0F3D2E] mb-6">
          Palet Warna B2B MAN3
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-[4px] bg-[#0F3D2E] text-white space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#A3D4B6] font-bold">Primary Accent</span>
            <h4 className="font-serif text-lg font-bold">#0F3D2E • Deep Forest</h4>
            <p className="text-xs text-white/75 leading-relaxed">
              Warna utama untuk judul tajuk, tombol aksi utama, dan identitas brand.
            </p>
          </div>

          <div className="p-5 rounded-[4px] bg-[#7A4B2A] text-white space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#FFEDE2] font-bold">Secondary Accent</span>
            <h4 className="font-serif text-lg font-bold">#7A4B2A • Warm Earth</h4>
            <p className="text-xs text-white/75 leading-relaxed">
              Warna aksen hangat untuk label kategori, penekanan angka, dan pilar.
            </p>
          </div>

          <div className="p-5 rounded-[4px] bg-[#FBFBF9] text-[#141A17] border border-[#E5E5DE] space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#7A4B2A] font-bold">Neutral Surface</span>
            <h4 className="font-serif text-lg font-bold">#FBFBF9 • Off-White</h4>
            <p className="text-xs text-[#4E5752] leading-relaxed">
              Latar belakang lembut untuk kartu konten, tabel, dan formulir pengadaan.
            </p>
          </div>

          <div className="p-5 rounded-[4px] bg-[#FFFFFF] text-[#141A17] border border-[#E5E5DE] space-y-2">
            <span className="text-[10px] font-mono uppercase text-[#6B726C] font-bold">Clean Canvas</span>
            <h4 className="font-serif text-lg font-bold">#FFFFFF • Pure White</h4>
            <p className="text-xs text-[#4E5752] leading-relaxed">
              Kanvas bersih untuk meningkatkan keterbacaan data produk dan tabel angka.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
