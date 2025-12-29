import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ArticleCard } from "@/components/article-card";
import { getCategories } from "@/lib/action/kategory";

// Prisma schema Category model:
// model Category {
//   id          Int      @id @default(autoincrement())
//   name        String   @unique
//   description String?
//   subCategory String[]
// }

type CategoryPrisma = {
  id: number;
  name: string;
  description: string | null;
  subCategory: string[];
  articles?: any[]; // Make optional for rendering, real data likely needs to be loaded elsewhere
};

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  // Slug here refers to the category name (lowercased with possible dashes)
  const { slug } = await params;
  const categories: CategoryPrisma[] = await getCategories();

  // Convert category names to slug to match route param (handle spaces/dashes)
  const slugify = (name: string) =>
    name
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, "-")
      .replace(/[^\w-]+/g, "");

  // Find category by slugified name
  const category = categories.find((cat) => slugify(cat.name) === slug);

  if (!category) {
    return (
      <main className="min-h-screen bg-white dark:bg-slate-950">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Kategori Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-8">Maaf, kategori yang Anda cari tidak tersedia.</p>
        </div>
        <Footer />
      </main>
    );
  }

  // Placeholder: articles for a category - you should fetch real articles data here.
  const articles: any[] = category.articles ?? [];

  // For demonstrasi, assign icon/color based on index or name
  const categoryVisuals: Record<string, { icon: string; color: string }> = {
    politik: { icon: "🏛️", color: "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300" },
    olahraga: { icon: "⚽", color: "bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300" },
    kuliner: { icon: "🍲", color: "bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300" },
    teknologi: { icon: "💻", color: "bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300" },
    "gaya-hidup": { icon: "✨", color: "bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300" },
  };

  const catSlug = slugify(category.name);
  const visuals = categoryVisuals[catSlug] || { icon: "📚", color: "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200" };

  // Related categories (all except current)
  const relatedCategories = categories.filter((c) => slugify(c.name) !== catSlug);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      {/* Category Header */}
      <section className={`${visuals.color} py-12 md:py-16`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{visuals.icon}</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">{category.name}</h1>
              <p className="text-sm md:text-base opacity-90 mt-2">{articles.length} Artikel</p>
            </div>
          </div>
          <p className="text-base md:text-lg opacity-90 mt-6 max-w-2xl">{category.description}</p>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4 overflow-x-auto">
          <button className="px-4 py-2 bg-amber-600 text-white rounded-lg font-medium whitespace-nowrap">
            Terbaru
          </button>
          <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg font-medium whitespace-nowrap transition">
            Trending
          </button>
          <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg font-medium whitespace-nowrap transition">
            Populer
          </button>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        {articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {articles.map((article: any) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
            <div className="text-center">
              <button className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors">
                Muat Berita Lainnya
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">Belum ada artikel di kategori ini.</p>
          </div>
        )}
      </div>

      {/* Related Categories */}
      <section className="bg-gray-50 dark:bg-slate-800/50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Kategori Lainnya</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {relatedCategories.map((cat) => {
              const relSlug = slugify(cat.name);
              const relVisuals = categoryVisuals[relSlug] || { icon: "📚", color: "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200" };
              return (
                <a
                  key={cat.id}
                  href={`/kategori/${relSlug}`}
                  className={`p-4 rounded-lg font-semibold text-center hover:shadow-md transition-all ${relVisuals.color}`}
                >
                  <span className="text-2xl block mb-2">{relVisuals.icon}</span>
                  {cat.name}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
