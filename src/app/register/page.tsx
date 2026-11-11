"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Leaf, Mail, Lock, Eye, EyeOff, User, AlertCircle, Loader2, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirmPass) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Pendaftaran gagal. Coba lagi.");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 2000);
    } catch {
      setError("Terjadi kesalahan jaringan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#E8FFEF] flex items-center justify-center px-4 py-10">
      {/* Background decorative */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#52B788]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#885039]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl shadow-[#1B4332]/10 overflow-hidden">
          {/* Header */}
          <div className="bg-[#1B4332] px-8 py-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#52B788]/20 rounded-2xl mb-4">
              <Leaf className="w-8 h-8 text-[#52B788]" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-white mb-1">
              Daftar Akun MAN3
            </h1>
            <p className="text-[#52B788]/80 text-sm font-sans">
              Bergabung sebagai mitra atau anggota komunitas
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            {success ? (
              <div className="text-center py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="font-serif text-xl font-bold text-[#1B4332] mb-2">
                  Pendaftaran Berhasil!
                </h2>
                <p className="text-sm font-sans text-[#1B4332]/60">
                  Akun Anda telah dibuat. Mengalihkan ke beranda…
                </p>
              </div>
            ) : (
              <>
                {error && (
                  <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-[#1B4332] mb-2 font-sans">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1B4332]/40" />
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nama Anda"
                        className="w-full pl-11 pr-4 py-3 border border-[#1B4332]/20 rounded-xl text-sm font-sans text-[#1B4332] placeholder-[#1B4332]/30 bg-[#E8FFEF]/40 focus:outline-none focus:ring-2 focus:ring-[#52B788] focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-[#1B4332] mb-2 font-sans">
                      Alamat Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1B4332]/40" />
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@contoh.com"
                        className="w-full pl-11 pr-4 py-3 border border-[#1B4332]/20 rounded-xl text-sm font-sans text-[#1B4332] placeholder-[#1B4332]/30 bg-[#E8FFEF]/40 focus:outline-none focus:ring-2 focus:ring-[#52B788] focus:border-transparent transition"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-[#1B4332] mb-2 font-sans">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1B4332]/40" />
                      <input
                        id="password"
                        type={showPass ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        minLength={6}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Min. 6 karakter"
                        className="w-full pl-11 pr-12 py-3 border border-[#1B4332]/20 rounded-xl text-sm font-sans text-[#1B4332] placeholder-[#1B4332]/30 bg-[#E8FFEF]/40 focus:outline-none focus:ring-2 focus:ring-[#52B788] focus:border-transparent transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass((v) => !v)}
                        aria-label={showPass ? "Sembunyikan password" : "Tampilkan password"}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40 hover:text-[#1B4332]/70 transition"
                      >
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-semibold text-[#1B4332] mb-2 font-sans">
                      Konfirmasi Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1B4332]/40" />
                      <input
                        id="confirm-password"
                        type={showConfirm ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        placeholder="Ulangi password"
                        className="w-full pl-11 pr-12 py-3 border border-[#1B4332]/20 rounded-xl text-sm font-sans text-[#1B4332] placeholder-[#1B4332]/30 bg-[#E8FFEF]/40 focus:outline-none focus:ring-2 focus:ring-[#52B788] focus:border-transparent transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        aria-label={showConfirm ? "Sembunyikan konfirmasi" : "Tampilkan konfirmasi"}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1B4332]/40 hover:text-[#1B4332]/70 transition"
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#1B4332] hover:bg-[#1B4332]/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold font-sans rounded-xl transition-all duration-200 shadow-lg shadow-[#1B4332]/20"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Mendaftarkan…
                      </>
                    ) : (
                      "Daftar Sekarang"
                    )}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm font-sans text-[#1B4332]/60">
                  Sudah punya akun?{" "}
                  <Link href="/login" className="text-[#52B788] font-semibold hover:underline focus:outline-none focus:underline">
                    Masuk di sini
                  </Link>
                </p>
                <p className="mt-3 text-center">
                  <Link href="/" className="text-xs text-[#1B4332]/40 hover:text-[#1B4332]/70 transition font-sans">
                    ← Kembali ke beranda
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
