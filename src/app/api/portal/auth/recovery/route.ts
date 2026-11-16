import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (typeof body?.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) {
    return NextResponse.json({ error: "Masukkan alamat email yang valid." }, { status: 400 });
  }
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.resetPasswordForEmail(body.email.trim().toLowerCase(), {
    redirectTo: new URL("/auth/callback?next=/reset-password", request.url).toString(),
  });
  if (error) {
    console.error("Supabase password recovery request failed:", error.message);
    return NextResponse.json({ error: `Permintaan reset gagal. Periksa konfigurasi email Supabase: ${error.message}` }, { status: 503 });
  }
  return NextResponse.json({ success: true, message: "Jika email terdaftar, instruksi reset akan dikirim melalui email." });
}
