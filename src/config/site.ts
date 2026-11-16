export const siteConfig = {
  name: "MAN3",
  tagline: "Ekosistem Pertanian, Peternakan & Konservasi",
  descriptor: "MAN3 — Ekosistem Pertanian, Peternakan, dan Konservasi",
  industry: "Bio-Agrikultur & Konservasi Hayati",
  description:
    "MAN3 adalah ekosistem bio-agri dan konservasi terpadu yang memadukan pertanian berkelanjutan, peternakan ramah alam, dan perlindungan keanekaragaman hayati untuk menghasilkan pangan berkualitas premium.",
  about: {
    story:
      "MAN3 menghadirkan pendekatan terpadu antara budidaya tanaman alami, peternakan berbasis padang rumput, dan pelestarian koridor konservasi dataran tinggi guna menghadirkan pasokan pangan bermutu tinggi yang selaras dengan kelestarian alam.",
    elevation: "Dataran Tinggi Tropis",
    traceability: "Ketertelusuran Berbasis Batch & Lot",
    mission:
      "Menyediakan bahan pangan berkualitas prima yang aman, segar, dan berkelanjutan, sekaligus merawat kesuburan tanah, keanekaragaman hayati, dan kesejahteraan ekosistem alam.",
  },
  contact: {
    email: "kemitraan@man3.id",
    phone: "+62 811-2345-6789",
    address: "Kawasan Agrikultur Terpadu, Jawa Barat",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126829.41477755318!2d106.91896859999999!3d-6.7118374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69b596283ffb2d%3A0xb21482f6e9f257a0!2sTaman%20Nasional%20Gunung%20Gede%20Pangrango!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
  },
  branding: {
    logoPath: "/images/logo-placeholder.svg",
    personality: ["Premium", "Berkelanjutan", "Alami", "Terpercaya"],
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
      label: "Pelajari Kemitraan B2B",
      href: "/kemitraan-b2b",
    },
    secondary: {
      label: "Jelajahi Produk Kami",
      href: "/#products",
    },
  },
  navLinks: [
    { label: "Tentang Kami", href: "/#about" },
    { label: "Ekosistem Konservasi", href: "/ekosistem-konservasi" },
    { label: "Produk Pangan", href: "/produk/daging-sapi-pasture-fed" },
    { label: "Mengapa MAN3", href: "/why-choose-man3" },
    { label: "Kemitraan B2B", href: "/kemitraan-b2b" },
    { label: "Portal Mitra", href: "/portal-mitra" },
    { label: "Berita", href: "/#news" },
    { label: "Kontak", href: "/#contact" },
  ],
};

export type SiteConfig = typeof siteConfig;
