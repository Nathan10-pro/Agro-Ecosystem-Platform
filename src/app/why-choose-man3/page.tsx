import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ChevronRight,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Clock,
  Award,
  Lock,
  QrCode,
  Globe,
  ArrowRight,
} from "lucide-react";

export default function WhyChooseMan3Page() {
  const comparisonRows = [
    {
      parameter: "Metode Budidaya & Pakan",
      sub: "Standar agronomi hulu & pemeliharaan hewan",
      man3: "Konsep rotasi paddock & pemilihan hijauan sesuai lokasi",
      man3Desc: "Rancangan praktik masih perlu disesuaikan dengan kondisi lahan dan kebutuhan ternak.",
      conventional: "Praktik berbeda menurut produsen",
      conventionalDesc: "Metode produksi perlu dinilai berdasarkan informasi masing-masing pemasok.",
    },
    {
      parameter: "Ketertelusuran (Traceability)",
      sub: "Asal usul lot dan transparansi data panen",
      man3: "Rancangan pencatatan lot digital (belum aktif)",
      man3Desc: "Alur ketertelusuran masih dalam tahap desain dan belum dapat diverifikasi.",
      conventional: "Skema ketertelusuran bergantung pada pemasok",
      conventionalDesc: "Informasi asal produk sebaiknya dikonfirmasi langsung kepada pemasok terkait.",
    },
    {
      parameter: "Yield Dapur & Standar Potongan",
      sub: "Toleransi gramasi dan pembersihan silverskin",
      man3: "Spesifikasi produk dalam pengembangan",
      man3Desc: "Ukuran, mutu, dan hasil potong akan ditetapkan berdasarkan produk aktual.",
      conventional: "Spesifikasi bervariasi",
      conventionalDesc: "Bandingkan mutu berdasarkan spesifikasi produk dan kebutuhan usaha Anda.",
    },
    {
      parameter: "Stabilitas Harga & Pasokan",
      sub: "Kontrak jangka panjang dan mitigasi inflasi pangan",
      man3: "Model kemitraan sedang dirancang",
      man3Desc: "Harga, kuota, dan jadwal pasokan belum tersedia untuk pemesanan nyata.",
      conventional: "Skema harga berbeda menurut pemasok",
      conventionalDesc: "Konfirmasikan harga dan ketersediaan langsung kepada pemasok.",
    },
    {
      parameter: "Dampak Ekologis & Nilai ESG",
      sub: "Keberlanjutan tanah, air, dan masyarakat",
      man3: "Konsep konservasi belum diverifikasi",
      man3Desc: "Lokasi, luas, dan dampak program belum dikonfirmasi.",
      conventional: "Praktik berbeda menurut produsen",
      conventionalDesc: "Klaim dampak lingkungan memerlukan bukti dan konteks yang dapat diperiksa.",
    },
  ];

  const pillars = [
    {
      num: "01",
      title: "Presisi Trimming & Yield Dapur Maksimal",
      desc: "Parameter pemotongan dan seleksi produk akan ditentukan setelah produk dan fasilitas terverifikasi.",
      stat: "Spesifikasi dalam pengembangan",
    },
    {
      num: "02",
      title: "Pengiriman Subuh Terjadwal (04:30 - 06:00 WIB)",
      desc: "Rute, armada, dan jadwal pengiriman belum tersedia.",
      stat: "Logistik belum aktif",
    },
    {
      num: "03",
      title: "Sertifikasi & Kepatuhan",
      desc: "Belum ada sertifikasi yang diklaim pada prototipe ini. Informasi lembaga dan nomor sertifikat akan ditambahkan setelah diverifikasi.",
      stat: "Belum diverifikasi",
    },
    {
      num: "04",
      title: "Kontrak Kuota Terkunci & Harga Stabil",
      desc: "Ketentuan harga dan volume pasokan akan diumumkan setelah program kemitraan tersedia.",
      stat: "Belum tersedia",
    },
    {
      num: "05",
      title: "Traceability Digital Single-Estate",
      desc: "Fitur ketertelusuran berbasis lot masih berupa rancangan dan belum dapat digunakan.",
      stat: "Rancangan fitur",
    },
    {
      num: "06",
      title: "Kontribusi Nyata pada Konservasi Alam",
      desc: "Rencana konservasi dan mekanisme dukungannya masih dalam pengembangan.",
      stat: "Program belum aktif",
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
            <span className="text-primary font-bold">Why Choose MAN3</span>
          </nav>
          <div className="flex items-center gap-2 bg-surface-container-highest px-3 py-1 rounded-full text-primary font-semibold">
            <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
            <span>Nilai Komparatif &amp; Standar Mutu Industri</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wider">
            Komparasi &amp; Integritas Pasokan
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-primary tracking-tight leading-tight">
            Standar Keunggulan yang Membedakan MAN3
          </h1>
          <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
            Di tengah maraknya klaim organik tanpa verifikasi, MAN3 menawarkan kepastian ilmiah, yield penggunaan bahan yang superior, dan komitmen perlindungan ekosistem yang terukur.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-12 bg-white rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
          <div className="p-6 bg-surface-container-low border-b border-surface-container">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-primary">
              Tabel Komparasi: MAN3 vs Pasokan Konvensional
            </h2>
            <p className="text-xs text-on-surface-variant font-mono mt-1">
              Parameter kunci yang dinilai oleh para Director of Culinary dan Tim Purchasing Perhotelan.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-container text-xs font-mono uppercase bg-surface-container-low/60">
                  <th className="py-4 px-6 w-1/4 font-bold text-on-surface-variant">Parameter Kunci</th>
                  <th className="py-4 px-6 w-3/8 font-bold text-primary bg-surface-container/60">
                    MAN3 Agro-Ecosystem Platform
                  </th>
                  <th className="py-4 px-6 w-3/8 font-bold text-on-surface-variant">
                    Suplai Konvensional Pasar Induk
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container text-xs">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="py-5 px-6 align-top">
                      <p className="font-bold text-sm text-primary">{row.parameter}</p>
                      <span className="text-[11px] text-on-surface-variant block mt-1">{row.sub}</span>
                    </td>
                    <td className="py-5 px-6 align-top bg-surface-container-low/20">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-sm text-primary">{row.man3}</p>
                          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{row.man3Desc}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6 align-top text-on-surface-variant">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-outline shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm text-on-surface">{row.conventional}</p>
                          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                            {row.conventionalDesc}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6 Core Pillars */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-surface-container-high">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wider">
            Standard of Excellence
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-primary mt-1">
            6 Pilar Mengapa MAN3 Menjadi Tolok Ukur Baru Industri Pangan B2B
          </h2>
          <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
            Dirancang khusus untuk memangkas ketidakpastian operasional para Executive Chef, F&amp;B Director, dan tim purchasing korporat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((p) => (
            <div
              key={p.num}
              className="bg-white p-7 rounded-2xl border border-outline-variant/40 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wider">
                  Pilar {p.num}
                </span>
                <h3 className="font-serif text-xl font-bold text-primary mt-1.5">{p.title}</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-3 leading-relaxed">{p.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-surface-container flex items-center justify-between text-xs font-mono font-bold text-primary">
                <span>{p.stat}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
