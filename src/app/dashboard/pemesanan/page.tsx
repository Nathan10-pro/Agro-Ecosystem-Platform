"use client";

import { useEffect, useMemo, useState } from "react";
import { ClipboardList, Search, Truck } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  spec?: string;
  price: number;
  quantity: number;
  unit: string;
}

interface OrderRecord {
  id: string;
  customer_name: string;
  company_name: string;
  email: string;
  phone: string;
  delivery_slot: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  notes: string;
  status: "pending" | "confirmed" | "processing" | "completed" | "cancelled";
  created_at: string;
}

const statusOptions = [
  { value: "pending", label: "Menunggu" },
  { value: "confirmed", label: "Dikonfirmasi" },
  { value: "processing", label: "Diproses" },
  { value: "completed", label: "Selesai" },
  { value: "cancelled", label: "Dibatalkan" },
];

export default function PemesananPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadOrders() {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/orders", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Gagal memuat pemesanan.");
      }
      setOrders(data.orders || []);
      setError("");
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Gagal memuat pemesanan.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter((order) => {
      const haystack = [
        order.customer_name,
        order.company_name,
        order.email,
        order.phone,
        order.status,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [orders, query]);

  async function updateStatus(id: string, nextStatus: string) {
    try {
      const response = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Gagal memperbarui status.");
      await loadOrders();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Gagal memperbarui status.");
    }
  }

  async function deleteOrder(id: string) {
    if (!window.confirm("Hapus pemesanan ini?")) return;
    try {
      const response = await fetch(`/api/admin/orders?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Gagal menghapus pemesanan.");
      await loadOrders();
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Gagal menghapus pemesanan.");
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-[#52B788]">Trx & order</p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-[#1B4332]">Pemesanan</h1>
          <p className="mt-2 text-sm text-[#1B4332]/60">Pantau pesanan mitra, slot pengiriman, dan status validasi.</p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-[#1B4332] shadow-sm">
          <ClipboardList className="h-4 w-4" /> {orders.length} total
        </div>
      </header>

      {error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </p>
      )}

      <section className="overflow-hidden rounded-2xl border border-[#1B4332]/10 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1B4332]/10 p-4">
          <h2 className="font-semibold text-[#1B4332]">Daftar pemesanan</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1B4332]/40" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari pelanggan, email, atau status"
              className="rounded-lg border border-[#1B4332]/20 py-2 pl-9 pr-3 text-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-[#1B4332]/60">Memuat pemesanan…</div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-10 text-center text-sm text-[#1B4332]/50">Belum ada pemesanan.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#F5FDF8] text-[#1B4332]/70">
                <tr>
                  <th className="px-4 py-3 font-semibold">Pelanggan</th>
                  <th className="px-4 py-3 font-semibold">Produk</th>
                  <th className="px-4 py-3 font-semibold">Slot</th>
                  <th className="px-4 py-3 font-semibold">Total</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1B4332]/10">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="align-top">
                    <td className="px-4 py-4">
                      <div className="font-semibold text-[#1B4332]">{order.customer_name}</div>
                      <div className="text-xs text-[#1B4332]/60">{order.company_name || "Perusahaan belum diisi"}</div>
                      <div className="mt-1 text-xs text-[#1B4332]/50">{order.email}</div>
                      <div className="text-xs text-[#1B4332]/50">{order.phone}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        {order.items.map((item) => (
                          <div key={`${order.id}-${item.id}`} className="text-xs text-[#1B4332]/70">
                            {item.name} · {item.quantity} {item.unit}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="inline-flex items-center gap-2 rounded-full bg-[#EAFBF3] px-2.5 py-1 text-xs font-medium text-[#1B4332]">
                        <Truck className="h-3 w-3" />
                        {order.delivery_slot}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-[#1B4332]">
                      Rp {Number(order.total || 0).toLocaleString("id-ID")}
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={order.status}
                        onChange={(event) => updateStatus(order.id, event.target.value)}
                        className="rounded-lg border border-[#1B4332]/20 bg-white px-2 py-1.5 text-xs text-[#1B4332]"
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => deleteOrder(order.id)}
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
