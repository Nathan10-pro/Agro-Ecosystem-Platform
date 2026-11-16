"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatDate, partnershipDuration, statusLabels } from "@/lib/portal-format";

export default function AdminPartnershipsPage() {
  const [partners, setPartners] = useState<any[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("/api/admin/portal/partners").then(async (response) => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setPartners(result.partners);
    }).catch((cause) => setError(cause instanceof Error ? cause.message : "Kemitraan gagal dimuat."));
  }, []);
  if (error) return <p role="alert" className="border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>;
  return <section>
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Pemantauan kemitraan</p><h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Kemitraan aktif & tertunda</h1>
    <p className="mt-2 text-sm text-[#66736A]">Periode kontrak dan tanggal mulai hanya ditampilkan jika tercatat. Tidak ada tanggal kedaluwarsa yang dibuat otomatis.</p>
    <div className="mt-6 overflow-x-auto border border-[#DDE3DD] bg-white"><table className="min-w-[800px] text-left text-sm"><thead className="border-b border-[#DDE3DD] bg-[#F7F8F5] text-xs uppercase text-[#66736A]"><tr><th className="px-4">Perusahaan</th><th className="px-4">PIC</th><th className="px-4">Status</th><th className="px-4">Mulai</th><th className="px-4">Durasi</th><th className="px-4">Kontrak</th><th className="px-4">Aksi</th></tr></thead><tbody className="divide-y divide-[#EDF0ED]">{partners.map((partner) => <tr key={partner.id}><td className="px-4 font-medium">{partner.company_name}</td><td className="px-4">{partner.profile?.full_name || "—"}</td><td className="px-4">{statusLabels[partner.partnership_status]}</td><td className="px-4">{partner.partnership_start_date ? formatDate(partner.partnership_start_date) : "Belum ditetapkan"}</td><td className="px-4">{partner.partnership_status === "active" && partner.partnership_start_date ? partnershipDuration(partner.partnership_start_date) : "—"}</td><td className="px-4">{partner.contract_start_date ? `${formatDate(partner.contract_start_date)} – ${partner.contract_end_date ? formatDate(partner.contract_end_date) : "—"}` : "Tidak tercatat"}</td><td className="px-4"><Link href="/admin/partners" className="text-[#0F3D2E] underline underline-offset-4">Buka</Link></td></tr>)}</tbody></table>
      {partners.length === 0 && <p className="p-5 text-sm text-[#66736A]">Belum ada data kemitraan.</p>}</div>
  </section>;
}
