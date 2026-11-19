import Link from "next/link";

export default function PortalMitraEntryPage() {
  return <section className="bg-[#F7F7F2] px-5 py-20 sm:py-28">
    <div className="mx-auto max-w-5xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#536158]">Portal kemitraan MAN3</p>
      <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-[#0F3D2E] sm:text-5xl">Pemesanan B2B yang tercatat dan terkelola.</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-[#536158]">Jelajahi pratinjau portal mitra dan admin langsung di browser. Dashboard menampilkan data contoh; portal ini belum terhubung ke akun atau sistem operasional.</p>
      <div className="mt-8 flex flex-wrap gap-3"><Link href="/login" className="bg-[#0F3D2E] px-5 py-3 text-sm font-semibold text-white">Masuk Portal</Link><Link href="/register" className="border border-[#BFCABF] bg-white px-5 py-3 text-sm font-semibold text-[#0F3D2E]">Ajukan kemitraan</Link></div>
    </div>
  </section>;
}
