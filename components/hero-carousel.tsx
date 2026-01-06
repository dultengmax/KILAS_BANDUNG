"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"



interface HeroCarouselProps {
  articles: any
  category:any
  autoScrollInterval?: number
}

export function HeroCarousel({ articles,category, autoScrollInterval = 5000 }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isAutoScroll, setIsAutoScroll] = useState(true)
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const progressRef = useRef<HTMLDivElement>(null)

  const goToSlide = (index: number) => {
    setCurrent(index % articles.length)
    setIsAutoScroll(true)
  }

  const next = () => {
    setCurrent((prev) => (prev + 1) % articles.length)
    setIsAutoScroll(true)
  }

  const prev = () => {
    setCurrent((prev) => (prev - 1 + articles.length) % articles.length)
    setIsAutoScroll(true)
  }

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoScroll) return

    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % articles.length)
    }, autoScrollInterval)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [current, isAutoScroll, autoScrollInterval, articles?.length ?? 0])

  // Remove old progress bar animation effect, handled by framer-motion now

  const currentArticle = articles[current]

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-72 md:h-[500px] lg:h-[520px] w-full rounded-sm mx-auto overflow-hidden group"
        onMouseEnter={() => setIsAutoScroll(false)}
        onMouseLeave={() => setIsAutoScroll(true)}
      >
        {/* Image with fade transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentArticle?.featuredImage}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <Image
              src={currentArticle?.featuredImage || "/placeholder.svg"}
              alt={currentArticle?.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority={current === 0}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Enhanced linear overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/40 to-black/80 dark:from-black/10 dark:via-black/50 dark:to-black/90" />
        {/* Accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-primary via-blue-500 to-primary" />

        {/* Hero content */}
        <motion.div
          className="absolute inset-0 flex items-end p-4 md:p-8 lg:p-12"
          key={currentArticle?.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="max-w-4xl w-full pb-16">


            <motion.div
              className="inline-flex items-center gap-2 bg-primary dark:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-full mb-4 shadow-xl hover:shadow-2xl transition-shadow smooth-transition"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 18 }}
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              {
              category &&
              Array.isArray(category) &&
              category?.find((i:any)=>i.id === currentArticle?.category)?.name || ''}
            </motion.div>

            {/* Title */}
            <motion.a
              href={`/artikel/${currentArticle?.slug}`}
              className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight line-clamp-3 drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              tabIndex={0}
            >
              {currentArticle?.title}
            </motion.a>

            {/* Excerpt */}
            <motion.p
              className="text-white/95 text-xs md:text-lg mb-6 line-clamp-2 drop-shadow-md max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.5 }}
            >
              {currentArticle?.excerpt}
            </motion.p>

            {/* Meta + CTA */}
            <motion.div
              className="flex items-center justify-between gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex gap-4 text-white/90 text-sm drop-shadow-md">
                <span className="font-medium text-xs">{currentArticle?.userId}</span>
                <span>•</span>
                <span className="text-xs">{new Date(currentArticle?.publishedAt).toLocaleDateString("id-ID")}</span>
              </div>

            </motion.div>
          </div>
        </motion.div>

        {/* Navigation Arrows */}
        <motion.button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 smooth-transition"
          aria-label="Previous slide"
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>
        <motion.button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 smooth-transition"
          aria-label="Next slide"
          whileTap={{ scale: 0.85 }}
          whileHover={{ scale: 1.1 }}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>

        {/* Pagination dots with animated progress - moved to absolute bottom */}
        <div className="absolute left-0 right-0 bottom-4 flex items-center justify-center z-30 pointer-events-none">
          <div className="flex gap-2 w-1/5 max-w-2xl pointer-events-auto">
            {articles.map((_:any, idx:number) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className="relative h-1 flex-1 bg-muted dark:bg-slate-700 rounded-full overflow-hidden transition-all hover:bg-muted-foreground/30 dark:hover:bg-slate-600 smooth-transition group"
                aria-label={`Go to slide ${idx + 1}`}
              >
                {/* Progress indicator */}
                {idx === current && (
                  <motion.div
                    ref={progressRef}
                    className="absolute inset-y-0 left-0 bg-linear-to-r from-primary to-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: autoScrollInterval / 1000, ease: "linear" }}
                  />
                )}

                {/* Static background for non-current slides */}
                {idx !== current && (
                  <div className="absolute inset-y-0 left-0 bg-primary/20 dark:bg-blue-500/20 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}







export function HeroCarousel2({ sideHeroes }: { sideHeroes: any}) {
  // Show 1 card per page
  const CARDS_PER_ROW = 1;
  const total = sideHeroes?.length || 0;
  const maxPage = total > 0 ? Math.ceil(total / CARDS_PER_ROW) : 0;

  const [page, setPage] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const AUTO_SCROLL_INTERVAL = 3500;
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (maxPage <= 1) return;
    if (paused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setPage((prev) => (prev + 1) % maxPage);
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, maxPage]);

  const goToPage = (idx: number) => {
    setPage(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const getShownArticles = () => {
    if (!sideHeroes) return [];
    const start = page * CARDS_PER_ROW;
    return sideHeroes.slice(start, start + CARDS_PER_ROW);
  };

  return (
    <div
      className="md:grid grid-cols-1 hidden gap-1 relative h-[520px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="w-full h-full relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={page}
            initial={{ y: 60, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -60, opacity: 0, scale: 0.97 }}
            transition={{
              duration: 0.5,
              type: "spring",
              bounce: 0.18,
            }}
            className="absolute top-0 left-0 w-full h-full"
            style={{ zIndex: 20 }}
          >
            <div className="grid grid-cols-1 h-full gap-2">
              {getShownArticles()?.map((article: any, idx: number) => (
                <Link
                  key={article?.id || idx}
                  href={`/artikel/${article?.slug}`}
                  className="group flex flex-col h-1/3 bg-card dark:bg-card hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 overflow-hidden border border-border dark:border-border hover:border-primary/50 dark:hover:border-secondary/50 smooth-transition rounded-2xl flex-1"
                >
                  <div className="relative h-full rounded-2xl overflow-hidden bg-muted dark:bg-muted">
                    <Image
                      src={article?.featuredImage || "/placeholder.svg"}
                      alt={article?.title || "Thumbnail"}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/75 pointer-events-none" />
                    {/* Index badge */}
                    <div className="absolute top-3 left-3 bg-primary dark:bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                      {"k"}
                    </div>
                  </div>
                  {/* Article Info */}
                  <div className="flex-1 flex flex-col justify-end px-4 pb-3 relative">
                    <h3
                      className="text-lg truncate font-semibold text-white mb-3 line-clamp-2"
                      title={article?.title}
                    >
                      {article?.title || ""}
                    </h3>
                    <span className="text-xs mt-2 text-white absolute bottom-2 right-4">
                      {article?.publishedAt ? new Date(article.publishedAt).toLocaleDateString("id-ID") : ""}
                    </span>
                  </div>
                </Link>
              ))}
              {/* Empty slot for layout alignment if needed */}
              {(() => {
                const _shown = getShownArticles();
                const fill = CARDS_PER_ROW - _shown.length;
                return fill > 0
                  ? Array.from({ length: fill }).map((_, i) => (
                      <div
                        key={`empty-${i}`}
                        className="flex-1 rounded-2xl"
                        style={{ opacity: 0 }}
                      ></div>
                    ))
                  : null;
              })()}
            </div>
          </motion.div>
        </AnimatePresence>
        {/* Pagination Dots */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
          {Array.from({ length: maxPage }).map((_, idx: number) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full border-2 transition-all ${
                idx === page
                  ? "bg-primary/90 border-primary"
                  : "bg-card/40 border-muted"
              }`}
              style={{
                boxShadow: idx === page ? '0 0 0 1.5px #60A5FA, 0 0 3px 1px #60A5FA30' : undefined,
              }}
              onClick={() => goToPage(idx)}
              aria-label={`Lihat highlight baris ${idx + 1}`}
              tabIndex={0}
            >
              {idx === page && (
                <motion.div
                  layoutId="dot-anim"
                  className="w-full h-full rounded-full"
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
