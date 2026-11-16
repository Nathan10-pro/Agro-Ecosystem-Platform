"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ChevronRight,
  ShoppingCart,
  Truck,
  Calendar,
  CheckCircle2,
  Clock,
  Layers,
  FileCheck,
  ArrowRight,
} from "lucide-react";

export default function PortalMitraPage() {
  const [customer, setCustomer] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
  });
  const [submitError, setSubmitError] = useState("");
  const [items, setItems] = useState([
    {
      id: "p1",
      name: "Tenderloin Sapi Pasture-Fed",
      sub: "Padang Gembala Hijau MAN3",
      spec: "Vacuum Skin Pack (1-2 kg)",
      price: 385000,
      unit: "kg",
      stock: 180,
      qty: 10,
    },
    {
      id: "p2",
      name: "Ribeye Sapi Pasture-Fed",
      sub: "Padang Gembala Hijau MAN3",
      spec: "Vacuum Skin Pack (2-3 kg)",
      price: 340000,
      unit: "kg",
      stock: 240,
      qty: 15,
    },
    {
      id: "p3",
      name: "Ayam Kampung Organik",
      sub: "Peternakan Bebas Sangkar MAN3",
      spec: "Karkas Utuh (0.9-1.1 kg)",
      price: 85000,
      unit: "ekor",
      stock: 80,
      qty: 20,
    },
    {
      id: "p4",
      name: "Paket Sayuran Dataran Tinggi",
      sub: "Budidaya Polikultur Tanpa Pestisida",
      spec: "Box Curated Segar (5 kg)",
      price: 65000,
      unit: "pack",
      stock: 50,
      qty: 8,
    },
  ]);

  const [deliverySlot, setDeliverySlot] = useState("subuh");
  const [orderSent, setOrderSent] = useState(false);
  const [orderId, setOrderId] = useState("");

  const updateQty = (id: string, val: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(0, Math.min(item.stock, val)) } : item
      )
    );
  };

  const subtotal = items.reduce((acc, curr) => acc + curr.price * curr.qty, 0);
  const tax = subtotal * 0.11;
  const total = subtotal + tax;

  function handleSubmitOrder() {
    if (!customer.name.trim() || !customer.email.trim() || !customer.phone.trim()) {
      setSubmitError("Nama PIC, email, dan nomor telepon wajib diisi.");
      return;
    }

    if (!items.some((item) => item.qty > 0)) {
      setSubmitError("Pilih minimal satu produk untuk reservasi alokasi.");
      return;
    }

    setSubmitError("");
    setOrderId(`MAN3-B2B-${Math.floor(1000 + Math.random() * 9000)}`);
    setOrderSent(true);
  }

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
            <span className="text-primary font-bold">Portal Mitra B2B</span>
          </nav>
          <div className="flex items-center gap-2 bg-surface-container-highest px-3 py-1 rounded-full text-primary font-semibold">
            <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
            <span>Portal Alokasi Terjadwal</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mb-8 space-y-2">
          <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wider">
            Layanan Mitra Restoran, Hotel &amp; Katering
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
            Portal Alokasi &amp; Pemesanan B2B
          </h1>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Akses pemesanan pasokan bahan pangan berkualitas ekologis untuk mitra resmi MAN3. Pilih volume batch panen dan tentukan slot pengiriman berpendingin sesuai jadwal operasional dapur Anda.
          </p>
        </div>

        {orderSent ? (
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-outline-variant/40 text-center max-w-2xl mx-auto shadow-md space-y-4">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary mx-auto">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-primary">Permintaan Alokasi Berhasil Diajukan</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Nomor Registrasi Batch: <strong className="font-mono text-primary">#{orderId}</strong>. Tim kemitraan B2B MAN3 telah menerima rincian alokasi dan akan mengonfirmasi konfirmasi ketersediaan serta jadwal cold chain ke kontak terdaftar.
            </p>
            <button
              type="button"
              onClick={() => setOrderSent(false)}
              className="mt-4 px-6 py-2.5 rounded-xl bg-primary text-white font-mono text-xs uppercase font-bold"
            >
              Buat Pemesanan Lain
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Products Allocation Table (8 cols) */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-surface-container flex items-center justify-between bg-surface-container-low">
                <div>
                  <h3 className="font-serif text-lg font-bold text-primary">Alokasi Panen &amp; Ketersediaan Batch</h3>
                  <span className="text-xs text-on-surface-variant font-mono">Daftar produk dan kuota ketersediaan batch saat ini</span>
                </div>
                <span className="text-xs font-mono text-secondary font-bold">4 Komoditas Siap Alokasi</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-surface-container text-[11px] font-mono text-on-surface-variant uppercase bg-surface-container-low/50">
                      <th className="py-3 px-4 font-bold">Produk &amp; Asal</th>
                      <th className="py-3 px-3 font-bold">Ketersediaan</th>
                      <th className="py-3 px-3 font-bold">Harga B2B</th>
                      <th className="py-3 px-3 font-bold">Spesifikasi Potongan</th>
                      <th className="py-3 px-4 text-right font-bold">Jumlah</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container text-xs">
                    {items.map((item) => (
                      <tr key={item.id} className="hover:bg-surface-container-low/40 transition-colors">
                        <td className="py-4 px-4">
                          <p className="font-bold text-primary text-sm">{item.name}</p>
                          <span className="text-[11px] text-on-surface-variant block mt-0.5">{item.sub}</span>
                        </td>
                        <td className="py-4 px-3">
                          <span className="font-mono font-bold text-tertiary-container">{item.stock} {item.unit}</span>
                          <span className="text-[10px] text-on-surface-variant block">Cold Chilled</span>
                        </td>
                        <td className="py-4 px-3">
                          <span className="font-mono font-bold text-primary">Rp {item.price.toLocaleString("id-ID")}</span>
                          <span className="text-[10px] text-on-surface-variant block">/ {item.unit}</span>
                        </td>
                        <td className="py-4 px-3">
                          <span className="inline-block px-2.5 py-1 rounded bg-surface-container text-primary font-mono text-[11px]">
                            {item.spec}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5 justify-end">
                            <input
                              type="number"
                              min="0"
                              max={item.stock}
                              value={item.qty}
                              onChange={(e) => updateQty(item.id, parseInt(e.target.value) || 0)}
                              className="w-16 px-2 py-1.5 rounded border border-outline-variant text-right font-mono text-xs font-bold bg-surface-container-low focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <span className="font-mono text-[11px] text-on-surface-variant">{item.unit}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Summary Sidebar (4 cols) */}
            <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-outline-variant/50 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-surface-container pb-4">
                <h3 className="font-serif text-xl font-bold text-primary">Ringkasan Alokasi Batch</h3>
                <ShoppingCart className="w-5 h-5 text-primary" />
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-on-surface mb-1">
                    Nama PIC
                  </label>
                  <input
                    value={customer.name}
                    onChange={(event) => setCustomer((prev) => ({ ...prev, name: event.target.value }))}
                    className="w-full rounded-lg border border-outline-variant/60 bg-surface-container-low px-3 py-2 text-sm"
                    placeholder="Nama kontak"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase font-bold text-on-surface mb-1">
                    Nama restoran / perusahaan
                  </label>
                  <input
                    value={customer.company}
                    onChange={(event) => setCustomer((prev) => ({ ...prev, company: event.target.value }))}
                    className="w-full rounded-lg border border-outline-variant/60 bg-surface-container-low px-3 py-2 text-sm"
                    placeholder="PT / restoran / hotel"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-on-surface mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={customer.email}
                      onChange={(event) => setCustomer((prev) => ({ ...prev, email: event.target.value }))}
                      className="w-full rounded-lg border border-outline-variant/60 bg-surface-container-low px-3 py-2 text-sm"
                      placeholder="nama@perusahaan.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase font-bold text-on-surface mb-1">
                      Telepon
                    </label>
                    <input
                      value={customer.phone}
                      onChange={(event) => setCustomer((prev) => ({ ...prev, phone: event.target.value }))}
                      className="w-full rounded-lg border border-outline-variant/60 bg-surface-container-low px-3 py-2 text-sm"
                      placeholder="0812-xxxx-xxxx"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Schedule Options */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase font-bold text-on-surface">
                  Pilih slot waktu pengiriman:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setDeliverySlot("subuh")}
                    className={`p-2.5 rounded-xl border text-left transition-colors ${
                      deliverySlot === "subuh"
                        ? "border-primary bg-primary text-white"
                        : "border-outline-variant/60 bg-surface-container-low text-on-surface"
                    }`}
                  >
                    <span className="block font-bold">Pagi (05:00 - 08:00)</span>
                    <span className="text-[10px] opacity-80">Prioritas dapur pagi</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliverySlot("siang")}
                    className={`p-2.5 rounded-xl border text-left transition-colors ${
                      deliverySlot === "siang"
                        ? "border-primary bg-primary text-white"
                        : "border-outline-variant/60 bg-surface-container-low text-on-surface"
                    }`}
                  >
                    <span className="block font-bold">Siang (10:00 - 13:00)</span>
                    <span className="text-[10px] opacity-80">Pengiriman reguler</span>
                  </button>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="p-4 rounded-xl bg-surface-container-low space-y-2.5 text-xs font-mono">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal Alokasi:</span>
                  <span className="font-bold text-primary">Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>PPN (11%):</span>
                  <span>Rp {tax.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Biaya Distribusi Cold Chain:</span>
                  <span className="text-tertiary-container font-bold">Termasuk (Area Layanan)</span>
                </div>
                <div className="pt-2 border-t border-surface-container flex justify-between text-sm font-bold text-primary">
                  <span>Estimasi Total:</span>
                  <span className="font-serif text-xl">Rp {total.toLocaleString("id-ID")}</span>
                </div>
              </div>

              {submitError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                  {submitError}
                </div>
              )}

              {/* Submit Action */}
              <button
                type="button"
                onClick={handleSubmitOrder}
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-container text-white font-mono text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <CheckCircle2 className="w-4 h-4" />
                Ajukan Reservasi Alokasi
              </button>

              <p className="text-[11px] text-on-surface-variant/80 text-center font-mono">
                Tim logistik MAN3 akan mengonfirmasi batch ketersediaan dan dokumen pengiriman dalam 1x24 jam kerja.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
