import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const password = body?.password;

    if (!process.env.ADMIN_PASSWORD) {
      return NextResponse.json(
        { ok: false, error: "ADMIN_PASSWORD belum diset di Vercel env" },
        { status: 500 }
      );
    }

    if (password === process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    return NextResponse.json({ ok: false, error: "Password salah" }, { status: 401 });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Bad JSON" }, { status: 400 });
  }
}

