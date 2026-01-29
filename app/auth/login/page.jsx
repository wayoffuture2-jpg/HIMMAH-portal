"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Section from "../../components/Section"; // sesuaikan kalau beda
import { supabase } from "../../lib/supabaseClient"; // sesuaikan kalau beda

export default function LoginPublikPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!email || !password) {
      setStatus("error");
      setMessage("Email dan password wajib diisi.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    // Optional: pastikan session ada
    if (!data?.session) {
      setStatus("error");
      setMessage("Login berhasil tapi session tidak terbaca. Coba refresh halaman.");
      return;
    }

    setStatus("ready");
    router.replace("/kirim-artikel");
  };

  return (
    <Section title="Login Publik" subtitle="Masuk untuk mengirim artikel">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6">
        <form onSubmit={handleLogin} className="space-y-3">
          <input
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
            className="w-full rounded-full bg-blue-600 py-2 font-semibold text-white"
          >
            {status === "loading" ? "Memproses..." : "Masuk"}
          </button>

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
