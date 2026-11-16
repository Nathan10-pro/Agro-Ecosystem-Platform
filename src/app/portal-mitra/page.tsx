"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ShoppingCart,
  CheckCircle2,
  Clock,
  Truck,
  Copy,
  Check,
  X,
  AlertCircle,
  Filter,
} from "lucide-react";

interface CatalogItem {
  id: string;
  name: string;
  category: "Daging Sapi" | "Unggas" | "Sayuran";
  spec: string;
  unit: string;
  stock: number;
  price: number;
  status: "ready" | "limited" | "unavailable";
  defaultQty: number;
}

const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: "p1",
    name: "Tenderloin Pasture-Fed",
    category: "Daging Sapi",
    spec: "Whole muscle, vacuum skin pack",
    unit: "kg",
    stock: 180,
    price: 385000,
    status: "ready",
    defaultQty: 10,
  },
  {
    id: "p2",
    name: "Ribeye Lip-on",
    category: "Daging Sapi",
    spec: "Portion cut 300g, cold-chilled",
    unit: "kg",
    stock: 240,
    price: 340000,
    status: "ready",
    defaultQty: 15,
  },
  {
    id: "p3",
    name: "Striploin Reserve",
    category: "Daging Sapi",
    spec: "Whole muscle, aged 14 hari",
    unit: "kg",
    stock: 45,
    price: 310000,
    status: "limited",
    defaultQty: 5,
  },
  {
    id: "p4",
    name: "Brisket Point End",
    category: "Daging Sapi",
    spec: "Vacuum pack 4–5 kg",
    unit: "kg",
    stock: 0,
    price: 185000,
    status: "unavailable",
    defaultQty: 0,
  },
  {
    id: "p5",
    name: "Ayam Kampung Bio-Probiotik",
    category: "Unggas",
    spec: "Karkas utuh bersih 0.9–1.1 kg",
    unit: "ekor",
    stock: 45,
    price: 82000,
    status: "limited",
    defaultQty: 10,
  },
  {
    id: "p6",
    name: "Bebek Padang Rumput",
    category: "Unggas",
    spec: "Karkas bersih dingin 1.4 kg",
    unit: "ekor",
    stock: 60,
    price: 98000,
    status: "ready",
    defaultQty: 5,
  },
  {
    id: "p7",
    name: "Paket Sayuran Daun Dataran Tinggi",
    category: "Sayuran",
    spec: "Box curated 5 kg, panen segar",
    unit: "pack",
    stock: 50,
    price: 65000,
    status: "ready",
    defaultQty: 5,
  },
  {
    id: "p8",
    name: "Baby Carrots & Bit Vulkanik",
    category: "Sayuran",
    spec: "Crate 3 kg panen harian",
    unit: "pack",
    stock: 20,
    price: 55000,
    status: "limited",
    defaultQty: 4,
  },
];

const TAX_RATE = 0.11; // 11% Indonesian PPN
const COLD_CHAIN_FEE = 150000; // Standard dedicated cold-chain delivery slot fee

