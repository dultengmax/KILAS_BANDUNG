"use client"

import { useSearchParams } from "next/navigation"
import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArticleCard } from "@/components/article-card"
import { Search } from "lucide-react"

// Mock data - semua artikel
const allArticles = [
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
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchInput, setSearchInput] = useState(query)

  // Search filter
  const results = useMemo(() => {
    if (!searchInput.trim()) return []

    const lowerQuery = searchInput.toLowerCase()
    return allArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(lowerQuery) ||
        article.excerpt.toLowerCase().includes(lowerQuery) ||
        article.category.toLowerCase().includes(lowerQuery) ||
        article.author.toLowerCase().includes(lowerQuery),
    )
  }, [searchInput])

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      {/* Search Header */}
      <section className="bg-gradient-to-br from-amber-600 to-orange-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Cari Berita</h1>
          <div className="flex gap-2">
            <div className="flex-1 flex items-center bg-white dark:bg-slate-900 rounded-lg px-4 py-3">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Cari berita, kategori, atau penulis..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-500"
                autoFocus
              />
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {searchInput ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Hasil Pencarian</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Ditemukan <span className="font-bold text-amber-600">{results.length}</span> hasil untuk "{searchInput}"
              </p>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((article) => (
                  <ArticleCard key={article.id} {...article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Tidak ada hasil</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Coba gunakan kata kunci lain atau jelajahi kategori kami
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Mulai Pencarian</h3>
            <p className="text-gray-600 dark:text-gray-400">Ketik kata kunci di atas untuk mencari berita</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
