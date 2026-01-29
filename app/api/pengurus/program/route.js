import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(process.cwd(), "data", "program.json");

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

export async function GET() {
  const data = await readData();
  return NextResponse.json({ ok: true, program: data });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { nama, deskripsi, tanggal } = body;

    if (!nama || !deskripsi) {
      return NextResponse.json(
        { ok: false, message: "Nama dan deskripsi wajib diisi." },
        { status: 400 }
      );
    }

    const data = await readData();
    const now = new Date().toISOString();

    const newItem = {
      id: crypto.randomUUID(),
      nama,
      deskripsi,
      tanggal: tanggal || now.slice(0, 10),
      createdAt: now,
      updatedAt: now
    };

    data.unshift(newItem);
    await writeData(data);

    return NextResponse.json({ ok: true, program: newItem });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Bad request" },
      { status: 400 }
    );
  }
}
