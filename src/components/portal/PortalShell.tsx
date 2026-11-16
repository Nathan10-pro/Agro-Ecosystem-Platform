"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PortalIdentity } from "@/lib/supabase/portal-auth";

const partnerLinks = [
  ["/mitra/dashboard", "Ringkasan"],
  ["/mitra/orders", "Pesanan"],
  ["/mitra/products", "Katalog & Pesan"],
  ["/mitra/partnership", "Kemitraan"],
  ["/mitra/profile", "Profil"],
];
const adminLinks = [
  ["/admin/dashboard", "Ringkasan"],
  ["/admin/orders", "Pesanan"],
  ["/admin/partners", "Mitra"],
  ["/admin/products", "Produk & Stok"],
  ["/admin/partnerships", "Kemitraan"],
  ["/admin/reports", "Laporan"],
  ["/admin/activity-logs", "Log Aktivitas"],
  ["/admin/settings", "Pengaturan"],
];

export default function PortalShell({ user, children }: { user: PortalIdentity; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = user.role === "admin";
  const links = isAdmin ? adminLinks : partnerLinks;

  async function logout() {
    const response = await fetch("/api/portal/auth/logout", { method: "POST" });
    if (!response.ok) {
      window.alert("Sesi belum dapat ditutup. Silakan coba kembali.");
      return;
    }
    router.replace("/login");
    router.refresh();
  }

  return <div className="min-h-[calc(100vh-9rem)] bg-[#F6F7F3]">
    {isAdmin ? (
      <div className="mx-auto flex max-w-[1500px] flex-col md:min-h-[calc(100vh-9rem)] md:flex-row">
        <aside className="border-b border-[#DDE3DD] bg-[#0F3D2E] text-white md:w-64 md:border-b-0 md:border-r md:p-5">
          <div className="px-5 py-5 md:px-2"><p className="text-xs uppercase tracking-[0.18em] text-[#C5D4C9]">MAN3 · Internal</p><p className="mt-2 font-semibold">Management Portal</p></div>
          <nav aria-label="Navigasi admin" className="flex gap-1 overflow-x-auto px-3 pb-3 md:block md:px-0">
            {links.map(([href, label]) => <Link key={href} href={href} className={`block whitespace-nowrap px-3 py-2.5 text-sm ${pathname === href ? "bg-white/15 font-semibold text-white" : "text-[#D2DED5] hover:bg-white/10"}`}>{label}</Link>)}
          </nav>
          <div className="hidden border-t border-white/15 pt-4 md:mt-8 md:block">
            <p className="truncate px-2 text-sm">{user.full_name}</p><p className="truncate px-2 pt-1 text-xs text-[#C5D4C9]">{user.email}</p>
            <button onClick={logout} className="mt-4 px-2 text-sm text-[#D2DED5] underline underline-offset-4">Keluar</button>
          </div>
        </aside>
        <div className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-[#DDE3DD] bg-white px-5 py-4 sm:px-8">
            <div><p className="text-xs text-[#66736A]">MAN3 Management Dashboard</p><p className="mt-1 text-sm font-semibold text-[#0F3D2E]">Operasional B2B {user.is_demo && <span className="ml-1 border border-[#D7C6A0] px-1.5 py-0.5 text-[10px] text-[#80543A]">AKUN DEMO</span>}</p></div>
            <button onClick={logout} className="text-sm text-[#0F3D2E] underline underline-offset-4 md:hidden">Keluar</button>
          </header>
          <main className="px-4 py-6 sm:px-8 sm:py-8">{children}</main>
        </div>
      </div>
    ) : (
      <>
        <header className="border-b border-[#DDE3DD] bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div><Link href="/mitra/dashboard" className="font-serif text-xl text-[#0F3D2E]">MAN3 Mitra</Link><p className="mt-1 text-xs text-[#66736A]">{user.full_name} · {user.email} {user.is_demo && <span className="font-semibold text-[#80543A]">· AKUN DEMO</span>}</p></div>
            <nav aria-label="Navigasi mitra" className="flex gap-5 overflow-x-auto text-sm">
              {links.map(([href, label]) => <Link key={href} href={href} className={`whitespace-nowrap ${pathname === href ? "font-semibold text-[#0F3D2E]" : "text-[#66736A] hover:text-[#0F3D2E]"}`}>{label}</Link>)}
              <button onClick={logout} className="whitespace-nowrap text-[#0F3D2E] underline underline-offset-4">Keluar</button>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10">{children}</main>
      </>
    )}
  </div>;
}
