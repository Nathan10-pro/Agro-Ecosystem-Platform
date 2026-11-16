export default function AdminSettingsPage() {
  return <section className="max-w-3xl">
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#66736A]">Konfigurasi aplikasi</p><h1 className="mt-2 font-serif text-3xl text-[#0F3D2E]">Pengaturan portal</h1>
    <div className="mt-6 border border-[#DDE3DD] bg-white p-5 sm:p-7"><h2 className="font-semibold text-[#0F3D2E]">Layanan eksternal</h2><dl className="mt-4 space-y-4 text-sm">
      <div className="border-b border-[#EDF0ED] pb-3"><dt className="font-medium">Supabase Auth</dt><dd className="mt-1 text-[#66736A]">Mengelola kredensial, sesi, verifikasi email, dan pemulihan password.</dd></div>
      <div className="border-b border-[#EDF0ED] pb-3"><dt className="font-medium">Email pemulihan</dt><dd className="mt-1 text-[#66736A]">Konfigurasikan SMTP dan URL redirect di Supabase Authentication sebelum menggunakan pemulihan password.</dd></div>
      <div><dt className="font-medium">Rahasia service-role</dt><dd className="mt-1 text-[#66736A]">Hanya dibutuhkan oleh script seed lokal. Jangan masukkan ke environment frontend atau route API.</dd></div>
    </dl></div>
  </section>;
}
