"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const email = new FormData(event.currentTarget).get("email");
    try {
      const response = await fetch("/api/portal/auth/recovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Permintaan reset gagal.");
      setMessage(result.message);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Tidak dapat menghubungi server.");
    } finally {
      setBusy(false);
    }
  }
  return <section className="min-h-[calc(100vh-10rem)] bg-[#F7F7F2] px-4 py-16"><div className="mx-auto max-w-lg border border-[#DDE3DD] bg-white p-8">
    <h1 className="font-serif text-3xl text-[#0F3D2E]">Reset password</h1>
    <p className="mt-2 text-sm text-[#66736A]">Masukkan email akun untuk meminta tautan pemulihan dari Supabase Auth.</p>
    <form onSubmit={submit} className="mt-6 space-y-4">
      <label className="block text-sm">Email<input required name="email" type="email" className="mt-2 w-full border border-[#C9D2CB] px-3 py-3" /></label>
      {message && <p role="status" className="border border-[#A9C6B1] bg-[#F2F7F2] p-3 text-sm text-[#0F3D2E]">{message}</p>}
      {error && <p role="alert" className="border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <button disabled={busy} className="w-full bg-[#0F3D2E] px-4 py-3 font-semibold text-white disabled:opacity-60">{busy ? "Mengirim..." : "Kirim instruksi reset"}</button>
    </form>
    <Link href="/login" className="mt-5 inline-block text-sm text-[#0F3D2E] underline underline-offset-4">Kembali ke halaman masuk</Link>
  </div></section>;
}
