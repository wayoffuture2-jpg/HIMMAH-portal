import { readArticles, writeArticles, slugify, ensureUniqueSlug } from "../../../lib/articles";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const articles = await readArticles();
  const filtered = status ? articles.filter((article) => article.status === status) : articles;

  return Response.json({ articles: filtered });
}

export async function POST(request) {
  const body = await request.json();
  const { authorName, contact, title, category, content } = body;

  if (!authorName || !contact || !title || !category || !content) {
    return Response.json({ message: "Semua field wajib diisi." }, { status: 400 });
  }

  const articles = await readArticles();
  const baseSlug = slugify(title);
  const slug = ensureUniqueSlug(baseSlug, articles.map((article) => article.slug));

  const newArticle = {
    id: `art-${Date.now()}`,
    slug,
    title,
    category,
    content,
    authorName,
    contact,
    status: "pending",
    editorNote: "",
    createdAt: new Date().toISOString(),
    publishedAt: null
  };

  articles.push(newArticle);
  await writeArticles(articles);

  return Response.json({ article: newArticle }, { status: 201 });
}
