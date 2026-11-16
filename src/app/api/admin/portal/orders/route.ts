import { NextRequest, NextResponse } from "next/server";
import { getPortalApiContext } from "@/lib/supabase/api";

export async function GET() {
  const context = await getPortalApiContext();
  if (!context) return NextResponse.json({ error: "Silakan masuk." }, { status: 401 });
  if (context.profile.role !== "admin" || context.profile.account_status !== "active") {
    return NextResponse.json({ error: "Akses admin diperlukan." }, { status: 403 });
  }
  const { data, error } = await context.supabase.from("orders")
    .select("id,order_number,subtotal,total_amount,delivery_slot,order_status,notes,is_demo,created_at,partner:partners(company_name,profile:profiles(full_name,email)),order_items(product_name_snapshot,quantity,line_total),order_tracking_events(status,notes,created_at)")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ orders: data || [] });
}

export async function PUT(request: NextRequest) {
  const context = await getPortalApiContext();
  if (!context) return NextResponse.json({ error: "Silakan masuk." }, { status: 401 });
  if (context.profile.role !== "admin" || context.profile.account_status !== "active") {
    return NextResponse.json({ error: "Akses admin diperlukan." }, { status: 403 });
  }
  const body = await request.json().catch(() => null);
  const statuses = ["submitted", "awaiting_confirmation", "confirmed", "preparing", "packed", "in_delivery", "delivered", "completed", "cancelled", "rejected"];
  if (typeof body?.order_id !== "string" || !statuses.includes(body?.status) ||
      (body.notes !== undefined && (typeof body.notes !== "string" || body.notes.length > 1000))) {
    return NextResponse.json({ error: "Pembaruan pesanan tidak valid." }, { status: 400 });
  }
  if (body.status === "cancelled" && !body.notes?.trim()) {
    return NextResponse.json({ error: "Alasan pembatalan wajib dicatat." }, { status: 400 });
  }
  const { error } = await context.supabase.rpc("admin_update_order_status", {
    order_id_value: body.order_id,
    next_status: body.status,
    status_notes: body.notes || "",
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
