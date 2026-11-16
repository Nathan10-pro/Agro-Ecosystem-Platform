import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowUp, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#08261C] text-white border-t border-[#1C5944]">
      {/* Three Pillars Summary Bar */}
      <div className="border-b border-[#1C5944]/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono">
          <div className="space-y-1">
            <span className="text-[#A3D4B6] font-bold block">01 / SINGLE ESTATE AGRO-ECOLOGY</span>
            <p className="text-white/70 leading-relaxed font-sans text-xs">
              Sistem tertutup memadukan pertanian alami, peternakan padang rumput, dan perlindungan hutan penyangga.
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[#A3D4B6] font-bold block">02 / KETERTELUSURAN LOT DIGITAL</span>
            <p className="text-white/70 leading-relaxed font-sans text-xs">
              Setiap lot panen dan potongan karkas terhubung dengan data riwayat penggembalaan serta tanggal proses.
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[#A3D4B6] font-bold block">03 / DISTRIBUSI COLD-CHAIN SUBUH</span>
            <p className="text-white/70 leading-relaxed font-sans text-xs">
              Pengiriman berpendingin terkontrol tiba sebelum operasional dapur (04:30–06:00 WIB) untuk mitra Horeca.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-[4px] bg-[#1C5944] flex items-center justify-center text-white font-serif font-bold text-sm">
                M
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">MAN3</span>
            </div>
            <p className="text-xs text-white/70 leading-relaxed max-w-sm font-sans">
              MAN3 — Ekosistem Pertanian, Peternakan, dan Konservasi. Menghadirkan pangan bermutu prima melalui pengelolaan terpadu yang selaras dengan kelestarian alam dataran tinggi.
            </p>
            <div className="pt-1 text-[11px] font-mono text-[#A3D4B6]">
              Purwarupa Digital B2B Agro-Commerce
            </div>
          </div>

          {/* Navigation 1: Navigasi Platform */}
          <div className="space-y-2.5">
            <h5 className="font-mono text-xs uppercase tracking-wider text-[#A3D4B6] font-bold">
              Navigasi Platform
            </h5>
            <ul className="space-y-1.5 text-xs text-white/75 font-sans">
              <li>
                <Link href="/#alokasi" className="hover:text-white transition-colors">Alokasi Produk Minggu Ini</Link>
              </li>
              <li>
                <Link href="/ekosistem-konservasi" className="hover:text-white transition-colors">Zonasi Agro-Ekologi</Link>
              </li>
              <li>
                <Link href="/kemitraan-b2b" className="hover:text-white transition-colors">Saluran Kemitraan B2B</Link>
              </li>
              <li>
                <Link href="/portal-mitra" className="hover:text-white transition-colors">Portal Pemesanan Mitra</Link>
              </li>
              <li>
                <Link href="/#ilmu" className="hover:text-white transition-colors">Ilmu &amp; Catatan Lapangan</Link>
              </li>
            </ul>
          </div>

          {/* Navigation 2: Informasi Korporat */}
          <div className="space-y-2.5">
            <h5 className="font-mono text-xs uppercase tracking-wider text-[#A3D4B6] font-bold">
              Dokumentasi
            </h5>
            <ul className="space-y-1.5 text-xs text-white/75 font-sans">
              <li>
                <Link href="/why-choose-man3" className="hover:text-white transition-colors">Mengapa MAN3</Link>
              </li>
              <li>
                <Link href="/corporate-profile" className="hover:text-white transition-colors">Profil Perusahaan (ID / EN)</Link>
              </li>
              <li>
                <Link href="/bio-conservation" className="hover:text-white transition-colors">Prinsip Komunikasi &amp; Desain</Link>
              </li>
              <li>
                <Link href="/produk/daging-sapi-pasture-fed" className="hover:text-white transition-colors">Spesifikasi Daging Sapi</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-2.5">
            <h5 className="font-mono text-xs uppercase tracking-wider text-[#A3D4B6] font-bold">
              Hubungan Mitra
            </h5>
            <ul className="space-y-2 text-xs text-white/75 font-sans">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#A3D4B6] shrink-0 mt-0.5" />
                <span>Koridor Konservasi Dataran Tinggi, Jawa Barat</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#A3D4B6] shrink-0" />
                <span>kemitraan@man3.id</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#A3D4B6] shrink-0" />
                <span>+62 811-2345-6789</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[#1C5944] flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/60 gap-4 font-mono">
          <p>© {new Date().getFullYear()} MAN3. Ekosistem Pertanian, Peternakan, dan Konservasi.</p>
          <div className="flex items-center gap-4">
            <span>B2B Platform</span>
            <span>•</span>
            <a href="#top" className="hover:text-white transition-colors flex items-center gap-1">
              Kembali ke atas <ArrowUp className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
