"use client";

import { useEffect, useState } from "react";
import { formatDate, partnershipDuration, statusLabels } from "@/lib/portal-format";

export default function PartnershipPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("/api/portal/summary").then(async (response) => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setData(result);
    }).catch((cause) => setError(cause instanceof Error ? cause.message : "Informasi belum dapat dimuat."));
  }, []);
  if (error) return <Alert message={error} />;
  if (!data) return <p className="py-12 text-sm text-[#66736A]">Memuat informasi kemitraan...</p>;
  const partner = data.partner;
  const active = data.profile.account_status === "active" && partner?.partnership_status === "active";
  const approved = active && partner.partnership_start_date;
  return <section className="max-w-3xl">
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Profil kerja sama</p><h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Informasi kemitraan</h1>
    <div className="mt-6 border border-[#DDE3DD] bg-white p-5 sm:p-7">
      <h2 className="font-serif text-xl text-[#0F3D2E]">{partner?.company_name || "Data perusahaan belum tersedia"}</h2>
      <p className="mt-2 text-sm text-[#66736A]">{approved ? `Telah bermitra selama ${partnershipDuration(partner.partnership_start_date) || "—"}.` : active ? "Tanggal mulai kemitraan belum ditetapkan." : "Menunggu persetujuan kemitraan."}</p>
      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <Info label="Nama perusahaan" value={partner?.company_name || "—"} />
        <Info label="Nama PIC" value={data.profile.full_name} />
        <Info label="Jenis kemitraan" value={partner?.business_type || "—"} />
        <Info label="Status kemitraan" value={statusLabels[partner?.partnership_status] || "Menunggu persetujuan"} />
        <Info label="Tanggal mulai" value={approved ? formatDate(partner.partnership_start_date) : "Belum ditetapkan"} />
        <Info label="Status kontrak" value={partner?.contract_start_date ? "Periode tercatat" : "Belum tercatat"} />
        <Info label="Periode kontrak" value={partner?.contract_start_date ? `${formatDate(partner.contract_start_date)} – ${partner.contract_end_date ? formatDate(partner.contract_end_date) : "Tidak ditentukan"}` : "Tidak tersedia"} />
        <Info label="Kota" value={partner?.city || "—"} />
      </dl>
      {!!partner?.partnership_events?.length && <div className="mt-7 border-t border-[#EDF0ED] pt-4"><h3 className="text-sm font-semibold text-[#0F3D2E]">Riwayat kemitraan</h3><ol className="mt-3 space-y-3">{partner.partnership_events.slice().sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((event: any, index: number) => <li key={`${event.created_at}-${index}`} className="border-l-2 border-[#A9C6B1] pl-3"><p className="text-xs font-semibold">{statusLabels[event.event_type] || event.event_type}</p><p className="mt-1 text-xs text-[#66736A]">{new Date(event.created_at).toLocaleString("id-ID")}{event.notes ? ` · ${event.notes}` : ""}</p></li>)}</ol></div>}
    </div>
    <p className="mt-4 text-xs leading-5 text-[#66736A]">Tanggal kemitraan dan kontrak hanya ditampilkan jika dicatat dan dikonfirmasi oleh tim MAN3.</p>
  </section>;
}
function Info({ label, value }: { label: string; value: string }) {
  return <div className="border-b border-[#EDF0ED] pb-3"><dt className="text-xs text-[#66736A]">{label}</dt><dd className="mt-1 text-sm font-medium text-[#27362D]">{value}</dd></div>;
}
function Alert({ message }: { message: string }) { return <p role="alert" className="border border-red-200 bg-red-50 p-4 text-sm text-red-800">{message}</p>; }
