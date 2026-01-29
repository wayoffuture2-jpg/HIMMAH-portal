"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

async function safeJson(res) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

export default function PengurusLogin() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Password wajib diisi");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/pengurus/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await safeJson(res);

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || data?.message || `Login gagal (${res.status})`);
      }

      // ✅ login sukses
      sessionStorage.setItem("pengurus", "ok");
      router.push("/pengurus/dashboard");
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-slate-200 p-6 bg-white"
      >
        <h1 className="text-xl font-bold mb-4">Login Pengurus</h1>

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-slate-200 rounded-lg px-4 py-2 mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error ? <p className="text-red-600 text-sm mb-3">{error}</p> : null}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-60"
        >
          {status === "loading" ? "Memeriksa..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
