import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    customer_name,
    company_name,
    email,
    phone,
    delivery_slot,
    items,
    notes,
  } = body;

  if (typeof customer_name !== "string" || !customer_name.trim()) {
    return NextResponse.json({ error: "Nama pelanggan wajib diisi." }, { status: 400 });
  }
  if (typeof email !== "string" || !isValidEmail(email.trim())) {
    return NextResponse.json({ error: "Email tidak valid." }, { status: 400 });
  }
  if (typeof phone !== "string" || !phone.trim()) {
    return NextResponse.json({ error: "Nomor telepon wajib diisi." }, { status: 400 });
  }
  if (typeof delivery_slot !== "string" || !["subuh", "siang"].includes(delivery_slot)) {
    return NextResponse.json({ error: "Slot pengiriman tidak valid." }, { status: 400 });
  }
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: "Minimal pilih satu produk." }, { status: 400 });
  }

  let normalizedItems;
  try {
    normalizedItems = items.map((item: any) => {
      const quantity = Number(item.quantity ?? 0);
      const price = Number(item.price ?? 0);
      if (!item || typeof item.name !== "string" || !item.name.trim()) {
        throw new Error("Detail produk tidak valid.");
      }
      if (!Number.isFinite(quantity) || quantity <= 0) {
        throw new Error("Kuantitas produk harus lebih dari 0.");
      }
      if (!Number.isFinite(price) || price < 0) {
        throw new Error("Harga produk tidak valid.");
      }
      return {
        id: String(item.id || item.name),
        name: String(item.name).trim(),
        spec: item.spec ? String(item.spec).trim() : "",
        price,
        quantity,
        unit: item.unit ? String(item.unit).trim() : "pcs",
      };
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Detail produk tidak valid.",
    }, { status: 400 });
  }

  const subtotal = normalizedItems.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.11;
  const total = subtotal + tax;

  const order = await db.table("Orders").create({
    customer_name: customer_name.trim(),
    company_name: company_name && typeof company_name === "string" ? company_name.trim() : "",
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    delivery_slot,
    items: normalizedItems,
    subtotal,
    tax,
    total,
    notes: typeof notes === "string" ? String(notes).trim() : "",
    status: "pending",
  });

  return NextResponse.json({
    success: true,
    message: "Pemesanan berhasil dikirim.",
    order,
  });
}
