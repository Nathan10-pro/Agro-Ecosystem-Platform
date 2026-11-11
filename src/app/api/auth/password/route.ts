import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, hashPassword, verifyPassword } from "@/lib/auth";
import { db } from "@/lib/db";

export async function PUT(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Sesi tidak valid. Silakan masuk kembali." }, { status: 401 });
  }

  const body = await req.json();
  const currentPassword = body?.currentPassword;
  const newPassword = body?.newPassword;
  if (typeof currentPassword !== "string" || typeof newPassword !== "string") {
    return NextResponse.json({ error: "Isi password saat ini dan password baru." }, { status: 400 });
  }
  if (newPassword.length < 6 || newPassword.length > 72) {
    return NextResponse.json({ error: "Password baru harus berisi 6-72 karakter." }, { status: 400 });
  }

  const account = await db.table("Users").get(user.id);
  if (!account || !(await verifyPassword(currentPassword, account.password_hash || ""))) {
    return NextResponse.json({ error: "Password saat ini tidak sesuai." }, { status: 400 });
  }

  await db.table("Users").update(user.id, {
    password_hash: await hashPassword(newPassword),
  });

  return NextResponse.json({ success: true, message: "Password berhasil diperbarui." });
}
