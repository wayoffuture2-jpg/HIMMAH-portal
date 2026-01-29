"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import Section from "../../../components/Section";

export default function LoginPublikPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState("idle"); // idle | loading | ready | error
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
  };

  const handleForgotPassword = async () => {
    setStatus("loading");
    setMessage("");

    if (!email) {
      setStatus("error");
      setMessage("Isi email dulu, lalu klik Lupa password.");
      return;
    }

    // PENTING: URL ini harus ada di Supabase Auth settings (redirect allowlist)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset`,
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("ready");
    setMessage("Link reset password sudah dikirim ke email. Cek Inbox/Spam.");
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

          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={status === "loading"}
            className="w-full rounded-full border border-slate-200 py-2 font-semibold text-slate-700"
          >
            Lupa password
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
