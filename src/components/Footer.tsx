import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ShieldCheck, Mountain, MapPin, Mail, Phone, ArrowUp } from "lucide-react";

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
              <h4 className="font-serif text-lg font-semibold text-primary-fixed">Terroir 1.400m MDPL</h4>
              <p className="text-sm text-primary-fixed-dim/80 mt-1 leading-relaxed">
                Lereng vulkanik Gunung Gede-Pangrango, Cisarua, Jawa Barat. Memastikan iklim mikro sejuk dan kesuburan tanah humus alami.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-tertiary-fixed shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-primary-fixed">100% Bebas Kimia Sintetis</h4>
              <p className="text-sm text-primary-fixed-dim/80 mt-1 leading-relaxed">
                Nol hormon pertumbuhan, bebas antibiotik profilaksis pada ternak, dan perlindungan hama tanaman berbasis refugia nabati.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-tertiary-fixed shrink-0">
              <span className="material-symbols-outlined text-[26px]">precision_manufacturing</span>
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-primary-fixed">Rantai Dingin &amp; Cuts Presisi</h4>
              <p className="text-sm text-primary-fixed-dim/80 mt-1 leading-relaxed">
                Fasilitas pemotongan berstandar HACCP &amp; Halal dengan logistik suhu terkontrol untuk menjaga integritas selular bahan pangan.
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
                <span className="material-symbols-outlined text-[24px]">nest_eco_leaf</span>
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">MAN3</span>
            </div>
            <p className="text-sm text-primary-fixed-dim/80 leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>
            <div className="pt-2 text-xs font-mono text-tertiary-fixed flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-tertiary-fixed"></span>
              Single-Estate Traceability System Active
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
                <Link href="/why-choose-man3" className="hover:text-white transition-colors">Why Choose MAN3</Link>
              </li>
              <li>
                <Link href="/#news" className="hover:text-white transition-colors">Warta &amp; Publikasi Riset</Link>
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
                <Link href="/portal-mitra" className="hover:text-white transition-colors">Portal Pemesanan Terpadu</Link>
              </li>
              <li>
                <Link href="/corporate-profile" className="hover:text-white transition-colors">Corporate Profile</Link>
              </li>
              <li>
                <Link href="/bio-conservation" className="hover:text-white transition-colors">Bio-Conservation Science</Link>
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
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-tertiary-fixed shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 border-t border-primary-container flex flex-col sm:flex-row items-center justify-between text-xs text-primary-fixed-dim/60 gap-4 font-mono">
          <p>© {new Date().getFullYear()} MAN3 Agro-Ecosystem Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Standar Pangan Lestari Indonesia</span>
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
