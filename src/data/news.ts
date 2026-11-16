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
    title: "Pertanian Regeneratif dan Masa Depan Produksi Pangan",
    slug: "pertanian-regeneratif-dan-masa-depan-produksi-pangan",
    excerpt:
      "Membahas prinsip pertanian regeneratif yang menjaga kesehatan tanah, keanekaragaman hayati, dan keseimbangan lingkungan demi produksi pangan jangka panjang yang aman dan berdaya tahan.",
    content:
      "Pertanian regeneratif berfokus pada pemulihan dan peningkatan kesehatan ekosistem pertanian secara menyeluruh. Alih-alih mengeksploitasi kesuburan alami melalui masukan kimia sintetis berlebih, pendekatan ini mengutamakan pemupukan organik berbasis kompos alami, rotasi tanaman pelindung, dan penutupan vegetasi tanah. Hasilnya adalah struktur tanah yang gembur, kaya bahan organik, mampu mengikat air lebih baik, serta menghasilkan tanaman yang lebih kuat secara alami.",
    thumbnail_path:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    category: "Agro-Ekologi",
    status: "published",
    author_id: "editorial-man3",
    author_name: "Tim Redaksi Edukasi MAN3",
    created_at: "2026-11-01T08:00:00Z",
    updated_at: "2026-11-01T08:00:00Z",
  },
  {
    id: "news-2",
    title: "Mengenal Sistem Penggembalaan Bergilir",
    slug: "mengenal-sistem-penggembalaan-bergilir",
    excerpt:
      "Menjelaskan bagaimana rotasi penggembalaan terencana membantu menjaga kualitas padang rumput, memperbaiki siklus hara, dan memberikan waktu yang cukup bagi lahan untuk pulih secara alami.",
    content:
      "Sistem penggembalaan bergilir (rotational grazing) membagi padang rumput ke dalam beberapa petak teratur. Ternak hanya digembalakan di satu petak dalam waktu tertentu, kemudian dipindahkan sebelum rumput terkikis habis. Waktu istirahat ini memungkinkan akar tanaman tumbuh dalam, tanah terhindar dari pemadatan, dan kotoran ternak tersebar merata sebagai pupuk organik alami. Pola ini tidak hanya menjaga ketersediaan pakan berkualitas sepanjang tahun, tetapi juga menjamin ternak hidup sehat dan bebas stres.",
    thumbnail_path:
      "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80",
    category: "Peternakan Alami",
    status: "published",
    author_id: "editorial-man3",
    author_name: "Tim Redaksi Edukasi MAN3",
    created_at: "2026-10-24T10:30:00Z",
    updated_at: "2026-10-24T10:30:00Z",
  },
  {
    id: "news-3",
    title: "Pentingnya Menjaga Ekosistem dalam Produksi Pangan",
    slug: "pentingnya-menjaga-ekosistem-dalam-produksi-pangan",
    excerpt:
      "Membahas hubungan sinergis antara pertanian, peternakan ramah alam, dan pelestarian koridor konservasi dalam menjamin keberlanjutan pasokan pangan bernutrisi.",
    content:
      "Produksi pangan tidak dapat dipisahkan dari daya dukung lingkungan sekitarnya. Kehadiran pepohonan pelindung, tanaman berbunga refugia, dan koridor hutan di sekitar lahan pertanian menyediakan habitat penting bagi predator alami hama dan serangga penyerbuk. Ketika ekosistem seimbang, kebutuhan akan bahan kimia buatan berkurang drastis, kualitas air tetap jernih, dan produk pangan yang sampai ke meja konsumen terbukti lebih higienis, segar, dan aman dikonsumsi.",
    thumbnail_path:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    category: "Konservasi Hayati",
    status: "published",
    author_id: "editorial-man3",
    author_name: "Tim Redaksi Edukasi MAN3",
    created_at: "2026-10-15T14:15:00Z",
    updated_at: "2026-10-15T14:15:00Z",
  },
];
