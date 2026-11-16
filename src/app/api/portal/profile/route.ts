import { NextRequest, NextResponse } from "next/server";
import { getPortalApiContext } from "@/lib/supabase/api";

export async function PUT(request: NextRequest) {
  const context = await getPortalApiContext();
  if (!context) return NextResponse.json({ error: "Silakan masuk." }, { status: 401 });
  if (context.profile.role !== "mitra") return NextResponse.json({ error: "Akses mitra diperlukan." }, { status: 403 });
  const body = await request.json().catch(() => null);
  const fields = ["full_name", "phone", "company_name", "business_type", "business_address", "city"];
  if (!body || fields.some((field) => typeof body[field] !== "string")) {
    return NextResponse.json({ error: "Lengkapi semua informasi profil." }, { status: 400 });
  }
  const { error } = await context.supabase.rpc("update_partner_profile", {
    full_name_value: body.full_name,
    phone_value: body.phone,
    company_name_value: body.company_name,
    business_type_value: body.business_type,
    address_value: body.business_address,
    city_value: body.city,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true, message: "Profil berhasil diperbarui." });
}
