"use client";

import { useEffect, useMemo, useState } from "react";
import { formatCurrency, formatDate, partnershipDuration, statusLabels } from "@/lib/portal-format";

type Partner = { id: string; company_name: string; business_type: string; business_address: string | null; city: string; partnership_status: string; partnership_start_date: string | null; contract_start_date: string | null; contract_end_date: string | null; is_demo: boolean; profile: { full_name: string; email: string; phone: string; account_status: string }; orders?: Array<{ total_amount: number }>; partnership_events?: Array<{ event_type: string; notes: string; created_at: string }> };
export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [businessFilter, setBusinessFilter] = useState("");
  const [busy, setBusy] = useState("");
  const [starts, setStarts] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  async function load() {
    const response = await fetch(`/api/admin/portal/partners${filter ? `?status=${encodeURIComponent(filter)}` : ""}`);
    const result = await response.json();
    if (!response.ok) throw new Error(result.error);
    setPartners(result.partners);
  }
  useEffect(() => { load().catch((cause) => setError(cause.message || "Daftar mitra gagal dimuat.")); }, [filter]);
  useEffect(() => {
    const status = new URLSearchParams(window.location.search).get("status");
    if (["pending_review", "active", "rejected", "suspended"].includes(status || "")) setFilter(status || "");
  }, []);
  const filtered = useMemo(() => partners.filter((partner) =>
    JSON.stringify(partner).toLowerCase().includes(query.toLowerCase()) &&
    (!businessFilter || partner.business_type === businessFilter)
  ), [partners, query, businessFilter]);
  async function changeStatus(partner: Partner, status: string) {
    setBusy(partner.id); setError("");
    try {
      const response = await fetch("/api/admin/portal/partners", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ partner_id: partner.id, status, partnership_start_date: starts[partner.id] || null, notes: notes[partner.id] || "" }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Perubahan status gagal."); }
    finally { setBusy(""); }
  }
  async function editInformation(event: React.FormEvent<HTMLFormElement>, partner: Partner) {
    event.preventDefault(); setBusy(partner.id); setError("");
    const form = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/admin/portal/partners", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "edit", partner_id: partner.id, ...form }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      await load();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Informasi mitra gagal diperbarui."); }
    finally { setBusy(""); }
  }
  return <section>
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Direktori usaha</p><h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Manajemen mitra</h1>
    <div className="mt-6 grid gap-3 sm:grid-cols-3"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari perusahaan, PIC, email..." className="border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm" /><select value={filter} onChange={(event) => setFilter(event.target.value)} className="border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm"><option value="">Semua status</option>{["pending_review","active","rejected","suspended"].map((item) => <option key={item} value={item}>{statusLabels[item]}</option>)}</select><select value={businessFilter} onChange={(event) => setBusinessFilter(event.target.value)} className="border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm"><option value="">Semua jenis usaha</option>{["Restoran","Hotel","Catering","Retail","Distributor","Other"].map((item) => <option key={item}>{item}</option>)}</select></div>
    {error && <p role="alert" className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    <div className="mt-5 space-y-3">{filtered.map((partner) => <article key={partner.id} className="border border-[#DDE3DD] bg-white p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs text-[#66736A]">{partner.business_type} · {partner.city}</p><h2 className="mt-1 font-serif text-xl text-[#0F3D2E]">{partner.company_name} {partner.is_demo && <span className="font-sans text-xs font-semibold text-[#80543A]">DEMO</span>}</h2><p className="mt-1 text-sm text-[#27362D]">{partner.profile?.full_name || "—"} · {partner.profile?.email || "—"}</p><p className="mt-1 text-xs text-[#66736A]">{partner.profile?.phone || "Telepon belum dicatat"}</p></div><span className="border border-[#DDE3DD] px-3 py-1.5 text-xs">{statusLabels[partner.partnership_status] || partner.partnership_status}</span></div>
      <div className="mt-4 grid gap-3 text-xs text-[#66736A] sm:grid-cols-3"><p>ID: {partner.id}</p><p>Mulai: {partner.partnership_start_date ? `${formatDate(partner.partnership_start_date)} · ${partnershipDuration(partner.partnership_start_date) || "—"}` : "Belum ditetapkan"}</p><p>Kontrak: {partner.contract_start_date ? `${formatDate(partner.contract_start_date)} – ${partner.contract_end_date ? formatDate(partner.contract_end_date) : "tidak ditentukan"}` : "Belum dicatat"}</p><p>Total pesanan: {partner.orders?.length || 0}</p><p>Total nilai: {formatCurrency(partner.orders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0)}</p></div>
      <div className="mt-4 grid gap-2 sm:grid-cols-[180px_1fr_auto]"><label className="text-xs text-[#66736A]">Tanggal mulai kemitraan (opsional)<input type="date" value={starts[partner.id] || ""} onChange={(event) => setStarts((value) => ({ ...value, [partner.id]: event.target.value }))} className="mt-1 block w-full border border-[#C9D2CB] px-2 py-2 text-sm" /></label><label className="text-xs text-[#66736A]">Catatan tindakan<input value={notes[partner.id] || ""} maxLength={1000} onChange={(event) => setNotes((value) => ({ ...value, [partner.id]: event.target.value }))} placeholder="Catatan persetujuan / penolakan" className="mt-1 block w-full border border-[#C9D2CB] px-2 py-2 text-sm" /></label>
        <div className="flex flex-wrap items-end gap-2">{partner.partnership_status !== "active" && <button disabled={busy === partner.id} onClick={() => changeStatus(partner, "active")} className="bg-[#0F3D2E] px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">Setujui / aktifkan</button>}{partner.partnership_status !== "rejected" && <button disabled={busy === partner.id} onClick={() => changeStatus(partner, "rejected")} className="border border-[#C9D2CB] px-3 py-2 text-xs text-[#27362D] disabled:opacity-50">Tolak</button>}{partner.partnership_status !== "suspended" && partner.partnership_status === "active" && <button disabled={busy === partner.id} onClick={() => changeStatus(partner, "suspended")} className="border border-[#C9D2CB] px-3 py-2 text-xs text-[#27362D] disabled:opacity-50">Tangguhkan</button>}</div>
      </div>
      <details className="mt-4 border-t border-[#EDF0ED] pt-3"><summary className="cursor-pointer text-xs font-semibold text-[#0F3D2E]">Edit informasi usaha / lihat timeline</summary>
        <form onSubmit={(event) => editInformation(event, partner)} className="mt-3 grid gap-2 sm:grid-cols-2">
          <label className="text-xs text-[#66736A]">Nama perusahaan<input name="company_name" required defaultValue={partner.company_name} className="mt-1 block w-full border border-[#C9D2CB] px-2 py-2 text-sm" /></label>
          <label className="text-xs text-[#66736A]">Jenis usaha<select name="business_type" defaultValue={partner.business_type} className="mt-1 block w-full border border-[#C9D2CB] bg-white px-2 py-2 text-sm">{["Restoran","Hotel","Catering","Retail","Distributor","Other"].map((type) => <option key={type}>{type}</option>)}</select></label>
          <label className="text-xs text-[#66736A]">Kota<input name="city" required defaultValue={partner.city} className="mt-1 block w-full border border-[#C9D2CB] px-2 py-2 text-sm" /></label>
          <label className="text-xs text-[#66736A]">Alamat bisnis<input name="business_address" defaultValue={partner.business_address || ""} className="mt-1 block w-full border border-[#C9D2CB] px-2 py-2 text-sm" /></label>
          <button disabled={busy === partner.id} className="justify-self-start bg-[#0F3D2E] px-3 py-2 text-xs font-semibold text-white disabled:opacity-50">Simpan informasi</button>
        </form>
        <ol className="mt-4 space-y-2 border-t border-[#EDF0ED] pt-3">{(partner.partnership_events || []).slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((event, index) => <li key={`${event.created_at}-${index}`} className="text-xs text-[#66736A]">{new Date(event.created_at).toLocaleString("id-ID")} · {event.event_type}{event.notes && ` — ${event.notes}`}</li>)}</ol>
      </details>
    </article>)}
    {!error && filtered.length === 0 && <p className="border border-[#DDE3DD] bg-white p-6 text-sm text-[#66736A]">Belum ada data mitra untuk filter ini.</p>}</div>
  </section>;
}
