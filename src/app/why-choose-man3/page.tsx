import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  HeartHandshake,
  Leaf,
  Layers,
  ThermometerSnowflake,
  Award,
} from "lucide-react";

export default function WhyChooseMan3Page() {
  const comparisonRows = [
    {
      parameter: "Metode Budidaya & Tanah",
      sub: "Pendekatan agronomi dan kesuburan lahan",
      man3: "Sistem Agro-Ekologi Terpadu",
      man3Desc: "Menggunakan pupuk kompos alami, tanaman penutup tanah, dan refugia berbunga untuk menyuburkan tanah dan menjaga keseimbangan ekosistem secara alami.",
      conventional: "Monokultur Intensif Konvensional",
      conventionalDesc: "Ketergantungan tinggi pada pupuk kimia buatan dan pestisida sintetis yang berisiko menurunkan kegemburan tanah jangka panjang.",
    },
    {
      parameter: "Pakan & Kesejahteraan Ternak",
      sub: "Kondisi pemeliharaan dan nutrisi hewan",
      man3: "100% Pasture-Fed & Penggembalaan Bergilir",
      man3Desc: "Ternak bebas merumput di padang rumput alami dengan rotasi petak berkala, bebas stres, dan tidak diberikan hormon pertumbuhan sintetis.",
      conventional: "Sistem Penggemukan Kandang (Feedlot)",
      conventionalDesc: "Pakan dominan konsentrat biji-bijian olahan dengan ruang gerak ternak terbatas, rentan memicu stres pada ternak.",
    },
    {
      parameter: "Kualitas & Keamanan Pangan",
      sub: "Karakter nutrisi dan kebersihan bahan",
      man3: "Pangan Bernutrisi Utuh & Higienis",
      man3Desc: "Daging dengan profil asam lemak alami seimbang, tekstur padat empuk alami, serta sayuran segar tanpa residu zat kimia berbahaya.",
      conventional: "Standar Kuantitas Komoditas",
      conventionalDesc: "Fokus pada bobot panen cepat, sering kali menghasilkan kadar lemak jenuh lebih tinggi dan risiko residu kimia pada produk akhir.",
    },
    {
      parameter: "Dampak Lingkungan & Alam",
      sub: "Hubungan kegiatan produksi dengan alam",
      man3: "Konservasi Hayati & Pelestarian Air",
      man3Desc: "Menjaga koridor hijau alami, memulihkan siklus air pegunungan, dan menyediakan habitat aman bagi fauna serta mikroorganisme lokal.",
      conventional: "Eksploitasi Lahan Tanpa Koridor",
      conventionalDesc: "Pembukaan lahan monokultur skala luas tanpa zona penyangga konservasi, mempercepat risiko erosi dan kepunahan keanekaragaman hayati.",
    },
    {
      parameter: "Transparansi & Ketertelusuran",
      sub: "Asal-usul produk dan kepastian pasokan",
      man3: "Ketertelusuran Berbasis Batch",
      man3Desc: "Pencatatan lot terstruktur dari padang gembala hingga pemotongan presisi, memudahkan verifikasi mutu oleh para mitra chef dan restoran.",
      conventional: "Rantai Pasok Perantara Panjang",
      conventionalDesc: "Asal-usul komoditas sering bercampur di berbagai perantara pasar, sehingga riwayat pemeliharaan sulit ditelusuri dengan pasti.",
    },
  ];

  const pillars = [
    {
      num: "01",
      title: "Nutrisi Alami Berkualitas Tinggi",
      desc: "Hasil panen segar dan daging sapi pasture-fed kaya nutrisi alami yang dihasilkan dari tanah sehat dan pakan rumput pegunungan pilihan.",
      icon: Leaf,
    },
    {
      num: "02",
      title: "Rantai Dingin & Higienitas Terjaga",
      desc: "Proses penanganan pascapanen higienis dengan kontrol suhu rantai dingin presisi untuk menjaga kesegaran optimal hingga ke tangan konsumen.",
      icon: ThermometerSnowflake,
    },
    {
      num: "03",
      title: "Pemotongan Presisi Standar Kuliner",
      desc: "Potongan daging presisi sesuai spesifikasi dapur komersial, hotel, dan restoran untuk efisiensi preparasi serta konsistensi rasa.",
      icon: Award,
    },
    {
      num: "04",
      title: "Ketertelusuran Asal Produk",
      desc: "Setiap batch komoditas memiliki riwayat pencatatan lot yang jelas, memberikan rasa aman dan kepercayaan bagi mitra kuliner.",
      icon: Layers,
    },
    {
      num: "05",
      title: "Komitmen Nyata Konservasi Lingkungan",
      desc: "Setiap pembelian mendukung perlindungan koridor hijau pegunungan, konservasi mata air, dan pemulihan keanekaragaman hayati.",
      icon: Sparkles,
    },
    {
      num: "06",
      title: "Kemitraan B2B yang Fleksibel & Andal",
      desc: "Dukungan pasokan terjadwal, alokasi panen berkala, dan konsultasi spesifikasi khusus yang disesuaikan dengan kebutuhan usaha kuliner Anda.",
      icon: HeartHandshake,
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
            <span className="text-primary font-bold">Mengapa MAN3</span>
          </nav>
          <div className="flex items-center gap-2 bg-surface-container-highest px-3 py-1 rounded-full text-primary font-semibold">
            <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
            <span>Standar Keunggulan Agro-Ekologi</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wider">
            Keunggulan Kompetitif &amp; Nilai Inti
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-primary tracking-tight leading-tight">
            Mengapa Memilih Ekosistem MAN3?
          </h1>
          <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
            MAN3 menghadirkan pendekatan terpadu antara peternakan ramah alam berbasis padang rumput, budidaya tanaman alami, dan pelestarian koridor konservasi hayati. Kami memastikan setiap bahan pangan yang Anda sajikan tidak hanya bermutu unggul, tetapi juga selaras dengan kelestarian alam.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-12 bg-white rounded-3xl border border-outline-variant/50 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 bg-surface-container-low border-b border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-primary">
                Perbandingan Pendekatan MAN3 vs Pertanian Konvensional
              </h2>
              <p className="text-xs text-on-surface-variant font-mono mt-1">
                Komparasi nilai dan dampak antara sistem regeneratif holistik MAN3 dan sistem industri konvensional.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary text-white font-mono text-xs font-bold shrink-0">
              <ShieldCheck className="w-4 h-4 text-tertiary-fixed" />
              Nilai Berkelanjutan
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-surface-container text-xs font-mono uppercase bg-surface-container-low/60">
                  <th className="py-4 px-6 w-1/4 font-bold text-on-surface-variant">Parameter Utama</th>
                  <th className="py-4 px-6 w-3/8 font-bold text-primary bg-primary/5">
                    Pendekatan Terpadu MAN3
                  </th>
                  <th className="py-4 px-6 w-3/8 font-bold text-on-surface-variant">
                    Sistem Konvensional Biasa
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
                    <td className="py-5 px-6 align-top bg-primary/5">
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-sm text-primary">{row.man3}</p>
                          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{row.man3Desc}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6 align-top text-on-surface-variant">
                      <div className="flex items-start gap-2.5">
                        <ArrowRight className="w-4 h-4 text-outline-variant shrink-0 mt-0.5" />
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

      {/* 6 Pillars of Excellence */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-surface-container-high">
        <div className="max-w-2xl mb-12">
          <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wider">
            Pilar Keunggulan
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-primary mt-1">
            Enam Pilar Nilai Tambah MAN3
          </h2>
          <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
            Bagaimana ekosistem bio-agri MAN3 memberikan manfaat langsung bagi bisnis kuliner, konsumen, dan kelestarian bumi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                className="bg-white p-7 rounded-2xl border border-outline-variant/40 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary mb-5">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wider">
                    Pilar {p.num}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-primary mt-1.5">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant mt-3 leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-surface-container flex items-center justify-between text-xs font-mono font-bold text-primary">
                  <span>Standar MAN3</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-primary text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Siap Bermitra dengan Ekosistem Pangan Berkelanjutan?
            </h3>
            <p className="text-sm text-primary-fixed-dim/90 max-w-xl">
              Hubungi tim kemitraan kami untuk mendapatkan katalog spesifikasi, jadwal ketersediaan panen, dan penawaran kerja sama B2B.
            </p>
          </div>
          <Link
            href="/kemitraan-b2b#onboarding-form"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white text-primary hover:bg-tertiary-fixed font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-md shrink-0"
          >
            Mulai Kemitraan B2B
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
