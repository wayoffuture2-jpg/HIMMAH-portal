"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/articles/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      setError(data.error || "Login gagal");
      return;
    }

    // ✅ simpan password sementara
    sessionStorage.setItem("adminPassword", password);

    // ➜ masuk ke editor
    router.push("/admin/editor");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow"
      >
        <h1 className="text-xl font-bold">Login Admin</h1>

        <input
          type="password"
          className="mt-4 w-full rounded-xl border px-4 py-2"
          placeholder="Password admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}

        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-primary-600 py-3 text-white font-semibold"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
