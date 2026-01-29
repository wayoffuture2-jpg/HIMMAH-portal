"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LaporanPage() {
  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem("pengurus") !== "ok") router.push("/pengurus/login");
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Laporan Kerja</h1>
      <p className="mt-2 text-slate-600">Form laporan kerja akan kita buat di langkah berikutnya.</p>
    </div>
  );
}
