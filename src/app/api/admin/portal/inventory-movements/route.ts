import { NextResponse } from "next/server";
import { getPortalApiContext } from "@/lib/supabase/api";

export async function GET() {
  const context = await getPortalApiContext();
  if (!context) return NextResponse.json({ error: "Silakan masuk." }, { status: 401 });
  if (context.profile.role !== "admin" || context.profile.account_status !== "active") {
    return NextResponse.json({ error: "Akses admin diperlukan." }, { status: 403 });
  }
  const { data, error } = await context.supabase.from("inventory_movements")
    .select("id,product_id,movement_type,quantity,reference_order_id,notes,is_demo,created_at,product:products(name)")
    .order("created_at", { ascending: false })
    .limit(500);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ movements: data || [] });
}
