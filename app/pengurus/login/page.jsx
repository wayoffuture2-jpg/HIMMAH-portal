"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PengurusLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === process.env.NEXT_PUBLIC_PENGURUS_PASSWORD) {
      sessionStorage.setItem("pengurus", "ok");
      router.push("/pengurus/dashboard");
    } else {
      setError("Password salah");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border p-6 bg-white"
      >
        <h1 className="text-xl font-bold mb-4">Login Pengurus</h1>

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-lg px-4 py-2 mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Masuk
        </button>
      </form>
    </div>
  );
}
