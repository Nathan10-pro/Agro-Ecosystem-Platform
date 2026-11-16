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
    name: "Daging Sapi Pasture-Fed (Cuts Presisi)",
    slug: "daging-sapi-pasture-fed",
    category: "Daging Sapi",
    subtitle: "Potongan Presisi Standar Chef Kuliner & HoReCa",
    price: "Rp 245.000",
    unit: "/ kg",
    moq: "5 kg (B2B Sample: 1 kg)",
    origin: "Zone A Terroir Reserve (Gede-Pangrango, 1.400 mdpl)",
    image:
      "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80",
    badges: ["Contoh UI", "Data simulasi"],
    description:
      "Contoh deskripsi produk untuk rancangan katalog. Asal, metode pemeliharaan, spesifikasi, dan ketersediaan produk belum diverifikasi.",
    specifications: [
      { label: "Grade Aging", value: "21 Hari Dry-Aged / Custom Wet-Aged" },
      { label: "Pakan", value: "Hijauan tropis (contoh; belum dikonfirmasi)" },
      { label: "Ketertelusuran", value: "Konsep ID lot (belum aktif)" },
      { label: "Suhu Simpan", value: "Ditentukan berdasarkan produk aktual" },
    ],
  },
  {
    id: "prod-2",
    name: "Tenderloin & Striploin Reserve",
    slug: "tenderloin-striploin-reserve",
    category: "Daging Sapi",
    subtitle: "Potongan Prime Terseleksi Marbling Alami",
    price: "Rp 320.000",
    unit: "/ kg",
    moq: "3 kg",
    origin: "Paddock 03, Cisarua Highland",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    badges: ["Contoh UI", "Data simulasi"],
    description:
      "Potongan daging bagian paling lembut dengan serat halus khas sapi pasture-fed dataran tinggi. Sangat ideal untuk steakhouse premium dan menu artisan fine-dining.",
    specifications: [
      { label: "Kadar Lemak Intramuskular", value: "Marbling Alami Seimbang" },
      { label: "Kemasan", value: "Vacuum Skin Packaging (VSP)" },
      { label: "Sertifikasi", value: "Belum diverifikasi" },
    ],
  },
  {
    id: "prod-3",
    name: "Paket Sayur Organik Highland Terroir",
    slug: "paket-sayur-organik-highland",
    category: "Sayuran & Buah",
    subtitle: "Panen Segar Subuh Hari dari Tanah Humus Vulkanik",
    price: "Rp 85.000",
    unit: "/ paket (3kg)",
    moq: "10 paket / Batch Resto",
    origin: "Kebun Konservasi Blok Timur",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    badges: ["Contoh UI", "Data simulasi"],
    description:
      "Kombinasi sayuran dataran tinggi seperti Kale Tuscan, Baby Carrot, Selada Romaine, dan Wild Herbs yang dibudidayakan secara regeneratif bersama predator serangga refugia alami.",
    specifications: [
      { label: "Waktu Panen ke Kirim", value: "< 12 Jam" },
      { label: "Sumber Air", value: "Mata Air Gravitasi Gede-Pangrango" },
      { label: "Pupuk", value: "Kompos Humus Cacing Hayati Organik" },
    ],
  },
  {
    id: "prod-4",
    name: "Program Adopsi Ekosistem & Paddock Restoratif",
    slug: "program-adopsi-ekosistem",
    category: "Program Konservasi",
    subtitle: "Kemitraan Restorasi Lahan Hijau & Offset Karbon Usaha",
    price: "Rp 1.500.000",
    unit: "/ kuartal",
    moq: "1 Paddock Slot",
    origin: "Seluruh Kawasan Terpadu MAN3",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    badges: ["Konsep program", "Belum tersedia"],
    description:
      "Inisiatif kolaboratif bagi perusahaan kuliner dan organisasi yang ingin mendanai restorasi 1 hektar sabuk hijau dan mendapatkan alokasi panen eksklusif setiap bulannya.",
    specifications: [
      { label: "Laporan Dampak", value: "Audit Kerapatan Humus & Biodiversitas Tiap 90 Hari" },
      { label: "Papan Plakat", value: "Nama Mitra Terukir di Paddock Konservasi" },
    ],
  },
];
