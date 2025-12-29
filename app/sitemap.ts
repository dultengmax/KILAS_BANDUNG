import { getArticles } from "@/lib/action/article";
import { getCategories } from "@/lib/action/kategory";

// Per Next.js docs, don't import { MetadataRoute } just for types, use the type directly.
// https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#generating-sitemaps

export default async function sitemap(): Promise<
  Array<{
    url: string;
    lastModified: Date;
  }>
> {
  const now = new Date();

  // Data fetch
  let articles: any[] = [];
  let categories: any[] = [];
  try {
    const articlesData = await getArticles();
    articles = articlesData?.articles || [];
  } catch (e) {
    // log error if needed
    articles = [];
  }
  try {
    categories = await getCategories();
  } catch (e) {
    // log error if needed
    categories = [];
  }

  const baseUrl = "https://kilasbandung.id";

  // Static routes for SEO, add main page and relevant ones
  const staticUrls = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/artikel`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/kategori`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
    },
    // Tambahkan halaman lain jika diperlukan
  ];

  // Article URLs - use absolute path, updated date if available
  const articleUrls = articles.map((article) => {
    // Pastikan slug tanpa karakter aneh, fallback ke id
    const slug = article?.slug
      ? encodeURIComponent(article.slug)
      : article?.id
        ? encodeURIComponent(String(article.id))
        : "";
    return {
      url: `${baseUrl}/artikel/${slug}`,
      lastModified: article?.updatedAt
        ? new Date(article.updatedAt)
        : now,
    };
  });

  // Category URLs - treat same as articles, SEO best for category listing
  const categoryUrls = categories.map((cat) => {
    const slug = cat?.slug
      ? encodeURIComponent(cat.slug)
      : cat?.id
        ? encodeURIComponent(String(cat.id))
        : "";
    return {
      url: `${baseUrl}/kategori/${slug}`,
      lastModified: cat?.updatedAt
        ? new Date(cat.updatedAt)
        : now,
    };
  });

  // Gabungkan, crimp duplicates (SEO best practices)
  const allUrls = [
    ...staticUrls,
    ...categoryUrls,
    ...articleUrls,
  ];

  // Optional: Remove duplicates (jika terjadi)
  const uniqueUrls = Array.from(
    new Map(
      allUrls.map((item) => [item.url, item])
    ).values()
  );

  return uniqueUrls;
}
