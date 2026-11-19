"use client";

import { FormEvent, useState } from "react";
import { useBrowserPortalData } from "@/lib/portal/browser-data";
import { resetCustomDemoAccounts } from "@/lib/portal/browser-session";

export default function AdminSettingsPage() {
  const { data, error, updateData, resetData } = useBrowserPortalData();
  const [message, setMessage] = useState("");

  function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget).entries());
    const saved = updateData((current) => ({
      ...current,
      settings: {
        organization_name: String(form.organization_name).trim(),
        contact_email: String(form.contact_email).trim(),
        tax_percent: Number(form.tax_percent),
      },
    }));
    setMessage(saved ? "Pengaturan demo tersimpan di browser." : "");
  }

  function reset() {
    if (!window.confirm("Hapus semua perubahan demo pada browser ini dan kembalikan data awal?")) return;
    const reset = resetData();
    if (reset) resetCustomDemoAccounts();
    setMessage(reset ? "Data demo dikembalikan ke kondisi awal." : "");
  }

  return <section>
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Preferensi lokal</p>
    <h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Pengaturan portal demo</h1>
    <p className="mt-2 text-sm text-[#66736A]">Preferensi portal.</p>
    {error && <p role="alert" className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    {message && <p role="status" className="mt-4 border border-[#A9C6B1] bg-[#F2F7F2] p-3 text-sm text-[#0F3D2E]">{message}</p>}
    <form onSubmit={saveSettings} className="mt-5 max-w-2xl space-y-4 border border-[#DDE3DD] bg-white p-5">
      <label className="block text-sm text-[#27362D]">Nama organisasi<input required name="organization_name" defaultValue={data.settings.organization_name} key={data.settings.organization_name} className="mt-1 w-full border border-[#C9D2CB] px-3 py-2.5" /></label>
      <label className="block text-sm text-[#27362D]">Email kontak<input required type="email" name="contact_email" defaultValue={data.settings.contact_email} key={data.settings.contact_email} className="mt-1 w-full border border-[#C9D2CB] px-3 py-2.5" /></label>
      <label className="block text-sm text-[#27362D]">Pajak contoh (%)<input required type="number" min="0" max="100" step="0.1" name="tax_percent" defaultValue={data.settings.tax_percent} key={data.settings.tax_percent} className="mt-1 w-full border border-[#C9D2CB] px-3 py-2.5" /></label>
      <button className="bg-[#0F3D2E] px-4 py-2.5 text-sm font-semibold text-white">Simpan pengaturan</button>
    </form>
    <div className="mt-6 max-w-2xl border border-[#E6D8C1] bg-[#FCF8ED] p-5"><h2 className="font-semibold text-[#705A2A]">Atur ulang data demo</h2><p className="mt-1 text-sm text-[#705A2A]">Menghapus perubahan produk, mitra, pesanan, pengaturan, dan log pada browser ini.</p><button onClick={reset} className="mt-4 border border-[#BDAA83] px-4 py-2 text-sm font-semibold text-[#705A2A]">Kembalikan data awal</button></div>
  </section>;
}
