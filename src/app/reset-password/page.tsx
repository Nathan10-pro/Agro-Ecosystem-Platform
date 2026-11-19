import Link from "next/link";

export default function ResetPasswordPage() {
  return <section className="min-h-[calc(100vh-10rem)] bg-[#F7F7F2] px-4 py-16"><div className="mx-auto max-w-lg border border-[#DDE3DD] bg-white p-8">
    <h1 className="font-serif text-3xl text-[#0F3D2E]">Reset password</h1>
    <p className="mt-3 text-sm leading-6 text-[#66736A]">Akun demo browser menggunakan password contoh tetap. Kembali ke halaman masuk untuk melihat akun yang tersedia.</p>
    <Link href="/login" className="mt-5 inline-block text-sm text-[#0F3D2E] underline underline-offset-4">Kembali ke halaman masuk</Link>
  </div></section>;
}
