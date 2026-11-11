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
            <span className="text-primary font-bold">Organic Modernism &amp; Bio-Conservation</span>
          </nav>
          <div className="flex items-center gap-2 bg-surface-container-highest px-3 py-1 rounded-full text-primary font-semibold">
            <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
            <span>Design System &amp; Ecological Manifesto</span>
          </div>
        </div>
      </div>

      {/* Hero Manifesto */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wider">
            Filosofi Desain &amp; Landasan Ekologis
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-primary tracking-tight leading-tight">
            Organic Modernism &amp; Editorial Bio-Tech
          </h1>
          <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
            Sistem desain MAN3 merefleksikan perpaduan antara kearifan biologi tanah purba dengan presisi sains modern. Kami menolak tampilan teknologi yang steril maupun estetika agrikultur yang usang — menghadirkan keanggunan editorial majalah dunia dengan visualisasi data hayati yang terukur.
          </p>
        </div>

        {/* 3 Core Aesthetic Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[28px]">nature</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary">Authoritative &amp; Grounded</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Berakar pada pemulihan mikrobioma tanah humus, konservasi air pegunungan, dan integritas ketertelusuran rantai pasok yang tidak dapat dikompromikan.
            </p>
            <div className="pt-2 text-xs font-mono text-secondary font-bold">
              • Menolak Greenwashing &amp; Klaim Hampa
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <Microscope className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary">Innovative &amp; Progressive</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Menghadirkan transparansi metrik telemetri tanah, kode lot lot QR digital, dan kontrol suhu logistik rantai dingin tanpa kehilangan kehangatan nilai-nilai organik.
            </p>
            <div className="pt-2 text-xs font-mono text-secondary font-bold">
              • Sains Presisi Berpadu Alam Hayati
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary">Sensory &amp; Natural</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Membangkitkan aroma tanah humus basah, dedaunan segar di ketinggian 1.400 mdpl, dan kemurnian rasa bahan pangan yang dirawat secara bermartabat.
            </p>
            <div className="pt-2 text-xs font-mono text-secondary font-bold">
              • Pengalaman Rasa &amp; Integritas Estetika
            </div>
          </div>
        </div>
      </section>

      {/* Palette & Tokens Showcase */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-surface-container-high">
        <h2 className="font-serif text-3xl font-medium text-primary mb-8">
          Palet Warna Berbasis Siklus Kehidupan Agraria
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-primary text-white space-y-3">
            <span className="text-xs font-mono uppercase text-primary-fixed">Primary Color</span>
            <h4 className="font-serif text-xl font-bold">#1B4332 • Deep Forest Green</h4>
            <p className="text-xs text-primary-fixed-dim/90 leading-relaxed">
              Warna kanopi hutan lebat lereng gunung. Melambangkan otoritas, naungan hayati, dan keteguhan prinsip regeneratif.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-secondary text-white space-y-3">
            <span className="text-xs font-mono uppercase text-secondary-fixed">Secondary Color</span>
            <h4 className="font-serif text-xl font-bold">#885039 • Terracotta Soil</h4>
            <p className="text-xs text-secondary-fixed-dim/90 leading-relaxed">
              Warna tanah mineral subur dan pot semai terakota. Digunakan untuk indikator B2B dan aksen gastronomi panggang.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-high text-primary border border-surface-container space-y-3">
            <span className="text-xs font-mono uppercase text-secondary font-bold">Tertiary Color</span>
            <h4 className="font-serif text-xl font-bold">#52B788 • Vibrant Sprout Green</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Warna tunas pertama pasca-semai. Melambangkan vitalitas aktif, kepatuhan audit hijau, dan kesegaran seluler panen.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-low text-primary border border-surface-container space-y-3">
            <span className="text-xs font-mono uppercase text-on-surface-variant">Neutral Surface</span>
            <h4 className="font-serif text-xl font-bold">#E8FFEF • Soft Canvas Alabaster</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Latar belakang bernapas lembut yang menggantikan warna putih silau, memberikan kenyamanan membaca laporan data ilmiah.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
