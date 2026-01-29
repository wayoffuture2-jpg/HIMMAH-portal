import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs"; // penting: supaya bisa pakai fs

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { ok: false, message: "File belum dipilih." },
        { status: 400 }
      );
    }

    // validasi tipe file (PDF/DOC/DOCX)
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowed.includes(file.type)) {
      return NextResponse.json(
        { ok: false, message: "Format file harus PDF/DOC/DOCX." },
        { status: 400 }
      );
    }

    // batas ukuran file (misal 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { ok: false, message: "Ukuran file maksimal 5MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filename = `${Date.now()}_${safeName}`;
    const filepath = path.join(uploadDir, filename);

    fs.writeFileSync(filepath, buffer);

    return NextResponse.json(
      { ok: true, url: `/uploads/${filename}`, filename },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { ok: false, message: "Upload gagal." },
      { status: 500 }
    );
  }
}
