import Link from "next/link";

export default function ForgotPasswordPage() {
  return <section className="min-h-[calc(100vh-10rem)] bg-[#F7F7F2] px-4 py-16"><div className="mx-auto max-w-lg border border-[#DDE3DD] bg-white p-8">
    <h1 className="font-serif text-3xl text-[#0F3D2E]">Reset password</h1>
    <p className="mt-3 border border-[#D7C6A0] bg-[#FCF8ED] p-4 text-sm leading-6 text-[#705A2A]">Reset password tidak tersedia karena akun demo berjalan lokal di browser dan tidak memiliki layanan email.</p>
    <Link href="/login" className="mt-5 inline-block text-sm text-[#0F3D2E] underline underline-offset-4">Kembali ke halaman masuk</Link>
  </div></section>;
}
