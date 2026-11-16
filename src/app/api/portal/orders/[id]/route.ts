import { NextRequest, NextResponse } from "next/server";
import { getPortalApiContext } from "@/lib/supabase/api";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const context = await getPortalApiContext();
  if (!context) return NextResponse.json({ error: "Silakan masuk." }, { status: 401 });
  if (context.profile.role !== "mitra") return NextResponse.json({ error: "Akses mitra diperlukan." }, { status: 403 });
  const { id } = await params;
  const { data, error } = await context.supabase.from("orders")
    .select("id,order_number,subtotal,tax_amount,total_amount,delivery_slot,order_status,is_demo,notes,created_at,order_items(product_name_snapshot,unit_price_snapshot,quantity,line_total),order_tracking_events(status,notes,created_at)")
    .eq("id", id).maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Pesanan tidak ditemukan." }, { status: 404 });
  return NextResponse.json({ order: data });
}
