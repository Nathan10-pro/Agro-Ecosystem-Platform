"use client";

import Link from "next/link";
import { useBrowserPortalData } from "@/lib/portal/browser-data";
import { formatCurrency } from "@/lib/portal-format";

export default function AdminDashboard() {
  const { data, ready, error } = useBrowserPortalData();
  const metrics = {
    total_partners: data.partners.length,
    active_partners: data.partners.filter((partner) => partner.status === "active").length,
    pending_partners: data.partners.filter((partner) => partner.status === "pending_review").length,
    total_orders: data.orders.length,
    active_orders: data.orders.filter((order) => !["completed", "cancelled"].includes(order.status)).length,
    completed_orders: data.orders.filter((order) => order.status === "completed").length,
    total_order_value: data.orders.reduce((sum, order) => sum + order.total, 0),
    available_products: data.products.filter((product) => product.status === "available" && product.stock > 0).length,
  };
  const cards: Array<[string, string]> = [
    ["Total mitra", String(metrics.total_partners)], ["Mitra aktif", String(metrics.active_partners)],
    ["Menunggu persetujuan", String(metrics.pending_partners)], ["Total pesanan", String(metrics.total_orders)],
    ["Pesanan aktif", String(metrics.active_orders)], ["Pesanan selesai", String(metrics.completed_orders)],
    ["Nilai pesanan", formatCurrency(metrics.total_order_value)], ["Produk tersedia", String(metrics.available_products)],
  ];
  return <section>
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Ikhtisar operasional</p>
    <h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">MAN3 Management Dashboard</h1>
    <p className="mt-2 text-sm text-[#66736A]">Ringkasan mitra, pesanan, dan katalog.</p>
    {error && <p role="alert" className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    {!ready && <p role="status" className="mt-4 text-sm text-[#66736A]">Memuat dashboard...</p>}
    <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label, value]) => <div key={label} className="border border-[#DDE3DD] bg-white p-5"><p className="text-xs text-[#66736A]">{label}</p><p className="mt-3 text-2xl font-semibold text-[#0F3D2E]">{value}</p></div>)}</div>
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border border-[#DDE3DD] bg-white p-4"><div><p className="text-sm font-semibold text-[#27362D]">{metrics.pending_partners + data.orders.filter((order) => order.status === "submitted").length} item perlu ditinjau</p></div><div className="flex gap-4 text-sm"><Link href="/admin/partners?status=pending_review" className="text-[#0F3D2E] underline underline-offset-4">Tinjau mitra</Link><Link href="/admin/orders" className="text-[#0F3D2E] underline underline-offset-4">Tinjau pesanan</Link></div></div>
  </section>;
}
