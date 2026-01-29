import { NextResponse } from "next/server";

function isAuthorized(req) {
  const headerPwd = req.headers.get("x-pengurus-password");
  const envPwd = process.env.PENGURUS_PASSWORD; // server-only
  return Boolean(envPwd && headerPwd && headerPwd === envPwd);
}

// sementara: data dummy biar endpoint bisa dites dulu
let laporanStore = [];

export async function GET(req) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, laporan: laporanStore }, { status: 200 });
}

export async function POST(req) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const title = (body?.title || "").trim();
    const content = (body?.content || "").trim();

    if (!title || !content) {
      return NextResponse.json(
        { ok: false, error: "title dan content wajib diisi" },
        { status: 400 }
      );
    }

    const newItem = {
      id: String(Date.now()),
      title,
      content,
      createdAt: new Date().toISOString(),
    };

    laporanStore.unshift(newItem);

    return NextResponse.json({ ok: true, item: newItem }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}

