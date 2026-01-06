import Link from "next/link"
import { TrendingUp } from "lucide-react"

interface SidebarArticle {
  id: string
  title: string
  slug: string
  publishedAt: string
}

interface RightSidebarProps {
  trendingArticles: SidebarArticle[]
}

export function RightSidebar({ trendingArticles }: {trendingArticles:any}) {
  return (
    <aside className="hidden lg:ml-1 2xl:ml-12 lg:block lg:w-80  2xl:w-90 lg:sticky lg:top-20 lg:h-fit">
      <div className="space-y-6">
        {/* Trending Section */}
        <div className="rounded-lg border border-border shadow-md p-6 bg-sky-100 dark:bg-card transition-colors">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Trending</h3>
          </div>

          <div className="space-y-4">
            {trendingArticles.map((article:any, index:number) => (
              <Link
                key={article.id}
                href={`/artikel/${article.slug}`}
                className="block group pb-4 border-b border-border last:border-b-0 hover:opacity-75 transition-opacity"
              >
                <div className="flex gap-3">
                  <div className="shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(article.publishedAt).toLocaleDateString("id-ID", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link
            href="/cari"
            className="block mt-6 text-center bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Lihat Semua Trending
          </Link>
        </div>

        {/* Ad Space 1 */}
        {/* Ad Space - Support Image/Video from Upload */}
        <div className="bg-linear-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 p-8 text-center">
          <div className="text-xs text-muted-foreground mb-3 font-medium">IKLAN</div>
          <div className="bg-white dark:bg-slate-800 rounded h-64 flex items-center justify-center border border-dashed border-primary/30 min-h-[300px]">
            {/* Ganti URL berikut dari upload Anda sendiri */}
            {/* Contoh gambar */}
            {/* <img src="/uploads/iklan1.jpg" alt="Iklan" className="max-h-60 rounded-lg object-contain mx-auto" /> */}
            {/* Contoh video */}
            {/* <video src="/uploads/iklan1.mp4" autoPlay loop muted controls className="max-h-60 rounded-lg mx-auto" /> */}
            {/* Atur pakai kondisi, di bawah hanya placeholder jika tidak diisi */}
            <div className="text-center">
              <div className="text-sm font-medium text-muted-foreground mb-2">Ruang Iklan (Gambar/Video)</div>
              <div className="text-xs text-muted-foreground">Upload file gambar (JPG/PNG) atau video (MP4), max 300x600 px</div>
            </div>
          </div>
        </div>
        {/* Ad Space 1 */}
        <div className="bg-linear-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 p-8 text-center">
          <div className="text-xs text-muted-foreground mb-3 font-medium">IKLAN</div>
          <div className="bg-white dark:bg-slate-800 rounded h-64 flex items-center justify-center border border-dashed border-primary/30 min-h-[300px]">
            {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_2 && process.env.NEXT_PUBLIC_ADSENSE_SLOT_2 ? (
              <div className="w-full flex justify-center items-center">
                <ins
                  className="adsbygoogle"
                  style={{ display: "block", minWidth: "300px", minHeight: "600px" }}
                  data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_2}
                  data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_2}
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground mb-2">Ruang Iklan</div>
                <div className="text-xs text-muted-foreground">300x600 px</div>
              </div>
            )}
          </div>
        </div>

        {/* Ad Space 2 */}
        {/* AdSense Ad 300x250 or Fallback */}
        <div className="bg-linear-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 p-6 text-center">
          <div className="text-xs text-muted-foreground mb-3 font-medium">IKLAN</div>
          <div className="bg-white dark:bg-slate-800 rounded h-32 flex items-center justify-center border border-dashed border-primary/30 min-h-[140px]">
            {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && process.env.NEXT_PUBLIC_ADSENSE_SLOT ? (
              <div className="w-full flex justify-center items-center">
                <ins
                  className="adsbygoogle"
                  style={{ display: "block", minWidth: "300px", minHeight: "250px" }}
                  data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
                  data-ad-slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT}
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground mb-1">Ruang Iklan</div>
                <div className="text-xs text-muted-foreground">300x250 px</div>
              </div>
            )}
          </div>
        </div>
        {/* 
          Pastikan script AdSense dimuat di _document.tsx atau layout.js: 
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
          <script> (adsbygoogle = window.adsbygoogle || []).push({}); </script>
        */}
        
      </div>
    </aside>
  )
}
