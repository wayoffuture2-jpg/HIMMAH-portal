"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function SubmitForm() {
  const [authorName, setAuthorName] = useState("");
  const [kontak, setKontak] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [ok, setOk] = useState(false);

  // auto isi kontak dari user login (email)
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      const email = data?.user?.email || "";
      if (email && !kontak) setKontak(email);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setOk(false);

    if (!authorName || !kontak || !title || !category || !content) {
      setMsg("Semua field wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      // pastikan user login
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user) {
        setMsg("Kamu belum login. Silakan login dulu.");
        return;
      }

      // INSERT ke kolom yang BENAR sesuai tabel Supabase kamu
      const { error } = await supabase.from("articles").insert([
        {
          user_id: user.id,
          author_name: authorName,
          kontak,
          title,
          content,
          category,
          status: "pending",
        },
      ]);

      if (error) throw error;

      setOk(true);
      setMsg("Artikel berhasil dikirim. Status: pending (menunggu review).");

      // reset form
      setTitle("");
      setCategory("");
      setContent("");
    } catch (err) {
      setMsg(err?.message || "Gagal mengirim artikel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-slate-600">Nama</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Nama lengkap"
          />
        </div>

        <div>
          <label className="text-sm text-slate-600">Kontak (WA/Email)</label>
          <input
            className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
            value={kontak}
            onChange={(e) => setKontak(e.target.value)}
            placeholder="08xx / email"
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-slate-600">Judul Artikel</label>
        <input
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul artikel"
        />
      </div>

      <div>
        <label className="text-sm text-slate-600">Kategori</label>
        <input
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Filsafat / Agama / Sains / Politik"
        />
      </div>

      <div>
        <label className="text-sm text-slate-600">Isi Artikel</label>
        <textarea
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tulis artikel di sini..."
        />
      </div>

      <button
        disabled={loading}
        className="rounded-full bg-blue-600 px-6 py-2 font-semibold text-white"
      >
        {loading ? "Mengirim..." : "Kirim Artikel"}
      </button>

      {msg ? (
        <p className={`text-sm ${ok ? "text-emerald-600" : "text-rose-600"}`}>
          {msg}
        </p>
      ) : null}
    </form>
  );
}
