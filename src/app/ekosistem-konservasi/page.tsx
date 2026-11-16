import React from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Mountain, Trees, Flower2, Recycle, PawPrint, ArrowRight } from "lucide-react";

export default function EkosistemKonservasiPage() {
  const zones = [
    {
      num: "Zona 01",
      name: "Koridor Konservasi Alami",
      area: "Zona Inti Konservasi",
      role: "Perlindungan Mata Air & Hutan Penyangga",
      desc: "Kawasan hutan lindung dan sempadan aliran air yang dijaga keasriannya demi mempertahankan resapan air pegunungan, mencegah bahaya erosi, dan menyediakan habitat terlindung bagi flora dan fauna endemik.",
      highlights: ["Perlindungan Mata Air", "Penahan Erosi Alami", "Habitat Keanekaragaman Hayati"],
    },
    {
      num: "Zona 02",
      name: "Wanatani & Kebun Hortikultura",
      area: "Zona Budidaya Alami",
      role: "Pertanian Sayur & Pangan Berkelanjutan",
      desc: "Area kebun dataran tinggi yang membudidayakan aneka sayuran segar dan tanaman hortikultura dengan irigasi mata air alami serta penataan terasering ramah lereng.",
      highlights: ["Bebas Residu Kimia", "Irigasi Mata Air", "Tanaman Bunga Refugia"],
    },
    {
      num: "Zona 03",
      name: "Padang Gembala Bergilir",
      area: "Zona Peternakan Ramah Alam",
      role: "Pasture-Fed Terencana & Kesejahteraan Hewan",
      desc: "Hamparan rumput hijau yang dibagi ke dalam petak rotasi berkala, memungkinkan ternak sapi bebas bergerak dan merumput alami, sekaligus memberikan waktu istirahat bagi tanah untuk memulihkan kesuburannya.",
      highlights: ["100% Pasture-Fed", "Rotasi Petak Berkelanjutan", "Kesejahteraan Ternak Alami"],
    },
    {
      num: "Zona 04",
      name: "Pusat Kompos & Pemulihan Tanah",
      area: "Zona Sirkular Nutrisi",
      role: "Pengolahan Bahan Organik & Kesuburan Lahan",
      desc: "Fasilitas pengolahan biomassa sisa tanaman dan kotoran ternak menjadi pupuk kompos alami kaya nutrisi yang dikembalikan ke seluruh area budidaya untuk memperkaya mikrobioma tanah.",
      highlights: ["Kompos Organik Alami", "Siklus Nutrisi Tertutup", "Kesuburan Tanah Berkelanjutan"],
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
            <span>Harmoni Alam &amp; Konservasi Hayati</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wider">
            Tata Kelola Lahan Holistik
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-primary tracking-tight leading-tight">
            Konsep Koridor Agro-Ekologi Terpadu
          </h1>
          <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
            MAN3 menerapkan pembagian zonasi ekologis yang saling terhubung untuk memastikan kegiatan produksi pangan berjalan berdampingan secara harmonis dengan pelestarian hutan dan keanekaragaman hayati.
          </p>
        </div>

        {/* Illustrative landscape and area descriptions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-12">
          {/* Visual Map */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden shadow-xl bg-surface-container border border-surface-container-high">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80"
                alt="Bentang alam pegunungan kawasan konservasi MAN3"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/25 mix-blend-multiply"></div>

              {/* Pin Hotspots */}
              <div className="absolute top-6 left-8 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-md border border-white/50">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  Zona Konservasi Primer
                </div>
                <span className="text-[11px] text-on-surface-variant block mt-0.5">
                  Perlindungan Mata Air Pegunungan
                </span>
              </div>

              <div className="absolute top-1/2 left-1/3 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-md border border-white/50">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  Wanatani &amp; Hortikultura
                </div>
                <span className="text-[11px] text-on-surface-variant block mt-0.5">
                  Kebun Sayur &amp; Pohon Peneduh
                </span>
              </div>

              <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-md border border-white/50">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container"></span>
                  Padang Gembala Terbuka
                </div>
                <span className="text-[11px] text-on-surface-variant block mt-0.5">
                  Penggembalaan Bergilir Alami
                </span>
              </div>
            </div>

            {/* Field information */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-outline-variant/50 shadow-sm">
              <span className="text-xs font-mono text-on-surface-variant uppercase tracking-wider block mb-4 font-bold">
                Karakteristik Wilayah &amp; Ekosistem
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container">
                  <span className="text-xs font-mono text-secondary font-bold">Kawasan</span>
                  <p className="font-bold text-sm text-primary mt-1">Dataran Tinggi</p>
                  <span className="text-[11px] text-on-surface-variant">Iklim sejuk pegunungan</span>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container">
                  <span className="text-xs font-mono text-secondary font-bold">Tata Kelola</span>
                  <p className="font-bold text-sm text-primary mt-1">Agro-Ekologi</p>
                  <span className="text-[11px] text-on-surface-variant">Siklus tertutup alami</span>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container">
                  <span className="text-xs font-mono text-primary font-bold">Vegetasi</span>
                  <p className="font-bold text-sm text-primary mt-1">Hayati Campuran</p>
                  <span className="text-[11px] text-on-surface-variant">Pohon &amp; bunga refugia</span>
                </div>
                <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container">
                  <span className="text-xs font-mono text-primary font-bold">Keanekaragaman</span>
                  <p className="font-bold text-sm text-primary mt-1">Koridor Hayati</p>
                  <span className="text-[11px] text-on-surface-variant">Habitat fauna lokal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Zonasi Cards */}
          <div className="lg:col-span-5 space-y-4">
            {zones.map((z) => (
              <div
                key={z.num}
                className="bg-white p-6 rounded-3xl border border-outline-variant/40 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-secondary font-bold">{z.num}</span>
                  <span className="bg-surface-container px-2.5 py-0.5 rounded text-primary font-semibold">
                    {z.area}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-primary mt-1">{z.name}</h3>
                <p className="text-xs text-secondary font-medium font-mono mt-0.5">{z.role}</p>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-2.5 leading-relaxed">{z.desc}</p>
                <div className="mt-4 pt-3 border-t border-surface-container flex flex-wrap gap-1.5">
                  {z.highlights.map((h) => (
                    <span
                      key={h}
                      className="text-[10px] font-mono bg-surface-container-low px-2.5 py-1 rounded text-primary font-medium"
                    >
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
