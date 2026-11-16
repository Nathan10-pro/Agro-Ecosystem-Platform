"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") || "");
    if (password !== data.get("confirmation")) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/portal/auth/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Password gagal diperbarui.");
      router.replace("/login?reset=success");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Tidak dapat menghubungi server.");
    } finally {
      setBusy(false);
    }
  }
  return <section className="min-h-[calc(100vh-10rem)] bg-[#F7F7F2] px-4 py-16"><div className="mx-auto max-w-lg border border-[#DDE3DD] bg-white p-8">
    <h1 className="font-serif text-3xl text-[#0F3D2E]">Buat password baru</h1>
    <p className="mt-2 text-sm text-[#66736A]">Gunakan password 10-72 karakter dengan huruf besar, huruf kecil, dan angka.</p>
    <form onSubmit={submit} className="mt-6 space-y-4">
      <label className="block text-sm">Password baru<input required minLength={10} name="password" type="password" autoComplete="new-password" className="mt-2 w-full border border-[#C9D2CB] px-3 py-3" /></label>
      <label className="block text-sm">Konfirmasi password<input required minLength={10} name="confirmation" type="password" autoComplete="new-password" className="mt-2 w-full border border-[#C9D2CB] px-3 py-3" /></label>
      {error && <p role="alert" className="border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
      <button disabled={busy} className="w-full bg-[#0F3D2E] px-4 py-3 font-semibold text-white disabled:opacity-60">{busy ? "Menyimpan..." : "Simpan password baru"}</button>
    </form>
  </div></section>;
}
