import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

let laporanDB = [];

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function requirePengurus(req) {
  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token) {
    return { ok: false, status: 401, message: "Unauthorized: token tidak ada" };
  }

  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);

  if (userError || !userData?.user) {
    return { ok: false, status: 401, message: "Unauthorized: token tidak valid" };
  }

  const userId = userData.user.id;

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();

  if (profileError) {
    return { ok: false, status: 500, message: "Gagal membaca role user" };
  }

  if (profile?.role !== "pengurus") {
    return { ok: false, status: 403, message: "Forbidden: bukan pengurus" };
  }

  return { ok: true, userId };
}

export async function GET(req) {
  const authz = await requirePengurus(req);
  if (!authz.ok) {
    return NextResponse.json({ ok: false, message: authz.message }, { status: authz.status });
  }

  return NextResponse.json({ ok: true, laporan: laporanDB }, { status: 200 });
}

export async function POST(req) {
  const authz = await requirePengurus(req);
  if (!authz.ok) {
    return NextResponse.json({ ok: false, message: authz.message }, { status: authz.status });
  }

  try {
    const body = await req.json();

    const judul = body?.judul ?? body?.title;
    const isi = body?.isi ?? body?.content;
    const fileUrl = body?.fileUrl ?? null;

    if (!judul || !isi) {
      return NextResponse.json({ ok: false, message: "Judul dan isi wajib diisi." }, { status: 400 });
    }

    const newItem = {
      id: Date.now(),
      judul,
      isi,
      fileUrl,
      createdAt: new Date().toISOString(),
      createdBy: authz.userId
    };

    laporanDB.unshift(newItem);

    return NextResponse.json({ ok: true, data: newItem }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, message: "Bad request" }, { status: 400 });
  }
}
