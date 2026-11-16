"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { formatCurrency, formatDate, statusLabels } from "@/lib/portal-format";

type Order = {
  id: string; order_number: string; subtotal: number; tax_amount: number; total_amount: number; is_demo: boolean;
  delivery_slot: string; order_status: string; notes: string; created_at: string;
  order_items: Array<{ product_name_snapshot: string; unit_price_snapshot: number; quantity: number; line_total: number }>;
  order_tracking_events: Array<{ status: string; notes: string; created_at: string }>;
};

export default function PartnerOrderDetail() {
  const params = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch(`/api/portal/orders/${encodeURIComponent(params.id)}`).then(async (response) => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setOrder(result.order);
    }).catch((cause) => setError(cause instanceof Error ? cause.message : "Pesanan belum dapat dimuat."));
  }, [params.id]);
  if (error) return <p role="alert" className="border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>;
  if (!order) return <p className="py-12 text-sm text-[#66736A]">Memuat detail pesanan...</p>;
  const events = [...order.order_tracking_events].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  return <section className="mx-auto max-w-4xl">
    <Link href="/mitra/orders" className="text-sm text-[#0F3D2E] underline underline-offset-4">← Kembali ke pesanan</Link>
    <div className="mt-5 flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs uppercase tracking-[0.16em] text-[#66736A]">Detail & pelacakan pesanan</p><h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">{order.order_number} {order.is_demo && <span className="align-middle font-sans text-xs font-semibold text-[#80543A]">DEMO DATA</span>}</h1></div><span className="border border-[#C9D2CB] bg-white px-3 py-2 text-sm">{statusLabels[order.order_status] || order.order_status}</span></div>
    <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="border border-[#DDE3DD] bg-white p-5"><h2 className="font-semibold text-[#0F3D2E]">Item pesanan</h2><div className="mt-3 divide-y divide-[#EDF0ED]">{order.order_items.map((item, index) => <div key={`${item.product_name_snapshot}-${index}`} className="flex justify-between gap-4 py-3 text-sm"><div><p className="font-medium">{item.product_name_snapshot}</p><p className="mt-1 text-xs text-[#66736A]">{item.quantity} × {formatCurrency(item.unit_price_snapshot)}</p></div><p>{formatCurrency(item.line_total)}</p></div>)}</div><dl className="mt-3 space-y-2 border-t border-[#DDE3DD] pt-3 text-sm"><Line label="Subtotal" value={formatCurrency(order.subtotal)} /><Line label="Pajak" value={formatCurrency(order.tax_amount)} /><Line label="Total" value={formatCurrency(order.total_amount)} strong /></dl><p className="mt-4 text-xs text-[#66736A]">Slot pengiriman: {order.delivery_slot}</p></div>
      <div className="border border-[#DDE3DD] bg-white p-5"><h2 className="font-semibold text-[#0F3D2E]">Riwayat status</h2>{events.length ? <ol className="mt-4 space-y-4">{events.map((event, index) => <li key={`${event.created_at}-${index}`} className="border-l-2 border-[#A9C6B1] pl-4"><p className="text-sm font-semibold text-[#0F3D2E]">{statusLabels[event.status] || event.status}</p><p className="mt-1 text-xs text-[#66736A]">{new Date(event.created_at).toLocaleString("id-ID")}</p>{event.notes && <p className="mt-1 text-sm text-[#536158]">{event.notes}</p>}</li>)}</ol> : <p className="mt-4 text-sm text-[#66736A]">Belum ada pembaruan status.</p>}</div>
    </div>
    <p className="mt-4 text-xs text-[#66736A]">Pelacakan menampilkan pembaruan status yang dicatat tim MAN3, bukan lokasi GPS kendaraan.</p>
  </section>;
}
function Line({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return <div className={`flex justify-between ${strong ? "font-semibold text-[#0F3D2E]" : "text-[#536158]"}`}><dt>{label}</dt><dd>{value}</dd></div>;
}
