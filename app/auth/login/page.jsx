"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Section from "../../../components/Section";
import { supabase } from "../../../lib/supabaseClient";

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

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("ready");
    router.replace("/kirim-artikel");
    router.refresh();
  };

  const handleForgot = async () => {
    setStatus("loading");
    setMessage("");

    if (!email) {
      setStatus("error");
      setMessage("Isi email dulu, lalu klik Lupa Password.");
      return;
    }

    const redirectTo =
      typeof window !== "undefined"
        ? `${window.location.origin}/auth/reset`
        : undefined;

    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("ready");
    setMessage("Link reset password sudah dikirim ke email.");
  };

  return (
    <Section title="Login Publik" subtitle="Masuk untuk mengirim artikel">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6">
        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            className="w-full rounded-xl border border-slate-200 px-4 py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <input
            type="password"
            className="w-full rounded-xl border border-slate-200 px-4 py-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <button
            disabled={status === "loading"}
            className="w-full rounded-full bg-blue-600 py-2 font-semibold text-white"
          >
            {status === "loading" ? "Memproses..." : "Masuk"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/auth/register")}
            className="w-full rounded-full border border-slate-300 py-2 font-semibold"
          >
            Daftar Akun Publik
          </button>

          <button
            type="button"
            onClick={handleForgot}
            className="w-full rounded-full border border-slate-300 py-2 font-semibold"
          >
            Lupa Password
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
