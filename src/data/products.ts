export interface ProductItem {
  id: string;
  name: string;
  slug: string;
  category: "Daging Sapi" | "Sayuran & Buah" | "Program Konservasi";
  subtitle: string;
  price: string;
  unit: string;
  moq: string;
  origin: string;
  image: string;
  badges: string[];
  description: string;
  specifications: { label: string; value: string }[];
}

export const initialProducts: ProductItem[] = [
  {
    id: "prod-1",
    name: "Daging Sapi Pasture-Fed",
    slug: "daging-sapi-pasture-fed",
    category: "Daging Sapi",
    subtitle: "Daging sapi pilihan dari sistem peternakan berbasis padang rumput alami dengan pemotongan presisi.",
    price: "Rp 245.000",
    unit: "/ kg",
    moq: "5 kg (Sampel B2B: 1 kg)",
    origin: "Dataran Tinggi Jawa Barat",
    image:
      "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80",
    badges: ["Pasture-Fed", "Potongan Presisi"],
    description:
      "Daging sapi premium dari peternakan ramah alam yang mengonsumsi hijauan alami. Bebas hormon pertumbuhan sintetis, menghasilkan tekstur daging yang padat, empuk, dan kaya rasa alami.",
    specifications: [
      { label: "Metode Pakan", value: "100% Hijauan Alami (Pasture-Fed)" },
      { label: "Pematangan", value: "Chilled Aging Terstandar" },
      { label: "Ketertelusuran", value: "Sistem Batch & Lot Terdata" },
      { label: "Suhu Simpan", value: "Chilled 0°C – 2°C / Frozen -18°C" },
    ],
  },
  {
    id: "prod-2",
    name: "Tenderloin & Striploin Pilihan",
    slug: "tenderloin-striploin-reserve",
    category: "Daging Sapi",
    subtitle: "Potongan prima dengan tekstur sangat lembut untuk kebutuhan kuliner hotel dan restoran berkualitas.",
    price: "Rp 320.000",
    unit: "/ kg",
    moq: "3 kg",
    origin: "Dataran Tinggi Jawa Barat",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    badges: ["Prime Cut", "Standar Horeca"],
    description:
      "Potongan daging sapi pilihan dengan marbling alami yang seimbang. Sangat cocok untuk steak house, restoran fine dining, maupun hotel berbintang yang mengutamakan cita rasa autentik dan kelembutan prima.",
    specifications: [
      { label: "Karakter Marbling", value: "Marbling Alami Seimbang" },
      { label: "Kemasan", value: "Vacuum Skin Pack Higienis" },
      { label: "Standar Potongan", value: "Presisi Chef Spesifikasi Kuliner" },
    ],
  },
  {
    id: "prod-3",
    name: "Paket Sayuran Segar Dataran Tinggi",
    slug: "paket-sayur-organik-highland",
    category: "Sayuran & Buah",
    subtitle: "Kombinasi sayuran daun dan hortikultura segar hasil budidaya alami tanpa pestisida kimia berbahaya.",
    price: "Rp 85.000",
    unit: "/ paket",
    moq: "5 paket",
    origin: "Kebun Hortikultura Dataran Tinggi",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    badges: ["Bebas Residu Kimia", "Panen Segar"],
    description:
      "Sayuran segar yang dipanen langsung dari kebun dataran tinggi dengan irigasi mata air pegunungan dan nutrisi kompos alami. Menghadirkan kerenyahan maksimal dan kesegaran tahan lama.",
    specifications: [
      { label: "Jadwal Panen", value: "Panen Harian Berdasarkan Pesanan" },
      { label: "Sumber Air", value: "Mata Air Pegunungan Terjaga" },
      { label: "Pemupukan", value: "Kompos Organik Alami" },
    ],
  },
  {
    id: "prod-4",
    name: "Program Kemitraan Konservasi",
    slug: "program-adopsi-ekosistem",
    category: "Program Konservasi",
    subtitle: "Inisiatif kolaborasi pelestarian keanekaragaman hayati dan restorasi lahan bersama mitra usaha.",
    price: "Rp 1.500.000",
    unit: "/ periode",
    moq: "1 program",
    origin: "Koridor Konservasi Terpadu",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    badges: ["Konservasi Hayati", "Dampak Berkelanjutan"],
    description:
      "Program kemitraan hijau bagi pelaku usaha yang ingin berkontribusi langsung pada penanaman pohon pelindung, perlindungan mata air, dan pelestarian satwa lokal di sekitar kawasan produksi pangan.",
    specifications: [
      { label: "Fokus Program", value: "Restorasi Habitat & Keanekaragaman Hayati" },
      { label: "Transparansi", value: "Laporan Pemantauan Berkala" },
    ],
  },
];
