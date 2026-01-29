"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PengurusLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/admin/articles/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.ok) {
        setError(data.error || "Login gagal");
        return;
      }

      // simpan agar bisa dipakai dashboard
      sessionStorage.setItem("adminPassword", password);

      // arahkan ke dashboard
      router.push("/pengurus/dashboard");
    } catch (err) {
      setError("Terjadi error saat login.");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold">Login Pengurus</h1>
        <p className="mt-2 text-sm text-slate-600">
          Masukkan password pengurus.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <input
            type="password"
            className="w-full rounded-xl border border-slate-200 px-4 py-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error ? <p className="text-sm text-rose-600">{error}</p> : null}

          <button
            type="submit"
            className="w-full rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}

