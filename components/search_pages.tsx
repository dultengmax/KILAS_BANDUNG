"use client"

import { useSearchParams } from "next/navigation"
import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArticleCard } from "@/components/article-card"
import { Search } from "lucide-react"

export default function SearchPage({allArticles}:{allArticles:any}) {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchInput, setSearchInput] = useState(query)
  
  // Search filter
  const results = useMemo(() => {
    if (!searchInput.trim()) return []

    const lowerQuery = searchInput.toLowerCase()
    // Penulisan filter diperbaiki agar lebih aman dan fleksibel terhadap data null/undefined
    return allArticles.filter((article: any) => {
      const title = (article?.title || "").toString().toLowerCase();
      const excerpt = (article?.excerpt || "").toString().toLowerCase();
      const category = (article?.category || "").toString().toLowerCase();
      const author = (article?.author || "").toString().toLowerCase();

      return (
        title.includes(lowerQuery) ||
        excerpt.includes(lowerQuery) ||
        category.includes(lowerQuery) ||
        author.includes(lowerQuery)
      );
    });
  }, [searchInput, allArticles]);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      {/* Search Header */}
      <section className="bg-linear-to-br from-amber-600 to-orange-600 text-white py-12">
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
                {results.map((article:any) => (
                  <ArticleCard key={article.id} data={article}/>
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
