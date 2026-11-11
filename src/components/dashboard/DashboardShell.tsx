"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Leaf,
  LayoutDashboard,
  Users,
  Shield,
  Newspaper,
  ClipboardList,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import type { UserSession } from "@/lib/auth";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Ringkasan", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/users", label: "Manajemen User", icon: Users, exact: false },
  { href: "/dashboard/roles", label: "Manajemen Role", icon: Shield, exact: false },
  { href: "/dashboard/berita", label: "Berita & Konten", icon: Newspaper, exact: false },
  { href: "/dashboard/pemesanan", label: "Pemesanan", icon: ClipboardList, exact: false },
];

function NavItem({
  item,
  pathname,
  onClick,
}: {
  item: (typeof NAV_ITEMS)[0];
  pathname: string;
  onClick?: () => void;
}) {
  const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans font-medium transition-all duration-150 group ${
        isActive
          ? "bg-[#52B788]/20 text-[#52B788]"
          : "text-white/60 hover:bg-white/10 hover:text-white"
      }`}
    >
      <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-[#52B788]" : ""}`} />
      <span>{item.label}</span>
      {isActive && <ChevronRight className="w-3 h-3 ml-auto text-[#52B788]" />}
    </Link>
  );
}

export default function DashboardShell({
  user,
  children,
}: {
  user: UserSession;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch {
      setLoggingOut(false);
    }
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-[#52B788]/20 rounded-xl flex items-center justify-center">
            <Leaf className="w-5 h-5 text-[#52B788]" />
          </div>
          <div>
            <div className="font-serif text-white font-bold text-base leading-tight">MAN3</div>
            <div className="text-[#52B788]/70 text-xs font-sans">Admin Panel</div>
          </div>
          <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-white/50 ml-auto transition" />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <div className="text-[#52B788]/40 text-xs font-semibold uppercase tracking-widest px-4 mb-3 font-sans">
          Menu Utama
        </div>
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            pathname={pathname}
            onClick={() => setSidebarOpen(false)}
          />
        ))}
      </nav>

      {/* User + Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className="px-4 py-3 mb-2">
          <div className="text-xs font-sans text-white/40 mb-0.5">Masuk sebagai</div>
          <div className="text-sm font-semibold text-white font-sans truncate">{user.name}</div>
          <div className="text-xs text-[#52B788]/60 font-sans truncate">{user.email}</div>
        </div>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans font-medium text-white/60 hover:bg-red-900/30 hover:text-red-300 transition-all duration-150 disabled:opacity-50"
        >
          <LogOut className="w-4 h-4" />
          {loggingOut ? "Keluar…" : "Keluar"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5FDF8] flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-[#1B4332] z-30">
        <SidebarContent />
      </aside>

      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-[#1B4332] z-50 transform transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setSidebarOpen(false)}
            aria-label="Tutup menu"
            className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-[#1B4332]/10 px-4 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Buka menu"
            className="lg:hidden p-2 rounded-lg text-[#1B4332]/60 hover:text-[#1B4332] hover:bg-[#1B4332]/5"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="hidden lg:flex items-center gap-2 text-sm font-sans">
            <span className="text-[#1B4332]/40">Admin</span>
            <ChevronRight className="w-3 h-3 text-[#1B4332]/30" />
            <span className="text-[#1B4332] font-medium capitalize">
              {pathname === "/dashboard"
                ? "Ringkasan"
                : pathname.split("/").pop()?.replace(/-/g, " ") || "Dashboard"}
            </span>
          </nav>

          <div className="flex items-center gap-3 ml-auto">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-sans text-[#1B4332]/50">
                {user.role === "admin" ? "Administrator" : "User"}
              </div>
              <div className="text-sm font-semibold font-sans text-[#1B4332]">{user.name}</div>
            </div>
            <div className="w-9 h-9 bg-[#1B4332] rounded-full flex items-center justify-center text-white font-bold font-sans text-sm">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
