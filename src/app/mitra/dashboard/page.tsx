"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatCurrency, formatDate, partnershipDuration, statusLabels } from "@/lib/portal-format";

type Summary = {
  profile: { full_name: string; account_status: string; is_demo: boolean };
  partner: { company_name: string; business_type: string; partnership_status: string; partnership_start_date: string | null } | null;
  orders: Array<{ id: string; order_number: string; order_status: string; total_amount: number; created_at: string }>;
  metrics: { total_orders: number; active_orders: number; total_value: number };
};

const demoMode = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const demoSummary: Summary = {
  profile: { full_name: "Mitra Demo MAN3", account_status: "active", is_demo: true },
  partner: {
    company_name: "Restoran Contoh",
    business_type: "Restoran",
    partnership_status: "active",
    partnership_start_date: "2025-01-15",
  },
  orders: [
    { id: "demo-order-1", order_number: "DEMO-MAN3-001", order_status: "confirmed", total_amount: 490000, created_at: "2026-11-16T08:00:00.000Z" },
    { id: "demo-order-2", order_number: "DEMO-MAN3-002", order_status: "in_delivery", total_amount: 850000, created_at: "2026-11-12T08:00:00.000Z" },
  ],
  metrics: { total_orders: 2, active_orders: 1, total_value: 1340000 },
};

export default function PartnerDashboard() {
  const [data, setData] = useState<Summary | null>(demoMode ? demoSummary : null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (demoMode) return;
    fetch("/api/portal/summary").then(async (response) => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setData(result);
    }).catch((cause) => setError(cause.message || "Ringkasan belum dapat dimuat."));
  }, []);

  if (error) return <ErrorState message={error} />;
  if (!data) return <p className="py-16 text-sm text-[#66736A]">Memuat ringkasan...</p>;
  const active = data.profile.account_status === "active" && data.partner?.partnership_status === "active";
  const duration = active && data.partner?.partnership_start_date ? partnershipDuration(data.partner.partnership_start_date) : null;
  return <div>
    {data.profile.is_demo && <p className="mb-5 border border-[#D7C6A0] bg-[#FCF8ED] p-3 text-xs text-[#705A2A]">AKUN DEMO — pesanan, nilai, dan persediaan yang terlihat adalah data contoh, bukan catatan operasional MAN3.</p>}
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Ringkasan kemitraan</p>
    <h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Selamat datang, {data.profile.full_name}</h1>
    <p className="mt-2 text-sm text-[#66736A]">Ringkasan aktivitas kemitraan Anda bersama MAN3.</p>
    {data.profile.account_status !== "active" && <div className="mt-6 border border-[#D7C6A0] bg-[#FCF8ED] p-4 text-sm text-[#705A2A]">
      Status akun: <strong>{statusLabels[data.profile.account_status] || data.profile.account_status}</strong>. {data.profile.account_status === "pending_review" ? "Menunggu verifikasi tim MAN3. Fitur pemesanan akan tersedia setelah akun disetujui." : "Hubungi tim MAN3 untuk informasi lebih lanjut."}
    </div>}
    <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <Metric label="Lama kemitraan" value={duration ? `Telah bermitra ${duration}` : active ? "Tanggal mulai belum ditetapkan" : "Menunggu persetujuan kemitraan"} />
      <Metric label="Total pesanan" value={String(data.metrics.total_orders)} />
      <Metric label="Pesanan aktif" value={String(data.metrics.active_orders)} />
      <Metric label="Total nilai pesanan" value={formatCurrency(data.metrics.total_value)} />
    </div>
    <section className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="border border-[#DDE3DD] bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3"><h2 className="font-serif text-xl text-[#0F3D2E]">Pesanan terbaru</h2><Link href="/mitra/orders" className="text-sm text-[#0F3D2E] underline underline-offset-4">Semua pesanan</Link></div>
        {data.orders.length ? <div className="mt-4 divide-y divide-[#E8ECE8]">{data.orders.slice(0, 5).map((order) => <div key={order.id} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"><div><p className="font-semibold text-[#27362D]">{order.order_number}</p><p className="mt-1 text-xs text-[#66736A]">{formatDate(order.created_at)}</p></div><div className="text-right"><p className="font-medium">{formatCurrency(order.total_amount)}</p><p className="mt-1 text-xs text-[#66736A]">{statusLabels[order.order_status] || order.order_status}</p></div></div>)}</div> : <p className="mt-4 text-sm text-[#66736A]">Belum ada pesanan.</p>}
      </div>
      <div className="border border-[#DDE3DD] bg-white p-5 sm:p-6">
        <h2 className="font-serif text-xl text-[#0F3D2E]">Kemitraan</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <Info label="Perusahaan" value={data.partner?.company_name || "Belum dilengkapi"} />
          <Info label="Jenis usaha" value={data.partner?.business_type || "—"} />
          <Info label="Status" value={statusLabels[data.partner?.partnership_status || ""] || "Menunggu persetujuan"} />
          <Info label="Mulai bermitra" value={active && data.partner?.partnership_start_date ? formatDate(data.partner.partnership_start_date) : "Belum ditetapkan"} />
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
function ErrorState({ message }: { message: string }) {
  return <p role="alert" className="border border-red-200 bg-red-50 p-4 text-sm text-red-800">{message}</p>;
}
