import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: false, error: "Use POST" }, { status: 405 });
}

export async function POST(req) {
  try {
    const { password } = await req.json();
    const ok = password && password === process.env.ADMIN_PASSWORD;

    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "Password salah" },
        { status: 401 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: "Bad request" },
      { status: 400 }
    );
  }
}


