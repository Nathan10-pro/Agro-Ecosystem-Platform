import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type PortalRole = "admin" | "mitra";
export type AccountStatus = "pending_review" | "active" | "rejected" | "suspended";

export interface PortalIdentity {
  id: string;
  email: string;
  full_name: string;
  role: PortalRole;
  account_status: AccountStatus;
  is_demo: boolean;
}

export async function getPortalIdentity(): Promise<PortalIdentity | null> {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return null;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id,email,full_name,role,account_status,is_demo")
    .eq("id", user.id)
    .maybeSingle();
  if (error) throw new Error(`Gagal membaca profil portal: ${error.message}`);
  if (!profile || !["admin", "mitra"].includes(profile.role)) return null;
  return profile as PortalIdentity;
}

export async function requirePortalRole(role: PortalRole): Promise<PortalIdentity> {
  const identity = await getPortalIdentity();
  if (!identity) redirect("/login");
  if (identity.role !== role) {
    redirect(identity.role === "admin" ? "/admin/dashboard" : "/mitra/dashboard");
  }
  return identity;
}
