import { redirect } from "next/navigation";
import PortalShell from "@/components/portal/PortalShell";
import { getPortalIdentity } from "@/lib/supabase/portal-auth";

export const dynamic = "force-dynamic";

const demoPartner = {
  id: "demo-mitra",
  email: "mitra@demo.man3",
  full_name: "Mitra Demo MAN3",
  role: "mitra" as const,
  account_status: "active" as const,
  is_demo: true,
};

export default async function MitraLayout({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return <PortalShell user={demoPartner}>{children}</PortalShell>;
  }
  const user = await getPortalIdentity();
  if (!user) redirect("/login");
  if (user.role !== "mitra") redirect("/admin/dashboard");
  return <PortalShell user={user}>{children}</PortalShell>;
}
