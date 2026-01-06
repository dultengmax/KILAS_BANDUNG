"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Menu, X, Search } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { getCategories } from "@/lib/action/kategory"
import SearchBar from "./searchbar"

export function Header({post}:{post:any}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [category,setCategory] = useState<any>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategory(categoriesData);
      } catch (error) {
        // Optionally handle error (e.g., console.error(error))
        setCategory([]);
      }
    };

    fetchCategories();
  }, []);



  const categories = [
    { name: "Politik", slug: "politik" },
    { name: "Olahraga", slug: "olahraga" },
    { name: "Kuliner", slug: "kuliner" },
    { name: "Teknologi", slug: "teknologi" },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/cari?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <>
    <header className="sticky top-0 z-50 bg-white dark:bg-card border-b border-border dark:border-border shadow-sm smooth-transition">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-1">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-linear-to-br from-primary to-secondary rounded-lg p-2 w-8 h-8 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
            >
              <span className="text-white font-bold text-lg">K</span>
            </motion.div>
            <motion.span
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
              className="text-xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent"
            >
              Kilas Bandung
            </motion.span>
          </Link>

          {/* Desktop Actions */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
            className="hidden md:flex items-center gap-6"
          >
            {/* Search Bar */}
            <div className="flex flex-col">
              <SearchBar />
            </div>
            {/* Theme Toggle */}
            <ThemeToggle />
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
            className="md:hidden flex items-center gap-2"
          >
            <ThemeToggle />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </motion.div>
        </div>

        {/* Main Navigation */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
          className="hidden md:flex items-center gap-8 border-t border-border pt-4"
        >
          <Link href="/" className="font-medium hover:text-primary transition-colors smooth-transition">
            Beranda
          </Link>
          {category.map((cat:any, i:number) => (
            <motion.div
              key={cat.i}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 + i * 0.05, type: "spring", stiffness: 200, damping: 20 }}
            >
              <Link
                href={`/kategori/${cat.name}`}
                className="font-medium hover:text-primary transition-colors smooth-transition"
              >
                {cat.name}
              </Link>
            </motion.div>
          ))}
          <Link href="/video" className="font-medium hover:text-primary transition-colors smooth-transition">
            Video
          </Link>
          <Link href="/tentang" className="font-medium hover:text-primary transition-colors smooth-transition">
            Tentang
          </Link>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="md:hidden border-t border-border mt-4 pt-4 space-y-3"
            >
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-2 bg-background dark:bg-popover rounded-lg px-3 py-2 border border-border dark:border-border mb-4 smooth-transition"
              >
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cari berita..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm flex-1 text-foreground placeholder-muted-foreground"
                />
              </form>
              <Link href="/" className="block font-medium py-2 hover:text-primary smooth-transition">
                Beranda
              </Link>
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.slug}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ delay: 0.05 * i, type: "spring", stiffness: 200, damping: 20 }}
                >
                  <Link
                    href={`/kategori/${cat.slug}`}
                    className="block font-medium py-2 hover:text-primary smooth-transition"
                  >
                    {cat.name}
                  </Link>
                </motion.div>
              ))}
              <Link href="/video" className="block font-medium py-2 hover:text-primary smooth-transition">
                Video
              </Link>
              <Link href="/tentang" className="block font-medium py-2 hover:text-primary smooth-transition">
                Tentang
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>

    </>
  )
}


// Komponen "RunningNewsTicker" terpisah dari kode running text pada header.tsx (baris 179-211)
type RunningNewsTickerProps = {
  dataArticle: { articles: any[] }
}

export function RunningNewsTicker({ dataArticle }: {dataArticle:any}) {
  return (
    <div className="max-w-7xl mx-auto bg-primary/90 dark:bg-secondary/90 md:rounded-b-md overflow-hidden">
      <div className="flex items-center gap-0">
        <div className="h-full w-40 md:w-44 bg-red-600 py-3 md:py-2 rounded-r-lg flex items-center justify-start">
          <span className="ml-2 md:ml-4 px-2 md:px-3 rounded text-white font-bold text-xs md:text-lg shrink-0 flex items-center animate-pulse select-none">
          Breaking News
          </span>
        </div>
        <div className="relative flex-1 overflow-hidden">
          {/* Gradient overlay left */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 h-full w-10 pointer-events-none z-10"
            style={{
              background: "linear-gradient(to right, var(--color-primary, #f04d4d) 80%, transparent)"
            }}
          />
          {/* Gradient overlay right - optional for nicer edge */}
          <div
            className="whitespace-nowrap py-3 text-white text-xs md:text-sm font-medium animate-marquee"
            style={{
              animation: "marquee 24s linear infinite"
            }}
          >
            {dataArticle.articles?.slice(0, 10).map((berita: any, idx: number) => (
              <span key={berita.id} className="mr-10 md:mr-14 font-semibold inline-block">
                {berita.title}
              </span>
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  )
}
