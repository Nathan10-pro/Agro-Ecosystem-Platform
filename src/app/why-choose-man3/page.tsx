import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  ArrowRight,
  Leaf,
  Layers,
  Award,
  ThermometerSnowflake,
  ShieldCheck,
  HeartHandshake,
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
      conventionalDesc: "Pembukaan lahan monokultur skala luas tanpa zona penyangga konservasi, mempercepat risiko erosi dan degradasi hayati.",
    },
    {
      parameter: "Transparansi & Ketertelusuran",
      sub: "Asal-usul produk dan kepastian pasokan",
      man3: "Ketertelusuran Berbasis Batch Digital",
      man3Desc: "Pencatatan lot terstruktur dari padang gembala hingga pemotongan presisi, memudahkan verifikasi mutu oleh para mitra chef dan restoran.",
      conventional: "Rantai Pasok Perantara Panjang",
      conventionalDesc: "Asal-usul komoditas sering bercampur di berbagai perantara pasar, sehingga riwayat pemeliharaan sulit ditelusuri dengan pasti.",
    },
  ];

  const pillars = [
    {
      num: "01",
      title: "Nutrisi Alami Berkualitas Tinggi",
      desc: "Hasil panen segar dan daging sapi pasture-fed kaya nutrisi alami dari tanah sehat dan pakan rumput pegunungan pilihan.",
      icon: Leaf,
    },
    {
      num: "02",
      title: "Rantai Dingin & Higienitas Terjaga",
      desc: "Penanganan pascapanen higienis dengan kontrol suhu rantai dingin presisi untuk menjaga kesegaran optimal hingga ke dapur mitra.",
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
      desc: "Setiap batch komoditas memiliki riwayat pencatatan lot yang jelas, memberikan rasa aman dan transparansi bagi mitra kuliner.",
      icon: Layers,
    },
    {
      num: "05",
      title: "Komitmen Nyata Konservasi Lingkungan",
      desc: "Terintegrasi langsung dengan perlindungan sabuk rimba 420 ha, konservasi mata air, dan koridor keanekaragaman hayati.",
      icon: ShieldCheck,
    },
    {
      num: "06",
      title: "Kemitraan B2B yang Fleksibel & Andal",
      desc: "Dukungan pasokan terjadwal, alokasi panen berkala, dan konsultasi spesifikasi khusus yang disesuaikan dengan kebutuhan Horeca.",
      icon: HeartHandshake,
    },
  ];

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
            <span className="text-[#0F3D2E] font-bold">Mengapa MAN3</span>
          </nav>
          <div className="text-[11px] font-mono text-[#6B726C]">
            Standar Keunggulan Agro-Ekologi
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-3xl space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A4B2A] font-semibold block">
            Keunggulan Kompetitif &amp; Nilai Inti
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#0F3D2E] tracking-tight leading-tight">
            Mengapa Memilih Ekosistem MAN3?
          </h1>
          <p className="text-base text-[#4E5752] leading-relaxed">
            MAN3 menghadirkan pendekatan terpadu antara peternakan ramah alam berbasis padang rumput, budidaya tanaman alami, dan pelestarian koridor konservasi hayati. Kami memastikan setiap bahan pangan yang Anda sajikan tidak hanya bermutu unggul, tetapi juga terbukti aman dan berintegritas.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="mt-12 bg-white rounded-[4px] border border-[#E5E5DE] shadow-sm overflow-hidden">
          <div className="p-6 bg-[#FBFBF9] border-b border-[#E5E5DE] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#0F3D2E]">
                Komparasi Nilai: MAN3 vs Pertanian Konvensional
              </h2>
              <p className="text-xs text-[#6B726C] font-mono mt-0.5">
                Perbandingan parameter objektif antara ekosistem regeneratif terpadu dan supply konvensional.
              </p>
            </div>
            <span className="text-[11px] font-mono text-[#7A4B2A] font-semibold">
              5 Parameter Evaluasi
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E5E5DE] font-mono text-[11px] uppercase bg-[#F5F5F1]">
                  <th className="py-3 px-5 font-bold text-[#141A17] w-1/4">Parameter</th>
                  <th className="py-3 px-5 font-bold text-[#0F3D2E] w-3/8 bg-[#E8F3ED]">
                    Prinsip Ekosistem MAN3
                  </th>
                  <th className="py-3 px-5 font-bold text-[#6B726C] w-3/8">
                    Sistem Industri Konvensional
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5DE]">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FBFBF9] transition-colors">
                    <td className="py-4 px-5">
                      <p className="font-bold text-[#141A17] text-sm">{row.parameter}</p>
                      <span className="text-[11px] text-[#6B726C] font-mono block mt-0.5">
                        {row.sub}
                      </span>
                    </td>
                    <td className="py-4 px-5 bg-[#FBFDFB]">
                      <span className="inline-block px-2 py-0.5 rounded-[2px] bg-[#E8F3ED] text-[#0F3D2E] font-mono font-bold text-[11px] mb-1">
                        {row.man3}
                      </span>
                      <p className="text-xs text-[#141A17] leading-relaxed">
                        {row.man3Desc}
                      </p>
                    </td>
                    <td className="py-4 px-5">
                      <span className="inline-block px-2 py-0.5 rounded-[2px] bg-[#F5F5F1] text-[#6B726C] font-mono text-[11px] mb-1">
                        {row.conventional}
                      </span>
                      <p className="text-xs text-[#6B726C] leading-relaxed">
                        {row.conventionalDesc}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6 Value Pillars */}
        <div className="mt-16 space-y-6">
          <div className="border-b border-[#E5E5DE] pb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A4B2A] font-semibold">
              Fondasi Standar Mutu
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#0F3D2E] mt-0.5">
              Enam Pilar Nilai Ekosistem MAN3
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pil) => {
              const Icon = pil.icon;
              return (
                <div
                  key={pil.num}
                  className="bg-[#FBFBF9] p-6 rounded-[4px] border border-[#E5E5DE] hover:border-[#0F3D2E] transition-all space-y-3 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-[2px] bg-[#E8F3ED] text-[#0F3D2E] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#7A4B2A]">
                      Pilar {pil.num}
                    </span>
                  </div>

                  <h4 className="font-serif text-lg font-bold text-[#0F3D2E]">
                    {pil.title}
                  </h4>
                  <p className="text-xs text-[#4E5752] leading-relaxed">
                    {pil.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="mt-16 p-8 bg-[#0F3D2E] text-white rounded-[4px] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-2xl font-bold">Siap Mengintegrasikan Mutu Pangan MAN3?</h3>
            <p className="text-xs text-[#D1EADB] font-sans">
              Ajukan permohonan alokasi batch atau mintakan sampel potongan uji coba untuk tim kuliner Anda.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/portal-mitra"
              className="px-5 py-2.5 rounded-[4px] bg-white text-[#0F3D2E] font-mono text-xs uppercase font-bold hover:bg-[#F5F5F1] transition-colors"
            >
              Portal Pemesanan
            </Link>
            <Link
              href="/kemitraan-b2b"
              className="px-5 py-2.5 rounded-[4px] border border-white text-white font-mono text-xs uppercase font-bold hover:bg-white/10 transition-colors"
            >
              Saluran Kemitraan
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
