import { NextResponse } from "next/server";
import { getPortalApiContext } from "@/lib/supabase/api";

export async function GET() {
  const context = await getPortalApiContext();
  if (!context) return NextResponse.json({ error: "Silakan masuk." }, { status: 401 });
  if (context.profile.role !== "admin" || context.profile.account_status !== "active") {
    return NextResponse.json({ error: "Akses admin diperlukan." }, { status: 403 });
  }
  const { data, error } = await context.supabase.from("admin_activity_logs")
    .select("id,action,target_type,target_id,details,is_demo,created_at,admin:profiles!admin_activity_logs_admin_id_fkey(full_name,email)")
    .order("created_at", { ascending: false })
    .limit(200);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ logs: data || [] });
}
