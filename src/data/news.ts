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
    title: "Sertifikasi Single-Estate 100% Organik Kawasan Terroir Gede-Pangrango",
    slug: "sertifikasi-single-estate-organik-gede-pangrango",
    excerpt:
      "Audit independen internasional mengonfirmasi kawasan konservasi terpadu MAN3 bebas sepenuhnya dari residu kimia dan pupuk sintetis.",
    content:
      "Kawasan agronomi MAN3 di lereng Gunung Gede-Pangrango resmi memperoleh pengakuan sertifikasi regenerative single-estate. Dengan ketinggian 1.400 mdpl dan pasokan air vulkanik alami, sistem rotasi tanaman refugia dan mikrobioma tanah berhasil menjaga keseimbangan hayati tanpa ketergantungan pada zat kimia sintetis.",
    thumbnail_path:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    category: "Konservasi & Audit",
    status: "published",
    author_id: "admin-1",
    author_name: "Tim Agronomi MAN3",
    created_at: "2026-11-01T08:00:00Z",
    updated_at: "2026-11-01T08:00:00Z",
  },
  {
    id: "news-2",
    title: "Inovasi Padang Gembala Rotasional: Daging Sapi Pasture-Fed Berstandar Chef Internasional",
    slug: "inovasi-padang-gembala-rotasional-pasture-fed",
    excerpt:
      "Pola peternakan bebas ancaman stres dan nutrisi rumput alfafa alami menghasilkan marbling natural serta tekstur daging yang unggul bagi industri kuliner.",
    content:
      "Melalui pendekatan ethical husbandry, kawanan sapi perah dan potong MAN3 digembalakan secara rotasional di padang rumput berketinggian tinggi. Tanpa suntikan hormon pertumbuhan dan antibiotik profilaksis, profil nutrisi daging kaya akan asam lemak Omega-3 alami serta memiliki aroma herba yang otentik.",
    thumbnail_path:
      "https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80",
    category: "Peternakan Berkelanjutan",
    status: "published",
    author_id: "admin-1",
    author_name: "Divisi Peternakan MAN3",
    created_at: "2026-10-24T10:30:00Z",
    updated_at: "2026-10-24T10:30:00Z",
  },
  {
    id: "news-3",
    title: "Ekspansi Kemitraan Restoran Fine Dining B2B Wilayah Jabodetabek & Bandung",
    slug: "ekspansi-kemitraan-restoran-b2b-fine-dining",
    excerpt:
      "Program suplai rantai dingin terjadwal kini menjangkau lebih dari 45 grup kuliner premium dengan jaminan kesegaran dalam 24 jam pasca-panen.",
    content:
      "MAN3 membuka kuota kemitraan terpadu bagi pelaku usaha kuliner, hotel berbintang, dan artisan butcher shop. Menggunakan teknologi logistik berpendingin suhu konstan, setiap potongan daging presisi dan sayuran mikrogreens dikirim langsung dengan sertifikat batch lot dan data ketertelusuran lengkap.",
    thumbnail_path:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    category: "Kemitraan B2B",
    status: "published",
    author_id: "admin-1",
    author_name: "Direktorat Bisnis MAN3",
    created_at: "2026-10-15T14:15:00Z",
    updated_at: "2026-10-15T14:15:00Z",
  },
];
