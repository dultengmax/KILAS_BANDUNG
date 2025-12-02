import Image from "next/image"
import Link from "next/link"
import { formatDate } from "@/lib/date-utils"

interface ArticleCardProps {
  id: string
  title: string
  slug: string
  excerpt: string
  featuredImage: string
  category: string
  author: string
  publishedAt: string
  readTime?: number
  featured?: boolean
}

export function ArticleCard({
  title,
  slug,
  excerpt,
  featuredImage,
  category,
  author,
  publishedAt,
  readTime = 5,
  featured = false,
}: ArticleCardProps) {
  return (
    <Link href={`/artikel/${slug}`}>
      <article className="group cursor-pointer h-full overflow-hidden rounded-lg bg-white dark:bg-slate-900 border border-border dark:border-slate-700 hover:shadow-lg transition-all duration-300">
        <div className="relative overflow-hidden h-48">
          <Image
            src={featuredImage || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
              {category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{excerpt}</p>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border dark:border-slate-700 text-xs text-muted-foreground">
            <span>{author}</span>
            <span>
              {formatDate(publishedAt)} • {readTime} min
            </span>
          </div>
        </div>
      </article>
    </Link>
  )
}
