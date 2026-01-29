"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function SubmitForm() {
  const [nama, setNama] = useState("");
  const [kontak, setKontak] = useState("");
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("");
  const [isi, setIsi] = useState("");

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

    if (!nama || !kontak || !judul || !kategori || !isi) {
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

      // ⬇️ Sesuaikan nama kolom dengan table articles kamu
      // Umumnya: nama, kontak, judul, kategori, isi, status
      const { error } = await supabase.from("articles").insert([
        {
          nama,
          kontak,
          judul,
          kategori,
          isi,
          status: "pending",
          user_id: user.id, // kalau kolom user_id ada (kalau tidak ada, hapus baris ini)
        },
      ]);

      if (error) throw error;

      setOk(true);
      setMsg("Artikel berhasil dikirim. Status: pending (menunggu review).");

      // reset form
      setJudul("");
      setKategori("");
      setIsi("");
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
            value={nama}
            onChange={(e) => setNama(e.target.value)}
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
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          placeholder="Judul artikel"
        />
      </div>

      <div>
        <label className="text-sm text-slate-600">Kategori</label>
        <input
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
          value={kategori}
          onChange={(e) => setKategori(e.target.value)}
          placeholder="Filsafat / Agama / Sains / Politik"
        />
      </div>

      <div>
        <label className="text-sm text-slate-600">Isi Artikel</label>
        <textarea
          className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2"
          rows={10}
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
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
