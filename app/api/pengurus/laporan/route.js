import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "laporan.json");

async function readData() {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw || "[]");
  } catch {
    return [];
  }
}

async function writeData(data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// GET /api/pengurus/laporan  -> list laporan
export async function GET() {
  const data = await readData();
  return NextResponse.json({ ok: true, laporan: data });
}

// POST /api/pengurus/laporan -> tambah laporan
export async function POST(req) {
  try {
    const body = await req.json();
    const { judul, isi, tanggal } = body;

    if (!judul || !isi) {
      return NextResponse.json(
        { ok: false, message: "Judul dan isi wajib diisi." },
        { status: 400 }
      );
    }

    const data = await readData();
    const now = new Date().toISOString();

    const newItem = {
      id: crypto.randomUUID(),
      judul,
      isi,
      tanggal: tanggal || now.slice(0, 10),
      createdAt: now,
      updatedAt: now
    };

    data.unshift(newItem);
    await writeData(data);

    return NextResponse.json({ ok: true, laporan: newItem });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Bad request" },
      { status: 400 }
    );
  }
}
