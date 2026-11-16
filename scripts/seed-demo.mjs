import { createClient } from "@supabase/supabase-js";
import { loadEnvConfig } from "next/env";

loadEnvConfig(process.cwd(), true);

if (process.env.NODE_ENV !== "development" || process.env.VERCEL === "1") {
  throw new Error("Seed demo ditolak di production atau Vercel.");
}
if (process.env.MAN3_DEMO_SEED !== "true") {
  throw new Error("Set MAN3_DEMO_SEED=true untuk mengaktifkan seed demo lokal.");
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminPassword = process.env.MAN3_DEMO_ADMIN_PASSWORD;
const partnerPassword = process.env.MAN3_DEMO_MITRA_PASSWORD;
if (!url || !serviceKey || !adminPassword || !partnerPassword) {
  throw new Error("Seed demo memerlukan Supabase URL, service-role key, dan kedua password akun demo di environment lokal.");
}

const supabase = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});
const DEMO_PRODUCT_IDS = [
  "10000000-0000-4000-8000-000000000001",
  "10000000-0000-4000-8000-000000000002",
];
const DEMO_ORDER_IDS = [
  "20000000-0000-4000-8000-000000000001",
  "20000000-0000-4000-8000-000000000002",
  "20000000-0000-4000-8000-000000000003",
];

function assertNoError(operation, error) {
  if (error) throw new Error(`${operation}: ${error.message}`);
}

async function ensureUser(email, password, metadata) {
  const { data: listed, error: listError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1000 });
  assertNoError(`Mencari ${email}`, listError);
  const existing = listed.users.find((user) => user.email?.toLowerCase() === email);
  if (existing) {
    const { data, error } = await supabase.auth.admin.updateUserById(existing.id, {
      password,
      email_confirm: true,
      user_metadata: metadata,
    });
    assertNoError(`Memperbarui akun ${email}`, error);
    return data.user;
  }
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: metadata,
  });
  assertNoError(`Membuat akun ${email}`, error);
  return data.user;
}

