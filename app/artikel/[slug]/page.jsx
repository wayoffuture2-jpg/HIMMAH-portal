import Link from "next/link";
import Section from "../../../components/Section";
import { readArticles } from "../../../lib/articles";

export default async function ArtikelDetailPage({ params }) {
  const articles = await readArticles();
  const article = articles.find(
    (item) => item.status === "published" && item.slug === params.slug
  );

  if (!article) {
    return (
      <Section title="Artikel Tidak Ditemukan" subtitle="404">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
          Artikel yang Anda cari belum tersedia. Kembali ke daftar artikel.
          <div className="mt-4">
            <Link className="text-primary-600 font-semibold" href="/artikel">
              Kembali ke Artikel
            </Link>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section title={article.title} subtitle={article.category}>
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-wrap items-center justify-between text-xs text-slate-500">
          <span>Penulis: {article.authorName}</span>
          <span>{new Date(article.publishedAt).toLocaleDateString("id-ID")}</span>
        </div>
        <div className="mt-4 prose-content whitespace-pre-line text-sm">{article.content}</div>
        <div className="mt-6">
          <Link className="text-primary-600 font-semibold" href="/artikel">
            &larr; Kembali ke Artikel
          </Link>
        </div>
      </div>
    </Section>
  );
}
