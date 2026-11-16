import { redirect } from "next/navigation";
import PortalShell from "@/components/portal/PortalShell";
import { getPortalIdentity } from "@/lib/supabase/portal-auth";

export const dynamic = "force-dynamic";

export default async function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return <section className="mx-auto max-w-3xl px-5 py-20"><h1 className="font-serif text-3xl text-[#0F3D2E]">Portal admin belum dikonfigurasi</h1><p className="mt-3 text-sm text-[#536158]">Tambahkan konfigurasi Supabase dan terapkan migration sebelum menggunakan manajemen B2B.</p></section>;
  }
  const user = await getPortalIdentity();
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/mitra/dashboard");
  if (user.account_status !== "active") redirect("/login?error=account-inactive");
  return <PortalShell user={user}>{children}</PortalShell>;
}
