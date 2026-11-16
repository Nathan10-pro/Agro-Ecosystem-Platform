"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("reset") === "success") setNotice("Password berhasil diperbarui. Silakan masuk dengan password baru.");
    if (params.get("error") === "account-inactive") setError("Akun administrator tidak aktif. Hubungi pengelola MAN3.");
    else if (params.get("error")) setError("Tautan verifikasi atau pemulihan tidak valid atau telah kedaluwarsa.");
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/portal/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Login gagal.");
      const requestedPath = new URLSearchParams(window.location.search).get("redirect");
      const allowedPrefix = result.user.role === "admin" ? "/admin/" : "/mitra/";
      const destination = requestedPath?.startsWith(allowedPrefix) ? requestedPath : result.destination;
      router.replace(destination);
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Tidak dapat menghubungi server.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="min-h-[calc(100vh-10rem)] bg-[#F7F7F2] px-4 py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden border border-[#DDE3DD] bg-white md:grid-cols-[1fr_1.05fr]">
        <div className="hidden flex-col justify-between bg-[#0F3D2E] p-10 text-white md:flex">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C4D5C9]">MAN3 · Kemitraan</div>
          <div>
            <p className="mb-4 text-sm text-[#C4D5C9]">Portal bisnis MAN3</p>
            <h1 className="font-serif text-4xl leading-tight">Kemitraan yang tumbuh bersama.</h1>
          </div>
          <p className="text-sm text-[#C4D5C9]">Akses pesanan, status kemitraan, dan informasi produk dalam satu portal.</p>
        </div>
        <div className="p-7 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#66736A]">Portal MAN3</p>
          <h2 className="mt-3 font-serif text-3xl text-[#0F3D2E]">Masuk ke akun Anda</h2>
          <p className="mt-2 text-sm text-[#66736A]">Gunakan akun mitra atau administrator.</p>
          {notice && <p role="status" className="mt-5 border border-[#A9C6B1] bg-[#F2F7F2] px-4 py-3 text-sm text-[#0F3D2E]">{notice}</p>}
          {error && <p role="alert" className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
          <form onSubmit={submit} className="mt-7 space-y-5">
            <label className="block text-sm font-medium text-[#27362D]">
              Email
              <input required type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full border border-[#C9D2CB] px-3 py-3 outline-none focus:border-[#0F3D2E] focus:ring-1 focus:ring-[#0F3D2E]" />
            </label>
            <label className="block text-sm font-medium text-[#27362D]">
              Password
              <span className="mt-2 flex border border-[#C9D2CB] focus-within:border-[#0F3D2E] focus-within:ring-1 focus-within:ring-[#0F3D2E]">
                <input required type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="min-w-0 flex-1 px-3 py-3 outline-none" />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="px-3 text-xs text-[#0F3D2E]">{showPassword ? "Sembunyikan" : "Tampilkan"}</button>
              </span>
            </label>
            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-[#0F3D2E] underline underline-offset-4">Lupa password?</Link>
            </div>
            <button disabled={busy} className="w-full bg-[#0F3D2E] px-4 py-3 font-semibold text-white hover:bg-[#174D3B] disabled:opacity-60">
              {busy ? "Memverifikasi..." : "Masuk"}
            </button>
          </form>
          <p className="mt-6 text-sm text-[#66736A]">Belum menjadi mitra? <Link href="/register" className="font-semibold text-[#0F3D2E] underline underline-offset-4">Daftar sekarang</Link></p>
        </div>
      </div>
    </section>
  );
}
