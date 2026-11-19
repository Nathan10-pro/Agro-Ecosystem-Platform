"use client";

import { useState } from "react";
import { addPortalLog, useBrowserPortalData } from "@/lib/portal/browser-data";
import { formatDate, statusLabels } from "@/lib/portal-format";

export default function AdminPartnershipsPage() {
  const { data, ready, error, updateData } = useBrowserPortalData();
  const [message, setMessage] = useState("");

  function setStart(partnerId: string, value: string) {
    updateData((current) => ({
      ...current,
      partners: current.partners.map((partner) => partner.id === partnerId ? { ...partner, partnership_start_date: value } : partner),
    }));
  }

  function saveNote(partnerId: string, company: string, note: string) {
    const saved = updateData((current) => addPortalLog({
      ...current,
      partners: current.partners.map((partner) => partner.id === partnerId ? { ...partner, notes: note } : partner),
    }, "Admin Demo", "Catatan kemitraan diperbarui", company));
    setMessage(saved ? "Catatan tersimpan di browser." : "");
  }

  const active = data.partners.filter((partner) => partner.status === "active");
  return <section>
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Hubungan bisnis</p>
    <h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Manajemen kemitraan</h1>
    <p className="mt-2 text-sm text-[#66736A]">Pantau mitra aktif, tanggal mulai, dan catatan kerja sama.</p>
    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      <Metric label="Mitra aktif" value={active.length} />
      <Metric label="Menunggu persetujuan" value={data.partners.filter((partner) => partner.status === "pending_review").length} />
      <Metric label="Mitra nonaktif" value={data.partners.filter((partner) => partner.status === "suspended" || partner.status === "rejected").length} />
    </div>
    {error && <p role="alert" className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    {message && <p role="status" className="mt-4 border border-[#A9C6B1] bg-[#F2F7F2] p-3 text-sm text-[#0F3D2E]">{message}</p>}
    {!ready ? <p className="py-8 text-sm text-[#66736A]">Memuat kemitraan...</p> : <div className="mt-5 space-y-3">
      {data.partners.map((partner) => <article key={partner.id} className="grid gap-4 border border-[#DDE3DD] bg-white p-4 sm:grid-cols-[1fr_260px] sm:p-5">
        <div><p className="text-xs text-[#66736A]">{partner.business_type} · {partner.city}</p><h2 className="mt-1 font-serif text-xl text-[#0F3D2E]">{partner.company_name}</h2><p className="mt-1 text-sm">{partner.full_name} · {partner.email}</p><p className="mt-3 inline-block border border-[#DDE3DD] px-2 py-1 text-xs">{statusLabels[partner.status]}</p>{partner.notes && <p className="mt-3 text-sm text-[#66736A]">{partner.notes}</p>}</div>
        <div><label className="block text-xs text-[#66736A]">Tanggal mulai kemitraan<input type="date" value={partner.partnership_start_date} onChange={(event) => setStart(partner.id, event.target.value)} className="mt-1 w-full border border-[#C9D2CB] px-2 py-2 text-sm" /></label><label className="mt-3 block text-xs text-[#66736A]">Catatan kerja sama<textarea defaultValue={partner.notes} key={`${partner.id}-${partner.notes}`} rows={2} className="mt-1 w-full border border-[#C9D2CB] px-2 py-2 text-sm" /></label><button onClick={(event) => { const textarea = event.currentTarget.parentElement?.querySelector("textarea"); saveNote(partner.id, partner.company_name, textarea?.value || ""); }} className="mt-2 bg-[#0F3D2E] px-3 py-2 text-xs font-semibold text-white">Simpan catatan</button><p className="mt-2 text-[11px] text-[#66736A]">Mulai: {partner.partnership_start_date ? formatDate(partner.partnership_start_date) : "Belum ditetapkan"}</p></div>
      </article>)}
    </div>}
  </section>;
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="border border-[#DDE3DD] bg-white p-4"><p className="text-xs text-[#66736A]">{label}</p><p className="mt-2 text-2xl font-semibold text-[#0F3D2E]">{value}</p></div>;
}
