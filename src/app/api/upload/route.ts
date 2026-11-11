import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { saveFile } from "@/lib/storage";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Akses ditolak: Hanya admin yang dapat mengunggah file." }, { status: 403 });
    }

    const formData = await req.formData();
    const formFile = formData.get("file");

    if (!(formFile instanceof File)) {
      return NextResponse.json({ error: "Tidak ada file yang diunggah." }, { status: 400 });
    }
    const hasAppsScriptConfig = Boolean(process.env.APPS_SCRIPT_URL && process.env.APPS_SCRIPT_SECRET);
    const maxSize = hasAppsScriptConfig ? 3 * 1024 * 1024 : 5 * 1024 * 1024;
    if (formFile.size > maxSize) {
      return NextResponse.json({
        error: hasAppsScriptConfig
          ? "Ukuran gambar untuk Google Drive maksimal 3 MB."
          : "Ukuran file maksimal 5 MB.",
      }, { status: 400 });
    }

    const arrayBuffer = await formFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await saveFile(buffer, formFile.name, formFile.type);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      url: result.url,
      message: hasAppsScriptConfig
        ? "Gambar berhasil diunggah ke Google Drive."
        : "Gambar berhasil diunggah ke penyimpanan lokal.",
    });
  } catch (err: unknown) {
    console.error("Upload handler error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Gagal memproses unggahan berkas." },
      { status: 500 }
    );
  }
}
