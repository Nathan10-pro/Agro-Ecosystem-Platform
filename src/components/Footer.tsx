import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Mountain, MapPin, Mail, Phone, ArrowUp, Leaf, PackageCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-on-primary border-t border-primary-container">
      {/* Top Banner Feature */}
      <div className="border-b border-primary-container/60 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-tertiary-fixed shrink-0">
              <Mountain className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-primary-fixed">Sistem Agro-Ekologi Terpadu</h4>
              <p className="text-sm text-primary-fixed-dim/80 mt-1 leading-relaxed">
                Penerapan sistem pertanian terpadu yang menjaga kesuburan tanah dan keseimbangan alami di dataran tinggi.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-tertiary-fixed shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-primary-fixed">Praktik Budidaya Alami</h4>
              <p className="text-sm text-primary-fixed-dim/80 mt-1 leading-relaxed">
                Mengutamakan pupuk kompos organik, pengelolaan pakan padang rumput alami, dan perlindungan keanekaragaman hayati.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-tertiary-fixed shrink-0">
              <PackageCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-primary-fixed">Standar Mutu &amp; Higienitas</h4>
              <p className="text-sm text-primary-fixed-dim/80 mt-1 leading-relaxed">
                Pengawasan mutu terpadu, pemotongan presisi untuk kebutuhan kuliner, dan rantai pasokan dingin yang higienis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-primary-fixed">
                <Leaf className="w-5 h-5 text-tertiary-fixed" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-white tracking-tight leading-none">MAN3</span>
                <span className="font-mono text-[10px] text-primary-fixed-dim uppercase tracking-wider mt-1">Ekosistem Bio-Agri &amp; Konservasi</span>
              </div>
            </div>
            <p className="text-sm text-primary-fixed-dim/80 leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>
            <div className="pt-2 text-xs font-mono text-tertiary-fixed flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-tertiary-fixed"></span>
              Pertanian • Peternakan • Konservasi
            </div>
          </div>

          {/* Navigasi Utama */}
          <div className="space-y-3">
            <h5 className="font-mono text-xs uppercase tracking-wider text-primary-fixed font-bold">
              Eksplorasi
            </h5>
            <ul className="space-y-2 text-sm text-primary-fixed-dim/80">
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">Tentang Kami</Link>
              </li>
              <li>
                <Link href="/ekosistem-konservasi" className="hover:text-white transition-colors">Ekosistem Konservasi</Link>
              </li>
              <li>
                <Link href="/produk/daging-sapi-pasture-fed" className="hover:text-white transition-colors">Katalog Produk Pangan</Link>
              </li>
              <li>
                <Link href="/why-choose-man3" className="hover:text-white transition-colors">Mengapa MAN3</Link>
              </li>
              <li>
                <Link href="/#news" className="hover:text-white transition-colors">Warta &amp; Publikasi Lapangan</Link>
              </li>
            </ul>
          </div>

          {/* Halaman Khusus Korporat & B2B */}
          <div className="space-y-3">
            <h5 className="font-mono text-xs uppercase tracking-wider text-primary-fixed font-bold">
              Kemitraan &amp; Sains
            </h5>
            <ul className="space-y-2 text-sm text-primary-fixed-dim/80">
              <li>
                <Link href="/kemitraan-b2b" className="hover:text-white transition-colors">Kemitraan B2B Restoran</Link>
              </li>
              <li>
                <Link href="/portal-mitra" className="hover:text-white transition-colors">Portal Mitra B2B</Link>
              </li>
              <li>
                <Link href="/corporate-profile" className="hover:text-white transition-colors">Profil Perusahaan</Link>
              </li>
              <li>
                <Link href="/bio-conservation" className="hover:text-white transition-colors">Panduan Konsep</Link>
              </li>
            </ul>
          </div>

          {/* Kontak & Lokasi */}
          <div className="space-y-3">
            <h5 className="font-mono text-xs uppercase tracking-wider text-primary-fixed font-bold">
              Hubungi Kami
            </h5>
            <ul className="space-y-2 text-sm text-primary-fixed-dim/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-tertiary-fixed shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-tertiary-fixed shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-tertiary-fixed shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-primary-container flex flex-col sm:flex-row items-center justify-between text-xs text-primary-fixed-dim/70 gap-4 font-mono">
          <p>© {new Date().getFullYear()} MAN3. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-6">
            <span>Bio-Agri &amp; Conservation</span>
            <span>•</span>
            <a href="#top" className="hover:text-white transition-colors flex items-center gap-1">
              Kembali ke atas <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
