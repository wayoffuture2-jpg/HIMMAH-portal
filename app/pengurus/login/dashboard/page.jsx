"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PengurusDashboard() {
  const router = useRouter();

  useEffect(() => {
    const ok = sessionStorage.getItem("pengurus");
    if (!ok) router.push("/pengurus/login");
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard Pengurus</h1>
      <ul className="mt-4 list-disc pl-5">
        <li>Laporan kerja</li>
        <li>Program</li>
        <li>Review artikel</li>
      </ul>
    </div>
  );
}

