"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  logoutFromDemoPortal,
  readDemoPortalSession,
} from "@/lib/portal/browser-session";
import type { PortalRole, PortalSession } from "@/lib/portal/browser-session";

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

export default function PortalShell({ role, children }: { role: PortalRole; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<PortalSession | null>(null);
  const [sessionError, setSessionError] = useState("");
  const isAdmin = role === "admin";
  const links = isAdmin ? adminLinks : partnerLinks;

  useEffect(() => {
    try {
      const session = readDemoPortalSession();
      if (!session) {
        router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }
      if (session.role !== role) {
        router.replace(session.role === "admin" ? "/admin/dashboard" : "/mitra/dashboard");
        return;
      }
      setUser(session);
    } catch {
      setSessionError("Penyimpanan browser tidak tersedia. Aktifkan local storage lalu muat ulang halaman.");
    }
  }, [pathname, role, router]);

  function logout() {
    try {
      logoutFromDemoPortal();
      router.replace("/login");
    } catch {
      setSessionError("Sesi demo tidak dapat dihapus dari penyimpanan browser.");
    }
  }

  if (sessionError) return <p role="alert" className="mx-auto max-w-3xl px-5 py-20 text-sm text-red-800">{sessionError}</p>;
  if (!user) return <p role="status" className="mx-auto max-w-3xl px-5 py-20 text-sm text-[#66736A]">Memeriksa sesi demo lokal...</p>;

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
            <div><p className="text-xs text-[#66736A]">MAN3 Management Dashboard</p><p className="mt-1 text-sm font-semibold text-[#0F3D2E]">Portal Admin</p></div>
            <button onClick={logout} className="text-sm text-[#0F3D2E] underline underline-offset-4 md:hidden">Keluar</button>
          </header>
          <main className="px-4 py-6 sm:px-8 sm:py-8">
            <DemoNotice />
            {children}
          </main>
        </div>
      </div>
    ) : (
      <>
        <header className="border-b border-[#DDE3DD] bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div><Link href="/mitra/dashboard" className="font-serif text-xl text-[#0F3D2E]">MAN3 Mitra</Link><p className="mt-1 text-xs text-[#66736A]">{user.full_name} · {user.email}</p></div>
            <nav aria-label="Navigasi mitra" className="flex gap-5 overflow-x-auto text-sm">
              {links.map(([href, label]) => <Link key={href} href={href} className={`whitespace-nowrap ${pathname === href ? "font-semibold text-[#0F3D2E]" : "text-[#66736A] hover:text-[#0F3D2E]"}`}>{label}</Link>)}
              <button onClick={logout} className="whitespace-nowrap text-[#0F3D2E] underline underline-offset-4">Keluar</button>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10">
          <DemoNotice />
          {children}
        </main>
      </>
    )}
  </div>;
}

function DemoNotice() {
  return <p className="mb-5 text-xs text-[#66736A]">Pratinjau lokal · perubahan tersimpan di browser ini.</p>;
}
