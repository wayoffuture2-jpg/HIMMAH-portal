import { readArticles } from "../../../../lib/articles";

function isAuthorized(request) {
  const password = request.headers.get("x-admin-password");
  return password && password === process.env.ADMIN_PASSWORD;
}

export async function GET(request) {
  if (!isAuthorized(request)) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const articles = await readArticles();
  const filtered = status ? articles.filter((article) => article.status === status) : articles;

  return Response.json({ articles: filtered });
}
