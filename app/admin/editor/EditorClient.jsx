"use client";

import { useEffect, useState } from "react";

export default function EditorClient() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [articles, setArticles] = useState([]);
  const [notes, setNotes] = useState({});

  // Aman untuk response kosong / non-json
  const safeJson = async (response) => {
    const text = await response.text();
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return { message: text };
    }
  };

  const loadArticles = async (pwd) => {
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch(`/api/admin/articles?status=pending`, {
        headers: { "x-admin-password": pwd }
      });

      const data = await safeJson(response);

      if (!response.ok) {
        throw new Error((data && (data.error || data.message)) || "Gagal memuat artikel.");
      }

      const list = data?.articles || [];
      setArticles(list);

      setNotes(
        list.reduce((acc, article) => {
          acc[article.id] = article.editorNote || "";
          return acc;
        }, {})
      );

      setStatus("ready");
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  // Auto-login kalau pernah simpan password
  useEffect(() => {
    const savedPassword = sessionStorage.getItem("adminPassword");
    if (savedPassword) {
      setPassword(savedPassword);
      setLoggedIn(true);
      loadArticles(savedPassword);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!password) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/admin/articles/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      const data = await safeJson(res);

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || data?.message || `Login gagal (${res.status})`);
      }

      sessionStorage.setItem("adminPassword", password);
      setLoggedIn(true);
      await loadArticles(password);
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
      setLoggedIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminPassword");
    setPassword("");
    setLoggedIn(false);
    setArticles([]);
    setNotes({});
    setStatus("idle");
    setMessage("");
  };

  const handleAction = async (articleId, actionStatus) => {
    setStatus("updating");
    setMessage("");
    try {
      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password
        },
        body: JSON.stringify({
          status: actionStatus,
          editorNote: notes[articleId] || ""
        })
      });

      const data = await safeJson(response);

      if (!response.ok) {
        throw new Error((data && (data.error || data.message)) || "Gagal memperbarui artikel.");
      }

      await loadArticles(password);
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  };

  const handleNoteChange = (articleId, value) => {
    setNotes((prev) => ({ ...prev, [articleId]: value }));
  };

  return (
    <div className="space-y-6">
      {/* LOGIN BOX */}
      {!loggedIn ? (
        <form onSubmit={handleLogin} className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Login Editor (MVP)</h2>
          <p className="mt-2 text-sm text-slate-600">
            Masukkan password yang sama dengan <code>ADMIN_PASSWORD</code> di Vercel.
          </p>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
            <input
              type="password"
              className="flex-1 rounded-xl border border-slate-200 px-4 py-2"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white"
            >
              Masuk
            </button>
          </div>

          {message ? <p className="mt-3 text-sm text-rose-600">{message}</p> : null}
        </form>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">Status login:</p>
            <p className="font-semibold text-slate-900">Admin aktif</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold"
          >
            Logout
          </button>
        </div>
      )}

      {/* LIST ARTIKEL */}
      {loggedIn ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Artikel Pending</h3>
            <span className="text-xs text-slate-500">{articles.length} menunggu review</span>
          </div>

          {status === "loading" ? <p className="mt-4 text-sm text-slate-500">Memuat artikel...</p> : null}

          {message ? <p className="mt-3 text-sm text-rose-600">{message}</p> : null}

          {articles.length === 0 && status !== "loading" ? (
            <p className="mt-4 text-sm text-slate-500">Tidak ada artikel pending.</p>
          ) : (
            <div className="mt-4 space-y-6">
              {articles.map((article) => (
                <div key={article.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-[0.3em] text-primary-500">
                      {article.category}
                    </span>
                    <h4 className="text-lg font-semibold text-slate-900">{article.title}</h4>
                    <p className="text-xs text-slate-500">{article.authorName}</p>
                  </div>

                  <p className="mt-3 text-sm text-slate-600 whitespace-pre-line">{article.content}</p>

                  <div className="mt-4">
                    <label className="text-xs uppercase tracking-[0.3em] text-slate-500">Catatan Editor</label>
                    <textarea
                      className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
                      value={notes[article.id] || ""}
                      onChange={(e) => handleNoteChange(article.id, e.target.value)}
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleAction(article.id, "published")}
                      className="rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white"
                      disabled={status === "updating"}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction(article.id, "rejected")}
                      className="rounded-full bg-rose-600 px-4 py-2 text-xs font-semibold text-white"
                      disabled={status === "updating"}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
