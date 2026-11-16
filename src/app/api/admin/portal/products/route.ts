import { NextRequest, NextResponse } from "next/server";
import { getPortalApiContext } from "@/lib/supabase/api";

async function getAdmin() {
  const context = await getPortalApiContext();
  if (!context) return null;
  return context.profile.role === "admin" && context.profile.account_status === "active" ? context : null;
}

export async function GET() {
  const context = await getAdmin();
  if (!context) return NextResponse.json({ error: "Akses admin diperlukan." }, { status: 403 });
  const { data, error } = await context.supabase.from("products")
    .select("id,name,category,description,unit,price,available_stock,minimum_order_quantity,specifications,image_url,status,is_demo,updated_at")
    .neq("status", "archived")
    .order("name");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ products: data || [] });
}

export async function POST(request: NextRequest) {
  const context = await getAdmin();
  if (!context) return NextResponse.json({ error: "Akses admin diperlukan." }, { status: 403 });
  const body = await request.json().catch(() => null);
  if (!validProduct(body)) return NextResponse.json({ error: "Periksa nama, kategori, satuan, harga, stok minimum, dan spesifikasi produk." }, { status: 400 });
  const { data, error } = await context.supabase.from("products").insert({
    name: body.name.trim(),
    category: body.category.trim(),
    description: body.description.trim(),
    unit: body.unit.trim(),
    price: Number(body.price),
    available_stock: 0,
    minimum_order_quantity: Number(body.minimum_order_quantity),
    specifications: body.specifications,
    image_url: body.image_url?.trim() || null,
    status: body.status === "unavailable" ? "unavailable" : "available",
  }).select("id").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  if (Number(body.available_stock) > 0) {
    const stockResult = await context.supabase.rpc("admin_adjust_inventory", {
      product_id_value: data.id,
      new_stock: Number(body.available_stock),
      movement_notes: "Stok awal produk.",
    });
    if (stockResult.error) return NextResponse.json({ error: `Produk dibuat, tetapi stok awal gagal disimpan: ${stockResult.error.message}`, product_id: data.id }, { status: 500 });
  }
  return NextResponse.json({ success: true, product_id: data.id }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const context = await getAdmin();
  if (!context) return NextResponse.json({ error: "Akses admin diperlukan." }, { status: 403 });
  const body = await request.json().catch(() => null);
  if (typeof body?.id !== "string" || !validProduct(body)) {
    return NextResponse.json({ error: "Data produk tidak valid." }, { status: 400 });
  }
  const { error } = await context.supabase.from("products").update({
    name: body.name.trim(),
    category: body.category.trim(),
    description: body.description.trim(),
    unit: body.unit.trim(),
    price: Number(body.price),
    minimum_order_quantity: Number(body.minimum_order_quantity),
    specifications: body.specifications,
    image_url: body.image_url?.trim() || null,
    status: ["available", "unavailable", "archived"].includes(body.status) ? body.status : "available",
  }).eq("id", body.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  if (body.available_stock !== undefined) {
    const stock = Number(body.available_stock);
    if (!Number.isFinite(stock) || stock < 0) return NextResponse.json({ error: "Stok tidak boleh negatif." }, { status: 400 });
    const result = await context.supabase.rpc("admin_adjust_inventory", {
      product_id_value: body.id,
      new_stock: stock,
      movement_notes: typeof body.stock_notes === "string" ? body.stock_notes.slice(0, 1000) : "Penyesuaian stok.",
    });
    if (result.error) return NextResponse.json({ error: result.error.message }, { status: 400 });
  }
  return NextResponse.json({ success: true });
}

function validProduct(body: any) {
  return body && typeof body.name === "string" && body.name.trim().length > 0 && body.name.length <= 200 &&
    typeof body.category === "string" && body.category.trim().length > 0 &&
    typeof body.description === "string" && typeof body.unit === "string" && body.unit.trim().length > 0 &&
    Number.isFinite(Number(body.price)) && Number(body.price) >= 0 &&
    Number.isFinite(Number(body.minimum_order_quantity)) && Number(body.minimum_order_quantity) > 0 &&
    body.specifications && typeof body.specifications === "object" && !Array.isArray(body.specifications) &&
    (body.available_stock === undefined || (Number.isFinite(Number(body.available_stock)) && Number(body.available_stock) >= 0));
}
