"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import Section from "../../../components/Section";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  // memastikan session recovery kebaca setelah user klik link dari email
  useEffect(() => {
    supabase.auth.getSession();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!password || password.length < 6) {
      setStatus("error");
      setMessage("Password minimal 6 karakter.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("ready");
    setMessage("Password berhasil diubah. Silakan login.");
    router.replace("/auth/login");
  };

  return (
    <Section title="Reset Password" subtitle="Masukkan password baru">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6">
        <form onSubmit={handleUpdate} className="space-y-3">
          <input
            type="password"
            className="w-full rounded-xl border border-slate-200 px-4 py-2"
            placeholder="Password baru"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={status === "loading"}
            className="w-full rounded-full bg-emerald-600 py-2 font-semibold text-white"
          >
            {status === "loading" ? "Memproses..." : "Simpan Password Baru"}
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
