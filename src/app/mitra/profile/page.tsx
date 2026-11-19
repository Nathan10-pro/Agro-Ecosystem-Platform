"use client";

import { FormEvent, useEffect, useState } from "react";
import { addPortalLog, DemoPartner, useBrowserPortalData } from "@/lib/portal/browser-data";
import { readDemoPortalSession } from "@/lib/portal/browser-session";

type ProfileFields = Pick<DemoPartner, "full_name" | "phone" | "company_name" | "business_type" | "city" | "address">;

export default function PartnerProfilePage() {
  const { data, ready, error, updateData } = useBrowserPortalData();
  const [partnerId, setPartnerId] = useState("");
  const [form, setForm] = useState<ProfileFields>({ full_name: "", phone: "", company_name: "", business_type: "", city: "", address: "" });
  const [message, setMessage] = useState("");
  useEffect(() => {
    const id = readDemoPortalSession()?.id || "";
    setPartnerId(id);
  }, []);
  const partner = data.partners.find((item) => item.profile_id === partnerId);
  useEffect(() => {
    if (partner) setForm({
      full_name: partner.full_name, phone: partner.phone, company_name: partner.company_name,
      business_type: partner.business_type, city: partner.city, address: partner.address,
    });
  }, [partner]);

  function save(event: FormEvent) {
    event.preventDefault();
    if (!partner) return;
    const saved = updateData((current) => addPortalLog({
      ...current,
      partners: current.partners.map((item) => item.id === partner.id ? { ...item, ...form } : item),
    }, partner.full_name, "Profil mitra diperbarui", form.company_name));
    setMessage(saved ? "Profil demo tersimpan pada browser ini." : "");
  }

  if (error) return <p role="alert" className="border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</p>;
  if (!ready || !partner) return <p role="status" className="py-12 text-sm text-[#66736A]">Memuat profil...</p>;
  return <section>
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Akun mitra</p><h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Profil perusahaan</h1>
    <p className="mt-2 text-sm text-[#66736A]">Perbarui informasi perusahaan dan kontak.</p>
    {message && <p role="status" className="mt-4 border border-[#A9C6B1] bg-[#F2F7F2] p-3 text-sm text-[#0F3D2E]">{message}</p>}
    <form onSubmit={save} className="mt-5 grid max-w-3xl gap-4 border border-[#DDE3DD] bg-white p-5 sm:grid-cols-2">
      <Field label="Nama PIC" value={form.full_name} onChange={(full_name) => setForm({ ...form, full_name })} />
      <label className="block text-sm text-[#27362D]">Email<input disabled value={partner.email} className="mt-1 w-full border border-[#C9D2CB] bg-[#F3F4F2] px-3 py-2.5 text-[#66736A]" /></label>
      <Field label="Nama perusahaan" value={form.company_name} onChange={(company_name) => setForm({ ...form, company_name })} />
      <Field label="Jenis usaha" value={form.business_type} onChange={(business_type) => setForm({ ...form, business_type })} />
      <Field label="Nomor telepon" value={form.phone} onChange={(phone) => setForm({ ...form, phone })} />
      <Field label="Kota" value={form.city} onChange={(city) => setForm({ ...form, city })} />
      <label className="block text-sm text-[#27362D] sm:col-span-2">Alamat usaha<textarea required rows={3} value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} className="mt-1 w-full border border-[#C9D2CB] px-3 py-2.5" /></label>
      <button className="justify-self-start bg-[#0F3D2E] px-5 py-2.5 text-sm font-semibold text-white">Simpan profil</button>
    </form>
  </section>;
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="block text-sm text-[#27362D]">{label}<input required value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full border border-[#C9D2CB] px-3 py-2.5" /></label>;
}
