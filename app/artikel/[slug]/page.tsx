import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArticleCard } from "@/components/article-card"
import { Share2, Clock, User, Calendar, Eye } from "lucide-react"
import { promises } from "dns"
import { getArticleById, getArticleBySlug, getArticles } from "@/lib/action/article"
import { Metadata } from "next"
import { getCategories } from "@/lib/action/kategory"

// ========= METADATA GENERATOR (Dynamic Head for SEO) =========
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const {slug} = await params
  const result = await getArticleBySlug(slug)
  const article = result?.article

  if (!article) {
    return {
      title: "Postingan Tidak Ditemukan | Portal Berita Indonesia",
      description: "Maaf, artikel yang Anda cari tidak ditemukan.",
      robots: {
        index: false,
        follow: false,
        nocache: true,
      },
    }
  }

  // Ganti dengan nama situs yang lebih unik & memorable
  const siteName = "Kilas Bandung • Berita Terkini & Inspiratif"
  const url = `https://kilasbandung.id/artikel/${article.slug}`
  const publishedTime = article.publishedAt ? new Date(article.publishedAt).toISOString() : ""
  const updatedTime = article.updatedAt ? new Date(article.updatedAt).toISOString() : publishedTime
  const mainImage =
    article.image ||
    article.featuredImage ||
    "/opengraph-default-news.jpg"

  // Compose keywords for SEO: combine title, categories, author, city names, etc.
  const keywordsFromCategory = Array.isArray(article.category)
    ? article.category
    : (typeof article.category === "string" ? [article.category] : [])
  const extraTags = [
    ...keywordsFromCategory,
    article?.author || "",
    ...(article?.title || "").split(" "),
    ...(article?.excerpt || "").split(" "),
    "Portal Berita Indonesia", "Berita", "Terkini", "Update", "Indonesia"
  ]
  const metaKeywords = Array.from(new Set(extraTags.map(t => (t || "").toString().toLowerCase()))).join(", ")

  return {
    title: `${article.title} | ${siteName}`,
    description: article?.excerpt || (typeof article.content === "string"
      ? article.content.replace(/<[^>]+>/g, "").substring(0, 170)
      : siteName),
    keywords: metaKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      locale: "id_ID",
      title: article.title,
      description: article?.excerpt || "",
      url: url,
      siteName: siteName,
      publishedTime: publishedTime || undefined,
      modifiedTime: updatedTime || undefined,
      authors: article.author ? [article.author] : undefined,
      images: [
        {
          url: mainImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@yourtwitterhandle", // Ganti dengan akun Twitter portal Anda
      title: article.title,
      description: article?.excerpt || "",
      images: [mainImage],
      creator: article?.author ? `@${article.author.replace(/\s+/g, "")}` : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
    authors: article?.author
      ? [{ name: article.author, url: `https://kilasbandung.id/penulis/${encodeURIComponent(article.author)}` }]
      : undefined,
    other: {
      "article:tag": metaKeywords,
      "article:published_time": publishedTime || "",
      "article:modified_time": updatedTime || "",
      // Schema.org JSON-LD markup for Article
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": article.title,
        "image": [mainImage],
        "datePublished": publishedTime,
        "dateModified": updatedTime,
        "author": {
          "@type": "Person",
          "name": article.author || "",
        },
        "publisher": {
          "@type": "Organization",
          "name": siteName,
          "logo": {
            "@type": "ImageObject",
            "url": "https://yourdomain.com/logo-berita.png",
          }
        },
        "description": article?.excerpt || "",
        "mainEntityOfPage": url,
      }),
    },
  }
}
// ========== END METADATA GENERATOR ===============

