"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatCurrency, formatDate, statusLabels } from "@/lib/portal-format";

type Order = { id: string; order_number: string; order_status: string; total_amount: number; is_demo: boolean; created_at: string; order_items: Array<{ product_name_snapshot: string; quantity: number }> };

export default function PartnerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetch("/api/portal/orders").then(async (response) => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setOrders(result.orders);
    }).catch((cause) => setError(cause instanceof Error ? cause.message : "Pesanan belum dapat dimuat."));
  }, []);

  const filtered = useMemo(() => orders.filter((order) =>
    (!query || order.order_number.toLowerCase().includes(query.toLowerCase())) &&
    (!status || order.order_status === status) &&
    (!from || order.created_at.slice(0, 10) >= from) &&
    (!to || order.created_at.slice(0, 10) <= to)
  ), [orders, query, status, from, to]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);

  function exportCsv() {
    const rows = [["Nomor Pesanan", "Tanggal", "Produk", "Jumlah Item", "Total", "Status"], ...filtered.map((order) => [
      order.order_number, order.created_at, order.order_items.map((item) => item.product_name_snapshot).join("; "),
      String(order.order_items.reduce((sum, item) => sum + Number(item.quantity), 0)), String(order.total_amount), order.order_status,
    ])];
    const csv = rows.map((row) => row.map((field) => `"${field.replaceAll('"', '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = "riwayat-pesanan-man3.csv"; link.click(); URL.revokeObjectURL(url);
  }

  return <section>
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Aktivitas pesanan</p><h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Riwayat pesanan</h1></div><button onClick={exportCsv} disabled={!orders.length} className="border border-[#BFCABF] px-4 py-2.5 text-sm text-[#0F3D2E] disabled:opacity-40">Unduh CSV</button></div>
    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <input aria-label="Cari nomor pesanan" placeholder="Cari nomor pesanan" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} className="border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm" />
      <select aria-label="Filter status" value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }} className="border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm"><option value="">Semua status</option>{Object.entries(statusLabels).filter(([key]) => ["submitted","awaiting_confirmation","confirmed","preparing","packed","in_delivery","delivered","completed","cancelled","rejected"].includes(key)).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select>
      <input aria-label="Tanggal dari" type="date" value={from} onChange={(event) => { setFrom(event.target.value); setPage(1); }} className="border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm" />
      <input aria-label="Tanggal sampai" type="date" value={to} onChange={(event) => { setTo(event.target.value); setPage(1); }} className="border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm" />
    </div>
    {error && <p role="alert" className="mt-5 border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}
    <div className="mt-5 overflow-x-auto border border-[#DDE3DD] bg-white">
      <table className="min-w-[760px] text-left text-sm"><thead className="border-b border-[#DDE3DD] bg-[#F7F8F5] text-xs uppercase text-[#66736A]"><tr><th className="px-4">Nomor Pesanan</th><th className="px-4">Tanggal</th><th className="px-4">Produk</th><th className="px-4">Jumlah Item</th><th className="px-4">Total</th><th className="px-4">Status</th><th className="px-4">Aksi</th></tr></thead>
        <tbody className="divide-y divide-[#EDF0ED]">{pageRows.map((order) => <tr key={order.id}><td className="px-4 font-medium">{order.order_number}{order.is_demo && <span className="ml-1 text-[10px] font-semibold text-[#80543A]">DEMO</span>}</td><td className="px-4">{formatDate(order.created_at)}</td><td className="px-4">{order.order_items.map((item) => item.product_name_snapshot).join(", ")}</td><td className="px-4">{order.order_items.reduce((sum, item) => sum + Number(item.quantity), 0)}</td><td className="px-4">{formatCurrency(order.total_amount)}</td><td className="px-4">{statusLabels[order.order_status] || order.order_status}</td><td className="px-4"><Link className="font-semibold text-[#0F3D2E] underline underline-offset-4" href={`/mitra/orders/${order.id}`}>Lacak</Link></td></tr>)}</tbody>
      </table>
      {!error && pageRows.length === 0 && <p className="px-4 py-8 text-sm text-[#66736A]">Tidak ada pesanan untuk filter ini.</p>}
    </div>
    <div className="mt-4 flex items-center justify-between text-sm text-[#66736A]"><p>{filtered.length} pesanan · Halaman {page} dari {pageCount}</p><div className="flex gap-2"><button disabled={page <= 1} onClick={() => setPage((value) => value - 1)} className="border border-[#C9D2CB] px-3 py-2 disabled:opacity-40">Sebelumnya</button><button disabled={page >= pageCount} onClick={() => setPage((value) => value + 1)} className="border border-[#C9D2CB] px-3 py-2 disabled:opacity-40">Berikutnya</button></div></div>
  </section>;
}
