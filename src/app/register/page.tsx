"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const businessTypes = ["Restoran", "Hotel", "Catering", "Retail", "Distributor", "Other"];

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    const formData = new FormData(event.currentTarget);
    const body = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("/api/portal/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Pendaftaran gagal.");
      setSuccess(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Tidak dapat menghubungi server.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="min-h-[calc(100vh-10rem)] bg-[#F7F7F2] px-4 py-12">
      <div className="mx-auto max-w-3xl border border-[#DDE3DD] bg-white p-6 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#66736A]">Pendaftaran mitra MAN3</p>
        <h1 className="mt-3 font-serif text-3xl text-[#0F3D2E]">Ajukan kemitraan</h1>
        {success ? (
          <div role="status" className="mt-7 border border-[#A9C6B1] bg-[#F2F7F2] p-5 text-[#0F3D2E]">
            <h2 className="font-semibold">Registrasi diterima</h2>
            <p className="mt-2 text-sm">Registrasi berhasil. Akun Anda sedang menunggu verifikasi tim MAN3.</p>
            <p className="mt-2 text-sm">Setelah persetujuan, masuk untuk melengkapi profil dan mengakses layanan yang tersedia.</p>
            <Link href="/login" className="mt-4 inline-block text-sm font-semibold underline underline-offset-4">Kembali ke halaman masuk</Link>
          </div>
        ) : (
          <>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#66736A]">Informasi pendaftaran akan ditinjau oleh tim MAN3. Akun baru berstatus menunggu persetujuan dan belum dapat membuat pesanan.</p>
            {error && <p role="alert" className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
            <form onSubmit={submit} className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field name="full_name" label="Nama lengkap PIC" autoComplete="name" />
              <Field name="company_name" label="Nama restoran / perusahaan" autoComplete="organization" />
              <Field name="email" label="Email" type="email" autoComplete="email" />
              <Field name="phone" label="Nomor telepon" type="tel" autoComplete="tel" />
              <label className="block text-sm font-medium text-[#27362D]">Jenis usaha
                <select required name="business_type" defaultValue="" className="mt-2 w-full border border-[#C9D2CB] bg-white px-3 py-3">
                  <option value="" disabled>Pilih jenis usaha</option>
                  {businessTypes.map((type) => <option key={type}>{type}</option>)}
                </select>
              </label>
              <Field name="city" label="Kota domisili" autoComplete="address-level2" />
              <Field name="password" label="Password (min. 10 karakter, huruf besar/kecil dan angka)" type="password" autoComplete="new-password" />
              <Field name="password_confirmation" label="Konfirmasi password" type="password" autoComplete="new-password" />
              <div className="sm:col-span-2">
                <button disabled={busy} className="w-full bg-[#0F3D2E] px-4 py-3 font-semibold text-white hover:bg-[#174D3B] disabled:opacity-60">{busy ? "Mengirim pendaftaran..." : "Kirim pendaftaran"}</button>
                <p className="mt-4 text-center text-sm text-[#66736A]">Sudah memiliki akun? <Link href="/login" className="font-semibold text-[#0F3D2E] underline underline-offset-4">Masuk</Link></p>
              </div>
            </form>
          </>
        )}
      </div>
    </section>
  );
}

function Field({ name, label, type = "text", autoComplete }: { name: string; label: string; type?: string; autoComplete?: string }) {
  return <label className="block text-sm font-medium text-[#27362D]">{label}
    <input required name={name} type={type} autoComplete={autoComplete} className="mt-2 w-full border border-[#C9D2CB] px-3 py-3 outline-none focus:border-[#0F3D2E] focus:ring-1 focus:ring-[#0F3D2E]" />
  </label>;
}
