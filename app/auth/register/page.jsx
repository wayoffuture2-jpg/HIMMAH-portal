"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import Section from "../../../components/Section";

export default function RegisterPage() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError(false);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nama }
      }
    });

    if (error) {
      setError(true);
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("Pendaftaran berhasil. Silakan login.");
    setLoading(false);

    setTimeout(() => {
      router.push("/auth/login");
    }, 1500);
  };

  return (
    <Section
      title="Daftar Publik"
      subtitle="Buat akun untuk mengirim artikel"
    >
      <div className="mx-auto max-w-md rounded-2xl border bg-white p-6">
        <form onSubmit={handleRegister} className="space-y-3">
          <input
            className="w-full rounded-lg border px-4 py-2"
            placeholder="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />

          <input
            className="w-full rounded-lg border px-4 py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full rounded-lg border px-4 py-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-2 text-white font-semibold"
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>

          {message && (
            <p className={`text-sm ${error ? "text-red-600" : "text-green-600"}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </Section>
  );
}
