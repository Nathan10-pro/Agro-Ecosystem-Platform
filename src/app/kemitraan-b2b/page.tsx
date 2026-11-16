"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Building2,
  Compass,
  UtensilsCrossed,
  CheckCircle2,
  Copy,
  Check,
  X,
  MapPin,
  ExternalLink,
} from "lucide-react";

type PathwayType = "resto" | "kunjungan" | "chef" | null;

function KemitraanContent() {
  const searchParams = useSearchParams();
  const [selectedPathway, setSelectedPathway] = useState<PathwayType>(null);

  // Form inputs
  const [formData, setFormData] = useState({
    picName: "",
    orgName: "",
    email: "",
    phone: "",
    // Pathway 1 specific
    productNeeds: "",
    weeklyEstimate: "",
    // Pathway 2 specific
    schedulePref: "",
    participantCount: "1–3 orang",
    // Pathway 3 specific
    sampleItems: "",
    cutSpecs: "",
  });

  const [formError, setFormError] = useState("");
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [copiedData, setCopiedData] = useState(false);

  // Auto-select pathway if passed via URL param (?path=kunjungan)
  useEffect(() => {
    const p = searchParams.get("path");
    if (p === "kunjungan") setSelectedPathway("kunjungan");
    else if (p === "resto") setSelectedPathway("resto");
    else if (p === "chef") setSelectedPathway("chef");
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.picName.trim()) {
      setFormError("Nama lengkap / PIC wajib diisi.");
      return;
    }
    if (!formData.orgName.trim()) {
      setFormError("Nama institusi / bisnis wajib diisi.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setFormError("Alamat email kerja yang valid wajib diisi.");
      return;
    }
    if (!formData.phone.trim()) {
      setFormError("Nomor kontak aktif wajib diisi.");
      return;
    }

    setFormError("");
    setShowDemoModal(true);
  };

  const getPathwayTitle = () => {
    if (selectedPathway === "resto") return "Jalur 01: Restoran & Hotel (Alokasi Mingguan)";
    if (selectedPathway === "kunjungan") return "Jalur 02: Kunjungan Evaluasi Lapangan";
    if (selectedPathway === "chef") return "Jalur 03: Chef & F&B Director (Sample Box)";
    return "";
  };

  const generateSubmissionText = () => {
    const lines = [
      `PERMINTAAN KEMITRAAN MAN3`,
      `========================`,
      `Jalur: ${getPathwayTitle()}`,
      `Nama: ${formData.picName}`,
      `Institusi / Bisnis: ${formData.orgName}`,
      `Email: ${formData.email}`,
      `Kontak: ${formData.phone}`,
    ];

    if (selectedPathway === "resto") {
      lines.push(`Kebutuhan Produk: ${formData.productNeeds || "-"}`);
      lines.push(`Estimasi Volume Mingguan: ${formData.weeklyEstimate || "-"}`);
    } else if (selectedPathway === "kunjungan") {
      lines.push(`Preferensi Jadwal Kunjungan: ${formData.schedulePref || "-"}`);
      lines.push(`Jumlah Peserta: ${formData.participantCount}`);
    } else if (selectedPathway === "chef") {
      lines.push(`Produk Sampel yang Diminta: ${formData.sampleItems || "-"}`);
      lines.push(`Kebutuhan Spesifikasi Potongan: ${formData.cutSpecs || "-"}`);
    }

    lines.push(``);
    lines.push(`Tanggal Diajukan: ${new Date().toLocaleDateString("id-ID")}`);
    lines.push(`Status: Purwarupa Digital MAN3 (Demo Mode)`);

    return lines.join("\n");
  };

  const copyToClipboard = () => {
    const text = generateSubmissionText();
    navigator.clipboard.writeText(text);
    setCopiedData(true);
    setTimeout(() => setCopiedData(false), 2500);
  };

  return (
    <div className="w-full bg-white text-[#141A17] pb-24">
      {/* Breadcrumb Header */}
      <div className="w-full bg-[#FBFBF9] border-b border-[#E5E5DE] py-3">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[#6B726C]">
            <Link href="/" className="hover:text-[#0F3D2E] transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#0F3D2E] font-bold">Kemitraan B2B</span>
          </nav>
          <div className="text-[11px] font-mono text-[#6B726C]">
            Hubungan Mitra Terjadwal &amp; Pengadaan
          </div>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Main Headline & Descriptor */}
        <div className="max-w-3xl space-y-3 mb-12">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A4B2A] font-semibold block">
            Saluran Kerjasama Resmi
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#0F3D2E] tracking-tight leading-tight">
            Mulai Kemitraan Langsung
          </h1>
          <p className="text-base text-[#4E5752] leading-relaxed">
            Diskusikan kebutuhan pasokan, kunjungan kawasan, atau spesifikasi produk bersama tim MAN3.
            Pilih salah satu dari tiga jalur kemitraan di bawah ini untuk memulai.
          </p>
        </div>

        {/* STEP 1: PATHWAY SELECTION (When no pathway is active) */}
        {!selectedPathway ? (
          <div className="space-y-6">
            <div className="border-b border-[#E5E5DE] pb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B726C] font-semibold">
                Langkah 01 — Pilih Jalur Sesuai Profil Kebutuhan Anda
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* PATH 01 — RESTORAN & HOTEL */}
              <div className="border border-[#E5E5DE] bg-[#FBFBF9] hover:bg-white hover:border-[#0F3D2E] p-6 sm:p-8 rounded-[4px] flex flex-col justify-between transition-all space-y-6 shadow-sm">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-[4px] bg-[#E8F3ED] text-[#0F3D2E] flex items-center justify-center font-mono font-bold text-xs">
                    01
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A4B2A] font-bold block">
                    PATH 01
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#0F3D2E]">
                    Restoran &amp; Hotel
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4E5752] leading-relaxed">
                    Minta alokasi kuota mingguan dan jadwal pengiriman untuk kebutuhan operasional bisnis Anda.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPathway("resto")}
                  className="w-full py-2.5 px-4 rounded-[4px] bg-[#0F3D2E] hover:bg-[#08261C] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <span>Isi Form Singkat</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* PATH 02 — KUNJUNGAN LAPANGAN */}
              <div className="border border-[#E5E5DE] bg-[#FBFBF9] hover:bg-white hover:border-[#0F3D2E] p-6 sm:p-8 rounded-[4px] flex flex-col justify-between transition-all space-y-6 shadow-sm">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-[4px] bg-[#E8F3ED] text-[#0F3D2E] flex items-center justify-center font-mono font-bold text-xs">
                    02
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A4B2A] font-bold block">
                    PATH 02
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#0F3D2E]">
                    Kunjungan Lapangan
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4E5752] leading-relaxed">
                    Lihat konsep padang gembala, sistem zonasi, dan pendekatan pengelolaan kawasan.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPathway("kunjungan")}
                  className="w-full py-2.5 px-4 rounded-[4px] bg-[#0F3D2E] hover:bg-[#08261C] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <span>Jadwalkan Kunjungan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* PATH 03 — CHEF & F&B DIRECTOR */}
              <div className="border border-[#E5E5DE] bg-[#FBFBF9] hover:bg-white hover:border-[#0F3D2E] p-6 sm:p-8 rounded-[4px] flex flex-col justify-between transition-all space-y-6 shadow-sm">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-[4px] bg-[#E8F3ED] text-[#0F3D2E] flex items-center justify-center font-mono font-bold text-xs">
                    03
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A4B2A] font-bold block">
                    PATH 03
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-[#0F3D2E]">
                    Chef &amp; F&amp;B Director
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4E5752] leading-relaxed">
                    Minta sample box dan spesifikasi teknis produk untuk kebutuhan dapur profesional.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPathway("chef")}
                  className="w-full py-2.5 px-4 rounded-[4px] bg-[#0F3D2E] hover:bg-[#08261C] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <span>Minta Sample</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* STEP 2: PROGRESSIVE DISCLOSURE FORM */
          <div className="max-w-2xl bg-[#FBFBF9] border border-[#E5E5DE] p-6 sm:p-10 rounded-[4px] shadow-sm space-y-6 animate-in fade-in duration-200">
            {/* Header with Back button */}
            <div className="flex items-center justify-between border-b border-[#E5E5DE] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A4B2A] font-bold">
                  {getPathwayTitle()}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F3D2E] mt-0.5">
                  Formulir Kemitraan Langsung
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPathway(null)}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#6B726C] hover:text-[#0F3D2E] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Ganti Jalur</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              {/* Shared required fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[#141A17] font-semibold mb-1">
                    Nama Lengkap / PIC <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="picName"
                    value={formData.picName}
                    onChange={handleInputChange}
                    placeholder="Nama lengkap"
                    className="w-full px-3 py-2 border border-[#E5E5DE] rounded-[2px] bg-white text-[#141A17] focus:outline-none focus:border-[#0F3D2E]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#141A17] font-semibold mb-1">
                    Nama Bisnis / Institusi <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="orgName"
                    value={formData.orgName}
                    onChange={handleInputChange}
                    placeholder="Restoran / Hotel / Perusahaan"
                    className="w-full px-3 py-2 border border-[#E5E5DE] rounded-[2px] bg-white text-[#141A17] focus:outline-none focus:border-[#0F3D2E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[#141A17] font-semibold mb-1">
                    Email Kerja <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="pic@perusahaan.com"
                    className="w-full px-3 py-2 border border-[#E5E5DE] rounded-[2px] bg-white text-[#141A17] focus:outline-none focus:border-[#0F3D2E]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#141A17] font-semibold mb-1">
                    Nomor Kontak / WhatsApp <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-3 py-2 border border-[#E5E5DE] rounded-[2px] bg-white text-[#141A17] focus:outline-none focus:border-[#0F3D2E]"
                  />
                </div>
              </div>

              {/* Pathway 1 Specific: Resto & Hotel */}
              {selectedPathway === "resto" && (
                <>
                  <div>
                    <label className="block uppercase tracking-wider text-[#141A17] font-semibold mb-1">
                      Kebutuhan Produk
                    </label>
                    <input
                      type="text"
                      name="productNeeds"
                      value={formData.productNeeds}
                      onChange={handleInputChange}
                      placeholder="Contoh: Tenderloin, Ribeye, Ayam Kampung, Sayuran"
                      className="w-full px-3 py-2 border border-[#E5E5DE] rounded-[2px] bg-white text-[#141A17] focus:outline-none focus:border-[#0F3D2E]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#141A17] font-semibold mb-1">
                      Estimasi Kebutuhan Mingguan
                    </label>
                    <input
                      type="text"
                      name="weeklyEstimate"
                      value={formData.weeklyEstimate}
                      onChange={handleInputChange}
                      placeholder="Contoh: 30–50 kg daging sapi / minggu"
                      className="w-full px-3 py-2 border border-[#E5E5DE] rounded-[2px] bg-white text-[#141A17] focus:outline-none focus:border-[#0F3D2E]"
                    />
                  </div>
                </>
              )}

              {/* Pathway 2 Specific: Kunjungan Lapangan */}
              {selectedPathway === "kunjungan" && (
                <>
                  <div>
                    <label className="block uppercase tracking-wider text-[#141A17] font-semibold mb-1">
                      Preferensi Jadwal Kunjungan
                    </label>
                    <input
                      type="text"
                      name="schedulePref"
                      value={formData.schedulePref}
                      onChange={handleInputChange}
                      placeholder="Contoh: Akhir pekan bulan depan / Hari kerja pagi"
                      className="w-full px-3 py-2 border border-[#E5E5DE] rounded-[2px] bg-white text-[#141A17] focus:outline-none focus:border-[#0F3D2E]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#141A17] font-semibold mb-1">
                      Jumlah Peserta Kunjungan
                    </label>
                    <select
                      name="participantCount"
                      value={formData.participantCount}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-[#E5E5DE] rounded-[2px] bg-white text-[#141A17] focus:outline-none focus:border-[#0F3D2E]"
                    >
                      <option value="1–2 orang (Manajemen)">1–2 orang (Manajemen Dapur)</option>
                      <option value="3–5 orang (Tim F&B)">3–5 orang (Tim F&amp;B)</option>
                      <option value="> 5 orang (Delegasi)">Lebih dari 5 orang (Delegasi)</option>
                    </select>
                  </div>
                </>
              )}

              {/* Pathway 3 Specific: Chef & F&B Director */}
              {selectedPathway === "chef" && (
                <>
                  <div>
                    <label className="block uppercase tracking-wider text-[#141A17] font-semibold mb-1">
                      Produk yang Ingin Dicoba (Sample Box)
                    </label>
                    <input
                      type="text"
                      name="sampleItems"
                      value={formData.sampleItems}
                      onChange={handleInputChange}
                      placeholder="Contoh: Sample cut Striploin, Tenderloin, Ayam Bio-Probiotik"
                      className="w-full px-3 py-2 border border-[#E5E5DE] rounded-[2px] bg-white text-[#141A17] focus:outline-none focus:border-[#0F3D2E]"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#141A17] font-semibold mb-1">
                      Kebutuhan Spesifikasi Teknis Potongan
                    </label>
                    <input
                      type="text"
                      name="cutSpecs"
                      value={formData.cutSpecs}
                      onChange={handleInputChange}
                      placeholder="Contoh: Portion cut 250g, aging request, ketebalan spesifik"
                      className="w-full px-3 py-2 border border-[#E5E5DE] rounded-[2px] bg-white text-[#141A17] focus:outline-none focus:border-[#0F3D2E]"
                    />
                  </div>
                </>
              )}

              {formError && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-[2px]">
                  {formError}
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-[4px] bg-[#0F3D2E] hover:bg-[#08261C] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors shadow-sm"
                >
                  Kirim Permintaan Kerjasama
                </button>
              </div>

              <p className="text-[10px] text-[#6B726C] text-center pt-1">
                Data formulir ditinjau langsung oleh tim pengadaan MAN3 dalam 1x24 jam kerja.
              </p>
            </form>
          </div>
        )}

        {/* LOCATION REFERENCE SECTION (Replacing generic Google Maps embed) */}
        <div className="mt-16 pt-12 border-t border-[#E5E5DE]">
          <div className="p-6 bg-[#FBFBF9] border border-[#E5E5DE] rounded-[4px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#7A4B2A] font-semibold block">
                Referensi Lokasi Kawasan
              </span>
              <h4 className="font-serif text-lg font-bold text-[#0F3D2E]">
                Koridor Lereng Gunung Gede–Pangrango, Jawa Barat
              </h4>
              <p className="text-xs text-[#4E5752] max-w-xl">
                Kawasan terpadu konservasi dataran tinggi dengan akses distribusi cold-chain terjadwal menuju area metropolitan Jabodetabek dan Bandung Raya.
              </p>
            </div>

            <a
              href="https://maps.google.com/?q=Taman+Nasional+Gunung+Gede+Pangrango"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[4px] border border-[#0F3D2E] text-[#0F3D2E] hover:bg-[#0F3D2E] hover:text-white text-xs font-mono font-semibold transition-colors whitespace-nowrap"
            >
              <span>Lihat lokasi referensi kawasan →</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* DEMO SUBMISSION MODAL */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-[#E5E5DE] rounded-[4px] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-[#E5E5DE] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#0F3D2E]" />
                <h3 className="font-serif text-xl font-bold text-[#0F3D2E]">
                  Rincian Permintaan Disiapkan
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDemoModal(false)}
                className="p-1 rounded-[4px] text-[#6B726C] hover:bg-[#F5F5F1]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-mono">
              <div className="p-3 bg-[#FEF9C3] border border-[#FDE047] rounded-[2px] text-[#854D0E] space-y-1">
                <strong>Status Purwarupa Digital</strong>
                <p>
                  Ini merupakan simulasi antarmuka permohonan kemitraan. Formulir ini tidak menyimpan data pribadi ke basis data live. Anda dapat menyalin rincian permohonan di bawah ini untuk dikirimkan melalui saluran resmi MAN3.
                </p>
              </div>

              {/* Form Summary Output */}
              <div className="p-4 bg-[#FBFBF9] border border-[#E5E5DE] rounded-[2px] space-y-2 text-[#141A17]">
                <p><strong>Jalur:</strong> {getPathwayTitle()}</p>
                <p><strong>PIC:</strong> {formData.picName}</p>
                <p><strong>Bisnis:</strong> {formData.orgName}</p>
                <p><strong>Email:</strong> {formData.email}</p>
                <p><strong>Kontak:</strong> {formData.phone}</p>
                {selectedPathway === "resto" && (
                  <>
                    <p><strong>Kebutuhan Produk:</strong> {formData.productNeeds || "-"}</p>
                    <p><strong>Estimasi Mingguan:</strong> {formData.weeklyEstimate || "-"}</p>
                  </>
                )}
                {selectedPathway === "kunjungan" && (
                  <>
                    <p><strong>Jadwal Kunjungan:</strong> {formData.schedulePref || "-"}</p>
                    <p><strong>Peserta:</strong> {formData.participantCount}</p>
                  </>
                )}
                {selectedPathway === "chef" && (
                  <>
                    <p><strong>Sampel yang Diminta:</strong> {formData.sampleItems || "-"}</p>
                    <p><strong>Spesifikasi:</strong> {formData.cutSpecs || "-"}</p>
                  </>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-end">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] border border-[#0F3D2E] text-[#0F3D2E] hover:bg-[#F5F8F6] font-semibold transition-colors"
                >
                  {copiedData ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedData ? "Berhasil Disalin!" : "Salin Rincian Permintaan"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowDemoModal(false)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-[4px] bg-[#0F3D2E] text-white font-semibold hover:bg-[#08261C] transition-colors"
                >
                  Tutup Dialog
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function KemitraanB2BPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center font-mono text-xs">Memuat halaman kemitraan...</div>}>
      <KemitraanContent />
    </Suspense>
  );
}
