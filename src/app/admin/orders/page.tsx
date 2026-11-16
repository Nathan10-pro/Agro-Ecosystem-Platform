"use client";

import { useEffect, useMemo, useState } from "react";
import { formatCurrency, formatDate, statusLabels } from "@/lib/portal-format";

const statuses = ["submitted","awaiting_confirmation","confirmed","preparing","packed","in_delivery","delivered","completed","cancelled","rejected"];
type Order = { id: string; order_number: string; order_status: string; total_amount: number; delivery_slot: string; is_demo: boolean; created_at: string; notes: string; partner: { company_name: string; profile: { full_name: string; email: string } }; order_items: Array<{ product_name_snapshot: string; quantity: number }>; order_tracking_events: Array<{ status: string; notes: string; created_at: string }> };
export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [partnerFilter, setPartnerFilter] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [nextStatuses, setNextStatuses] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState("");
  async function load() {
    const response = await fetch("/api/admin/portal/orders");
    const result = await response.json();
    if (!response.ok) throw new Error(result.error);
    setOrders(result.orders);
  }
  useEffect(() => { load().catch((cause) => setError(cause.message || "Pesanan tidak dapat dimuat.")); }, []);
  const filtered = useMemo(() => orders.filter((order) =>
    (!filter || order.order_status === filter) &&
    (!partnerFilter || order.partner?.company_name === partnerFilter) &&
    (!from || order.created_at.slice(0, 10) >= from) &&
    (!to || order.created_at.slice(0, 10) <= to) &&
    JSON.stringify(order).toLowerCase().includes(query.toLowerCase())
  ), [orders, filter, partnerFilter, from, to, query]);
  async function update(order: Order) {
    const status = nextStatuses[order.id] || order.order_status;
    const note = notes[order.id] || "";
    if (status === "cancelled" && !note.trim()) { setError("Alasan pembatalan wajib dicatat."); return; }
    setBusy(order.id); setError("");
    try {
      const response = await fetch("/api/admin/portal/orders", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ order_id: order.id, status, notes: note }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setNotes((value) => ({ ...value, [order.id]: "" }));
      await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Perubahan pesanan gagal."); }
    finally { setBusy(""); }
  }
  function exportCsv() {
    const rows = [["Nomor","Mitra","Tanggal","Produk","Jumlah","Total","Slot","Status"], ...filtered.map((order) => [
      order.order_number, order.partner?.company_name || "", order.created_at,
      order.order_items.map((item) => item.product_name_snapshot).join("; "),
      String(order.order_items.reduce((sum, item) => sum + Number(item.quantity), 0)),
      String(order.total_amount), order.delivery_slot, order.order_status,
    ])];
    const csv = rows.map((row) => row.map((field) => `"${field.replaceAll('"', '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "pesanan-man3.csv"; link.click(); URL.revokeObjectURL(url);
  }
  return <section>
    <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Fulfillment B2B</p><h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Manajemen pesanan</h1></div><button onClick={exportCsv} disabled={!orders.length} className="border border-[#BFCABF] px-4 py-2.5 text-sm text-[#0F3D2E] disabled:opacity-40">Ekspor CSV</button></div>
    <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nomor atau produk..." className="border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm" /><select value={filter} onChange={(event) => setFilter(event.target.value)} className="border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm"><option value="">Semua status</option>{statuses.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select><select value={partnerFilter} onChange={(event) => setPartnerFilter(event.target.value)} className="border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm"><option value="">Semua mitra</option>{[...new Set(orders.map((order) => order.partner?.company_name).filter(Boolean))].map((name) => <option key={name}>{name}</option>)}</select><input aria-label="Tanggal dari" type="date" value={from} onChange={(event) => setFrom(event.target.value)} className="border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm" /><input aria-label="Tanggal sampai" type="date" value={to} onChange={(event) => setTo(event.target.value)} className="border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm" /></div>
    {error && <p role="alert" className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    <div className="mt-5 space-y-3">{filtered.map((order) => <article key={order.id} className="border border-[#DDE3DD] bg-white p-4 sm:p-5">
      <div className="flex flex-wrap justify-between gap-3"><div><p className="text-xs text-[#66736A]">{formatDate(order.created_at)} · Slot {order.delivery_slot}</p><h2 className="mt-1 font-semibold text-[#0F3D2E]">{order.order_number} {order.is_demo && <span className="text-[10px] font-semibold text-[#80543A]">DEMO DATA</span>}</h2><p className="mt-1 text-sm">{order.partner?.company_name || "Mitra"} · {order.partner?.profile?.full_name || ""}</p><p className="mt-2 text-sm text-[#66736A]">{order.order_items.map((item) => `${item.product_name_snapshot} (${item.quantity})`).join(", ")}</p></div><div className="text-right"><p className="font-semibold">{formatCurrency(order.total_amount)}</p><p className="mt-1 text-xs">{statusLabels[order.order_status]}</p></div></div>
      <div className="mt-4 grid gap-2 sm:grid-cols-[220px_1fr_auto]"><label className="text-xs text-[#66736A]">Status berikutnya<select value={nextStatuses[order.id] || order.order_status} onChange={(event) => setNextStatuses((value) => ({ ...value, [order.id]: event.target.value }))} className="mt-1 block w-full border border-[#C9D2CB] bg-white px-2 py-2 text-sm">{statuses.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select></label>
        <label className="text-xs text-[#66736A]">Catatan pelacakan / alasan pembatalan<input value={notes[order.id] || ""} onChange={(event) => setNotes((value) => ({ ...value, [order.id]: event.target.value }))} maxLength={1000} placeholder={order.order_status === "cancelled" ? "Alasan pembatalan" : "Catatan status"} className="mt-1 block w-full border border-[#C9D2CB] px-2 py-2 text-sm" /></label>
        <button disabled={busy === order.id} onClick={() => update(order)} className="self-end bg-[#0F3D2E] px-4 py-2.5 text-xs font-semibold text-white disabled:opacity-50">{busy === order.id ? "Menyimpan..." : "Simpan status"}</button></div>
      {order.order_tracking_events?.length > 0 && <p className="mt-3 text-xs text-[#66736A]">Pembaruan terakhir: {new Date(order.order_tracking_events[order.order_tracking_events.length - 1].created_at).toLocaleString("id-ID")} · {order.order_tracking_events[order.order_tracking_events.length - 1].notes || statusLabels[order.order_tracking_events[order.order_tracking_events.length - 1].status]}</p>}
      <details className="mt-3 border-t border-[#EDF0ED] pt-3"><summary className="cursor-pointer text-xs font-semibold text-[#0F3D2E]">Lihat detail dan timeline</summary><ol className="mt-3 space-y-2">{order.order_tracking_events.map((event, index) => <li key={`${event.created_at}-${index}`} className="text-xs text-[#66736A]">{new Date(event.created_at).toLocaleString("id-ID")} · {statusLabels[event.status] || event.status}{event.notes && ` — ${event.notes}`}</li>)}</ol></details>
    </article>)}
    {!error && filtered.length === 0 && <p className="border border-[#DDE3DD] bg-white p-6 text-sm text-[#66736A]">Tidak ada pesanan untuk filter ini.</p>}</div>
  </section>;
}
