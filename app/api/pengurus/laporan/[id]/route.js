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

// PATCH /api/pengurus/laporan/:id -> edit laporan
export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const data = await readData();

    const idx = data.findIndex((x) => x.id === id);
    if (idx === -1) {
      return NextResponse.json(
        { ok: false, message: "Data tidak ditemukan." },
        { status: 404 }
      );
    }

    data[idx] = {
      ...data[idx],
      judul: body.judul ?? data[idx].judul,
      isi: body.isi ?? data[idx].isi,
      tanggal: body.tanggal ?? data[idx].tanggal,
      updatedAt: new Date().toISOString()
    };

    await writeData(data);
    return NextResponse.json({ ok: true, laporan: data[idx] });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Bad request" },
      { status: 400 }
    );
  }
}

// DELETE /api/pengurus/laporan/:id -> hapus laporan
export async function DELETE(req, { params }) {
  const { id } = params;
  const data = await readData();
  const filtered = data.filter((x) => x.id !== id);

  if (filtered.length === data.length) {
    return NextResponse.json(
      { ok: false, message: "Data tidak ditemukan." },
      { status: 404 }
    );
  }

  await writeData(filtered);
  return NextResponse.json({ ok: true });
}
