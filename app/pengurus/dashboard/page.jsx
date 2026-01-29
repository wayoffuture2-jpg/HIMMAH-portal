"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const safeJson = async (response) => {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
};

export default function PengurusDashboardPage() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [articles, setArticles] = useState([]);
  const [notes, setNotes] = useState({});
  const router = useRouter();

  // ambil password dari sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem("adminPassword");
    if (!saved) {
      router.push("/pengurus/login");
      return;
    }
    setPassword(saved);
    loadArticles(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadArticles = async (pwd) => {
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch(`/api/admin/articles?status=pending`, {
        headers: { "x-admin-password": pwd },
      });

      const data = await safeJson(response);
      if (!response.ok) {
        throw new Error((data && data.message) || "Gagal memuat artikel.");
      }

      const list = data?.articles ? data.articles : [];
      setArticles(list);
      setNotes(
        list.reduce((acc, a) => {
          acc[a.id] = a.editorNote || "";
          return acc;
        }, {})
      );

      setStatus("ready");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  const handleAction = async (articleId, actionStatus) => {
    setStatus("updating");
    setMessage("");
    try {
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          status: actionStatus,
          editorNote: notes[articleId] || "",
        }),
      });

      const data = await safeJson(response);
      if (!response.ok) {
        throw new Error((data && data.message) || "Gagal memperbarui artikel.");
      }

      await loadArticles(password);
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("adminPassword");
    router.push("/pengurus/login");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Pengurus</h1>
          <p className="text-sm text-slate-600">
            Review artikel yang masuk (pending).
          </p>
        </div>
        <button
          onClick={logout}
          className="rounded-full border px-4 py-2 text-sm"
        >
          Logout
        </button>
      </div>

      {message ? <p className="text-sm text-rose-600">{message}</p> : null}

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Artikel Pending</h3>
          <span className="text-xs text-slate-500">
            {articles.length} menunggu review
          </span>
        </div>

        {status === "loading" ? (
          <p className="mt-4 text-sm text-slate-500">Memuat artikel...</p>
        ) : null}

        {articles.length === 0 && status !== "loading" ? (
          <p className="mt-4 text-sm text-slate-500">Tidak ada artikel pending.</p>
        ) : (
          <div className="mt-4 space-y-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs uppercase tracking-[0.3em] text-primary-500">
                    {article.category}
                  </span>
                  <h4 className="text-lg font-semibold text-slate-900">
                    {article.title}
                  </h4>
                  <p className="text-xs text-slate-500">{article.authorName}</p>
                </div>

                <p className="mt-3 text-sm text-slate-600 whitespace-pre-line">
                  {article.content}
                </p>

                <div className="mt-4">
                  <label className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    Catatan Pengurus
                  </label>
                  <textarea
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
                    value={notes[article.id] || ""}
                    onChange={(e) =>
                      setNotes((prev) => ({ ...prev, [article.id]: e.target.value }))
                    }
                  />
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleAction(article.id, "published")}
                    className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAction(article.id, "rejected")}
                    className="rounded-full bg-rose-600 px-4 py-2 text-xs font-semibold text-white"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

