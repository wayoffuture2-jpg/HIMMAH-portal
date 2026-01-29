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

    sessionStorage.setItem("pengurusLogin", "true");
    router.push("/pengurus/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow"
      >
        <h1 className="text-xl font-semibold mb-4 text-center">
          Login Pengurus
        </h1>

        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-lg border px-4 py-2 mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-600 mb-3">{error}</p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 text-white py-2 font-semibold"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}

