"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  const submit = (e) => {
    e.preventDefault();
    if (!name || !password) return setMsg("Isi nama & password.");
    // MVP: simpan akun publik di localStorage
    localStorage.setItem("pub_name", name);
    localStorage.setItem("pub_password", password);
    setMsg("Berhasil daftar. Silakan login.");
    setTimeout(() => router.push("/auth/login"), 700);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-sm rounded-xl border p-6 bg-white">
        <h1 className="text-xl font-bold mb-4">Daftar Publik</h1>
        <input className="w-full border rounded-lg px-4 py-2 mb-3"
          placeholder="Nama"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <input className="w-full border rounded-lg px-4 py-2 mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        {msg && <p className="text-sm text-slate-600 mb-3">{msg}</p>}
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">Daftar</button>
      </form>
    </div>
  );
}