async function run() {
  const adminUser = await ensureUser("admin@gmail.com", adminPassword, { full_name: "Admin Demo MAN3" });
  const partnerUser = await ensureUser("mitra@gmail.com", partnerPassword, {
    full_name: "Mitra Demo MAN3",
    company_name: "[DEMO] Restoran Mitra MAN3",
    phone: "080000000001",
    business_type: "Restoran",
    city: "Bandung",
  });

  const { error: profileError } = await supabase.from("profiles").upsert([
    { id: adminUser.id, full_name: "Admin Demo MAN3", email: "admin@gmail.com", role: "admin", account_status: "active", is_demo: true },
    { id: partnerUser.id, full_name: "Mitra Demo MAN3", email: "mitra@gmail.com", phone: "080000000001", role: "mitra", account_status: "active", approved_at: new Date().toISOString(), is_demo: true },
  ], { onConflict: "id" });
  assertNoError("Menyimpan profil demo", profileError);

  const { data: partner, error: partnerError } = await supabase.from("partners").upsert({
    profile_id: partnerUser.id,
    company_name: "[DEMO] Restoran Mitra MAN3",
    business_type: "Restoran",
    city: "Bandung",
    partnership_status: "active",
    partnership_start_date: "2025-01-15",
    is_demo: true,
  }, { onConflict: "profile_id" }).select("id").single();
  assertNoError("Menyimpan mitra demo", partnerError);
  const { error: clearPartnershipEventsError } = await supabase.from("partnership_events").delete().eq("partner_id", partner.id).eq("is_demo", true);
  assertNoError("Membersihkan riwayat kemitraan demo", clearPartnershipEventsError);
  const { error: partnershipEventError } = await supabase.from("partnership_events").insert({
    partner_id: partner.id,
    event_type: "active",
    notes: "[DEMO] Kemitraan contoh disetujui untuk demonstrasi portal.",
    created_by: adminUser.id,
    is_demo: true,
  });
  assertNoError("Menyimpan riwayat kemitraan demo", partnershipEventError);

  const products = [
    { id: DEMO_PRODUCT_IDS[0], name: "[DEMO] Daging sapi pasture-fed", category: "Daging Sapi", description: "Produk contoh untuk demonstrasi portal; bukan ketersediaan operasional MAN3.", unit: "kg", price: 245000, available_stock: 42, minimum_order_quantity: 1, specifications: { Catatan: "Data demo" }, status: "available", is_demo: true },
    { id: DEMO_PRODUCT_IDS[1], name: "[DEMO] Paket sayuran segar", category: "Sayuran", description: "Produk contoh untuk demonstrasi portal; bukan ketersediaan operasional MAN3.", unit: "paket", price: 85000, available_stock: 20, minimum_order_quantity: 1, specifications: { Catatan: "Data demo" }, status: "available", is_demo: true },
  ];
  const { error: productError } = await supabase.from("products").upsert(products, { onConflict: "id" });
  assertNoError("Menyimpan produk demo", productError);

  const { error: deleteEventsError } = await supabase.from("order_tracking_events").delete().in("order_id", DEMO_ORDER_IDS);
  assertNoError("Membersihkan timeline demo", deleteEventsError);
  const { error: deleteItemsError } = await supabase.from("order_items").delete().in("order_id", DEMO_ORDER_IDS);
  assertNoError("Membersihkan item pesanan demo", deleteItemsError);
  const { error: deleteOrdersError } = await supabase.from("orders").delete().in("id", DEMO_ORDER_IDS);
  assertNoError("Membersihkan pesanan demo", deleteOrdersError);
  const { error: deleteMovementsError } = await supabase.from("inventory_movements").delete().in("product_id", DEMO_PRODUCT_IDS).eq("is_demo", true);
  assertNoError("Membersihkan pergerakan stok demo", deleteMovementsError);

  const orderSpecs = [
    { id: DEMO_ORDER_IDS[0], order_number: "DEMO-MAN3-001", status: "submitted", product: 0, quantity: 2, daysAgo: 1 },
    { id: DEMO_ORDER_IDS[1], order_number: "DEMO-MAN3-002", status: "confirmed", product: 1, quantity: 5, daysAgo: 4 },
    { id: DEMO_ORDER_IDS[2], order_number: "DEMO-MAN3-003", status: "in_delivery", product: 0, quantity: 3, daysAgo: 7 },
  ];
  const orderRows = orderSpecs.map((item) => {
    const product = products[item.product];
    const subtotal = product.price * item.quantity;
    const created = new Date(Date.now() - item.daysAgo * 86400000).toISOString();
    return {
      id: item.id, order_number: item.order_number, partner_id: partner.id,
      subtotal, tax_rate: 0.11, tax_amount: Math.round(subtotal * 0.11), delivery_cost: 0,
      total_amount: Math.round(subtotal * 1.11), delivery_slot: "subuh",
      order_status: item.status, notes: "[DEMO] Catatan pesanan contoh.",
      is_demo: true, created_at: created, updated_at: created,
    };
  });
  const { error: orderError } = await supabase.from("orders").insert(orderRows);
  assertNoError("Menyimpan pesanan demo", orderError);

  const itemRows = orderSpecs.map((item, index) => {
    const product = products[item.product];
    return {
      id: `30000000-0000-4000-8000-00000000000${index + 1}`,
      order_id: item.id, product_id: product.id, product_name_snapshot: product.name,
      unit_price_snapshot: product.price, quantity: item.quantity, line_total: product.price * item.quantity,
    };
  });
  const { error: itemError } = await supabase.from("order_items").insert(itemRows);
  assertNoError("Menyimpan item demo", itemError);

  const timeline = [
    { order: 0, status: "submitted", note: "[DEMO] Pesanan contoh diajukan." },
    { order: 1, status: "submitted", note: "[DEMO] Pesanan contoh diajukan." },
    { order: 1, status: "awaiting_confirmation", note: "[DEMO] Menunggu konfirmasi." },
    { order: 1, status: "confirmed", note: "[DEMO] Pesanan contoh dikonfirmasi." },
    { order: 2, status: "submitted", note: "[DEMO] Pesanan contoh diajukan." },
    { order: 2, status: "awaiting_confirmation", note: "[DEMO] Menunggu konfirmasi." },
    { order: 2, status: "confirmed", note: "[DEMO] Pesanan contoh dikonfirmasi." },
    { order: 2, status: "preparing", note: "[DEMO] Pesanan contoh disiapkan." },
    { order: 2, status: "packed", note: "[DEMO] Pesanan contoh dikemas." },
    { order: 2, status: "in_delivery", note: "[DEMO] Pesanan contoh dalam pengiriman." },
  ];
  const tracking = timeline.map((event, index) => ({
    order_id: orderSpecs[event.order].id,
    status: event.status,
    notes: event.note,
    updated_by: adminUser.id,
    created_at: new Date(Date.now() - (10 - index) * 3600000).toISOString(),
  }));
  const { error: trackingError } = await supabase.from("order_tracking_events").insert(tracking);
  assertNoError("Menyimpan timeline demo", trackingError);

  const movements = [
    { product_id: DEMO_PRODUCT_IDS[0], movement_type: "restock", quantity: 45, notes: "[DEMO] Stok awal contoh.", is_demo: true, created_by: adminUser.id },
    { product_id: DEMO_PRODUCT_IDS[0], movement_type: "order_confirmation", quantity: -3, reference_order_id: DEMO_ORDER_IDS[2], notes: "[DEMO] Pengurangan stok pesanan contoh.", is_demo: true, created_by: adminUser.id },
    { product_id: DEMO_PRODUCT_IDS[1], movement_type: "restock", quantity: 25, notes: "[DEMO] Stok awal contoh.", is_demo: true, created_by: adminUser.id },
    { product_id: DEMO_PRODUCT_IDS[1], movement_type: "order_confirmation", quantity: -5, reference_order_id: DEMO_ORDER_IDS[1], notes: "[DEMO] Pengurangan stok pesanan contoh.", is_demo: true, created_by: adminUser.id },
  ];
  const { error: movementError } = await supabase.from("inventory_movements").insert(movements);
  assertNoError("Menyimpan pergerakan stok demo", movementError);

  console.log("Seed demo lokal selesai. Seluruh akun dan contoh operasional ditandai sebagai data demo.");
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
