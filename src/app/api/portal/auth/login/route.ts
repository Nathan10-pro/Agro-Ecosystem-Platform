import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (typeof body?.email !== "string" || typeof body?.password !== "string") {
    return NextResponse.json({ error: "Email dan password wajib diisi." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email: body.email.trim().toLowerCase(),
    password: body.password,
  });
  if (error || !data.user) {
    return NextResponse.json({ error: "Email atau password tidak sesuai." }, { status: 401 });
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id,email,full_name,role,account_status")
    .eq("id", data.user.id)
    .maybeSingle();
  if (profileError || !profile) {
    await supabase.auth.signOut();
    console.error("Portal profile lookup after login failed:", profileError?.message || "Profile not found");
    return NextResponse.json({ error: "Profil akun belum tersedia. Hubungi administrator MAN3." }, { status: 403 });
  }

  const destination = profile.role === "admin" ? "/admin/dashboard" : "/mitra/dashboard";
  return NextResponse.json({ success: true, user: profile, destination });
}
