"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface CarouselArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  featuredImage: string
  category: string
  author: string
  publishedAt: string
  readTime: number
  breaking?: boolean
}

interface HeroCarouselProps {
  articles: CarouselArticle[]
  autoScrollInterval?: number
}

export function HeroCarousel({ articles, autoScrollInterval = 5000 }: HeroCarouselProps) {
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
  }, [current, isAutoScroll, autoScrollInterval, articles.length])

  // Remove old progress bar animation effect, handled by framer-motion now

  const currentArticle = articles[current]

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative h-96 md:h-[500px] lg:h-[550px] w-full md:w-4/5 mx-auto overflow-hidden group"
        onMouseEnter={() => setIsAutoScroll(false)}
        onMouseLeave={() => setIsAutoScroll(true)}
      >
        {/* Image with fade transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentArticle.featuredImage}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <Image
              src={currentArticle.featuredImage || "/placeholder.svg"}
              alt={currentArticle.title}
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
          key={currentArticle.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="max-w-4xl w-full pb-16">
            {/* Category badge */}
            {currentArticle.breaking && (
              <motion.div
                className="inline-flex items-center gap-2 bg-destructive dark:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-full mb-3 shadow-xl animate-pulse"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Zap className="w-4 h-4" />
                BREAKING
              </motion.div>
            )}

            <motion.div
              className="inline-flex items-center gap-2 bg-primary dark:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-full mb-4 shadow-xl hover:shadow-2xl transition-shadow smooth-transition"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 18 }}
            >
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              {currentArticle.category}
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-2xl md:text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight line-clamp-3 drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              {currentArticle.title}
            </motion.h1>

            {/* Excerpt */}
            <motion.p
              className="text-white/95 text-xs md:text-lg mb-6 line-clamp-2 drop-shadow-md max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.5 }}
            >
              {currentArticle.excerpt}
            </motion.p>

            {/* Meta + CTA */}
            <motion.div
              className="flex items-center justify-between gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex gap-4 text-white/90 text-sm drop-shadow-md">
                <span className="font-medium text-xs">{currentArticle.author}</span>
                <span>•</span>
                <span className="text-xs">{new Date(currentArticle.publishedAt).toLocaleDateString("id-ID")}</span>
                <span>•</span>
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
          <div className="flex gap-2 w-3/5 max-w-2xl pointer-events-auto">
            {articles.map((_, idx) => (
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
