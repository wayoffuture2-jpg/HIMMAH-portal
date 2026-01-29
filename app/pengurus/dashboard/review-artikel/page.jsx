"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReviewArtikelPage() {
  const router = useRouter();
  useEffect(() => {
    if (sessionStorage.getItem("pengurus") !== "ok") router.push("/pengurus/login");
  }, [router]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Review Artikel</h1>
      <p className="mt-2 text-slate-600">
        Untuk sementara, review artikel menggunakan halaman editor:
      </p>

      <a
        className="inline-block mt-4 rounded-lg bg-blue-600 text-white px-4 py-2"
        href="/admin/editor"
      >
        Buka Editor Review Artikel
      </a>
    </div>
  );
}
