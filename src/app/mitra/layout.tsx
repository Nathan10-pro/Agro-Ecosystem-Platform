import { redirect } from "next/navigation";
import PortalShell from "@/components/portal/PortalShell";
import { getPortalIdentity } from "@/lib/supabase/portal-auth";

export const dynamic = "force-dynamic";

export default async function MitraLayout({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return <SetupRequired />;
  }
  const user = await getPortalIdentity();
  if (!user) redirect("/login");
  if (user.role !== "mitra") redirect("/admin/dashboard");
  return <PortalShell user={user}>{children}</PortalShell>;
}

function SetupRequired() {
  return <section className="mx-auto max-w-3xl px-5 py-20"><h1 className="font-serif text-3xl text-[#0F3D2E]">Portal mitra belum dikonfigurasi</h1><p className="mt-3 text-sm text-[#536158]">Tambahkan NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY, lalu jalankan migration Supabase. Portal tidak menggunakan data simulasi atau database lokal.</p></section>;
}
