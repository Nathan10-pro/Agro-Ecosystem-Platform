import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getPortalApiContext() {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return null;

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id,email,full_name,phone,role,account_status,is_demo")
    .eq("id", user.id)
    .maybeSingle();
  if (error) throw new Error(`Gagal membaca profil: ${error.message}`);
  if (!profile) return null;
  return { supabase, user, profile };
}
