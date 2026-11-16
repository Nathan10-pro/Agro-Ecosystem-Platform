export const siteConfig = {
  name: "MAN3",
  tagline: "Ekosistem Pertanian, Peternakan, dan Konservasi",
  descriptor: "MAN3 — Ekosistem Pertanian, Peternakan, dan Konservasi",
  industry: "B2B Agro-Commerce & Conservation",
  description:
    "Platform B2B agrikultur premium MAN3: Pasokan daging sapi pasture-fed single estate, unggas alami, dan sayuran dataran tinggi dari koridor konservasi Gunung Gede–Pangrango dengan ketertelusuran lot dan rantai dingin subuh.",
  about: {
    story:
      "MAN3 mengintegrasikan pertanian regeneratif polikultur, peternakan etis alami berbasis padang rumput, dan sabuk konservasi rimba 420 ha untuk menghasilkan bahan pangan bermutu tinggi yang konsisten bagi para mitra industri kuliner dan Horeca.",
    elevation: "Dataran Tinggi 850 – 1.600 m dpl",
    traceability: "Ketertelusuran Lot Digital Berbasis Batch",
    mission:
      "Menyediakan pasokan bahan pangan berkualitas tinggi, aman, dan berintegritas ekologis dengan komitmen rantai dingin terpercaya untuk mitra hotel, restoran, dan katering.",
  },
  contact: {
    email: "kemitraan@man3.id",
    phone: "+62 811-2345-6789",
    address: "Koridor Konservasi Dataran Tinggi, Jawa Barat",
    referenceLocationUrl: "https://maps.google.com/?q=Taman+Nasional+Gunung+Gede+Pangrango",
  },
  branding: {
    colors: {
      primary: "#0F3D2E", // Deep forest green
      secondary: "#7A4B2A", // Restrained warm earthy terracotta
      surface: "#FFFFFF",
      surfaceOff: "#FBFBF9",
      border: "#E5E5DE",
      text: "#141A17",
    },
  },
  navLinks: [
    { label: "Produk", href: "/#alokasi" },
    { label: "Zona", href: "/ekosistem-konservasi" },
    { label: "Kemitraan", href: "/kemitraan-b2b" },
    { label: "Ilmu", href: "/#ilmu" },
    { label: "Portal Mitra", href: "/portal-mitra" },
  ],
};

export type SiteConfig = typeof siteConfig;
