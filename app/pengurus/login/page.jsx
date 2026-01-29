"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import Section from "../../../components/Section";

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

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      setStatus("error");
      setMessage("Email / password salah.");
      return;
    }

    // cek role di profiles
    const userId = authData?.user?.id;
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role, nama")
      .eq("id", userId)
      .single();

    if (profileError) {
      setStatus("error");
      setMessage("Gagal cek role. Coba login ulang.");
      return;
    }

    if (profile?.role !== "pengurus" && profile?.role !== "admin") {
      setStatus("error");
      setMessage("Akun belum diaktifkan sebagai pengurus. Hubungi admin.");
      return;
    }

    router.push("/pengurus/dashboard");
  };

  return (
    <Section title="Login Pengurus" subtitle="Hanya akun role pengurus yang bisa masuk">
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
            className="w-full rounded-full bg-emerald-600 py-2 font-semibold text-white"
          >
            {status === "loading" ? "Memproses..." : "Masuk"}
          </button>

          <div className="text-sm text-slate-600">
            Belum punya akun pengurus?{" "}
            <a className="text-emerald-700 font-semibold" href="/pengurus/register">
              Daftar
            </a>
          </div>

          {message ? <p className="text-sm text-rose-600">{message}</p> : null}
        </form>
      </div>
    </Section>
  );
}
