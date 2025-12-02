import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArticleCard } from "@/components/article-card"

// Mock data
const categoryData: Record<string, any> = {
  politik: {
    name: "Politik",
    description: "Berita terkini seputar pemerintahan, kebijakan publik, dan dinamika politik lokal Bandung",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    icon: "🏛️",
    articles: [
      {
        id: "1",
        title: "Wali Kota Bandung Luncurkan Program Perbaikan Infrastruktur Sepanjang 2025",
        slug: "wali-kota-bandung-infrastruktur-2025",
        excerpt:
          "Program besar-besaran perbaikan jalan dan utilitas publik akan dimulai bulan depan dengan anggaran Rp 500 Miliar.",
        featuredImage: "/public/bandung-city-infrastructure-modernization.jpg",
        category: "Politik",
        author: "Ahmad Rizki",
        publishedAt: "2025-11-28",
        readTime: 6,
      },
      {
        id: "6",
        title: "DPRD Bandung Setujui Anggaran Pendidikan Tertinggi dalam Sejarah",
        slug: "dprd-bandung-anggaran-pendidikan",
        excerpt:
          "Rencana anggaran 2026 mengalokasikan 30% dari total budget untuk meningkatkan kualitas pendidikan di sekolah-sekolah negeri.",
        featuredImage: "/public/bandung-school-education-building-classroom.jpg",
        category: "Politik",
        author: "Dewi Kurniawan",
        publishedAt: "2025-11-23",
        readTime: 4,
      },
      {
        id: "7",
        title: "Pertumbuhan Ekonomi Bandung Mencapai 5.2% di Kuartal III",
        slug: "pertumbuhan-ekonomi-bandung-q3",
        excerpt: "Analisis menunjukkan pertumbuhan ekonomi berkelanjutan di sektor manufaktur dan pariwisata.",
        featuredImage: "/placeholder.svg?key=d3fgv",
        category: "Politik",
        author: "Rian Wijaya",
        publishedAt: "2025-11-22",
        readTime: 5,
      },
    ],
  },
  olahraga: {
    name: "Olahraga",
    description:
      "Informasi lengkap tentang perkembangan olahraga di Bandung, termasuk berita Persib dan event olahraga lainnya",
    color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    icon: "⚽",
    articles: [
      {
        id: "2",
        title: "Persib Bandung Siapkan Strategi Baru Untuk Kejuaraan 2026",
        slug: "persib-bandung-strategi-2026",
        excerpt: "Manajemen Persib mengumumkan penguatan skuad dengan kedatangan 3 pemain asing berkualitas tinggi.",
        featuredImage: "/public/persib-bandung-soccer-team-training.jpg",
        category: "Olahraga",
        author: "Budi Santoso",
        publishedAt: "2025-11-27",
        readTime: 5,
      },
      {
        id: "8",
        title: "Bandung Marathon 2025 Catat Rekor Peserta Terbanyak",
        slug: "bandung-marathon-2025-rekor",
        excerpt: "Acara berlari beregu tahunan ini menghadirkan lebih dari 5000 peserta dari berbagai kota.",
        featuredImage: "/placeholder.svg?key=k2wsd",
        category: "Olahraga",
        author: "Rina Gunawan",
        publishedAt: "2025-11-20",
        readTime: 4,
      },
    ],
  },
  kuliner: {
    name: "Kuliner",
    description:
      "Jelajahi kelezatan kuliner Bandung, dari makanan tradisional hingga restoran modern dan review makanan",
    color: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
    icon: "🍲",
    articles: [
      {
        id: "3",
        title: "Rekomendasi 7 Kuliner Bandung yang Wajib Dicoba Sebelum Akhir Tahun",
        slug: "kuliner-bandung-rekomendasi-7-tempat",
        excerpt:
          "Dari nasi kuning legendaris hingga bakso premium, inilah tempat-tempat kuliner terbaik di Bandung yang harus ada di list Anda.",
        featuredImage: "/public/traditional-bandung-food-local-cuisine.jpg",
        category: "Kuliner",
        author: "Siti Nurhaliza",
        publishedAt: "2025-11-26",
        readTime: 7,
      },
      {
        id: "9",
        title: "Cafe Terbaru di Bandung Mengedepankan Konsep Sustainable dan Eco-Friendly",
        slug: "cafe-baru-bandung-sustainable",
        excerpt: "Konsep green cafe semakin diminati di kalangan milenial Bandung yang peduli lingkungan.",
        featuredImage: "/placeholder.svg?key=m9xls",
        category: "Kuliner",
        author: "Fauzan Ahmad",
        publishedAt: "2025-11-19",
        readTime: 5,
      },
    ],
  },
  teknologi: {
    name: "Teknologi",
    description: "Perkembangan teknologi di Bandung, startup lokal, inovasi digital, dan berita tech terkini",
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    icon: "💻",
    articles: [
      {
        id: "4",
        title: "Startup Teknologi Bandung Raih Pendanaan Seri A Sebesar $2 Juta",
        slug: "startup-bandung-pendanaan-2-juta",
        excerpt:
          "Perusahaan rintisan lokal berhasil mengamankan investasi dari investor ventura internasional untuk ekspansi regional.",
        featuredImage: "/public/bandung-tech-startup-office-innovation.jpg",
        category: "Teknologi",
        author: "Rani Wijaya",
        publishedAt: "2025-11-25",
        readTime: 5,
      },
      {
        id: "10",
        title: "Kolaborasi Pemerintah dan Swasta untuk Pembangunan Smart City Bandung",
        slug: "smart-city-bandung-kolaborasi",
        excerpt:
          "Inisiatif transformasi digital akan melibatkan 15 perusahaan teknologi terkemuka untuk modernisasi kota.",
        featuredImage: "/placeholder.svg?key=q3zxn",
        category: "Teknologi",
        author: "Budi Santoso",
        publishedAt: "2025-11-21",
        readTime: 6,
      },
    ],
  },
  "gaya-hidup": {
    name: "Gaya Hidup",
    description: "Gaya hidup, seni budaya, fashion, dan tren lifestyle terkini dari Bandung",
    color: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300",
    icon: "✨",
    articles: [
      {
        id: "5",
        title: "Festival Seni Bandung 2025 Menyajikan 100+ Pertunjukan Seni Lokal",
        slug: "festival-seni-bandung-2025-100-pertunjukan",
        excerpt:
          "Kolaborasi seniman lokal menghadirkan pameran seni rupa, teater, musik, dan tari dalam satu venue spektakuler.",
        featuredImage: "/public/bandung-art-festival-cultural-performance.jpg",
        category: "Gaya Hidup",
        author: "Maya Santosa",
        publishedAt: "2025-11-24",
        readTime: 6,
      },
      {
        id: "11",
        title: "Tren Fashion Bandung 2026: Kebangkitan Fashion Lokal dan Desainer Muda",
        slug: "tren-fashion-bandung-2026",
        excerpt: "Desainer muda Bandung semakin dikenal di tingkat nasional dengan koleksi yang unik dan bermakna.",
        featuredImage: "/placeholder.svg?key=p5tao",
        category: "Gaya Hidup",
        author: "Silvia Putri",
        publishedAt: "2025-11-18",
        readTime: 5,
      },
    ],
  },
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categoryData[params.slug]

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
    )
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      {/* Category Header */}
      <section className={`${category.color} py-12 md:py-16`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{category.icon}</span>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">{category.name}</h1>
              <p className="text-sm md:text-base opacity-90 mt-2">{category.articles.length} Artikel</p>
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
        {category.articles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {category.articles.map((article) => (
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
            {Object.entries(categoryData).map(
              ([slug, cat]) =>
                slug !== params.slug && (
                  <a
                    key={slug}
                    href={`/kategori/${slug}`}
                    className={`p-4 rounded-lg font-semibold text-center hover:shadow-md transition-all ${cat.color}`}
                  >
                    <span className="text-2xl block mb-2">{cat.icon}</span>
                    {cat.name}
                  </a>
                ),
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
