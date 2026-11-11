"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ChevronRight,
  Clock,
  TrendingDown,
  Truck,
  CheckCircle2,
  Download,
  Building,
  Send,
  Thermometer,
  Layers,
} from "lucide-react";

export default function KemitraanB2BPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <div className="w-full bg-surface pb-20">
      {/* Breadcrumb Header */}
      <div className="w-full bg-surface-container-low border-b border-surface-container py-3">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-primary font-bold">Kemitraan B2B &amp; Restoran</span>
          </nav>
          <div className="flex items-center gap-2 bg-surface-container-highest px-3 py-1 rounded-full text-primary font-semibold">
            <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
            <span>Program Pasokan Khusus HoReCa &amp; F&amp;B Enterprise</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high text-primary text-xs font-mono font-semibold uppercase">
              <ShieldCheck className="w-4 h-4 text-tertiary-container" />
              SLA Rantai Dingin Terjamin
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-primary tracking-tight leading-tight">
              Pasokan Bahan Pangan Terstandar, Segar &amp; Terlacak untuk Bisnis Kuliner Anda
            </h1>

            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              Kolaborasi strategis MAN3 bersama jaringan restoran, hotel, katering, dan supermarket. Memastikan executive chef dan manajer F&amp;B mendapatkan potongan daging berkualitas etis dan hasil panen bebas pestisida tepat waktu dengan stabilitas harga kontrak tahunan.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#onboarding-form"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-secondary hover:bg-on-secondary-container text-white font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-md"
              >
                Jadwalkan Sample Pack
              </a>
              <button
                type="button"
                onClick={() => alert("Katalog spesifikasi B2B dan estimasi harga kontrak telah diunduh.")}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-outline-variant hover:bg-surface-container text-primary font-mono text-xs uppercase font-bold tracking-wider transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                Unduh Pricelist &amp; Spec
              </button>
            </div>

            {/* SLA Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-surface-container-low border border-surface-container">
              <div>
                <span className="text-xs font-mono text-on-surface-variant uppercase">SLA Dispatch Dapur</span>
                <p className="font-serif text-2xl font-bold text-primary mt-0.5">04:30 WIB</p>
                <span className="text-xs text-on-surface-variant">Garansi tiba sebelum prep</span>
              </div>
              <div>
                <span className="text-xs font-mono text-on-surface-variant uppercase">Stabilitas Harga</span>
                <p className="font-serif text-2xl font-bold text-primary mt-0.5">6–12 Bulan</p>
                <span className="text-xs text-on-surface-variant">Kontrak lindung nilai panen</span>
              </div>
              <div>
                <span className="text-xs font-mono text-on-surface-variant uppercase">Kepatuhan Suplai</span>
                <p className="font-serif text-2xl font-bold text-secondary mt-0.5">99.4%</p>
                <span className="text-xs text-on-surface-variant">Tingkat akurasi pesanan</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container border border-surface-container-high">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
                alt="Chef profesional memeriksa bahan pangan segar MAN3 di dapur komersial"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-primary/95 text-white backdrop-blur-md flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-primary-fixed">
                    <Thermometer className="w-5 h-5 text-tertiary-fixed" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-primary-fixed">
                      Rantai Dingin Terpantau
                    </p>
                    <p className="text-xs font-semibold">Terkontrol 2.4°C Rute Jabodetabek &amp; Bandung</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-primary font-mono text-[10px] font-bold">
                  Aktif
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Infrastructure Pillars */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 border-t border-surface-container-high">
        <div className="mb-10 max-w-2xl">
          <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wider">
            Standardisasi Kelas Perhotelan &amp; Kuliner Presisi
          </span>
          <h2 className="font-serif text-3xl font-medium text-primary mt-1">
            Infrastruktur Pasokan yang Dibangun untuk Kecepatan Dapur Profesional
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-outline-variant/40 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary font-bold">
              01
            </div>
            <h3 className="font-serif text-lg font-bold text-primary">Consistent Grade Quality</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Toleransi gramasi potongan daging maksimal ±15g per porsi steak. Daun salad disortir dengan ketat tanpa memar, menjaga yield penggunaan bahan dapur hingga 98%.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-outline-variant/40 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary font-bold">
              02
            </div>
            <h3 className="font-serif text-lg font-bold text-primary">Scheduled Fleet Cold-Chain</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Armada berpendingin refrigerated van dengan pelacak suhu real-time IoT. Bahan baku dikirim dalam box insulator bersegel anti-kontaminasi.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-outline-variant/40 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary font-bold">
              03
            </div>
            <h3 className="font-serif text-lg font-bold text-primary">Single Lot Traceability</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Setiap batch dilengkapi QR Code yang mengarahkan tamu Anda ke data sertifikasi kebun, riwayat panen, dan profil pakan ternak.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-outline-variant/40 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary font-bold">
              04
            </div>
            <h3 className="font-serif text-lg font-bold text-primary">Flexible Net-30 Invoicing</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Kemudahan pembayaran termin untuk mitra korporat resmi dan grup restoran berbadan hukum dengan sistem faktur pajak elektronik terintegrasi.
            </p>
          </div>
        </div>
      </section>

      {/* Onboarding Form */}
      <section id="onboarding-form" className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-outline-variant/50 shadow-lg">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wider">
              Formulir Pra-Kualifikasi Mitra
            </span>
            <h2 className="font-serif text-3xl font-bold text-primary">
              Ajukan Kemitraan Pasokan Restoran &amp; HoReCa
            </h2>
            <p className="text-sm text-on-surface-variant">
              Tim account manager kami akan menghubungi Anda dalam waktu 1x24 jam kerja untuk penjadwalan demo dan pengiriman sampel.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-6 rounded-2xl bg-surface-container text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-tertiary-container mx-auto" />
              <h3 className="font-serif text-xl font-bold text-primary">Pengajuan Kemitraan Diterima</h3>
              <p className="text-sm text-on-surface-variant">
                Terima kasih atas minat Anda bermitra dengan MAN3. Tim agrikultur &amp; logistik kami akan segera mengonfirmasi ketersediaan kuota batch untuk bisnis Anda.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setFormSubmitted(true);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-on-surface-variant mb-1">
                    Nama Bisnis / Brand Restoran *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Botanica Steakhouse"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-surface-container-low"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-on-surface-variant mb-1">
                    Jenis Usaha *
                  </label>
                  <select className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-surface-container-low">
                    <option>Fine Dining &amp; Artisan Bistro</option>
                    <option>Hotel &amp; Resort Berbintang</option>
                    <option>Katering Korporat / Maskapai</option>
                    <option>Butcher Shop Premium / Retail</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-on-surface-variant mb-1">
                    Nama Contact Person / Chef *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chef Hendra"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-surface-container-low"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-on-surface-variant mb-1">
                    Nomor WhatsApp Bisnis *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="08123456789"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-surface-container-low"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-on-surface-variant mb-1">
                  Kebutuhan Pasokan Utama *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low border border-outline-variant/60 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-primary" />
                    <span>Daging Sapi Pasture-Fed</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low border border-outline-variant/60 cursor-pointer">
                    <input type="checkbox" className="rounded text-primary" />
                    <span>Sayuran Highland Organik</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-surface-container-low border border-outline-variant/60 cursor-pointer">
                    <input type="checkbox" className="rounded text-primary" />
                    <span>Herba &amp; Mikrogreens</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-on-surface-variant mb-1">
                  Estimasi Kebutuhan Mingguan &amp; Alamat Dapur
                </label>
                <textarea
                  rows={3}
                  placeholder="Sebutkan perkiraan kuota (kg/minggu) dan wilayah pengiriman (e.g. Jakarta Selatan)..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-surface-container-low"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
                Kirim Pengajuan Kemitraan
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
