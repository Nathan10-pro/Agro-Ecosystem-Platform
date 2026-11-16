import { NextRequest, NextResponse } from "next/server";
import { getPortalApiContext } from "@/lib/supabase/api";

async function adminContext() {
  const context = await getPortalApiContext();
  if (!context) return { error: NextResponse.json({ error: "Silakan masuk." }, { status: 401 }) };
  if (context.profile.role !== "admin" || context.profile.account_status !== "active") {
    return { error: NextResponse.json({ error: "Akses admin diperlukan." }, { status: 403 }) };
  }
  return { context };
}

export async function GET(request: NextRequest) {
  const auth = await adminContext();
  if (auth.error) return auth.error;
  const q = request.nextUrl.searchParams.get("q")?.trim().toLowerCase();
  const status = request.nextUrl.searchParams.get("status");
  const { data, error } = await auth.context!.supabase
    .from("partners")
    .select("id,profile_id,company_name,business_type,business_address,city,partnership_status,partnership_start_date,contract_start_date,contract_end_date,is_demo,profile:profiles(full_name,email,phone,account_status),orders(total_amount),partnership_events(event_type,notes,created_at)")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  let partners = data || [];
  if (status) partners = partners.filter((partner) => partner.partnership_status === status);
  if (q) partners = partners.filter((partner) => JSON.stringify(partner).toLowerCase().includes(q));
  return NextResponse.json({ partners });
}

export async function PUT(request: NextRequest) {
  const auth = await adminContext();
  if (auth.error) return auth.error;
  const body = await request.json().catch(() => null);
  if (body?.action === "edit" && typeof body.partner_id === "string" &&
      ["company_name", "business_type", "business_address", "city"].every((field) => typeof body[field] === "string")) {
    const { error } = await auth.context!.supabase.rpc("admin_update_partner_information", {
      partner_id_value: body.partner_id,
      company_name_value: body.company_name,
      business_type_value: body.business_type,
      address_value: body.business_address,
      city_value: body.city,
    });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true });
  }
  const allowed = ["active", "rejected", "suspended", "pending_review"];
  if (typeof body?.partner_id !== "string" || !allowed.includes(body?.status)) {
    return NextResponse.json({ error: "Perubahan status mitra tidak valid." }, { status: 400 });
  }
  const startDate = body.partnership_start_date || null;
  if (startDate && !/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    return NextResponse.json({ error: "Tanggal kemitraan tidak valid." }, { status: 400 });
  }
  const { error } = await auth.context!.supabase.rpc("admin_set_partner_status", {
    partner_id_value: body.partner_id,
    next_status: body.status,
    start_date: startDate,
    notes_value: typeof body.notes === "string" ? body.notes.slice(0, 1000) : "",
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
