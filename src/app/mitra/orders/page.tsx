"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useBrowserPortalData } from "@/lib/portal/browser-data";
import { readDemoPortalSession } from "@/lib/portal/browser-session";
import { formatCurrency, formatDate, statusLabels } from "@/lib/portal-format";

export default function PartnerOrdersPage() {
  const { data, ready, error } = useBrowserPortalData();
  const [filter, setFilter] = useState("");
  const session = typeof window === "undefined" ? null : readDemoPortalSession();
  const partner = data.partners.find((item) => item.profile_id === session?.id);
  const orders = useMemo(() => data.orders.filter((order) => order.partner_id === partner?.id && (!filter || order.status === filter)), [data.orders, partner?.id, filter]);
  return <section>
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Riwayat transaksi</p><h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Pesanan saya</h1>
    <p className="mt-2 text-sm text-[#66736A]">Riwayat pesanan dan status pengiriman.</p>
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3"><select aria-label="Filter status pesanan" value={filter} onChange={(event) => setFilter(event.target.value)} className="border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm"><option value="">Semua status</option>{Object.entries(statusLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select><Link href="/mitra/products" className="bg-[#0F3D2E] px-4 py-2.5 text-sm font-semibold text-white">Buat pesanan</Link></div>
    {error && <p role="alert" className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    {!ready || !partner ? <p className="py-8 text-sm text-[#66736A]">Memuat pesanan...</p> : <div className="mt-4 space-y-3">{orders.map((order) => <Link key={order.id} href={`/mitra/orders/${order.id}`} className="block border border-[#DDE3DD] bg-white p-4 transition hover:border-[#0F3D2E] sm:p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs text-[#66736A]">{formatDate(order.created_at)} · Slot {order.delivery_slot}</p><h2 className="mt-1 font-semibold text-[#0F3D2E]">{order.order_number}</h2><p className="mt-2 text-sm text-[#66736A]">{order.items.map((item) => `${item.name} × ${item.quantity}`).join(", ")}</p></div><div className="text-right"><p className="font-semibold">{formatCurrency(order.total)}</p><p className="mt-1 text-xs">{statusLabels[order.status]}</p></div></div><p className="mt-3 text-xs text-[#0F3D2E] underline">Lihat detail dan pelacakan</p></Link>)}{orders.length === 0 && <p className="border border-[#DDE3DD] bg-white p-5 text-sm text-[#66736A]">Belum ada pesanan untuk filter ini.</p>}</div>}
  </section>;
}
