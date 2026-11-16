"use client";

import { FormEvent, useEffect, useState } from "react";

const businessTypes = ["Restoran", "Hotel", "Catering", "Retail", "Distributor", "Other"];
export default function PartnerProfilePage() {
  const [initial, setInitial] = useState<any>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    fetch("/api/portal/summary").then(async (response) => {
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setInitial({ ...result.partner, full_name: result.profile.full_name, phone: result.profile.phone || "" });
    }).catch((cause) => setError(cause instanceof Error ? cause.message : "Profil belum dapat dimuat."));
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(""); setMessage(""); setBusy(true);
    const body = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch("/api/portal/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setMessage(result.message);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Perubahan profil gagal disimpan.");
    } finally { setBusy(false); }
  }
  return <section className="max-w-3xl"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Informasi akun</p><h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Profil usaha</h1>
    {error && <p role="alert" className="mt-5 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    {!initial ? <p className="py-10 text-sm text-[#66736A]">Memuat profil...</p> : <form onSubmit={submit} className="mt-6 grid gap-5 border border-[#DDE3DD] bg-white p-5 sm:grid-cols-2 sm:p-7">
      <Field name="full_name" label="Nama PIC" value={initial.full_name} />
      <Field name="company_name" label="Nama perusahaan" value={initial.company_name} />
      <Field name="phone" label="Nomor telepon" value={initial.phone} />
      <Field name="city" label="Kota" value={initial.city} />
      <label className="block text-sm">Jenis usaha<select name="business_type" defaultValue={initial.business_type} required className="mt-2 w-full border border-[#C9D2CB] bg-white px-3 py-3">{businessTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
      <Field name="business_address" label="Alamat bisnis" value={initial.business_address || ""} />
      <div className="sm:col-span-2">{message && <p role="status" className="mb-4 border border-[#A9C6B1] bg-[#F2F7F2] p-3 text-sm text-[#0F3D2E]">{message}</p>}
        <p className="mb-4 text-xs text-[#66736A]">Perubahan informasi usaha tercatat dalam riwayat kemitraan. Role, status persetujuan, tanggal mulai, dan email tidak dapat diubah di halaman ini.</p>
        <button disabled={busy} className="bg-[#0F3D2E] px-5 py-3 text-sm font-semibold text-white disabled:opacity-60">{busy ? "Menyimpan..." : "Simpan perubahan"}</button>
      </div>
    </form>}
  </section>;
}
function Field({ name, label, value }: { name: string; label: string; value: string }) {
  return <label className="block text-sm">{label}<input required name={name} defaultValue={value} className="mt-2 w-full border border-[#C9D2CB] px-3 py-3" /></label>;
}
