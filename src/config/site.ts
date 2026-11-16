export const siteConfig = {
  name: "MAN3",
  tagline: "Bio-Agri & Conservation",
  industry: "Agriculture and Animal Husbandry",
  description:
    "Prototipe konsep ekosistem agro-pangan yang menghubungkan budidaya bertanggung jawab, peternakan, dan konservasi. Informasi operasional masih dalam tahap pengembangan.",
  about: {
    story:
      "MAN3 adalah konsep ekosistem agro-pangan yang menggabungkan praktik budidaya bertanggung jawab, peternakan, dan konservasi. Rincian lokasi, metode operasional, dan data ketertelusuran masih dalam tahap validasi.",
    elevation: "Konsep dataran tinggi",
    traceability: "Rancangan pencatatan lot (belum aktif)",
    mission:
      "Menghubungkan harmoni alam dengan pangan berkualitas tinggi untuk keluarga dan mitra kuliner komersial (B2B).",
  },
  contact: {
    email: "halo@man3.example",
    phone: "Belum tersedia (simulasi)",
    address: "Lokasi operasional belum dikonfirmasi.",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126829.41477755318!2d106.91896859999999!3d-6.7118374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69b596283ffb2d%3A0xb21482f6e9f257a0!2sTaman%20Nasional%20Gunung%20Gede%20Pangrango!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
  },
  branding: {
    logoPath: "/images/logo-placeholder.svg",
    personality: ["Bold", "Innovative", "Natural"],
    colors: {
      primary: "#1b4332", // Forest Green
      secondary: "#885039", // Terracotta Earth
      tertiary: "#52b788", // Sprout Green
      canvas: "#e8ffef",
      textDark: "#0a1f16",
    },
  },
  cta: {
    primary: {
      label: "Jelajahi Produk",
      href: "#products",
    },
    secondary: {
      label: "Kemitraan B2B",
      href: "#contact",
    },
  },
  navLinks: [
    { label: "Tentang Kami", href: "#about" },
    { label: "Konservasi & Ekosistem", href: "#conservation" },
    { label: "Produk Pangan", href: "#products" },
    { label: "Keunggulan", href: "#why-us" },
    { label: "Berita", href: "#news" },
    { label: "Kontak", href: "#contact" },
  ],
};

export type SiteConfig = typeof siteConfig;
