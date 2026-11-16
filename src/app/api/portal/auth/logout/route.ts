import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error("Portal logout failed:", error.message);
    return NextResponse.json({ error: "Sesi tidak dapat ditutup. Coba lagi." }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
