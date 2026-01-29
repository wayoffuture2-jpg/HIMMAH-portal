"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LaporanPengurusPage() {
  const router = useRouter();

  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [file, setFile] = useState(null);

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [laporan, setLaporan] = useState([]);

  useEffect(() => {
    const ok = sessionStorage.getItem("pengurus");
    if (!ok) router.push("/pengurus/login");
  }, [router]);

  const loadLaporan = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pengurus/laporan", { method: "GET" });
      const data = await res.json();
      setLaporan(data?.laporan || []);
    } catch (e) {
      setLaporan([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLaporan();
  }, []);

  const uploadFile = async () => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/pengurus/laporan/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!res.ok || !data?.ok) {
      throw new Error(data?.message || "Upload file gagal.");
    }

    return data.url; // contoh: /uploads/xxxxx.pdf
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Mengirim...");

    try {
      // 1) upload file dulu (kalau ada)
      const fileUrl = await uploadFile();

      // 2) simpan laporan (judul, isi, fileUrl)
      const res = await fetch("/api/pengurus/laporan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ judul, isi, fileUrl })
      });

      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.message || "Gagal kirim laporan.");
      }

      setJudul("");
      setIsi("");
      setFile(null);
      setStatus("Laporan berhasil dikirim ✅");
      await loadLaporan();
    } catch (err) {
      setStatus(err.message || "Terjadi error ❌");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="rounded-2xl border bg-white p-6">
        <h1 className="text-2xl font-bold mb-2">Laporan Kerja Pengurus</h1>
        <p className="text-sm text-slate-600 mb-4">
          Isi laporan kegiatan/program dan upload file (PDF/DOC/DOCX) bila ada.
        </p>

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

          <div className="space-y-2">
            <label className="text-sm font-semibold">Upload file laporan (opsional)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full border rounded-lg px-4 py-2 bg-white"
            />
            <p className="text-xs text-slate-500">
              Maks 5MB. Format: PDF/DOC/DOCX.
            </p>
          </div>

          <button className="bg-green-600 text-white px-6 py-2 rounded-lg">
            Kirim Laporan
          </button>

          {status && <p className="text-sm">{status}</p>}
        </form>
      </div>

      <div className="rounded-2xl border bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Daftar Laporan</h2>
          <button onClick={loadLaporan} className="text-sm px-4 py-2 rounded-lg border">
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="mt-4 text-sm text-slate-500">Memuat laporan...</p>
        ) : laporan.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">Belum ada laporan.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {laporan.map((item) => (
              <div key={item.id} className="rounded-xl border p-4 bg-slate-50">
                <h3 className="font-semibold">{item.judul}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {new Date(item.createdAt).toLocaleString()}
                </p>

                <p className="mt-3 text-sm whitespace-pre-line">{item.isi}</p>

                {item.fileUrl ? (
                  <a
                    href={item.fileUrl}
                    target="_blank"
                    className="inline-block mt-3 text-sm text-blue-600 underline"
                    rel="noreferrer"
                  >
                    Lihat File Laporan
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

