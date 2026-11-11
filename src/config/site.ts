export const siteConfig = {
  name: "MAN3",
  tagline: "Bio-Agri & Conservation",
  industry: "Agriculture and Animal Husbandry",
  description:
    "Perusahaan di bidang pertanian dan peternakan regeneratif yang berfokus menciptakan ekosistem alami untuk melindungi flora dan fauna dari penyakit, hama, dan ancaman manusia, sekaligus menghasilkan produk pangan berkualitas premium dan berkelanjutan.",
  about: {
    story:
      "Beroperasi di dataran tinggi Gunung Gede-Pangrango (1.400 mdpl), MAN3 memadukan kearifan konservasi alam dengan teknologi agronomi presisi. Kami mengelola padang gembala rotasional bebas stres untuk ternak dan sistem tanam refugia alami tanpa bahan kimia sintetis.",
    elevation: "1.400m MDPL",
    traceability: "100% Terlacak (Certified Single-Estate)",
    mission:
      "Menghubungkan harmoni alam dengan pangan berkualitas tinggi untuk keluarga dan mitra kuliner komersial (B2B).",
  },
  contact: {
    email: "info@man3-agro.id",
    phone: "+62 812-3456-7890",
    address:
      "Kawasan Konservasi Dataran Tinggi Gede-Pangrango, Cisarua, Jawa Barat, Indonesia",
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
