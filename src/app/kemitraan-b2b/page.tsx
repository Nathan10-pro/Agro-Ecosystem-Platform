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
  Sparkles,
  Phone,
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
            <span>Kemitraan Pasokan Horeca &amp; Restoran</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high text-primary text-xs font-mono font-semibold uppercase">
              <ShieldCheck className="w-4 h-4 text-tertiary-container" />
              Kemitraan Pasokan Pangan Segar &amp; Berkelanjutan
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-medium text-primary tracking-tight leading-tight">
              Solusi Pasokan Pangan Berkualitas untuk Industri Kuliner
            </h1>

            <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
              MAN3 bekerja sama dengan para pemilik restoran, chef hotel, dan pelaku usaha kuliner untuk memasok daging sapi pasture-fed dan komoditas pangan segar dengan komitmen mutu tinggi, ketepatan jadwal, dan integritas lingkungan.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#onboarding-form"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-mono text-xs uppercase font-bold tracking-wider transition-all shadow-md"
              >
                Ajukan Kemitraan B2B
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white border border-outline-variant hover:bg-surface-container text-primary font-mono text-xs uppercase font-bold tracking-wider transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4" />
                Konsultasikan Kebutuhan Menu
              </Link>
            </div>

            {/* SLA Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-surface-container-low border border-surface-container">
              <div>
                <span className="text-xs font-mono text-on-surface-variant uppercase">Jadwal Pengiriman</span>
                <p className="font-serif text-2xl font-bold text-primary mt-0.5">Terjadwal</p>
                <span className="text-xs text-on-surface-variant">Rute rantai dingin rutin</span>
              </div>
              <div>
                <span className="text-xs font-mono text-on-surface-variant uppercase">Standar Potongan</span>
                <p className="font-serif text-2xl font-bold text-primary mt-0.5">Presisi</p>
                <span className="text-xs text-on-surface-variant">Spesifikasi chef kuliner</span>
              </div>
              <div>
                <span className="text-xs font-mono text-on-surface-variant uppercase">Layanan Kemitraan</span>
                <p className="font-serif text-2xl font-bold text-secondary mt-0.5">Prioritas</p>
                <span className="text-xs text-on-surface-variant">Alokasi kuota panen berkala</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl bg-surface-container border border-surface-container-high">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
                alt="Dapur komersial dan kerja sama mitra kuliner MAN3"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-primary/95 text-white backdrop-blur-md flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-primary-fixed">
                    <Thermometer className="w-5 h-5 text-tertiary-fixed" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-primary-fixed">
                      Rantai Pasokan Dingin
                    </p>
                    <p className="text-xs font-semibold">Terkontrol Suhu 0°C – 2°C</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-primary font-mono text-[10px] font-bold">
                  Standar Horeca
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
            Keunggulan Layanan B2B
          </span>
          <h2 className="font-serif text-3xl font-medium text-primary mt-1">
            Empat Nilai Unggul Pasokan untuk Bisnis Anda
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-outline-variant/40 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary font-bold font-mono">
              01
            </div>
            <h3 className="font-serif text-lg font-bold text-primary">Spesifikasi Potongan Presisi</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Tersedia pilihan potongan prima (striploin, tenderloin, ribeye, brisket) dengan ketebalan dan gramasi konsisten sesuai standar dapur restoran Anda.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-outline-variant/40 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary font-bold font-mono">
              02
            </div>
            <h3 className="font-serif text-lg font-bold text-primary">Rantai Dingin &amp; Higienitas</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Kemasan vacuum skin pack higienis dan logistik berpendingin terkontrol memastikan mutu serta kesegaran produk terjaga utuh.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-outline-variant/40 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary font-bold font-mono">
              03
            </div>
            <h3 className="font-serif text-lg font-bold text-primary">Ketertelusuran Berbasis Lot</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Setiap pengiriman dilengkapi data nomor batch dan tanggal panen untuk menjamin transparansi serta kepastian mutu bagi pelanggan Anda.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-outline-variant/40 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary font-bold font-mono">
              04
            </div>
            <h3 className="font-serif text-lg font-bold text-primary">Alokasi Panen Terjadwal</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Sistem reservasi kuota mingguan yang fleksibel membantu menstabilkan ketersediaan bahan baku di tengah fluktuasi kebutuhan bisnis kuliner.
            </p>
          </div>
        </div>
      </section>

      {/* Onboarding Form */}
      <section id="onboarding-form" className="scroll-mt-32 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-3xl border border-outline-variant/50 shadow-lg">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wider">
              Formulir Kemitraan Usaha
            </span>
            <h2 className="font-serif text-3xl font-bold text-primary">
              Mulai Kemitraan Pasokan dengan MAN3
            </h2>
            <p className="text-sm text-on-surface-variant">
              Sampaikan profil usaha dan kebutuhan pasokan bahan pangan Anda. Tim kami akan menyiapkan proposal alokasi yang sesuai.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-3xl bg-surface-container text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-primary">Pengajuan Kemitraan Terkirim</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed max-w-md mx-auto">
                Terima kasih atas minat Anda bermitra dengan MAN3. Tim perwakilan kemitraan kami akan segera menghubungi Anda untuk mendiskusikan jadwal dan spesifikasi pasokan.
              </p>
              <button
                type="button"
                onClick={() => setFormSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-primary text-white font-mono text-xs uppercase font-bold"
              >
                Kirim Pengajuan Baru
              </button>
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
                    placeholder="Contoh: Highland Bistro"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-surface-container-low"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-on-surface-variant mb-1">
                    Jenis Usaha *
                  </label>
                  <select className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-surface-container-low">
                    <option>Restoran / Steakhouse</option>
                    <option>Hotel &amp; Resort</option>
                    <option>Kafe &amp; Bistro</option>
                    <option>Layanan Katering</option>
                    <option>Toko Daging &amp; Ritel Pangan</option>
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
                    placeholder="Nama lengkap kontak"
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
                    placeholder="08xx-xxxx-xxxx"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary text-sm bg-surface-container-low"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-on-surface-variant mb-1">
                  Kebutuhan Pasokan Utama *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/60 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-primary" />
                    <span>Daging Sapi Pasture-Fed</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/60 cursor-pointer">
                    <input type="checkbox" className="rounded text-primary" />
                    <span>Sayuran Dataran Tinggi</span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-low border border-outline-variant/60 cursor-pointer">
                    <input type="checkbox" className="rounded text-primary" />
                    <span>Program Kemitraan Hijau</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-on-surface-variant mb-1">
                  Estimasi Kebutuhan Mingguan &amp; Alamat Dapur
                </label>
                <textarea
                  rows={3}
                  placeholder="Ceritakan estimasi volume daging atau sayuran per minggu serta lokasi pengiriman Anda..."
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
