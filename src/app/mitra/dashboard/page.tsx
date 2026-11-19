"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatCurrency, formatDate, partnershipDuration, statusLabels } from "@/lib/portal-format";
import { useBrowserPortalData } from "@/lib/portal/browser-data";
import { readDemoPortalSession } from "@/lib/portal/browser-session";

export default function PartnerDashboard() {
  const { data, ready, error } = useBrowserPortalData();
  const [profileId, setProfileId] = useState("");
  useEffect(() => setProfileId(readDemoPortalSession()?.id || ""), []);
  const partner = data.partners.find((item) => item.profile_id === profileId);
  const orders = useMemo(() => data.orders.filter((order) => order.partner_id === partner?.id), [data.orders, partner?.id]);
  const active = partner?.status === "active";
  const duration = active && partner.partnership_start_date ? partnershipDuration(partner.partnership_start_date) : null;
  const total = orders.reduce((sum, order) => sum + order.total, 0);
  if (error) return <p role="alert" className="border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>;
  if (!ready || !profileId || !partner) return <p role="status" className="py-16 text-sm text-[#66736A]">Memuat dashboard mitra...</p>;
  return <div>
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Ringkasan kemitraan</p>
    <h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Selamat datang, {partner.full_name}</h1>
    <p className="mt-2 text-sm text-[#66736A]">Ringkasan aktivitas kemitraan Anda bersama MAN3.</p>
    {!active && <div className="mt-6 border border-[#D7C6A0] bg-[#FCF8ED] p-4 text-sm text-[#705A2A]">
      Status akun: <strong>{statusLabels[partner.status] || partner.status}</strong>. Menunggu aktivasi demo dari administrator.
    </div>}
    <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <Metric label="Lama kemitraan" value={duration ? `Telah bermitra ${duration}` : active ? "Tanggal mulai belum ditetapkan" : "Menunggu persetujuan kemitraan"} />
      <Metric label="Total pesanan" value={String(orders.length)} />
      <Metric label="Pesanan aktif" value={String(orders.filter((order) => !["completed", "cancelled"].includes(order.status)).length)} />
      <Metric label="Total nilai pesanan" value={formatCurrency(total)} />
    </div>
    <section className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="border border-[#DDE3DD] bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3"><h2 className="font-serif text-xl text-[#0F3D2E]">Pesanan terbaru</h2><Link href="/mitra/orders" className="text-sm text-[#0F3D2E] underline underline-offset-4">Semua pesanan</Link></div>
        {orders.length ? <div className="mt-4 divide-y divide-[#E8ECE8]">{orders.slice(0, 5).map((order) => <Link key={order.id} href={`/mitra/orders/${order.id}`} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"><div><p className="font-semibold text-[#27362D]">{order.order_number}</p><p className="mt-1 text-xs text-[#66736A]">{formatDate(order.created_at)}</p></div><div className="text-right"><p className="font-medium">{formatCurrency(order.total)}</p><p className="mt-1 text-xs text-[#66736A]">{statusLabels[order.status] || order.status}</p></div></Link>)}</div> : <p className="mt-4 text-sm text-[#66736A]">Belum ada pesanan.</p>}
      </div>
      <div className="border border-[#DDE3DD] bg-white p-5 sm:p-6">
        <h2 className="font-serif text-xl text-[#0F3D2E]">Kemitraan</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <Info label="Perusahaan" value={partner.company_name} />
          <Info label="Jenis usaha" value={partner.business_type} />
          <Info label="Status" value={statusLabels[partner.status] || partner.status} />
          <Info label="Mulai bermitra" value={active && partner.partnership_start_date ? formatDate(partner.partnership_start_date) : "Belum ditetapkan"} />
        </dl>
        <div className="mt-6 flex flex-wrap gap-2">
          {active && <Link href="/mitra/products" className="bg-[#0F3D2E] px-4 py-2.5 text-sm font-semibold text-white">Buat pesanan baru</Link>}
          <Link href="/mitra/orders" className="border border-[#BFCABF] px-4 py-2.5 text-sm font-medium text-[#0F3D2E]">Lacak pesanan</Link>
          <Link href="/mitra/products" className="border border-[#BFCABF] px-4 py-2.5 text-sm font-medium text-[#0F3D2E]">Lihat katalog</Link>
          <Link href="/kemitraan-b2b" className="border border-[#BFCABF] px-4 py-2.5 text-sm font-medium text-[#0F3D2E]">Hubungi MAN3</Link>
          <Link href="/mitra/partnership" className="border border-[#BFCABF] px-4 py-2.5 text-sm font-medium text-[#0F3D2E]">Lihat kemitraan</Link>
        </div>
      </div>
    </section>
  </div>;
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="border border-[#DDE3DD] bg-white p-4 sm:p-5"><p className="text-xs text-[#66736A]">{label}</p><p className="mt-3 text-lg font-semibold leading-snug text-[#0F3D2E]">{value}</p></div>;
}
function Info({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-4 border-b border-[#EDF0ED] pb-2"><dt className="text-[#66736A]">{label}</dt><dd className="text-right font-medium text-[#27362D]">{value}</dd></div>;
}
