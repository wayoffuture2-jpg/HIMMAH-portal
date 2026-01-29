"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Section from "../../../components/Section";
import { supabase } from "../../../lib/supabaseClient";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  // Supabase reset link biasanya kirim token lewat URL hash (#access_token=...)
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const params = new URLSearchParams(hash.replace("#", ""));
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (access_token && refresh_token) {
      supabase.auth.setSession({ access_token, refresh_token });
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    if (!newPassword || newPassword.length < 6) {
      setStatus("error");
      setMessage("Password minimal 6 karakter.");
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("ready");
    setMessage("Password berhasil diubah. Silakan login ulang.");
    router.replace("/auth/login");
  };

  return (
    <Section title="Reset Password" subtitle="Buat password baru">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6">
        <form onSubmit={handleUpdate} className="space-y-3">
          <input
            type="password"
            className="w-full rounded-xl border border-slate-200 px-4 py-2"
            placeholder="Password baru"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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
