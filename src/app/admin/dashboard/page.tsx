"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/portal-format";

type Metrics = { total_partners: number; active_partners: number; pending_partners: number; total_orders: number; active_orders: number; completed_orders: number; total_order_value: number; available_products: number; action_required: number; demo_records: number };
export default function AdminDashboard() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("/api/admin/portal/dashboard").then(async (response) => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setMetrics(result.metrics);
    }).catch((cause) => setError(cause instanceof Error ? cause.message : "Dashboard belum dapat dimuat."));
  }, []);
  const cards: Array<[string, string]> = metrics ? [
    ["Total mitra", String(metrics.total_partners)], ["Mitra aktif", String(metrics.active_partners)],
    ["Menunggu persetujuan", String(metrics.pending_partners)], ["Total pesanan", String(metrics.total_orders)],
    ["Pesanan aktif", String(metrics.active_orders)], ["Pesanan selesai", String(metrics.completed_orders)],
    ["Nilai pesanan", formatCurrency(metrics.total_order_value)], ["Produk tersedia", String(metrics.available_products)],
  ] : [];
  return <section>
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Ikhtisar operasional</p>
    <h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">MAN3 Management Dashboard</h1>
    <p className="mt-2 text-sm text-[#66736A]">Pantau aktivitas kemitraan, pesanan, dan ketersediaan produk.</p>
    {error && <p role="alert" className="mt-5 border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>}
    {!metrics && !error ? <p className="py-12 text-sm text-[#66736A]">Memuat metrik aktual...</p> : <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label, value]) => <div key={label} className="border border-[#DDE3DD] bg-white p-5"><p className="text-xs text-[#66736A]">{label}</p><p className="mt-3 text-2xl font-semibold text-[#0F3D2E]">{value}</p></div>)}</div>}
    {metrics && <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border border-[#D7C6A0] bg-[#FCF8ED] p-4"><div><p className="text-sm font-semibold text-[#705A2A]">{metrics.action_required} item membutuhkan tindakan admin</p><p className="mt-1 text-xs text-[#705A2A]">Gabungan pendaftaran mitra dan pesanan yang menunggu konfirmasi.</p></div><div className="flex gap-4 text-sm"><Link href="/admin/partners?status=pending_review" className="text-[#0F3D2E] underline underline-offset-4">Tinjau mitra</Link><Link href="/admin/orders" className="text-[#0F3D2E] underline underline-offset-4">Tinjau pesanan</Link></div></div>}
    {metrics && metrics.demo_records > 0 && <p className="mt-4 text-xs text-[#80543A]">{metrics.demo_records} catatan demo terdeteksi; seluruh metrik operasional di atas mengecualikan data demo.</p>}
  </section>;
}
