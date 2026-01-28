import { readArticles, writeArticles } from "../../../../../lib/articles";

function isAuthorized(request) {
  const password = request.headers.get("x-admin-password");
  return password && password === process.env.ADMIN_PASSWORD;
}

export async function PATCH(request, { params }) {
  if (!isAuthorized(request)) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { status, editorNote } = await request.json();
  if (!status || !["published", "rejected", "pending"].includes(status)) {
    return Response.json({ message: "Status tidak valid." }, { status: 400 });
  }

  const articles = await readArticles();
  const articleIndex = articles.findIndex((article) => article.id === params.id);

  if (articleIndex === -1) {
    return Response.json({ message: "Artikel tidak ditemukan." }, { status: 404 });
  }

  const updatedArticle = {
    ...articles[articleIndex],
    status,
    editorNote: editorNote || "",
    publishedAt: status === "published" ? new Date().toISOString() : null
  };

  articles[articleIndex] = updatedArticle;
  await writeArticles(articles);

  return Response.json({ article: updatedArticle });
}
