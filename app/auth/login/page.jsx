"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import Section from "../../../components/Section";

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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setStatus("error");
      setMessage("Email / password salah.");
      return;
    }

    setStatus("ready");
    router.push("/kirim-artikel"); // arahkan ke submit artikel
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

          <div className="text-sm text-slate-600">
            Belum punya akun?{" "}
            <a className="text-blue-600 font-semibold" href="/auth/register">
              Daftar
            </a>
          </div>

          {message ? <p className="text-sm text-rose-600">{message}</p> : null}
        </form>
      </div>
    </Section>
  );
}
