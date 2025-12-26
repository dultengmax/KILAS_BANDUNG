"use client"

import { Megaphone } from "lucide-react"

export function Newsletter() {
  // Tidak perlu state untuk banner iklan
  return (
    <section className="bg-linear-to-br from-amber-500 to-orange-600 rounded-xl p-8 md:p-12 text-white mb-16 flex items-center justify-center shadow-xl">
      <div className="max-w-3xl mx-auto w-full flex flex-col md:flex-row items-center gap-8">
        <div className="shrink-0 mb-6 md:mb-0">
          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-white/30 border border-white/40 shadow">
            <Megaphone className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Iklankan Bisnis Anda di Bandung News</h2>
          <p className="mb-4 text-white/90 leading-relaxed">
            Maksimalkan visibilitas <span className="font-semibold">brand</span> dan <span className="font-semibold">produk</span> Anda melalui platform <b>Bandung News</b> yang sudah dipercaya ribuan pembaca setiap hari.
            Tawarkan solusi, promosikan layanan, dan perluas jangkauan bisnis Anda bersama kami.
          </p>
          <a
            href="mailto:iklan@bandungnews.com"
            className="inline-block bg-white text-amber-700 font-bold px-8 py-3 rounded-lg shadow hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-white/70 mt-2 transition-all"
          >
            Hubungi Tim Kami
          </a>
        </div>
      </div>
    </section>
  )}
