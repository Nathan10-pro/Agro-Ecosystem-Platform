"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { addPortalLog, useBrowserPortalData } from "@/lib/portal/browser-data";
import { registerDemoPartner } from "@/lib/portal/browser-session";

const businessTypes = ["Restoran", "Hotel", "Catering", "Retail", "Distributor", "Lainnya"];

export default function RegisterPage() {
  const { updateData, error: storageError } = useBrowserPortalData();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    const form = Object.fromEntries(new FormData(event.currentTarget).entries());
    if (form.password !== form.password_confirmation) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }
    try {
      const { partner } = registerDemoPartner({
        full_name: String(form.full_name),
        company_name: String(form.company_name),
        email: String(form.email),
        phone: String(form.phone),
        business_type: String(form.business_type),
        city: String(form.city),
        address: String(form.address),
        password: String(form.password),
      });
      const saved = updateData((current) => addPortalLog({
        ...current,
        partners: [partner, ...current.partners],
      }, partner.full_name, "Pendaftaran mitra demo", partner.company_name));
      if (!saved) throw new Error("Akun dibuat tetapi data mitra tidak dapat disimpan. Coba browser lain atau kosongkan penyimpanan demo.");
      setSuccess(`Pendaftaran demo untuk ${partner.company_name} tersimpan. Masuk dengan email yang didaftarkan dan tunggu admin menyetujui mitra.`);
      event.currentTarget.reset();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Pendaftaran demo gagal.");
    }
  }

  return <section className="min-h-[calc(100vh-10rem)] bg-[#F7F7F2] px-4 py-12">
    <div className="mx-auto max-w-3xl border border-[#DDE3DD] bg-white p-6 sm:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#66736A]">Mitra MAN3</p>
      <h1 className="mt-3 font-serif text-3xl text-[#0F3D2E]">Ajukan kemitraan</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#66736A]">Lengkapi profil usaha untuk mengajukan kemitraan.</p>
      <p className="mt-4 rounded-sm bg-[#F7F7F2] p-3 text-xs leading-5 text-[#536158]">Pratinjau lokal. Gunakan informasi contoh; akun tersimpan di browser ini.</p>
      {(error || storageError) && <p role="alert" className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error || storageError}</p>}
      {success && <div role="status" className="mt-5 border border-[#A9C6B1] bg-[#F2F7F2] p-4 text-sm text-[#0F3D2E]">{success}<p className="mt-3"><Link href="/login" className="font-semibold underline underline-offset-4">Masuk Portal</Link></p></div>}
      <form onSubmit={submit} className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field name="full_name" label="Nama lengkap PIC" autoComplete="name" />
        <Field name="company_name" label="Nama perusahaan" autoComplete="organization" />
        <Field name="email" label="Email" type="email" autoComplete="off" />
        <Field name="phone" label="Nomor telepon" type="tel" autoComplete="off" />
        <label className="block text-sm font-medium text-[#27362D]">Jenis usaha<select required name="business_type" defaultValue="" className="mt-2 w-full border border-[#C9D2CB] bg-white px-3 py-3"><option value="" disabled>Pilih jenis usaha</option>{businessTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
        <Field name="city" label="Kota" autoComplete="off" />
        <label className="block text-sm font-medium text-[#27362D] sm:col-span-2">Alamat<textarea required name="address" rows={2} className="mt-2 w-full border border-[#C9D2CB] px-3 py-3" /></label>
        <Field name="password" label="Password (min. 8 karakter)" type="password" autoComplete="new-password" />
        <Field name="password_confirmation" label="Konfirmasi password" type="password" autoComplete="new-password" />
        <div className="sm:col-span-2"><button className="w-full bg-[#0F3D2E] px-4 py-3 font-semibold text-white hover:bg-[#174D3B]">Kirim pengajuan</button><p className="mt-4 text-center text-sm text-[#66736A]">Sudah punya akun? <Link href="/login" className="font-semibold text-[#0F3D2E] underline underline-offset-4">Masuk Portal</Link></p></div>
      </form>
    </div>
  </section>;
}

function Field({ name, label, type = "text", autoComplete }: { name: string; label: string; type?: string; autoComplete?: string }) {
  return <label className="block text-sm font-medium text-[#27362D]">{label}<input required name={name} type={type} autoComplete={autoComplete} minLength={name.includes("password") ? 8 : undefined} className="mt-2 w-full border border-[#C9D2CB] px-3 py-3 outline-none focus:border-[#0F3D2E] focus:ring-1 focus:ring-[#0F3D2E]" /></label>;
}
