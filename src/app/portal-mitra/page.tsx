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
      name: "Pasture-Fed Tenderloin (MB 4-6)",
      sub: "Zone A Highland • Aging 28 Hari",
      spec: "Whole Muscle Vacuum",
      price: 385000,
      unit: "kg",
      stock: 180,
      qty: 10,
    },
    {
      id: "p2",
      name: "Pasture-Fed Ribeye Lip-on",
      sub: "Cisarua Agro-Pasture • Dry Chill",
      spec: "Portion Cut 300g (Skin-Pack)",
      price: 340000,
      unit: "kg",
      stock: 240,
      qty: 15,
    },
    {
      id: "p3",
      name: "Ayam Kampung Bio-Probiotik",
      sub: "Free-Range Dataran Tinggi • Air-Chilled",
      spec: "Utuh Bersih (Dressed 1.1kg)",
      price: 82000,
      unit: "ekor",
      stock: 45,
      qty: 20,
    },
    {
      id: "p4",
      name: "Heirloom Microgreens Mix",
      sub: "Panen Subuh 03:00 WIB • Clamshell 250g",
      spec: "Fresh Crisp Harvest",
      price: 45000,
      unit: "pack",
      stock: 35,
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
      setSubmitError("Nama, email, dan nomor telepon wajib diisi.");
      return;
    }

    if (!items.some((item) => item.qty > 0)) {
      setSubmitError("Pilih minimal satu produk untuk dikirim.");
      return;
    }

    setSubmitError("");
    setOrderId("MAN3-DEMO-001");
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
            <span className="text-primary font-bold">Prototipe Portal Mitra B2B</span>
          </nav>
          <div className="flex items-center gap-2 bg-surface-container-highest px-3 py-1 rounded-full text-primary font-semibold">
            <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
            <span>Mode demo • stok dan harga simulasi</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-3xl mb-8 space-y-2">
          <span className="text-xs font-mono text-secondary font-bold uppercase tracking-wider">
            Pratinjau Antarmuka • Tidak Ada Transaksi Nyata
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
            Simulasi Pemesanan B2B
          </h1>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Jelajahi alur pemesanan yang direncanakan. Produk, harga, stok, dan jadwal pada halaman ini adalah data contoh; formulir tidak mengirim atau menyimpan data.
          </p>
          <p className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950">
            Ini hanya demo UI. Jangan masukkan data pribadi atau gunakan halaman ini untuk pemesanan nyata.
          </p>
        </div>

        {orderSent ? (
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-outline-variant/40 text-center max-w-2xl mx-auto shadow-md space-y-4">
            <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary mx-auto">
              <CheckCircle2 className="w-8 h-8 text-tertiary-container" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-primary">Simulasi Selesai</h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              ID demo: <strong className="font-mono text-primary">#{orderId}</strong>. Tidak ada pesanan, data pelanggan, pembayaran, atau pengiriman yang dibuat.
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
                  <h3 className="font-serif text-lg font-bold text-primary">Alokasi Panen &amp; Batch Ready</h3>
                  <span className="text-xs text-on-surface-variant font-mono">Daftar produk dan kuota contoh (simulasi)</span>
                </div>
                <span className="text-xs font-mono text-secondary font-bold">4 Contoh Produk</span>
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
                      placeholder="you@company.com"
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
                      placeholder="08xxx"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Schedule Options */}
              <div className="space-y-2">
                <label className="block text-xs font-mono uppercase font-bold text-on-surface">
                  Pilih Slot Waktu Dispatch Rantai Dingin:
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
                    <span className="block font-bold">Slot Subuh (04:30)</span>
                    <span className="text-[10px] opacity-80">Tiba sebelum prep</span>
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
                    <span className="block font-bold">Slot Siang (11:00)</span>
                    <span className="text-[10px] opacity-80">Dinner session ready</span>
                  </button>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="p-4 rounded-xl bg-surface-container-low space-y-2.5 text-xs font-mono">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal Bahan Baku:</span>
                  <span className="font-bold text-primary">Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>PPN B2B (11%):</span>
                  <span>Rp {tax.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Logistik Insulator Rantai Dingin:</span>
                  <span className="text-tertiary-container font-bold">Termasuk (Gratis B2B)</span>
                </div>
                <div className="pt-2 border-t border-surface-container flex justify-between text-sm font-bold text-primary">
                  <span>Total Tagihan:</span>
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
                Simulasikan Reservasi
              </button>

              <p className="text-[11px] text-on-surface-variant/80 text-center font-mono">
                Data pada formulir hanya diproses di browser untuk demo dan tidak dikirim.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
