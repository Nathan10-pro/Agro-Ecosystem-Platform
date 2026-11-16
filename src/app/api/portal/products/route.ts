import { NextResponse } from "next/server";
import { getPortalApiContext } from "@/lib/supabase/api";

export async function GET() {
  const context = await getPortalApiContext();
  if (!context) return NextResponse.json({ error: "Silakan masuk." }, { status: 401 });
  if (context.profile.role !== "mitra") return NextResponse.json({ error: "Akses mitra diperlukan." }, { status: 403 });
  const { data, error } = await context.supabase
    .from("products")
    .select("id,name,category,description,unit,price,available_stock,minimum_order_quantity,specifications,image_url,status")
    .eq("status", "available")
    .order("category")
    .order("name");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ products: data || [] });
}
