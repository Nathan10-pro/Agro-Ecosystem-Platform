import { redirect } from "next/navigation";
import PortalShell from "@/components/portal/PortalShell";
import { getPortalIdentity } from "@/lib/supabase/portal-auth";

export const dynamic = "force-dynamic";

const demoAdmin = {
  id: "demo-admin",
  email: "admin@demo.man3",
  full_name: "Administrator Demo MAN3",
  role: "admin" as const,
  account_status: "active" as const,
  is_demo: true,
};

export default async function AdminPortalLayout({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return <PortalShell user={demoAdmin}>{children}</PortalShell>;
  }
  const user = await getPortalIdentity();
  if (!user) redirect("/login");
  if (user.role !== "admin") redirect("/mitra/dashboard");
  if (user.account_status !== "active") redirect("/login?error=account-inactive");
  return <PortalShell user={user}>{children}</PortalShell>;
}
