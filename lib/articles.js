import { promises as fs } from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "articles.json");

export async function readArticles() {
  try {
    const raw = await fs.readFile(dataPath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

export async function writeArticles(articles) {
  await fs.writeFile(dataPath, JSON.stringify(articles, null, 2));
}

export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function ensureUniqueSlug(baseSlug, existingSlugs) {
  if (!existingSlugs.includes(baseSlug)) {
    return baseSlug;
  }
  let counter = 2;
  let slug = `${baseSlug}-${counter}`;
  while (existingSlugs.includes(slug)) {
    counter += 1;
    slug = `${baseSlug}-${counter}`;
  }
  return slug;
}
