import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import {
  Users,
  Newspaper,
  Shield,
  ClipboardList,
  AlertTriangle,
  ArrowRight,
  Clock,
} from "lucide-react";
import PasswordChangeForm from "@/components/dashboard/PasswordChangeForm";

async function getStats() {
  const [users, news, roles, orders] = await Promise.all([
    db.table("Users").list(),
    db.table("News").list(),
    db.table("Roles").list(),
    db.table("Orders").list(),
  ]);

  const publishedNews = news.filter((n: any) => n.status === "published");
  const activeUsers = users.filter((u: any) => u.status === "active");
  const pendingOrders = orders.filter((o: any) => o.status === "pending");
  const recentNews = [...news]
    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);
  const recentOrders = [...orders]
    .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return { users, news, roles, orders, publishedNews, activeUsers, pendingOrders, recentNews, recentOrders };
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const { users, news, roles, orders, publishedNews, activeUsers, pendingOrders, recentNews, recentOrders } = await getStats();

  const stats = [
    {
      label: "Total Pengguna",
      value: users.length,
      sub: `${activeUsers.length} aktif`,
      icon: Users,
      color: "bg-[#1B4332]",
      link: "/dashboard/users",
    },
    {
      label: "Total Berita",
      value: news.length,
      sub: `${publishedNews.length} dipublikasikan`,
      icon: Newspaper,
      color: "bg-[#885039]",
      link: "/dashboard/berita",
    },
    {
      label: "Pemesanan",
      value: orders.length,
      sub: `${pendingOrders.length} menunggu`,
      icon: ClipboardList,
      color: "bg-[#2D6A4F]",
      link: "/dashboard/pemesanan",
    },
    {
      label: "Role Tersedia",
      value: roles.length,
      sub: "Kelola akses pengguna",
      icon: Shield,
      color: "bg-[#52B788]",
      link: "/dashboard/roles",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="font-serif text-2xl lg:text-3xl font-bold text-[#1B4332]">
          Selamat datang, {user?.name?.split(" ")[0]} 👋
        </h1>
        <p className="mt-1 text-sm font-sans text-[#1B4332]/60">
          Ringkasan aktivitas sistem MAN3 hari ini.
        </p>
      </div>

      {/* Warning: change default password */}
      <div className="flex items-start gap-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
        <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold font-sans text-amber-800">
            Keamanan Penting
          </p>
          <p className="text-sm font-sans text-amber-700 mt-0.5">
            Password default admin (<code className="bg-amber-100 px-1 rounded text-xs">123456</code>) harus diganti sebelum website dipublikasikan.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.link}
              className="bg-white rounded-2xl p-5 shadow-sm shadow-[#1B4332]/5 border border-[#1B4332]/5 hover:shadow-md hover:border-[#52B788]/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`${s.color} w-10 h-10 rounded-xl flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <ArrowRight className="w-4 h-4 text-[#1B4332]/20 group-hover:text-[#52B788] transition" />
              </div>
              <div className="font-serif text-3xl font-bold text-[#1B4332]">{s.value}</div>
              <div className="text-sm font-semibold font-sans text-[#1B4332] mt-1">{s.label}</div>
              <div className="text-xs font-sans text-[#1B4332]/50 mt-0.5">{s.sub}</div>
            </Link>
          );
        })}
      </div>

      <PasswordChangeForm />

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="bg-white rounded-2xl shadow-sm shadow-[#1B4332]/5 border border-[#1B4332]/5 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1B4332]/5">
            <h2 className="font-serif text-lg font-bold text-[#1B4332]">Berita Terbaru</h2>
            <Link
              href="/dashboard/berita"
              className="text-sm font-sans font-medium text-[#52B788] hover:underline flex items-center gap-1"
            >
              Lihat semua <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-[#1B4332]/5">
            {recentNews.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm font-sans text-[#1B4332]/40">
                Belum ada berita. Buat artikel pertama Anda!
              </div>
            ) : (
              recentNews.map((n: any) => (
                <div key={n.id} className="px-6 py-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold font-sans text-[#1B4332] truncate">
                      {n.title}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium font-sans ${
                          n.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {n.status === "published" ? "Dipublikasikan" : "Draft"}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-sans text-[#1B4332]/40">
                        <Clock className="w-3 h-3" />
                        {new Date(n.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="/dashboard/berita"
                    className="text-xs font-sans text-[#52B788] hover:underline flex-shrink-0"
                  >
                    Edit
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm shadow-[#1B4332]/5 border border-[#1B4332]/5 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#1B4332]/5">
            <h2 className="font-serif text-lg font-bold text-[#1B4332]">Pemesanan Terbaru</h2>
            <Link
              href="/dashboard/pemesanan"
              className="text-sm font-sans font-medium text-[#52B788] hover:underline flex items-center gap-1"
            >
              Lihat semua <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-[#1B4332]/5">
            {recentOrders.length === 0 ? (
              <div className="px-6 py-10 text-center text-sm font-sans text-[#1B4332]/40">
                Belum ada pesanan masuk.
              </div>
            ) : (
              recentOrders.map((order: any) => (
                <div key={order.id} className="px-6 py-4 flex items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold font-sans text-[#1B4332] truncate">
                      {order.customer_name || order.company_name || "Pelanggan baru"}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium font-sans ${
                          order.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : order.status === "pending"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {order.status === "pending"
                          ? "Menunggu"
                          : order.status === "confirmed"
                            ? "Dikonfirmasi"
                            : order.status}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-sans text-[#1B4332]/40">
                        <Clock className="w-3 h-3" />
                        {new Date(order.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-xs font-sans text-[#1B4332]/70">
                    <div>Rp {Number(order.total || 0).toLocaleString("id-ID")}</div>
                    <div>{order.delivery_slot || "-"}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