export default function PortalMitraPage() {
  // Form State
  const [customerName, setCustomerName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [deliverySlot, setDeliverySlot] = useState<"subuh" | "siang">("subuh");

  // Selection & Quantity State: { [id]: { selected: boolean, qty: number } }
  const [orderState, setOrderState] = useState<Record<string, { selected: boolean; qty: number }>>(() => {
    const initial: Record<string, { selected: boolean; qty: number }> = {};
    CATALOG_ITEMS.forEach((item) => {
      initial[item.id] = {
        selected: item.id === "p1" || item.id === "p2",
        qty: item.stock > 0 ? item.defaultQty : 0,
      };
    });
    return initial;
  });

  // Filters State
  const [categoryFilter, setCategoryFilter] = useState<string>("Semua");
  const [onlyReadyStock, setOnlyReadyStock] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(400000);

  // Validation & Modal State
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Sync with localStorage from homepage additions
  useEffect(() => {
    try {
      const saved = localStorage.getItem("man3_cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setOrderState((prev) => {
            const next = { ...prev };
            parsed.forEach((cartItem: { id: string; qty?: number }) => {
              if (next[cartItem.id]) {
                next[cartItem.id] = {
                  selected: true,
                  qty: Math.max(1, cartItem.qty || next[cartItem.id].qty),
                };
              }
            });
            return next;
          });
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return CATALOG_ITEMS.filter((item) => {
      if (categoryFilter !== "Semua" && item.category !== categoryFilter) {
        return false;
      }
      if (onlyReadyStock && item.stock <= 0) {
        return false;
      }
      if (item.price > maxPrice) {
        return false;
      }
      return true;
    });
  }, [categoryFilter, onlyReadyStock, maxPrice]);

  // Handle Selection Toggle
  const toggleSelect = (id: string) => {
    const item = CATALOG_ITEMS.find((c) => c.id === id);
    if (!item || item.stock <= 0) return;

    setOrderState((prev) => {
      const current = prev[id] || { selected: false, qty: 1 };
      const nextSelected = !current.selected;
      return {
        ...prev,
        [id]: {
          selected: nextSelected,
          qty: nextSelected ? Math.max(1, current.qty) : current.qty,
        },
      };
    });
  };

  // Handle Quantity Change
  const updateQty = (id: string, val: number) => {
    const item = CATALOG_ITEMS.find((c) => c.id === id);
    if (!item) return;

    const clamped = Math.max(0, Math.min(item.stock, val));
    setOrderState((prev) => ({
      ...prev,
      [id]: {
        selected: clamped > 0,
        qty: clamped,
      },
    }));
  };

  // Calculation Breakdown
  const selectedItemsList = useMemo(() => {
    return CATALOG_ITEMS.filter((item) => {
      const state = orderState[item.id];
      return state && state.selected && state.qty > 0;
    }).map((item) => ({
      ...item,
      qty: orderState[item.id].qty,
      itemTotal: item.price * orderState[item.id].qty,
    }));
  }, [orderState]);

  const subtotal = selectedItemsList.reduce((acc, curr) => acc + curr.itemTotal, 0);
  const taxAmount = subtotal * TAX_RATE;
  const coldChainAmount = subtotal > 0 ? COLD_CHAIN_FEE : 0;
  const grandTotal = subtotal + taxAmount + coldChainAmount;

  // Form Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim()) {
      setErrorMessage("Nama PIC wajib diisi.");
      return;
    }
    if (!companyName.trim()) {
      setErrorMessage("Nama restoran atau perusahaan wajib diisi.");
      return;
    }
    if (selectedItemsList.length === 0) {
      setErrorMessage("Pilih minimal satu komoditas produk dengan kuantitas lebih dari 0.");
      return;
    }

    setErrorMessage("");
    setShowConfirmationModal(true);
  };

  // Structured Text for Clipboard
  const generateOrderSummaryText = () => {
    const lines = [
      `DRAF RESERVASI ALOKASI B2B — MAN3`,
      `==================================`,
      `PIC: ${customerName}`,
      `Perusahaan: ${companyName}`,
      `Slot Pengiriman: ${deliverySlot === "subuh" ? "Subuh (04:30–06:00 WIB)" : "Siang (10:00–12:00 WIB)"}`,
      `Tanggal Permintaan: ${new Date().toLocaleDateString("id-ID")}`,
      ``,
      `RINCIAN KOMODITAS:`,
      ...selectedItemsList.map(
        (i, idx) =>
          `${idx + 1}. ${i.name} (${i.spec}) — ${i.qty} ${i.unit} @ Rp${i.price.toLocaleString("id-ID")} = Rp${i.itemTotal.toLocaleString("id-ID")}`
      ),
      ``,
      `RINGKASAN BIAYA:`,
      `Subtotal: Rp${subtotal.toLocaleString("id-ID")}`,
      `PPN (11%): Rp${Math.round(taxAmount).toLocaleString("id-ID")}`,
      `Cold-Chain Delivery: Rp${coldChainAmount.toLocaleString("id-ID")}`,
      `TOTAL ESTIMASI: Rp${Math.round(grandTotal).toLocaleString("id-ID")}`,
      ``,
      `Catatan: Purwarupa digital MAN3 — Data demo non-operasional.`,
    ];
    return lines.join("\n");
  };

  const copyToClipboard = () => {
    const text = generateOrderSummaryText();
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
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
            <span className="text-[#0F3D2E] font-bold">Portal Mitra B2B</span>
          </nav>
          <div className="text-[11px] font-mono text-[#6B726C]">
            Sistem Alokasi &amp; Reservasi Kuota Panen
          </div>
        </div>
      </div>

      {/* DEMO TRANSPARENCY BANNER */}
      <div className="w-full bg-[#FEF9C3] border-b border-[#FDE047] py-2 px-4 text-center text-xs font-mono text-[#854D0E]">
        Mode demo: data pesanan tidak dikirim ke sistem operasional. Untuk pemesanan aktual, hubungi tim MAN3.
      </div>

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Page Title */}
        <div className="max-w-3xl space-y-2 mb-8">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#7A4B2A] font-semibold block">
            Aplikasi Pengadaan Horeca &amp; Mitra
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[#0F3D2E]">
            Portal Alokasi &amp; Pemesanan B2B
          </h1>
          <p className="text-sm text-[#4E5752] leading-relaxed">
            Pilih komoditas pasokan dari peternakan dan wanatani MAN3. Susun draf alokasi mingguan untuk jadwal pengiriman dingin (cold-chain) langsung ke dapur Anda.
          </p>
        </div>

        {/* Layout: Left 8 Cols (Catalog) + Right 4 Cols (Sticky Summary) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Product Catalog & Filters (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Filter Bar */}
            <div className="p-4 bg-[#FBFBF9] border border-[#E5E5DE] rounded-[4px] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              {/* Category Tabs */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[#6B726C] text-[11px] mr-1">Kategori:</span>
                {["Semua", "Daging Sapi", "Unggas", "Sayuran"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-2.5 py-1 rounded-[2px] transition-colors ${
                      categoryFilter === cat
                        ? "bg-[#0F3D2E] text-white font-bold"
                        : "bg-white border border-[#E5E5DE] text-[#4E5752] hover:bg-[#F5F5F1]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Ready Stock Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer select-none text-[11px] text-[#141A17]">
                <input
                  type="checkbox"
                  checked={onlyReadyStock}
                  onChange={(e) => setOnlyReadyStock(e.target.checked)}
                  className="rounded-[2px] text-[#0F3D2E] focus:ring-[#0F3D2E]"
                />
                <span>Hanya Stok Tersedia</span>
              </label>
            </div>

            {/* Table Container */}
            <div className="border border-[#E5E5DE] rounded-[4px] bg-white overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F5F5F1] border-b border-[#E5E5DE] text-[11px] font-mono text-[#6B726C] uppercase">
                    <th className="py-3 px-3 w-8 text-center">Pilih</th>
                    <th className="py-3 px-3 font-semibold">Produk &amp; Asal</th>
                    <th className="py-3 px-3 font-semibold">Spesifikasi</th>
                    <th className="py-3 px-3 font-semibold">Stok &amp; Status</th>
                    <th className="py-3 px-3 font-semibold">Harga B2B</th>
                    <th className="py-3 px-4 font-semibold text-right">Kuantitas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5DE]">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-[#6B726C] font-mono">
                        Tidak ada produk yang sesuai dengan filter yang dipilih.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((item) => {
                      const isSelected = orderState[item.id]?.selected || false;
                      const currentQty = orderState[item.id]?.qty || 0;
                      const isOutOfStock = item.stock <= 0;

                      return (
                        <tr
                          key={item.id}
                          className={`transition-colors ${
                            isSelected
                              ? "bg-[#F7FBF9]"
                              : isOutOfStock
                              ? "opacity-60 bg-[#FAFAFA]"
                              : "hover:bg-[#FBFBF9]"
                          }`}
                        >
                          {/* Checkbox */}
                          <td className="py-3.5 px-3 text-center">
                            <input
                              type="checkbox"
                              disabled={isOutOfStock}
                              checked={isSelected}
                              onChange={() => toggleSelect(item.id)}
                              className="rounded-[2px] text-[#0F3D2E] focus:ring-[#0F3D2E] disabled:cursor-not-allowed"
                            />
                          </td>

                          {/* Product Name */}
                          <td className="py-3.5 px-3">
                            <span className="font-semibold text-[13px] text-[#141A17] block">
                              {item.name}
                            </span>
                            <span className="text-[10px] font-mono text-[#6B726C]">
                              {item.category}
                            </span>
                          </td>

                          {/* Specification */}
                          <td className="py-3.5 px-3 text-[#4E5752] text-[11px]">
                            {item.spec}
                          </td>

                          {/* Stock & Status */}
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  item.status === "ready"
                                    ? "bg-[#16A34A]" // Green
                                    : item.status === "limited"
                                    ? "bg-[#CA8A04]" // Yellow
                                    : "bg-[#9CA3AF]" // Gray
                                }`}
                              />
                              <span className="font-mono text-[11px] font-bold text-[#141A17]">
                                {item.stock > 0 ? `${item.stock} ${item.unit}` : "Habis"}
                              </span>
                            </div>
                            <span className="text-[9px] font-mono text-[#6B726C] uppercase block mt-0.5">
                              {item.status === "ready"
                                ? "Ready"
                                : item.status === "limited"
                                ? "Terbatas"
                                : "Tidak Tersedia"}
                            </span>
                          </td>

                          {/* Price */}
                          <td className="py-3.5 px-3 font-mono font-bold text-[#0F3D2E] text-[12px] whitespace-nowrap">
                            Rp{item.price.toLocaleString("id-ID")}
                            <span className="text-[10px] text-[#6B726C] font-normal">/{item.unit}</span>
                          </td>

                          {/* Quantity Input */}
                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex items-center gap-1.5 justify-end">
                              <input
                                type="number"
                                min="0"
                                max={item.stock}
                                disabled={isOutOfStock}
                                value={currentQty}
                                onChange={(e) =>
                                  updateQty(item.id, parseInt(e.target.value, 10) || 0)
                                }
                                className="w-16 px-2 py-1 text-right font-mono text-xs border border-[#E5E5DE] rounded-[2px] bg-white text-[#141A17] focus:outline-none focus:border-[#0F3D2E] disabled:bg-[#EFEFEA] disabled:cursor-not-allowed"
                              />
                              <span className="text-[11px] font-mono text-[#6B726C]">
                                {item.unit}
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#6B726C] pt-1">
              <span>Status stok diperbarui secara dinamis per batch panen.</span>
              <span>MOQ sampel B2B berlaku untuk mitra terdaftar.</span>
            </div>
          </div>

          {/* RIGHT: Persistent Order Summary Panel (4 Cols) */}
          <div className="lg:col-span-4 sticky top-20 bg-[#FBFBF9] border border-[#E5E5DE] rounded-[4px] p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-[#E5E5DE] pb-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-[#0F3D2E]" />
                <h3 className="font-serif text-lg font-bold text-[#0F3D2E]">
                  Ringkasan Reservasi
                </h3>
              </div>
              <span className="font-mono text-xs text-[#7A4B2A] font-semibold">
                {selectedItemsList.length} Komoditas
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field 1: Nama PIC */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#141A17] font-semibold mb-1">
                  Nama PIC / Procurement <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Contoh: Bpk. Adrian Wijaya"
                  className="w-full px-3 py-2 text-xs border border-[#E5E5DE] rounded-[2px] bg-white focus:outline-none focus:border-[#0F3D2E]"
                />
              </div>

              {/* Field 2: Nama Restoran / Perusahaan */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#141A17] font-semibold mb-1">
                  Nama Restoran / Perusahaan <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Contoh: Botanica Dining &amp; Grill"
                  className="w-full px-3 py-2 text-xs border border-[#E5E5DE] rounded-[2px] bg-white focus:outline-none focus:border-[#0F3D2E]"
                />
              </div>

              {/* Field 3: Slot Pengiriman */}
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-[#141A17] font-semibold mb-1.5">
                  Slot Pengiriman Cold-Chain:
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setDeliverySlot("subuh")}
                    className={`p-2 rounded-[2px] border text-left transition-colors ${
                      deliverySlot === "subuh"
                        ? "border-[#0F3D2E] bg-[#0F3D2E] text-white font-bold"
                        : "border-[#E5E5DE] bg-white text-[#4E5752] hover:bg-[#F5F5F1]"
                    }`}
                  >
                    <span className="block text-[11px]">Subuh Terjadwal</span>
                    <span className="text-[10px] opacity-80 font-normal">04:30 – 06:00 WIB</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliverySlot("siang")}
                    className={`p-2 rounded-[2px] border text-left transition-colors ${
                      deliverySlot === "siang"
                        ? "border-[#0F3D2E] bg-[#0F3D2E] text-white font-bold"
                        : "border-[#E5E5DE] bg-white text-[#4E5752] hover:bg-[#F5F5F1]"
                    }`}
                  >
                    <span className="block text-[11px]">Siang Hari</span>
                    <span className="text-[10px] opacity-80 font-normal">10:00 – 12:00 WIB</span>
                  </button>
                </div>
              </div>

              {/* Calculation Summary Table */}
              <div className="pt-3 border-t border-[#E5E5DE] space-y-2 text-xs font-mono">
                <div className="flex justify-between text-[#4E5752]">
                  <span>Subtotal Produk:</span>
                  <span className="font-bold text-[#141A17]">
                    Rp{subtotal.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="flex justify-between text-[#4E5752]">
                  <span>PPN (11% terstandar):</span>
                  <span>Rp{Math.round(taxAmount).toLocaleString("id-ID")}</span>
                </div>

                <div className="flex justify-between text-[#4E5752]">
                  <span>Logistik Cold-Chain:</span>
                  <span className="font-medium text-[#141A17]">
                    {subtotal > 0 ? `Rp${coldChainAmount.toLocaleString("id-ID")}` : "Rp0"}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#E5E5DE] flex justify-between text-sm font-bold text-[#0F3D2E]">
                  <span>Total Estimasi:</span>
                  <span className="font-serif text-lg">
                    Rp{Math.round(grandTotal).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {errorMessage && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs font-mono rounded-[2px]">
                  {errorMessage}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-[4px] bg-[#0F3D2E] hover:bg-[#08261C] text-white font-mono text-xs uppercase tracking-wider font-semibold transition-colors shadow-sm"
              >
                Ajukan Reservasi Kuota
              </button>

              <p className="text-[10px] font-mono text-[#6B726C] text-center">
                Konfirmasi alokasi definitif akan diproses tim kemitraan MAN3.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* CONFIRMATION DEMO MODAL */}
      {showConfirmationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-[#E5E5DE] rounded-[4px] shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-[#E5E5DE] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#0F3D2E]" />
                <h3 className="font-serif text-xl font-bold text-[#0F3D2E]">
                  Konfirmasi Draf Reservasi B2B
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmationModal(false)}
                className="p-1 rounded-[4px] text-[#6B726C] hover:bg-[#F5F5F1]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-mono">
              <div className="p-3 bg-[#FEF9C3] border border-[#FDE047] rounded-[2px] text-[#854D0E] space-y-1">
                <strong>Status Mode Purwarupa Digital</strong>
                <p>
                  Ini merupakan simulasi antarmuka pengadaan. Formulir ini tidak mentransmisikan data ke sistem operasional langsung. Untuk pemesanan riil, Anda dapat menyalin rincian pesanan di bawah ini untuk dikirimkan ke perwakilan MAN3.
                </p>
              </div>

              {/* Structured Summary Box */}
              <div className="p-4 bg-[#FBFBF9] border border-[#E5E5DE] rounded-[2px] space-y-2">
                <div className="border-b border-[#E5E5DE] pb-2">
                  <p><strong>PIC:</strong> {customerName}</p>
                  <p><strong>Perusahaan:</strong> {companyName}</p>
                  <p>
                    <strong>Slot Pengiriman:</strong>{" "}
                    {deliverySlot === "subuh" ? "Subuh (04:30–06:00 WIB)" : "Siang (10:00–12:00 WIB)"}
                  </p>
                </div>

                <div className="py-2 border-b border-[#E5E5DE] space-y-1.5">
                  <p className="font-bold text-[#141A17]">Komoditas yang Dipilih:</p>
                  {selectedItemsList.map((item, idx) => (
                    <div key={item.id} className="flex justify-between text-[#4E5752]">
                      <span>
                        {idx + 1}. {item.name} ({item.qty} {item.unit})
                      </span>
                      <span>Rp{item.itemTotal.toLocaleString("id-ID")}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-1 flex justify-between font-bold text-[#0F3D2E] text-sm">
                  <span>Total Estimasi Tagihan:</span>
                  <span>Rp{Math.round(grandTotal).toLocaleString("id-ID")}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-end">
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[4px] border border-[#0F3D2E] text-[#0F3D2E] hover:bg-[#F5F8F6] font-semibold transition-colors"
                >
                  {copiedSummary ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedSummary ? "Berhasil Disalin!" : "Salin Ringkasan Pesanan"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowConfirmationModal(false)}
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
