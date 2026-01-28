import Link from "next/link";
import Section from "../../components/Section";
import { readArticles } from "../../lib/articles";

export default async function ArtikelPage() {
  const articles = await readArticles();
  const published = articles
    .filter((article) => article.status === "published")
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return (
    <Section title="Artikel" subtitle="Publikasi">
      {published.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
          Belum ada artikel yang dipublikasikan.
        </div>
      ) : (
        <div className="grid gap-4">
          {published.map((article) => (
            <div key={article.id} className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-primary-500">{article.category}</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">
                <Link href={`/artikel/${article.slug}`}>{article.title}</Link>
              </h3>
              <p className="mt-2 text-sm text-slate-600">{article.content}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>{article.authorName}</span>
                <span>{new Date(article.publishedAt).toLocaleDateString("id-ID")}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
