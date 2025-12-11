import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArticleCard } from "@/components/article-card"
import { Share2, Clock, User, Calendar, Eye } from "lucide-react"
import { promises } from "dns"
import { getArticleById } from "@/lib/action/article"

// Mock data - akan diganti dengan database
const articlesDatabase: Record<string, any> = {
  "wali-kota-bandung-infrastruktur-2025": {
    id: "1",
    title: "Wali Kota Bandung Luncurkan Program Perbaikan Infrastruktur Sepanjang 2025",
    slug: "wali-kota-bandung-infrastruktur-2025",
    excerpt:
      "Program besar-besaran perbaikan jalan dan utilitas publik akan dimulai bulan depan dengan anggaran Rp 500 Miliar.",
    category: "Politik",
    author: "Ahmad Rizki",
    authorBio: "Jurnalis Senior dengan fokus pada berita pemerintahan dan kebijakan publik di Bandung",
    publishedAt: "2025-11-28",
    updatedAt: "2025-11-28",
    readTime: 6,
    views: 2345,
    featuredImage: "/public/bandung-city-infrastructure-modernization.jpg",
    content: `
      <h2>Rencana Besar Wali Kota untuk Modernisasi Infrastruktur</h2>
      <p>Wali Kota Bandung mengumumkan peluncuran program infrastruktur terbesar yang pernah ada dalam lima tahun terakhir. Dengan alokasi anggaran mencapai Rp 500 Miliar, program ini dirancang untuk meningkatkan kualitas hidup warga Bandung.</p>
      
      <h3>Fokus Utama Program</h3>
      <p>Program ini berfokus pada tiga area utama:</p>
      <ul>
        <li><strong>Perbaikan Jalan:</strong> 45 km jalan akan direpavasi dengan standar internasional</li>
        <li><strong>Sistem Drainase:</strong> Pembangunan sistem drainase modern untuk mengurangi genangan air</li>
        <li><strong>Utilitas Publik:</strong> Peningkatan sistem air bersih dan listrik di seluruh wilayah</li>
      </ul>
      
      <h3>Jadwal Implementasi</h3>
      <p>Pelaksanaan program akan dibagi menjadi tiga fase:</p>
      <ul>
        <li><strong>Fase 1 (Januari - Maret 2025):</strong> Sosialisasi dan persiapan</li>
        <li><strong>Fase 2 (April - Agustus 2025):</strong> Perbaikan jalan utama dan drainase</li>
        <li><strong>Fase 3 (September - Desember 2025):</strong> Penyelesaian dan penyempurnaan</li>
      </ul>
      
      <h3>Dampak Bagi Masyarakat</h3>
      <p>Wali Kota menekankan bahwa program ini akan membawa dampak positif bagi seluruh masyarakat Bandung. Infrastruktur yang lebih baik akan meningkatkan mobilitas, mengurangi kemacetan, dan menciptakan lingkungan yang lebih sehat.</p>
      
      <p>"Kami berkomitmen untuk membuat Bandung menjadi kota yang lebih modern dan nyaman untuk ditinggali," ujar Wali Kota dalam konferensi pers yang dihadiri oleh media massa dan stakeholder terkait.</p>
    `,
  },
}

const relatedArticles = [
  {
    id: "2",
    title: "DPRD Bandung Setujui Anggaran Pendidikan Tertinggi dalam Sejarah",
    slug: "dprd-bandung-anggaran-pendidikan",
    excerpt: "Rencana anggaran 2026 mengalokasikan 30% dari total budget untuk pendidikan.",
    featuredImage: "/public/bandung-school-education-building-classroom.jpg",
    category: "Politik",
    author: "Dewi Kurniawan",
    publishedAt: "2025-11-23",
    readTime: 4,
  },
  {
    id: "3",
    title: "Pertumbuhan Ekonomi Bandung Mencapai 5.2% di Kuartal III",
    slug: "pertumbuhan-ekonomi-bandung-q3",
    excerpt: "Analisis menunjukkan pertumbuhan ekonomi berkelanjutan di sektor manufaktur dan pariwisata.",
    featuredImage: "/placeholder.svg?key=d3fgv",
    category: "Politik",
    author: "Rian Wijaya",
    publishedAt: "2025-11-22",
    readTime: 5,
  },
  {
    id: "4",
    title: "Kolaborasi Pemerintah dan Swasta untuk Pembangunan Smart City Bandung",
    slug: "smart-city-bandung-kolaborasi",
    excerpt: "Inisiatif transformasi digital akan melibatkan 15 perusahaan teknologi terkemuka.",
    featuredImage: "/placeholder.svg?key=k8nqs",
    category: "Teknologi",
    author: "Budi Santoso",
    publishedAt: "2025-11-21",
    readTime: 6,
  },
]

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }>  }) {
  const dataarticle = articlesDatabase[(await params).slug]
  const result = await getArticleById(5)
  const article = result.article

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
    )
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Header />
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 py-8 md:py-12">
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
                href={`/kategori/${typeof cat === "string" ? cat.toLowerCase() : cat}`}
                className="hover:text-primary"
              >
                {cat}
              </Link>
            ))
          ) : (
            <p></p>
          )}
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium truncate max-w-xs md:max-w-lg text-wrap line-clamp-2" title={article.title}>
            {article.title}
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
                {cat}
              </span>
            )))
          }
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight wrap-break-word">{article.title}</h1>

        {/* Article Meta */}
        <div className="flex flex-wrap gap-4 md:gap-6 pb-6 border-b border-gray-200 dark:bord
        er-slate-700 mb-8">
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
            <Clock className="w-4 h-4" />
            <span>{article.readTime} min baca</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Eye className="w-4 h-4" />
            <span>
              {typeof article?.views === 'number' ? article.views.toLocaleString("id-ID") : '0'} views
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-96 md:h-[500px] rounded-lg overflow-hidden mb-8">
          <Image
            src={article?.image || ""}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
            priority
          />
        </div>

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
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.id} {...relatedArticle} />
            ))}
          </div>
        </section>
      </article>

      {/* Footer */}
      <Footer />
    </main>
  )
}