// Mock data - akan diganti dengan database
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const result = await getArticleBySlug(slug);
  const category = await getCategories()
  const article = result?.article;

  // Fetch all articles for latest and related section
  const allArticles = (await getArticles())?.articles || [];

  // Artikel Terkait = exclude current article and pick by same/main category if available
  const relatedArticles = Array.isArray(allArticles)
    ? allArticles.filter((a: any) => a.slug !== slug).slice(0, 3)
    : [];

  // Berita Terkini: ambil 5 artikel terbaru (bisa diurutkan by publishedAt jika tersedia, fallback urutan asli)
  const latestArticles = Array.isArray(allArticles)
    ? allArticles
        .sort((a: any, b: any) => (new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()))
        .slice(0, 5)
    : [];

  if (!article) {
    return (
      <main className="min-h-screen bg-white dark:bg-slate-950">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Artikel Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-8">Maaf, artikel yang Anda cari tidak tersedia.</p>
          <Link href="/" className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90">
            Kembali ke Beranda
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      {/* Grid: Main content (2/3) + Sidebar (1/3) */}
      <div className="max-w-7xl px-4 mx-auto py-8 md:py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Main Article Section */}
        <article className="col-span-2">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <Link href="/" className="hover:text-primary">
              Beranda
            </Link>
            <span>/</span>
            {Array.isArray(article.category) ? (
              article.category.map((cat: any, idx: number) => (
                <Link
                  key={cat + idx}
                  href={`/kategori/${category.find((item: any) => item.id === Number(cat))?.name }`}
                  className="hover:text-primary"
                >
                  {category.find((item: any) => item.id === Number(cat))?.name }
                </Link>
              ))
            ) : (
              <p></p>
            )}
            <span>/</span>
            <span
              className="text-gray-900 dark:text-white font-medium truncate max-w-xs md:max-w-lg overflow-hidden whitespace-nowrap"
              title={article.title}
            >
              {article?.title}
            </span>
          </div>

          {/* Category Tag */}
          <div className="mb-4">
            {Array.isArray(article.category) && (
              article.category.map((cat: any, idx: number) => (
                <span
                  key={cat + idx}
                  className="inline-block bg-primary text-white text-xs font-bold px-4 py-2 rounded-full mr-2"
                >
                  {category.find((item: any) => item.id === Number(cat))?.name }
                  </span>
              ))
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight wrap-break-word">{article.title}</h1>

          {/* Article Meta */}
          <div className="flex flex-wrap gap-4 md:gap-6 pb-6 border-b border-gray-200 dark:border-slate-700 mb-8">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-primary" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{article.author}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(article.publishedAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>


            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Eye className="w-4 h-4" />
              <span>
                {typeof article?.views === 'number' ? article.views.toLocaleString("id-ID") : '0'} views
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-96 md:h-500px rounded-lg overflow-hidden mb-8">
            <Image
              src={article?.image || ""}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
              priority
            />
          </div>
          <p>{article.excerpt}</p>

          {/* Audio Component */}
          {article.audio && (
            <div className="mb-8">
              <audio controls className="w-full">
                <source src={article.audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* Article Content */}
          <div className="prose dark:prose-invert prose-lg max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: article.content ?? "" }} />
          </div>

          {/* Share Section */}
          <div className="bg-gray-100 dark:bg-slate-800 p-6 rounded-lg mb-12">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Bagikan Artikel:</span>
              <button className="p-2 bg-white dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition">
                <Share2 className="w-5 h-5" />
              </button>
              <a href="#" className="inline-block p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Facebook
              </a>
              <a href="#" className="inline-block p-2 bg-sky-400 text-white rounded-lg hover:bg-sky-500">
                Twitter
              </a>
            </div>
          </div>

          {/* Related Articles */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Artikel Terkait</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {allArticles?.map((relatedArticle: any, index: number) => (
                <ArticleCard key={index} data={relatedArticle} />
              ))}
            </div>
          </section>
        </article>

        {/* Sidebar */}
        <aside className="col-span-1">
          {/* Berita Terkini (Latest News) */}
          <div className="sticky top-24 space-y-10">
            <section className="bg-white dark:bg-slate-800 rounded-xl shadow border mb-8">
              <h2 className="text-xl font-semibold px-6 pt-6 pb-2 text-primary">Berita Terkini</h2>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {latestArticles.map((news: any, idx: number) => (
                  <li key={news.slug || idx} className="px-6 py-4 hover:bg-muted/40 transition">
                    <Link href={`/artikel/${news.slug}`} className="flex gap-3 items-center group">
                      <div className="shrink-0 w-12 h-12 rounded bg-gray-200 overflow-hidden relative">
                        {news.featuredImage && (
                          <Image
                            src={news.featuredImage}
                            alt={news.title}
                            fill
                            className="object-cover rounded"
                            sizes="48px"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm md:text-base text-foreground group-hover:text-primary line-clamp-2">{news.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(news.publishedAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Iklan Sidebar */}
            <section className="bg-white dark:bg-slate-800 rounded-xl shadow border flex flex-col items-center p-6">
              <div className="mb-3 flex gap-2 items-center">
                <span className="text-xs uppercase font-bold text-primary tracking-wide">Iklan</span>
                <span className="inline-block animate-pulse bg-primary/60 rounded-full w-2 h-2"></span>
              </div>
              {/* Placeholder or Ad image */}
              <div className="w-full h-40 md:h-56 rounded bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400 text-center font-medium">
                  Tempat untuk <br />
                  <span className="font-bold text-primary">IKLAN ANDA</span>
                  <br />
                  (336x280)
                </span>
              </div>
              {/* Optional: tambahkan CTA/teks info iklan */}
              <p className="text-xs md:text-sm text-muted-foreground mt-4 text-center">
                Hubungi <a href="mailto:iklan@kilasbandung.id" className="underline text-primary">iklan@kilasbandung.id</a> untuk pasang iklan di sini.
              </p>
            </section>
          </div>
        </aside>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
