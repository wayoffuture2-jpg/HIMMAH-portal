"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LaporanPengurusPage() {
  const router = useRouter();
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const ok = sessionStorage.getItem("pengurus");
    if (!ok) router.push("/pengurus/login");
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Mengirim...");

    const res = await fetch("/api/pengurus/laporan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ judul, isi })
    });

    if (res.ok) {
      setJudul("");
      setIsi("");
      setStatus("Laporan berhasil dikirim");
    } else {
      setStatus("Gagal mengirim laporan");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Laporan Kerja Pengurus</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          placeholder="Judul laporan / program"
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <textarea
          value={isi}
          onChange={(e) => setIsi(e.target.value)}
          placeholder="Isi laporan kegiatan..."
          rows={6}
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <button className="bg-green-600 text-white px-6 py-2 rounded-lg">
          Kirim Laporan
        </button>

        {status && <p className="text-sm">{status}</p>}
      </form>
    </div>
  );
}
