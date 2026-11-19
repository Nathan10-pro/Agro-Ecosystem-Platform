"use client";

import { useEffect, useState } from "react";
import { useBrowserPortalData } from "@/lib/portal/browser-data";
import { readDemoPortalSession } from "@/lib/portal/browser-session";
import { formatDate, partnershipDuration, statusLabels } from "@/lib/portal-format";

export default function PartnerPartnershipPage() {
  const { data, ready, error } = useBrowserPortalData();
  const [profileId, setProfileId] = useState("");
  useEffect(() => setProfileId(readDemoPortalSession()?.id || ""), []);
  const partner = data.partners.find((item) => item.profile_id === profileId);
  const orders = data.orders.filter((order) => order.partner_id === partner?.id);
  if (error) return <p role="alert" className="border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>;
  if (!ready || !partner) return <p role="status" className="py-12 text-sm text-[#66736A]">Memuat informasi kemitraan...</p>;
  return <section>
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Hubungan bisnis</p><h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Kemitraan Anda</h1>
    <p className="mt-2 text-sm text-[#66736A]">Status dan aktivitas kemitraan Anda.</p>
    <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
      <article className="border border-[#DDE3DD] bg-white p-5 sm:p-6"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs text-[#66736A]">{partner.business_type} · {partner.city}</p><h2 className="mt-2 font-serif text-2xl text-[#0F3D2E]">{partner.company_name}</h2><p className="mt-1 text-sm text-[#66736A]">{partner.full_name}</p></div><span className="border border-[#DDE3DD] px-3 py-1.5 text-sm">{statusLabels[partner.status]}</span></div>
        <dl className="mt-6 space-y-3 text-sm"><Info label="Mulai kemitraan" value={partner.partnership_start_date ? formatDate(partner.partnership_start_date) : "Belum ditetapkan"} /><Info label="Durasi" value={partner.partnership_start_date && partner.status === "active" ? partnershipDuration(partner.partnership_start_date) || "Baru dimulai" : "Menunggu aktivasi"} /><Info label="Total pesanan demo" value={String(orders.length)} /><Info label="Catatan" value={partner.notes || "Belum ada catatan"} /></dl>
      </article>
      <article className="border border-[#DDE3DD] bg-white p-5 sm:p-6"><h2 className="font-serif text-xl text-[#0F3D2E]">Tahapan kemitraan</h2><ol className="mt-5 space-y-4">{[
        ["Pengajuan", "Profil mitra telah diterima."],
        ["Tinjauan admin", partner.status === "pending_review" ? "Menunggu tinjauan." : "Pengajuan telah ditinjau."],
        ["Aktif", partner.status === "active" ? "Kemitraan aktif." : "Menunggu persetujuan."],
      ].map(([title, detail], index) => <li key={title} className="flex gap-3"><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${index < (partner.status === "pending_review" ? 1 : 3) ? "bg-[#0F3D2E] text-white" : "bg-[#E8ECE8] text-[#66736A]"}`}>{index + 1}</span><div><h3 className="text-sm font-semibold text-[#27362D]">{title}</h3><p className="mt-1 text-sm text-[#66736A]">{detail}</p></div></li>)}</ol></article>
    </div>
  </section>;
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-4 border-b border-[#EDF0ED] pb-2"><dt className="text-[#66736A]">{label}</dt><dd className="text-right font-medium text-[#27362D]">{value}</dd></div>;
}
