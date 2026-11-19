"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useBrowserPortalData } from "@/lib/portal/browser-data";
import { readDemoPortalSession } from "@/lib/portal/browser-session";
import { formatCurrency, formatDate, statusLabels } from "@/lib/portal-format";

export default function PartnerOrderDetailsPage() {
  const params = useParams<{ id: string }>();
  const { data, ready, error } = useBrowserPortalData();
  const session = typeof window === "undefined" ? null : readDemoPortalSession();
  const partner = data.partners.find((item) => item.profile_id === session?.id);
  const order = data.orders.find((item) => item.id === params.id && item.partner_id === partner?.id);
  if (error) return <p role="alert" className="border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>;
  if (!ready || !partner) return <p role="status" className="py-12 text-sm text-[#66736A]">Memuat detail pesanan...</p>;
  if (!order) return <section className="border border-[#DDE3DD] bg-white p-6"><h1 className="font-serif text-2xl text-[#0F3D2E]">Pesanan tidak ditemukan</h1><p className="mt-2 text-sm text-[#66736A]">Pesanan tidak tersedia pada akun ini.</p><Link href="/mitra/orders" className="mt-4 inline-block text-sm text-[#0F3D2E] underline">Kembali ke pesanan</Link></section>;
  return <section>
    <Link href="/mitra/orders" className="text-sm text-[#0F3D2E] underline">← Kembali ke pesanan</Link>
    <div className="mt-4 flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs uppercase tracking-wide text-[#66736A]">Detail pesanan</p><h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">{order.order_number}</h1><p className="mt-2 text-sm text-[#66736A]">{formatDate(order.created_at)} · Slot {order.delivery_slot}</p></div><span className="border border-[#DDE3DD] bg-white px-3 py-2 text-sm">{statusLabels[order.status]}</span></div>
    <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_320px]"><div className="border border-[#DDE3DD] bg-white p-5"><h2 className="font-serif text-xl text-[#0F3D2E]">Item pesanan</h2><div className="mt-4 divide-y divide-[#EDF0ED]">{order.items.map((item) => <div key={item.product_id} className="flex justify-between gap-3 py-3 text-sm"><span>{item.name} × {item.quantity}</span><span>{formatCurrency(item.price * item.quantity)}</span></div>)}</div><p className="mt-3 flex justify-between border-t border-[#DDE3DD] pt-3 font-semibold"><span>Total</span><span>{formatCurrency(order.total)}</span></p>{order.notes && <p className="mt-4 text-sm text-[#66736A]">Catatan: {order.notes}</p>}</div>
      <div className="border border-[#DDE3DD] bg-white p-5"><h2 className="font-serif text-xl text-[#0F3D2E]">Pelacakan</h2><ol className="mt-4 space-y-4">{order.tracking.map((event, index) => <li key={`${event.created_at}-${index}`} className="relative border-l border-[#BFCABF] pl-4"><span className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-[#0F3D2E]" /><p className="text-sm font-semibold text-[#27362D]">{statusLabels[event.status]}</p><p className="mt-1 text-xs text-[#66736A]">{new Date(event.created_at).toLocaleString("id-ID")}</p><p className="mt-1 text-sm text-[#66736A]">{event.note}</p></li>)}</ol></div>
    </div>
  </section>;
}
