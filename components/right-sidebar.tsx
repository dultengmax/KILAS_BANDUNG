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

export function RightSidebar({ trendingArticles }: RightSidebarProps) {
  return (
    <aside className="hidden lg:block lg:w-80 lg:sticky lg:top-20 lg:h-fit">
      <div className="space-y-6">
        {/* Trending Section */}
        <div className="bg-card rounded-lg border border-border shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold text-foreground">Trending</h3>
          </div>

          <div className="space-y-4">
            {trendingArticles.map((article, index) => (
              <Link
                key={article.id}
                href={`/artikel/${article.slug}`}
                className="block group pb-4 border-b border-border last:border-b-0 hover:opacity-75 transition-opacity"
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
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
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 p-8 text-center">
          <div className="text-xs text-muted-foreground mb-3 font-medium">IKLAN</div>
          <div className="bg-white dark:bg-slate-800 rounded h-64 flex items-center justify-center border border-dashed border-primary/30">
            <div className="text-center">
              <div className="text-sm font-medium text-muted-foreground mb-2">Ruang Iklan</div>
              <div className="text-xs text-muted-foreground">300x600 px</div>
            </div>
          </div>
        </div>

        {/* Ad Space 2 */}
        <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20 p-6 text-center">
          <div className="text-xs text-muted-foreground mb-3 font-medium">IKLAN</div>
          <div className="bg-white dark:bg-slate-800 rounded h-32 flex items-center justify-center border border-dashed border-primary/30">
            <div className="text-center">
              <div className="text-sm font-medium text-muted-foreground mb-1">Ruang Iklan</div>
              <div className="text-xs text-muted-foreground">300x250 px</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
