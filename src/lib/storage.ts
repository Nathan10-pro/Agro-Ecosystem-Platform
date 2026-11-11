import fs from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { callAppsScript } from "@/lib/db";

export interface SaveFileResult {
  success: boolean;
  filePath?: string;
  url?: string;
  error?: string;
}

const ALLOWED_TYPES: Record<string, { extension: string; signature: (buffer: Buffer) => boolean }> = {
  "image/jpeg": { extension: ".jpg", signature: (buffer) => buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff },
  "image/jpg": { extension: ".jpg", signature: (buffer) => buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff },
  "image/png": {
    extension: ".png",
    signature: (buffer) => buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
  },
  "image/webp": {
    extension: ".webp",
    signature: (buffer) =>
      buffer.toString("ascii", 0, 4) === "RIFF" && buffer.toString("ascii", 8, 12) === "WEBP",
  },
};
const MAX_LOCAL_SIZE_BYTES = 5 * 1024 * 1024;
const MAX_DRIVE_SIZE_BYTES = 3 * 1024 * 1024;

/**
 * Menyimpan gambar ke Google Drive melalui Apps Script saat database cloud aktif.
 * Development lokal tanpa Apps Script tetap menggunakan public/uploads/.
 */
export async function saveFile(
  fileBuffer: Buffer,
  _originalFilename: string,
  mimeType: string
): Promise<SaveFileResult> {
  const type = ALLOWED_TYPES[mimeType.toLowerCase()];
  if (!type) {
    return {
      success: false,
      error: "Format file tidak didukung. Harap unggah gambar JPG, PNG, atau WEBP.",
    };
  }

  if (!type.signature(fileBuffer)) {
    return {
      success: false,
      error: "Isi file tidak sesuai dengan format gambar yang dipilih.",
    };
  }

  const appsScriptUrl = process.env.APPS_SCRIPT_URL;
  const appsScriptSecret = process.env.APPS_SCRIPT_SECRET;
  if (Boolean(appsScriptUrl) !== Boolean(appsScriptSecret)) {
    return {
      success: false,
      error: "APPS_SCRIPT_URL dan APPS_SCRIPT_SECRET harus dikonfigurasi bersama.",
    };
  }

  const extension = type.extension;
  const uniqueName = `upload-${randomUUID()}${extension}`;

  if (appsScriptUrl && appsScriptSecret) {
    if (fileBuffer.length > MAX_DRIVE_SIZE_BYTES) {
      return {
        success: false,
        error: "Ukuran gambar untuk Google Drive maksimal 3 MB.",
      };
    }

    try {
      const result = await callAppsScript("upload", "Drive", {
        fileName: uniqueName,
        mimeType: mimeType.toLowerCase() === "image/jpg" ? "image/jpeg" : mimeType.toLowerCase(),
        content: fileBuffer.toString("base64"),
      });
      const data = result.data as { id?: unknown; url?: unknown } | undefined;
      if (!data || typeof data.id !== "string" || typeof data.url !== "string") {
        throw new Error("Respons upload Google Drive tidak valid.");
      }

      return { success: true, filePath: data.id, url: data.url };
    } catch (err) {
      console.error("Gagal menyimpan file ke Google Drive:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Gagal menyimpan file ke Google Drive.",
      };
    }
  }

  if (process.env.NODE_ENV === "production") {
    return {
      success: false,
      error: "Upload production memerlukan konfigurasi Google Apps Script dan Google Drive.",
    };
  }
  if (fileBuffer.length > MAX_LOCAL_SIZE_BYTES) {
    return {
      success: false,
      error: "Ukuran file melebihi batas maksimal (5 MB).",
    };
  }

  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fullPath = path.join(uploadDir, uniqueName);
    fs.writeFileSync(fullPath, fileBuffer);

    return {
      success: true,
      filePath: fullPath,
      url: `/uploads/${uniqueName}`,
    };
  } catch (err) {
    console.error("Gagal menyimpan file:", err);
    return {
      success: false,
      error: "Gagal menyimpan file ke penyimpanan lokal.",
    };
  }
}

/**
 * Menghapus gambar dari penyimpanan lokal atau Google Drive.
 */
export async function deleteFile(relativeUrl: string): Promise<boolean> {
  if (relativeUrl.startsWith("https://drive.google.com/")) {
    const url = new URL(relativeUrl);
    const fileId = url.searchParams.get("id");
    if (!fileId || !/^[A-Za-z0-9_-]+$/.test(fileId)) return false;
    await callAppsScript("deleteFile", "Drive", { fileId });
    return true;
  }

  try {
    if (!relativeUrl || !relativeUrl.startsWith("/uploads/")) return false;

    const filename = path.basename(relativeUrl);
    const fullPath = path.join(process.cwd(), "public", "uploads", filename);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      return true;
    }
    return false;
  } catch (err) {
    console.error("Gagal menghapus file:", err);
    return false;
  }
}
