import { NextResponse } from "next/server";
import { getPortalApiContext } from "@/lib/supabase/api";

export async function GET() {
  const context = await getPortalApiContext();
  if (!context) return NextResponse.json({ error: "Silakan masuk untuk melihat portal." }, { status: 401 });
  if (context.profile.role !== "mitra") return NextResponse.json({ error: "Akses mitra diperlukan." }, { status: 403 });

  const { data: partner, error: partnerError } = await context.supabase
    .from("partners")
    .select("id,company_name,business_type,business_address,city,partnership_status,partnership_start_date,contract_start_date,contract_end_date,partnership_events(event_type,notes,created_at)")
    .eq("profile_id", context.user.id)
    .maybeSingle();
  if (partnerError) return NextResponse.json({ error: partnerError.message }, { status: 500 });

  const { data: orders, error: ordersError } = await context.supabase
    .from("orders")
    .select("id,order_number,subtotal,total_amount,delivery_slot,order_status,is_demo,created_at,order_items(product_name_snapshot,quantity,line_total),order_tracking_events(status,notes,created_at)")
    .order("created_at", { ascending: false });
  if (ordersError) return NextResponse.json({ error: ordersError.message }, { status: 500 });

  const rows = orders || [];
  const done = ["completed", "cancelled", "rejected"];
  return NextResponse.json({
    profile: context.profile,
    partner,
    orders: rows,
    metrics: {
      total_orders: rows.length,
      active_orders: rows.filter((order) => !done.includes(order.order_status)).length,
      total_value: rows.reduce((sum, order) => sum + Number(order.total_amount), 0),
    },
  });
}
