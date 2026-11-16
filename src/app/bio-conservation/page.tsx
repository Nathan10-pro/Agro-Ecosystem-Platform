import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Leaf,
  Layers,
  Palette,
  Atom,
  Microscope,
  CheckCircle2,
} from "lucide-react";

export default function BioConservationPage() {
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
            <span className="text-primary font-bold">Panduan Konsep</span>
          </nav>
          <div className="flex items-center gap-2 bg-surface-container-highest px-3 py-1 rounded-full text-primary font-semibold">
            <span className="w-2 h-2 rounded-full bg-primary/60"></span>
            <span>Standar Desain & Konsep</span>
          </div>
        </div>
      </div>

      {/* Hero Manifesto */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wider">
            Panduan Konsep
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-primary tracking-tight leading-tight">
            Prinsip Desain & Komunikasi MAN3
          </h1>
          <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
            Panduan prinsip komunikasi visual dan integritas informasi dalam ekosistem MAN3 — mengedepankan kejelasan, kejujuran ilmiah, dan kesederhanaan bahasa bagi konsumen maupun mitra.
          </p>
        </div>

        {/* Content principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary">Jelas</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Gunakan kalimat langsung untuk menjelaskan kegiatan, lokasi, dan status informasi.
            </p>
            <div className="pt-2 text-xs font-mono text-secondary font-bold">
              • Hindari klaim tanpa bukti
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <Microscope className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary">Terbuka</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Tandai data contoh dan jelaskan bila suatu fitur atau layanan belum tersedia.
            </p>
            <div className="pt-2 text-xs font-mono text-secondary font-bold">
              • Tautkan data yang dapat diperiksa
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary">Sederhana</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Hindari istilah teknis yang tidak membantu pembaca memahami produk atau cara kerja.
            </p>
            <div className="pt-2 text-xs font-mono text-secondary font-bold">
              • Utamakan informasi yang relevan
            </div>
          </div>
        </div>
      </section>

      {/* Palette & Tokens Showcase */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-surface-container-high">
        <h2 className="font-serif text-3xl font-medium text-primary mb-8">
          Palet Warna MAN3
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-primary text-white space-y-3">
            <span className="text-xs font-mono uppercase text-primary-fixed">Primary Color</span>
            <h4 className="font-serif text-xl font-bold">#1B4332 • Hijau tua</h4>
            <p className="text-xs text-primary-fixed-dim/90 leading-relaxed">
              Warna utama untuk judul, tombol, dan elemen navigasi.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-secondary text-white space-y-3">
            <span className="text-xs font-mono uppercase text-secondary-fixed">Secondary Color</span>
            <h4 className="font-serif text-xl font-bold">#885039 • Cokelat tanah</h4>
            <p className="text-xs text-secondary-fixed-dim/90 leading-relaxed">
              Warna aksen untuk label dan penekanan informasi.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-high text-primary border border-surface-container space-y-3">
            <span className="text-xs font-mono uppercase text-secondary font-bold">Tertiary Color</span>
            <h4 className="font-serif text-xl font-bold">#52B788 • Hijau muda</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Warna pendukung untuk elemen antarmuka.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-low text-primary border border-surface-container space-y-3">
            <span className="text-xs font-mono uppercase text-on-surface-variant">Neutral Surface</span>
            <h4 className="font-serif text-xl font-bold">#E8FFEF • Latar terang</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Warna latar untuk area konten.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
