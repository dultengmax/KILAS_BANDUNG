import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Kilas Bandung | Portal Berita Bandung Terkini, Terpercaya & Terlengkap",
    template: "%s | Kilas Bandung Portal Berita Bandung",
  },
  description:
    "Kilas Bandung adalah portal berita Bandung terlengkap dan terpercaya. Dapatkan berita terbaru hari ini seputar politik, olahraga, kuliner, wisata, komunitas, teknologi, gaya hidup Bandung, opini, fakta, breaking news, trending, dan info penting Bandung lainnya. Portal berita lokal #1 Jawa Barat.",
  generator: "Kilas Bandung",
  keywords: [
    "Bandung",
    "berita Bandung",
    "portal berita Bandung",
    "berita lokal Bandung",
    "berita hari ini",
    "wisata Bandung",
    "kuliner Bandung",
    "teknologi Bandung",
    "gaya hidup Bandung",
    "komunitas Bandung",
    "politik Bandung",
    "olahraga Bandung",
    "breaking news Bandung",
    "opini Bandung",
    "news update Bandung",
    "trending Bandung",
    "lokal Bandung",
    "jawa barat",
    "media bandung",
    "media online bandung",
    "informasi bandung",
    "event Bandung",
    "tips Bandung",
    "seniman Bandung",
    "acara Bandung",
    "UMKM Bandung",
    "laporan warga Bandung",
    "fakta Bandung",
    "indonesia",
    "pojok bandung",
    "kilasbandung",
    "review Bandung",
    "inspirasi Bandung",
    "Sosial Bandung",
  ],
  authors: [{ name: "Kilas Bandung", url: "https://kilasbandung.id" }],
  creator: "Kilas Bandung Editorial Team",
  publisher: "Kilas Bandung",
  applicationName: "Kilas Bandung News Portal",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/apple-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/icon.svg",
        color: "#2563eb",
      },
    ],
  },
  openGraph: {
    title: "Kilas Bandung | Portal Berita Bandung Terkini, Terpercaya & Terlengkap",
    description:
      "Kilas Bandung portal berita lokal Bandung hadirkan update terkini seputar politik, olahraga, komunitas, wisata, kuliner, gaya hidup, UMKM, teknologi, dan info terbaru kota Bandung.",
    url: "https://kilasbandung.com",
    siteName: "Kilas Bandung",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kilas Bandung - Portal Berita Lokal Bandung Terkini",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kilas Bandung | Portal Berita Bandung Terkini, Terpercaya & Terlengkap",
    description:
      "Dapatkan berita terbaru hari ini seputar Bandung di Kilas Bandung: politik, olahraga, kuliner, wisata, event, dan komunitas. Lokal, terkini, akurat.",
    site: "@kilasbandung",
    creator: "@kilasbandung",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://kilasbandung.com"),
  alternates: {
    canonical: "https://kilasbandung.com",
    languages: {
      "id-ID": "https://kilasbandung.com/id",
      "en-US": "https://kilasbandung.com/en",
    },
  },
  category: "News",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
