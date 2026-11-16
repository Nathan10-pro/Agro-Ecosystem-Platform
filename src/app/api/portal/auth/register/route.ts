import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const businessTypes = ["Restoran", "Hotel", "Catering", "Retail", "Distributor", "Other"];

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const fields = ["full_name", "company_name", "email", "phone", "business_type", "city", "password", "password_confirmation"];
  if (!body || fields.some((field) => typeof body[field] !== "string")) {
    return NextResponse.json({ error: "Lengkapi semua informasi pendaftaran." }, { status: 400 });
  }

  const fullName = body.full_name.trim();
  const companyName = body.company_name.trim();
  const email = body.email.trim().toLowerCase();
  const phone = body.phone.trim();
  const city = body.city.trim();
  const password = body.password;
  if (!fullName || fullName.length > 150 || !companyName || companyName.length > 200 ||
      phone.length < 6 || phone.length > 40 || !city || city.length > 100 ||
      !emailPattern.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Periksa kembali nama, perusahaan, email, telepon, dan kota." }, { status: 400 });
  }
  if (!businessTypes.includes(body.business_type)) {
    return NextResponse.json({ error: "Jenis usaha tidak valid." }, { status: 400 });
  }
  if (password !== body.password_confirmation) {
    return NextResponse.json({ error: "Konfirmasi password tidak cocok." }, { status: 400 });
  }
  if (password.length < 10 || password.length > 72 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    return NextResponse.json({ error: "Password harus 10-72 karakter dan memuat huruf besar, huruf kecil, serta angka." }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: new URL("/auth/callback", request.url).toString(),
      data: {
        full_name: fullName,
        company_name: companyName,
        phone,
        business_type: body.business_type,
        city,
      },
    },
  });
  if (error) {
    const duplicate = /already|registered|exists/i.test(error.message);
    return NextResponse.json(
      { error: duplicate ? "Email sudah terdaftar. Silakan masuk atau gunakan email lain." : `Pendaftaran gagal: ${error.message}` },
      { status: duplicate ? 409 : 400 }
    );
  }
  if (data.user?.identities?.length === 0) {
    return NextResponse.json({ error: "Email sudah terdaftar. Silakan masuk atau gunakan email lain." }, { status: 409 });
  }
  return NextResponse.json({
    success: true,
    message: "Registrasi berhasil. Akun Anda sedang menunggu verifikasi tim MAN3.",
  }, { status: 201 });
}
