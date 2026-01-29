"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Section from "../../../components/Section";
import { supabase } from "../../../lib/supabaseClient";

export default function LoginPengurusPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    const userId = data?.user?.id;

    // cek role dari profiles
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    if (profileError) {
      setStatus("error");
      setMessage("Login berhasil, tapi gagal membaca role.");
      return;
    }

    if (profile?.role !== "pengurus") {
      setStatus("error");
      setMessage("Akun kamu belum diaktifkan sebagai pengurus. Hubungi admin.");
      return;
    }

    setStatus("ready");
    router.replace("/pengurus/dashboard");
    router.refresh();
  };

  return (
    <Section title="Login Pengurus" subtitle="Khusus akun yang sudah diaktifkan">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6">
        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            className="w-full rounded-xl border border-slate-200 px-4 py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full rounded-xl border border-slate-200 px-4 py-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={status === "loading"}
            className="w-full rounded-full bg-emerald-600 py-2 font-semibold text-white"
          >
            {status === "loading" ? "Memproses..." : "Masuk Pengurus"}
          </button>

          <a className="block text-sm text-emerald-700 underline" href="/pengurus/register">
            Belum punya akun pengurus? Daftar di sini
          </a>

          {message ? (
            <p className={`text-sm ${status === "error" ? "text-rose-600" : "text-emerald-600"}`}>
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </Section>
  );
}
