export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  thumbnail_path: string;
  category: string;
  status: "published" | "draft";
  author_id: string;
  author_name: string;
  created_at: string;
  updated_at: string;
}

export const initialNews: NewsItem[] = [
  {
    id: "news-1",
    title: "Mengenal Rancangan Agro-Ekologi MAN3",
    slug: "rancangan-agro-ekologi-man3",
    excerpt:
      "Gambaran awal tentang pendekatan agro-pangan dan konservasi yang sedang dikembangkan dalam konsep MAN3.",
    content:
      "Artikel contoh ini menjelaskan arah pengembangan konsep agro-ekologi MAN3. Rincian lokasi, metode operasional, dan dampak akan dipublikasikan setelah tersedia data yang dapat diverifikasi.",
    thumbnail_path:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    category: "Konsep & Pengembangan",
    status: "published",
    author_id: "admin-1",
    author_name: "Tim Editorial (simulasi)",
    created_at: "2026-11-01T08:00:00Z",
    updated_at: "2026-11-01T08:00:00Z",
  },
  {
    id: "news-2",
    title: "Meninjau Pilihan Hijauan Tropis untuk Padang Gembala",
    slug: "inovasi-padang-gembala-rotasional-pasture-fed",
    excerpt:
      "Contoh catatan pengembangan tentang pemilihan hijauan yang sesuai kondisi lahan dan kebutuhan ternak.",
    content:
      "Brachiaria, Indigofera, dan Paspalum dapat menjadi kandidat hijauan tropis bergantung pada kondisi lokasi. Artikel dan contoh ini adalah materi prototipe, bukan klaim bahwa tanaman tersebut telah digunakan di lokasi operasional MAN3.",
    thumbnail_path:
      "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80",
    category: "Peternakan Berkelanjutan",
    status: "published",
    author_id: "admin-1",
    author_name: "Tim Editorial (simulasi)",
    created_at: "2026-10-24T10:30:00Z",
    updated_at: "2026-10-24T10:30:00Z",
  },
  {
    id: "news-3",
    title: "Konsep Kemitraan Pangan untuk Usaha Kuliner",
    slug: "ekspansi-kemitraan-restoran-b2b-fine-dining",
    excerpt:
      "Pratinjau alur kerja sama untuk restoran dan usaha kuliner yang sedang dirancang.",
    content:
      "Konsep kemitraan ini masih dalam tahap desain. Ketersediaan produk, standar penanganan, wilayah layanan, dan mekanisme pemesanan akan diumumkan setelah operasional siap.",
    thumbnail_path:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    category: "Kemitraan B2B",
    status: "published",
    author_id: "admin-1",
    author_name: "Tim Editorial (simulasi)",
    created_at: "2026-10-15T14:15:00Z",
    updated_at: "2026-10-15T14:15:00Z",
  },
];
