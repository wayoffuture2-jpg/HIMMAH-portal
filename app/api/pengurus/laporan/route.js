import { NextResponse } from "next/server";

/**
 * CATATAN:
 * - Ini masih pakai memory (laporanDB)
 * - Data akan hilang kalau server restart / redeploy
 * - Nanti bisa diganti database (Supabase / Prisma / dll)
 */
let laporanDB = [];

/**
 * GET
 * Ambil semua laporan
 */
export async function GET() {
  return NextResponse.json(
    { ok: true, laporan: laporanDB },
    { status: 200 }
  );
}

/**
 * POST
 * Simpan laporan baru (judul, isi, fileUrl opsional)
 */
export async function POST(req) {
  try {
    const body = await req.json();
    const { judul, isi, fileUrl } = body || {};

    // validasi wajib
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
      fileUrl: fileUrl || null, // ⬅️ tambahan penting
      createdAt: new Date().toISOString()
    };

    // simpan di awal array (paling baru di atas)
    laporanDB.unshift(newItem);

    return NextResponse.json(
      { ok: true, data: newItem },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { ok: false, message: "Bad request" },
      { status: 400 }
    );
  }
}
