import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VideoEmbed } from "@/components/video-embed"

// Mock video data
const videos = [
  {
    id: "1",
    title: "Peluncuran Program Infrastruktur Bandung 2025",
    description:
      "Wali Kota Bandung meluncurkan program perbaikan infrastruktur terbesar dengan anggaran Rp 500 Miliar.",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg?key=v1deo",
    provider: "youtube" as const,
    category: "Politik",
    publishedAt: "2025-11-28",
    duration: "15:30",
    views: 5200,
  },
  {
    id: "2",
    title: "Persib Bandung Training Session Persiapan Musim 2026",
    description: "Sesi latihan intensif Persib Bandung dalam mempersiapkan musim kompetisi 2026.",
    url: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    thumbnail: "/placeholder.svg?key=v2deo",
    provider: "youtube" as const,
    category: "Olahraga",
    publishedAt: "2025-11-25",
    duration: "12:45",
    views: 3100,
  },
  {
    id: "3",
    title: "Festival Seni Bandung 2025 - Highlights",
    description: "Sorotan acara Festival Seni Bandung 2025 dengan 100+ pertunjukan seni lokal.",
    url: "https://www.youtube.com/watch?v=kJQDUoO9FN0",
    thumbnail: "/placeholder.svg?key=v3deo",
    provider: "youtube" as const,
    category: "Gaya Hidup",
    publishedAt: "2025-11-20",
    duration: "18:20",
    views: 7800,
  },
]

export default function VideoPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      {/* Header */}
      <section className="bg-gradient-to-br from-amber-600 to-orange-600 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Video Bandung</h1>
          <p className="text-lg text-orange-100">
            Tonton berita terkini Bandung dalam format video yang menarik dan informatif
          </p>
        </div>
      </section>

      {/* Videos Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group bg-white dark:bg-slate-900 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-all"
            >
              {/* Video Embed */}
              <div className="relative">
                <VideoEmbed url={video.url} title={video.title} thumbnail={video.thumbnail} provider={video.provider} />
                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-4">
                <div className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded mb-2">
                  {video.category}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-amber-600">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{video.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{new Date(video.publishedAt).toLocaleDateString("id-ID")}</span>
                  <span>{video.views.toLocaleString("id-ID")} views</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors">
            Muat Video Lainnya
          </button>
        </div>
      </div>

      <Footer />
    </main>
  )
}
