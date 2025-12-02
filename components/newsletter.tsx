"use client"

import type React from "react"

import { useState } from "react"
import { Mail } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    // Simulate API call
    setTimeout(() => {
      setStatus("success")
      setEmail("")
      setTimeout(() => setStatus("idle"), 3000)
    }, 1000)
  }

  return (
    <section className="bg-gradient-to-br from-primary to-secondary rounded-xl p-8 md:p-12 text-white mb-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-4">
          <Mail className="w-12 h-12 opacity-80" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Berlangganan Newsletter</h2>
        <p className="text-blue-100 mb-8">Dapatkan berita terbaru dari Bandung langsung di inbox Anda setiap hari.</p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Email Anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-lg text-slate-900 font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-white hover:bg-blue-50 text-primary font-bold px-8 py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {status === "loading" ? "Mengirim..." : "Daftar"}
          </button>
        </form>

        {status === "success" && (
          <p className="text-blue-100 mt-4 text-sm">Terima kasih! Silakan cek email Anda untuk konfirmasi.</p>
        )}
      </div>
    </section>
  )
}
