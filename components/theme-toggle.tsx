"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem("theme")
    const isDarkMode = savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches

    if (isDarkMode) {
      document.documentElement.classList.add("dark")
      setIsDark(true)
    }
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    html.classList.toggle("dark")
    const isDarkNow = html.classList.contains("dark")
    setIsDark(isDarkNow)
    localStorage.setItem("theme", isDarkNow ? "dark" : "light")
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-card/50 dark:hover:bg-card/80 transition-colors smooth-transition"
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
    </button>
  )
}
