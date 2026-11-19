"use client";

import { useEffect, useMemo, useState } from "react";
import { addPortalLog, DemoPartner, PartnerStatus, useBrowserPortalData } from "@/lib/portal/browser-data";
import { statusLabels } from "@/lib/portal-format";

const states: PartnerStatus[] = ["pending_review", "active", "rejected", "suspended"];

export default function AdminPartnersPage() {
  const { data, ready, error, updateData } = useBrowserPortalData();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("status");
    if (states.includes(requested as PartnerStatus)) setFilter(requested || "");
  }, []);
  const partners = useMemo(() => data.partners.filter((partner) =>
    (!filter || partner.status === filter) &&
    `${partner.company_name} ${partner.full_name} ${partner.email} ${partner.city}`.toLowerCase().includes(query.toLowerCase())
  ), [data.partners, filter, query]);

  function updatePartner(partner: DemoPartner, changes: Partial<DemoPartner>, action: string) {
    const saved = updateData((current) => addPortalLog({
      ...current,
      partners: current.partners.map((item) => item.id === partner.id ? { ...item, ...changes } : item),
    }, "Admin Demo", action, `${partner.company_name}: ${action.toLowerCase()}`));
    setMessage(saved ? "Perubahan tersimpan di browser ini." : "");
  }

  return <section>
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Direktori usaha</p>
    <h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Manajemen mitra</h1>
    <p className="mt-2 text-sm text-[#66736A]">Cari, tinjau pendaftaran, dan perbarui status mitra demo.</p>
    <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_220px]">
      <input aria-label="Cari mitra" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari perusahaan, PIC, email, kota..." className="border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm" />
      <select aria-label="Filter status" value={filter} onChange={(event) => setFilter(event.target.value)} className="border border-[#C9D2CB] bg-white px-3 py-2.5 text-sm"><option value="">Semua status</option>{states.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select>
    </div>
    {error && <p role="alert" className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    {message && <p role="status" className="mt-4 border border-[#A9C6B1] bg-[#F2F7F2] p-3 text-sm text-[#0F3D2E]">{message}</p>}
    {!ready ? <p className="py-8 text-sm text-[#66736A]">Memuat data demo...</p> : <div className="mt-5 space-y-3">
      {partners.map((partner) => <PartnerCard key={partner.id} partner={partner} onUpdate={updatePartner} />)}
      {partners.length === 0 && <p className="border border-[#DDE3DD] bg-white p-5 text-sm text-[#66736A]">Tidak ada mitra yang cocok dengan pencarian.</p>}
    </div>}
  </section>;
}

function PartnerCard({ partner, onUpdate }: { partner: DemoPartner; onUpdate: (partner: DemoPartner, changes: Partial<DemoPartner>, action: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [notes, setNotes] = useState(partner.notes);
  useEffect(() => setNotes(partner.notes), [partner.notes]);
  return <article className="border border-[#DDE3DD] bg-white p-4 sm:p-5">
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div><p className="text-xs text-[#66736A]">{partner.business_type} · {partner.city}</p><h2 className="mt-1 font-serif text-xl text-[#0F3D2E]">{partner.company_name}</h2><p className="mt-1 text-sm">{partner.full_name} · {partner.email}</p><p className="mt-1 text-xs text-[#66736A]">{partner.phone} · {partner.address}</p></div>
      <span className="border border-[#DDE3DD] px-3 py-1.5 text-xs">{statusLabels[partner.status]}</span>
    </div>
    {editing ? <form className="mt-4 grid gap-3 border-t border-[#EDF0ED] pt-4 sm:grid-cols-2" onSubmit={(event) => {
      event.preventDefault();
      const form = Object.fromEntries(new FormData(event.currentTarget).entries());
      onUpdate(partner, {
        company_name: String(form.company_name), full_name: String(form.full_name),
        phone: String(form.phone), city: String(form.city), address: String(form.address),
        business_type: String(form.business_type),
      }, "Edit mitra");
      setEditing(false);
    }}>
      <Field name="company_name" label="Perusahaan" defaultValue={partner.company_name} />
      <Field name="full_name" label="Nama PIC" defaultValue={partner.full_name} />
      <Field name="business_type" label="Jenis usaha" defaultValue={partner.business_type} />
      <Field name="phone" label="Telepon" defaultValue={partner.phone} />
      <Field name="city" label="Kota" defaultValue={partner.city} />
      <Field name="address" label="Alamat" defaultValue={partner.address} />
      <div className="flex gap-2 sm:col-span-2"><button className="bg-[#0F3D2E] px-4 py-2 text-sm font-semibold text-white">Simpan</button><button type="button" onClick={() => setEditing(false)} className="border border-[#C9D2CB] px-4 py-2 text-sm">Batal</button></div>
    </form> : <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
      <label className="text-xs text-[#66736A]">Catatan kemitraan<textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows={2} className="mt-1 block w-full border border-[#C9D2CB] px-2 py-2 text-sm text-[#27362D]" /></label>
      <div className="flex flex-wrap items-end gap-2">
        {partner.status !== "active" && <button onClick={() => onUpdate(partner, { status: "active", partnership_start_date: partner.partnership_start_date || new Date().toISOString().slice(0, 10) }, "Mitra disetujui")} className="bg-[#0F3D2E] px-3 py-2 text-xs font-semibold text-white">Setujui / aktifkan</button>}
        {partner.status !== "rejected" && <button onClick={() => onUpdate(partner, { status: "rejected" }, "Mitra ditolak")} className="border border-[#C9D2CB] px-3 py-2 text-xs">Tolak</button>}
        {partner.status === "active" && <button onClick={() => onUpdate(partner, { status: "suspended" }, "Mitra ditangguhkan")} className="border border-[#C9D2CB] px-3 py-2 text-xs">Tangguhkan</button>}
        {partner.status === "suspended" && <button onClick={() => onUpdate(partner, { status: "active" }, "Mitra diaktifkan kembali")} className="border border-[#C9D2CB] px-3 py-2 text-xs">Aktifkan kembali</button>}
        <button onClick={() => onUpdate(partner, { notes }, "Catatan mitra diperbarui")} className="border border-[#C9D2CB] px-3 py-2 text-xs">Simpan catatan</button>
        <button onClick={() => setEditing(true)} className="px-3 py-2 text-xs text-[#0F3D2E] underline">Edit profil</button>
      </div>
    </div>}
  </article>;
}

function Field({ name, label, defaultValue }: { name: string; label: string; defaultValue: string }) {
  return <label className="text-xs text-[#66736A]">{label}<input required name={name} defaultValue={defaultValue} className="mt-1 block w-full border border-[#C9D2CB] px-2 py-2 text-sm text-[#27362D]" /></label>;
}
