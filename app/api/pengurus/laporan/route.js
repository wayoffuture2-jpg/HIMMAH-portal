import { NextResponse } from "next/server";

let laporanDB = []; // sementara: memory (nanti bisa diganti database)

export async function GET() {
  return NextResponse.json({ ok: true, laporan: laporanDB }, { status: 200 });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { judul, isi } = body || {};

    if (!judul || !isi) {
      return NextResponse.json(
        { ok: false, message: "Judul dan isi wajib diisi." },
        { status: 400 }
      );
    }

    const newItem = {
      id: Date.now(),
      judul,
      isi,
      createdAt: new Date().toISOString()
    };

    laporanDB.unshift(newItem);

    return NextResponse.json({ ok: true, data: newItem }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { ok: false, message: "Bad request" },
      { status: 400 }
    );
  }
}


