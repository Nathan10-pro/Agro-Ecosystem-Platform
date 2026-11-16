import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "MAN3",
    "pertanian regeneratif",
    "peternakan alami",
    "konservasi hayati",
    "bio-agri",
    "pasture-fed beef",
    "pangan berkualitas",
  ],
  authors: [{ name: "MAN3 — Ekosistem Pertanian, Peternakan & Konservasi" }],
  creator: "MAN3",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://man3-agro.id",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "MAN3 — Ekosistem Pertanian, Peternakan, dan Konservasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&h=630&q=80"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" id="top">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className="bg-surface text-on-surface antialiased flex flex-col min-h-screen selection:bg-primary selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-tertiary-fixed"
        >
          Lewati ke konten utama
        </a>
        <Navbar />
        <main id="main-content" className="flex-1 pt-32">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
