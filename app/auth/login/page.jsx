"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const router = useRouter();

  const submit = (e) => {
    e.preventDefault();
    setErr("");

    const savedName = localStorage.getItem("pub_name");
    const savedPass = localStorage.getItem("pub_password");

    if (name === savedName && password === savedPass) {
      sessionStorage.setItem("pub_logged", "ok");
      router.push("/kirim-artikel");
    } else {
      setErr("Nama atau password salah.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-sm rounded-xl border p-6 bg-white">
        <h1 className="text-xl font-bold mb-4">Login Publik</h1>

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

        {err && <p className="text-red-600 text-sm mb-3">{err}</p>}

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">Masuk</button>
      </form>
    </div>
  );
}
