import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kilas Bandung - Portal Berita Lokal Bandung",
  description:
    "Berita terkini, terpercaya, dan relevan dari Bandung. Politik, Olahraga, Kuliner, Teknologi, dan Gaya Hidup Bandung.",
  generator: "Kilas Bandung",
  keywords: "Bandung, berita lokal, portal berita, berita hari ini",
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>{children}</body>
    </html>
  )
}
