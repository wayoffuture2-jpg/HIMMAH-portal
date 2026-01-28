"use client";

import { useState } from "react";

const initialState = {
  authorName: "",
  contact: "",
  title: "",
  category: "",
  content: ""
};

export default function SubmitForm() {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Gagal mengirim artikel.");
      }

      setStatus("success");
      setMessage("Artikel berhasil dikirim dan menunggu review editor.");
      setFormData(initialState);
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          Nama
          <input
            className="rounded-xl border border-slate-200 px-4 py-2"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Kontak (WA/Email)
          <input
            className="rounded-xl border border-slate-200 px-4 py-2"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm">
        Judul Artikel
        <input
          className="rounded-xl border border-slate-200 px-4 py-2"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        Kategori
        <input
          className="rounded-xl border border-slate-200 px-4 py-2"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
      </label>
      <label className="flex flex-col gap-2 text-sm">
        Isi Artikel
        <textarea
          className="min-h-[180px] rounded-xl border border-slate-200 px-4 py-2"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
        />
      </label>
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white disabled:opacity-60"
      >
        {status === "loading" ? "Mengirim..." : "Kirim Artikel"}
      </button>
      {message ? (
        <p
          className={`text-sm ${
            status === "success" ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
