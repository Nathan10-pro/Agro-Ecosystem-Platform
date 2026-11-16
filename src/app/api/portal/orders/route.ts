import { NextRequest, NextResponse } from "next/server";
import { getPortalApiContext } from "@/lib/supabase/api";

export async function GET() {
  const context = await getPortalApiContext();
  if (!context) return NextResponse.json({ error: "Silakan masuk." }, { status: 401 });
  if (context.profile.role !== "mitra") return NextResponse.json({ error: "Akses mitra diperlukan." }, { status: 403 });
  const { data, error } = await context.supabase
    .from("orders")
    .select("id,order_number,subtotal,total_amount,delivery_slot,order_status,is_demo,created_at,order_items(product_name_snapshot,quantity,line_total),order_tracking_events(status,notes,created_at)")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ orders: data || [] });
}

export async function POST(request: NextRequest) {
  const context = await getPortalApiContext();
  if (!context) return NextResponse.json({ error: "Silakan masuk." }, { status: 401 });
  if (context.profile.role !== "mitra") return NextResponse.json({ error: "Akses mitra diperlukan." }, { status: 403 });
  const body = await request.json().catch(() => null);
  if (!body || !Array.isArray(body.items) || body.items.length === 0 || body.items.length > 50 ||
      typeof body.delivery_slot !== "string" ||
      body.items.some((item: any) => typeof item?.product_id !== "string" ||
        !Number.isFinite(Number(item?.quantity)) || Number(item.quantity) <= 0)) {
    return NextResponse.json({ error: "Detail pesanan tidak valid." }, { status: 400 });
  }
  const { data, error } = await context.supabase.rpc("submit_partner_order", {
    items: body.items.map((item: any) => ({ product_id: item.product_id, quantity: Number(item.quantity) })),
    requested_slot: body.delivery_slot,
    order_notes: typeof body.notes === "string" ? body.notes.slice(0, 1000) : "",
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true, order_id: data }, { status: 201 });
}
