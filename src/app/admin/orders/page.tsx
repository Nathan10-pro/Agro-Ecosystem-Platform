"use client";

import { useMemo, useState } from "react";
import { addPortalLog, DemoOrder, OrderStatus, useBrowserPortalData } from "@/lib/portal/browser-data";
import { formatCurrency, formatDate, statusLabels } from "@/lib/portal-format";

const orderStatuses: OrderStatus[] = ["submitted", "confirmed", "preparing", "in_delivery", "completed", "cancelled"];

function canTransition(current: OrderStatus, next: OrderStatus) {
  const transitions: Record<OrderStatus, OrderStatus[]> = {
    submitted: ["confirmed", "cancelled"],
    confirmed: ["preparing", "cancelled"],
    preparing: ["in_delivery", "cancelled"],
    in_delivery: ["completed"],
    completed: [],
    cancelled: [],
  };
  return current === next || transitions[current].includes(next);
}

export default function AdminOrdersPage() {
  const { data, ready, error, updateData } = useBrowserPortalData();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");
  const orders = useMemo(() => data.orders.filter((order) => {
    const partner = data.partners.find((item) => item.id === order.partner_id);
    return (!filter || order.status === filter) &&
      `${order.order_number} ${partner?.company_name || ""} ${order.items.map((item) => item.name).join(" ")}`.toLowerCase().includes(query.toLowerCase());
  }), [data.orders, data.partners, filter, query]);

  function updateStatus(order: DemoOrder, status: OrderStatus) {
    if (!canTransition(order.status, status)) {
      setMessage(`Status ${statusLabels[order.status]} tidak dapat diubah ke ${statusLabels[status]}.`);
      return;
    }
    if (status === "cancelled" && !window.confirm(`Batalkan pesanan ${order.order_number}?`)) return;
    const saved = updateData((current) => {
      const currentOrder = current.orders.find((item) => item.id === order.id);
      if (!currentOrder) return current;
      let products = current.products;
      if (currentOrder.status === "submitted" && status === "confirmed") {
        const hasStock = currentOrder.items.every((line) => {
          const product = products.find((item) => item.id === line.product_id);
          return product && product.stock >= line.quantity;
        });
        if (!hasStock) throw new Error("Stok produk contoh tidak cukup untuk mengonfirmasi pesanan.");
        products = products.map((product) => {
          const line = currentOrder.items.find((item) => item.product_id === product.id);
          return line ? { ...product, stock: product.stock - line.quantity } : product;
        });
      }
      if (status === "cancelled" && ["confirmed", "preparing"].includes(currentOrder.status)) {
        products = products.map((product) => {
          const line = currentOrder.items.find((item) => item.product_id === product.id);
          return line ? { ...product, stock: product.stock + line.quantity } : product;
        });
      }
      const now = new Date().toISOString();
      const updatedOrder = {
        ...currentOrder,
        status,
        tracking: [...currentOrder.tracking, { status, note: `Status diperbarui menjadi ${statusLabels[status]}.`, created_at: now }],
      };
      return addPortalLog({
        ...current,
        products,
        orders: current.orders.map((item) => item.id === order.id ? updatedOrder : item),
      }, "Admin Demo", "Status pesanan diperbarui", `${order.order_number}: ${statusLabels[status]}`);
    });
    setMessage(saved ? "Status dan timeline pesanan demo diperbarui." : "");
  }

  function exportCsv() {
    const rows = [
      ["Nomor pesanan", "Mitra", "Tanggal", "Produk", "Total", "Slot", "Status"],
      ...orders.map((order) => [
        order.order_number,
        data.partners.find((partner) => partner.id === order.partner_id)?.company_name || "",
        order.created_at,
        order.items.map((item) => `${item.name} x${item.quantity}`).join("; "),
        String(order.total),
        order.delivery_slot,
        order.status,
      ]),
    ];
    const csv = rows.map((row) => row.map((field) => `"${field.replaceAll('"', '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "pesanan-demo-man3.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return <section>
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Pemenuhan pesanan</p><h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Manajemen pesanan</h1></div><button onClick={exportCsv} disabled={!orders.length} className="border border-[#BFCABF] px-4 py-2.5 text-sm text-[#0F3D2E] disabled:opacity-40">Ekspor CSV</button></div>
    <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_220px]"><input aria-label="Cari pesanan" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nomor, mitra, produk..." className="border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm" /><select aria-label="Filter status" value={filter} onChange={(event) => setFilter(event.target.value)} className="border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm"><option value="">Semua status</option>{orderStatuses.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select></div>
    {error && <p role="alert" className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    {message && <p role="status" className="mt-4 border border-[#A9C6B1] bg-[#F2F7F2] p-3 text-sm text-[#0F3D2E]">{message}</p>}
    {!ready ? <p className="py-8 text-sm text-[#66736A]">Memuat pesanan...</p> : <div className="mt-5 space-y-3">
      {orders.map((order) => {
        const partner = data.partners.find((item) => item.id === order.partner_id);
        return <article key={order.id} className="border border-[#DDE3DD] bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs text-[#66736A]">{formatDate(order.created_at)} · Slot {order.delivery_slot}</p><h2 className="mt-1 font-semibold text-[#0F3D2E]">{order.order_number}</h2><p className="mt-1 text-sm">{partner?.company_name || "Mitra"} · {partner?.full_name || ""}</p><ul className="mt-2 space-y-1 text-sm text-[#66736A]">{order.items.map((item) => <li key={item.product_id}>{item.name} × {item.quantity} · {formatCurrency(item.price * item.quantity)}</li>)}</ul>{order.notes && <p className="mt-2 text-xs text-[#66736A]">Catatan: {order.notes}</p>}</div><div className="text-right"><p className="font-semibold">{formatCurrency(order.total)}</p><p className="mt-1 text-xs">{statusLabels[order.status]}</p></div></div>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-3 border-t border-[#EDF0ED] pt-3"><label className="text-xs text-[#66736A]">Ubah status<select aria-label={`Status ${order.order_number}`} value={order.status} onChange={(event) => updateStatus(order, event.target.value as OrderStatus)} className="mt-1 block min-w-48 border border-[#C9D2CB] bg-white px-2 py-2 text-sm text-[#27362D]">{orderStatuses.map((status) => <option key={status} value={status} disabled={!canTransition(order.status, status)}>{statusLabels[status]}</option>)}</select></label><p className="text-xs text-[#66736A]">{order.tracking.length} pembaruan timeline</p></div>
          <details className="mt-3 border-t border-[#EDF0ED] pt-3"><summary className="cursor-pointer text-xs font-semibold text-[#0F3D2E]">Lihat timeline pesanan</summary><ol className="mt-3 space-y-2">{order.tracking.map((event, index) => <li key={`${event.created_at}-${index}`} className="text-xs text-[#66736A]">{new Date(event.created_at).toLocaleString("id-ID")} · {statusLabels[event.status]} — {event.note}</li>)}</ol></details>
        </article>;
      })}
      {orders.length === 0 && <p className="border border-[#DDE3DD] bg-white p-5 text-sm text-[#66736A]">Tidak ada pesanan untuk filter ini.</p>}
    </div>}
  </section>;
}
