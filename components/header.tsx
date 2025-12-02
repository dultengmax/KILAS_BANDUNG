"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

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
            className="hidden md:flex items-center gap-4"
          >
            <form
              onSubmit={handleSearch}
              className="flex items-center gap-2 bg-background dark:bg-popover rounded-lg px-3 py-2 border border-border dark:border-border smooth-transition focus-within:ring-2 focus-within:ring-primary/50"
            >
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-sm w-48 text-foreground placeholder-muted-foreground dark:placeholder-muted-foreground"
              />
            </form>
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
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45 + i * 0.05, type: "spring", stiffness: 200, damping: 20 }}
            >
              <Link
                href={`/kategori/${cat.slug}`}
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
  )
}
