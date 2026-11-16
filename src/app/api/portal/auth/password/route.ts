import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const password = body?.password;
  if (typeof password !== "string" || password.length < 10 || password.length > 72 ||
      !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    return NextResponse.json({ error: "Password harus 10-72 karakter dan memuat huruf besar, huruf kecil, serta angka." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Tautan reset tidak valid atau sudah kedaluwarsa." }, { status: 401 });
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return NextResponse.json({ error: `Password gagal diperbarui: ${error.message}` }, { status: 400 });
  return NextResponse.json({ success: true, message: "Password berhasil diperbarui." });
}
