"use client";

import { FormEvent, useState } from "react";
import { KeyRound } from "lucide-react";

export default function PasswordChangeForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch("/api/auth/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Password gagal diperbarui.");
      setCurrentPassword("");
      setNewPassword("");
      setMessage(data.message);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Password gagal diperbarui.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-2xl border border-[#1B4332]/10 bg-white p-6 shadow-sm">
      <h2 className="flex items-center gap-2 font-serif text-lg font-bold text-[#1B4332]"><KeyRound className="h-5 w-5" /> Ganti password</h2>
      <p className="mt-1 text-sm text-[#1B4332]/60">Perbarui password akun admin. Ganti password awal sebelum website dipublikasikan.</p>
      {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {message && <p role="status" className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">{message}</p>}
      <form onSubmit={handleSubmit} className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-xs font-medium text-[#1B4332]/70">Password saat ini
          <input required type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className="mt-1 w-full rounded-lg border border-[#1B4332]/20 px-3 py-2.5 text-sm" />
        </label>
        <label className="text-xs font-medium text-[#1B4332]/70">Password baru (6-72 karakter)
          <input required minLength={6} maxLength={72} type="password" autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="mt-1 w-full rounded-lg border border-[#1B4332]/20 px-3 py-2.5 text-sm" />
        </label>
        <button disabled={saving} className="rounded-lg bg-[#1B4332] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60 sm:col-span-2">{saving ? "Menyimpan…" : "Perbarui password"}</button>
      </form>
    </section>
  );
}
