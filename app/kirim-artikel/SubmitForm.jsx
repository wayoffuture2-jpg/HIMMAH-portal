"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function SubmitForm() {
  const [authorName, setAuthorName] = useState("");
  const [contact, setContact] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);

  // auto isi contact dari email user login
  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser();
      const email = data?.user?.email || "";
      if (email && !contact) setContact(email);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setOk(false);

    if (!authorName || !contact || !title || !category || !content) {
      setMessage("Semua field wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;

      if (!user) {
        setMessage("Kamu belum login. Silakan login dulu.");
        return;
      }

      // ✅ insert hanya ke kolom yang kita pakai (versi Inggris)
      const { error } = await supabase.from("articles").insert([
        {
          user_id: user.id,
          author_name: authorName,
          title,
          content,
          category,
          status: "pending",
          editor_note: null,
        },
      ]);

      if (error) throw error;

      setOk(true);
      setMessage("✅ Artikel berhasil dikirim. Status: pending (menunggu review).");

      // reset form
      setTitle("");
      setCategory("");
      setContent("");
    } catch (err) {
      setMessage(err?.message || "Gagal mengirim artikel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
            value={contact}
            onChange={(e) => setContact(e.target.value)}
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
        type="submit"
        disabled={loading}
        className="rounded-full bg-blue-600 px-6 py-2 font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Mengirim..." : "Kirim Artikel"}
      </button>

      {message ? (
        <p className={`text-sm ${ok ? "text-emerald-600" : "text-rose-600"}`}>
          {message}
        </p>
      ) : null}
    </form>
  );
}
