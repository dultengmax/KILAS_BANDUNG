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
        {/* Responsive Layout: flex-row on mobile, normal on md+ */}
        <div className="flex flex-row md:flex-col w-full">
          {/* Gambar di kiri pada mobile, atas di md+ */}
          <div className="relative h-28 w-28 md:h-48 md:w-full shrink-0 rounded-l-lg md:rounded-none md:rounded-t-lg overflow-hidden">
            <Image
              src={featuredImage || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300 md:rounded-t-lg"
              sizes="(max-width: 768px) 115px, (max-width: 1200px) 50vw, 33vw"
              style={{ objectPosition: "center" }}
            />
            {/* Kategori badge, lebih kecil dan menonjol di mobile */}
            <div className="absolute top-2 left-2 z-10">
              <span className="inline-block bg-primary/90 text-white text-[10px] md:text-xs font-semibold px-2 py-0.5 md:px-2 md:py-1 rounded-full shadow-md md:shadow-none">
                {category}
              </span>
            </div>
          </div>
          {/* Konten utama */}
          <div className="flex-1 flex flex-col justify-between md:p-4 p-3 gap-1">
            <div>
              {/* Judul lebih tebal & responsive, max 2 baris, ukuran mobile dioptimasi */}
              <h3 className="text-sm md:text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug md:mb-2 mb-1">
                {title}
              </h3>
              {/* Excerpt selalu tampil, singkat, max 2 baris, font mobile lebih kecil */}
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                {excerpt}
              </p>
            </div>
            {/* Meta info: penulis & tanggal, elipsis jika panjang */}
            <div className="flex items-center justify-between mt-2 md:mt-4 pt-2 md:pt-4 border-t border-border dark:border-slate-700 text-[11px] md:text-xs text-muted-foreground">
              <span className="truncate max-w-[85px] md:max-w-none" title={author}>{author}</span>
              <span className="whitespace-nowrap">
                {formatDate(publishedAt)} • {readTime} min
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
