"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

export default function PengurusDashboard() {
  const router = useRouter();

  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [list, setList] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // ambil token login supabase
  const getToken = async () => {
    const { data } = await supabase.auth.getSession();
    return data?.session?.access_token || null;
  };

  // ✅ GUARD: harus login + role pengurus
  useEffect(() => {
    let active = true;

    const check = async () => {
      setMsg("");

      // 1) cek session
      const { data: sess } = await supabase.auth.getSession();
      if (!active) return;

      if (!sess?.session) {
        router.replace("/pengurus/login");
        return;
      }

      // 2) cek role di profiles
      const userId = sess.session.user.id;
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .single();

      if (!active) return;

      if (profileError) {
        router.replace("/pengurus/login");
        return;
      }

      if (profile?.role !== "pengurus") {
        router.replace("/pengurus/login");
        return;
      }

      setReady(true);

      // 3) setelah lolos guard, auto-load laporan
      setTimeout(() => {
        if (active) load();
      }, 0);
    };

    check();

    return () => {
      active = false;
    };
  }, [router]);

  const load = async () => {
    setLoading(true);
    setMsg("");
    try {
      const token = await getToken();
      if (!token) throw new Error("Session hilang. Silakan login ulang.");

      const res = await fetch("/api/pengurus/laporan", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.message || data?.error || "Gagal load laporan");
      }

      setList(data.laporan || []);
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    setLoading(true);
    setMsg("");
    try {
      if (!title || !content) {
        throw new Error("Judul dan isi wajib diisi.");
      }

      const token = await getToken();
      if (!token) throw new Error("Session hilang. Silakan login ulang.");

      const res = await fetch("/api/pengurus/laporan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // API sudah support title/content ATAU judul/isi
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();
      if (!res.ok || !data?.ok) {
        throw new Error(data?.message || data?.error || "Gagal submit laporan");
      }

      setTitle("");
      setContent("");
      await load();
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/pengurus/login");
    router.refresh();
  };

  if (!ready) return null;

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <div className="rounded-2xl border bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Pengurus</h1>
            <p className="text-sm text-slate-600 mt-1">Buat laporan kerja/program.</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={load}
              disabled={loading}
              className="rounded-xl bg-slate-900 text-white px-4 py-2 text-sm"
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
            <button onClick={logout} className="rounded-xl border px-4 py-2 text-sm">
              Logout
            </button>
          </div>
        </div>

        {msg ? <p className="mt-3 text-sm text-rose-600">{msg}</p> : null}
      </div>

      <div className="rounded-2xl border bg-white p-6 space-y-3">
        <h2 className="text-lg font-semibold">Tambah Laporan</h2>

        <input
          className="w-full rounded-xl border px-4 py-2"
          placeholder="Judul laporan"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full rounded-xl border px-4 py-2"
          rows={6}
          placeholder="Isi laporan..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          className="rounded-xl bg-emerald-600 text-white px-4 py-2"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Memproses..." : "Kirim Laporan"}
        </button>

        <p className="text-xs text-slate-500">
          Catatan: data laporan masih tersimpan sementara (memory). Kalau server redeploy, datanya bisa hilang.
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Daftar Laporan</h2>
          <span className="text-xs text-slate-500">{list.length} item</span>
        </div>

        {loading ? <p className="mt-3 text-sm text-slate-500">Loading...</p> : null}

        <div className="mt-4 space-y-3">
          {list.map((x) => (
            <div key={x.id} className="rounded-xl border bg-slate-50 p-4">
              <div className="text-sm text-slate-500">{x.createdAt}</div>
              <div className="font-semibold">{x.judul ?? x.title}</div>
              <div className="text-sm text-slate-700 whitespace-pre-line mt-2">
                {x.isi ?? x.content}
              </div>
              {x.fileUrl ? (
                <a
                  href={x.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 text-sm text-emerald-700 underline"
                >
                  Lihat file laporan
                </a>
              ) : null}
            </div>
          ))}

          {!loading && list.length === 0 ? (
            <p className="text-sm text-slate-500">Belum ada laporan.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
