"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Section from "../../../components/Section";
import { supabase } from "../../../lib/supabaseClient";

export default function RegisterPengurusPage() {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (!nama.trim() || !email.trim() || !password) {
      setIsError(true);
      setMessage("Nama, email, dan password wajib diisi.");
      return;
    }

    if (password.length < 6) {
      setIsError(true);
      setMessage("Password minimal 6 karakter.");
      return;
    }

    setLoading(true);

    // 1) Sign up ke Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nama: nama.trim() },
      },
    });

    if (error) {
      setLoading(false);
      setIsError(true);
      setMessage(error.message);
      return;
    }

    // 2) Buat row di profiles (role awal: pending_pengurus)
    // Catatan: data.user biasanya ada. Kalau email confirmation ON, session bisa null, tapi user tetap ada.
    const userId = data?.user?.id;

    if (!userId) {
      setLoading(false);
      setIsError(true);
      setMessage(
        "Pendaftaran berhasil, tapi userId tidak terbaca. Cek pengaturan Email Confirmation di Supabase Auth."
      );
      return;
    }

    const { error: profileErr } = await supabase
      .from("profiles")
      .upsert(
        {
          id: userId,
          nama: nama.trim(),
          role: "pending_pengurus",
        },
        { onConflict: "id" }
      );

    setLoading(false);

    if (profileErr) {
      setIsError(true);
      setMessage(
        `Akun berhasil dibuat, tapi gagal menyimpan profile. Error: ${profileErr.message}`
      );
      return;
    }

    setIsError(false);
    setMessage(
      "Pendaftaran berhasil. Akun kamu berstatus PENDING. Tunggu admin mengubah role menjadi PENGURUS, lalu login."
    );

    // Redirect setelah 1 detik biar user sempat baca pesan
    setTimeout(() => {
      router.push("/pengurus/login");
    }, 1000);
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
            type="email"
            className="w-full rounded-xl border border-slate-200 px-4 py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full rounded-xl border border-slate-200 px-4 py-2"
            placeholder="Password (min 6 karakter)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full rounded-full bg-emerald-600 py-2 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Daftar Pengurus"}
          </button>

          {message ? (
            <p className={`text-sm ${isError ? "text-rose-600" : "text-emerald-600"}`}>
              {message}
            </p>
          ) : null}

          <p className="text-xs text-slate-500">
            Setelah daftar, admin akan mengubah role kamu dari <b>pending_pengurus</b> menjadi <b>pengurus</b>.
          </p>
        </form>
      </div>
    </Section>
  );
}
