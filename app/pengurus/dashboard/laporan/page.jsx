"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LaporanPage() {
  const router = useRouter();
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("pengurus") !== "ok") {
      router.push("/pengurus/login");
      return;
    }
    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchList() {
    setLoading(true);
    setMsg("");
    try {
      const res = await fetch("/api/pengurus/laporan");
      const data = await res.json();
      setList(data.laporan || []);
    } catch {
      setMsg("Gagal memuat data laporan.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("/api/pengurus/laporan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ judul, isi, tanggal })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Gagal simpan laporan.");

      setJudul("");
      setIsi("");
      setTanggal("");
      fetchList();
    } catch (err) {
      setMsg(err.message);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Hapus laporan ini?")) return;
    setMsg("");
    try {
      const res = await fetch(`/api/pengurus/laporan/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Gagal hapus.");
      fetchList();
    } catch (err) {
      setMsg(err.message);
    }
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Laporan Kerja</h1>

      <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-4 space-y-3 max-w-2xl">
        <input
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Judul laporan"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
        />
        <input
          className="w-full border rounded-lg px-4 py-2"
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
        />
        <textarea
          className="w-full border rounded-lg px-4 py-2 min-h-[120px]"
          placeholder="Isi laporan"
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Simpan
        </button>
        {msg ? <p className="text-sm text-red-600">{msg}</p> : null}
      </form>

      <div className="max-w-2xl space-y-3">
        <h2 className="text-lg font-semibold">Daftar Laporan</h2>
        {loading ? <p>Memuat...</p> : null}
        {!loading && list.length === 0 ? <p className="text-slate-500">Belum ada laporan.</p> : null}

        {list.map((item) => (
          <div key={item.id} className="rounded-xl border bg-white p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500">{item.tanggal}</p>
                <p className="font-semibold">{item.judul}</p>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-sm bg-rose-600 text-white px-3 py-1 rounded-lg"
              >
                Hapus
              </button>
            </div>
            <p className="mt-2 text-sm whitespace-pre-line text-slate-700">{item.isi}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

