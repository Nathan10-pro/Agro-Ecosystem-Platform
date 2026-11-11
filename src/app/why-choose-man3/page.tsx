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
      man3: "100% Padang Gembala Bebas Kimia & Tanaman Refugia Hayati",
      man3Desc: "Tanpa hormon pertumbuhan, antibiotik profilaksis, atau pestisida sintetis.",
      conventional: "Pemberian Pakan Campuran & Pestisida Kimia Berkala",
      conventionalDesc: "Kerap menyisakan residu kimia dan profil asam lemak tidak seimbang.",
    },
    {
      parameter: "Ketertelusuran (Traceability)",
      sub: "Asal usul lot dan transparansi data panen",
      man3: "Single-Estate Lot QR Code Digital",
      man3Desc: "Setiap paket dapat dilacak hingga tanggal panen, paddock asal, dan hasil uji lab mikrobiologi.",
      conventional: "Bahan Baku Campuran Pasar Induk (Multi-Aggregator)",
      conventionalDesc: "Sulit mengidentifikasi sumber asli bila terjadi kendala keamanan pangan.",
    },
    {
      parameter: "Yield Dapur & Standar Potongan",
      sub: "Toleransi gramasi dan pembersihan silverskin",
      man3: "Presisi Trimming Standar Chef (Yield 98.2%)",
      man3Desc: "Potongan rapi bebas lemak berlebih, menghemat waktu preparasi dapur dan memangkas limbah food waste.",
      conventional: "Potongan Kasar Pasar Tradisional (Yield ~82%)",
      conventionalDesc: "Memerlukan waktu kerja butcher dapur tambahan dan membuang 15-20% bobot kotor.",
    },
    {
      parameter: "Stabilitas Harga & Pasokan",
      sub: "Kontrak jangka panjang dan mitigasi inflasi pangan",
      man3: "Kontrak Kuota Terkunci 6–12 Bulan",
      man3Desc: "Harga tetap stabil tanpa terpengaruh fluktuasi cuaca ekstrem atau spekulan pasar.",
      conventional: "Harga Spot Fluktuatif Harian",
      conventionalDesc: "Rentan lonjakan mendadak pada musim liburan dan pergantian musim tanam.",
    },
    {
      parameter: "Dampak Ekologis & Nilai ESG",
      sub: "Keberlanjutan tanah, air, dan masyarakat",
      man3: "Konservasi 1.200 Hektar Net-Positif",
      man3Desc: "Menjadi aset narasi ESG dan kepedulian lingkungan yang kuat pada menu restoran Anda.",
      conventional: "Monokultur & Pengikisan Unsur Hara Tanah",
      conventionalDesc: "Degradasi jangka panjang tanpa komitmen regenerasi ekosistem.",
    },
  ];

  const pillars = [
    {
      num: "01",
      title: "Presisi Trimming & Yield Dapur Maksimal",
      desc: "Semua produk melewati seleksi grade ketat di fasilitas kami, menghemat hingga 14% dari alokasi budget food waste dapur restoran Anda.",
      stat: "Hemat s/d 14% Limbah Dapur",
    },
    {
      num: "02",
      title: "Pengiriman Subuh Terjadwal (04:30 - 06:00 WIB)",
      desc: "Armada berpendingin MAN3 tiba di dok penerimaan hotel sebelum briefing dapur pagi. Bahan pangan tiba renyah dan segar seketika.",
      stat: "Ketepatan Waktu 99.4%",
    },
    {
      num: "03",
      title: "Akreditasi & Kepatuhan Regulasi Penuh",
      desc: "Lengkap dengan sertifikasi SNI 6729 Organik, Halal BPJPH, HACCP Codex Alimentarius, dan ISO 22000 Manajemen Keamanan Pangan.",
      stat: "100% Siap Audit Korporat",
    },
    {
      num: "04",
      title: "Kontrak Kuota Terkunci & Harga Stabil",
      desc: "Menjamin ketersediaan volume panen mingguan tanpa takut lonjakan harga ekstrem akibat anomali cuaca nasional.",
      stat: "Stabilitas 6-12 Bulan",
    },
    {
      num: "05",
      title: "Traceability Digital Single-Estate",
      desc: "Konsumen dapat memindai QR Code untuk melihat laporan tanah, uji bebas pestisida, dan sertifikat kesehatan ternak.",
      stat: "Transparansi 100%",
    },
    {
      num: "06",
      title: "Kontribusi Nyata pada Konservasi Alam",
      desc: "Setiap pembelian bahan pangan mendukung langsung perlindungan satwa endemik dan mata air Gunung Gede-Pangrango.",
      stat: "1.200 Ha Terlindungi",
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
