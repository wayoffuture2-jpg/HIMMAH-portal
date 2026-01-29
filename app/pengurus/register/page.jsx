"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import Section from "../../../components/Section";

export default function RegisterPengurusPage() {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!nama || !email || !password) {
      setStatus("error");
      setMessage("Nama, email, dan password wajib diisi.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nama } }
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("ready");
    setMessage("Pendaftaran berhasil. Tunggu admin mengaktifkan role pengurus, lalu login.");
    router.push("/pengurus/login");
  };

  return (
    <Section title="Daftar Pengurus" subtitle="Akun pengurus perlu diaktifkan admin">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6">
        <form onSubmit={handleRegister} className="space-y-3">
          <input
            className="w-full rounded-xl border border-slate-200 px-4 py-2"
            placeholder="Nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
          />
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
            {status === "loading" ? "Memproses..." : "Daftar Pengurus"}
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
