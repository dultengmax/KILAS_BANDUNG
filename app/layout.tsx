import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Kilas Bandung | Portal Berita Bandung Terkini, Terpercaya & Terlengkap",
  description:
    "Kilas Bandung adalah portal berita lokal terpercaya yang menyajikan informasi terbaru seputar Bandung: politik, olahraga, kuliner, teknologi, gaya hidup, wisata, dan komunitas. Update berita Bandung hari ini secara akurat dan mendalam.",
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
  ],
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title:
      "Kilas Bandung | Portal Berita Bandung Terkini, Terpercaya & Terlengkap",
    description:
      "Kilas Bandung adalah portal berita lokal terpercaya yang menyajikan informasi terbaru seputar Bandung: politik, olahraga, kuliner, teknologi, gaya hidup, wisata, dan komunitas.",
    url: "https://kilasbandung.com",
    siteName: "Kilas Bandung",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kilas Bandung - Portal Berita Lokal Bandung",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Kilas Bandung | Portal Berita Bandung Terkini, Terpercaya & Terlengkap",
    description:
      "Kilas Bandung adalah portal berita lokal terpercaya yang menyajikan informasi terbaru seputar Bandung: politik, olahraga, kuliner, teknologi, gaya hidup, wisata, dan komunitas.",
    site: "@kilasbandung",
    creator: "@kilasbandung",
    images: ["/og-image.png"],
  },
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
