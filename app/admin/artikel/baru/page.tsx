"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Save, X, Upload, Eye, EyeOff } from "lucide-react"
import { HtmlEditor } from "@/components/html-editor"
import { AudioUploader } from "@/components/audio-uploader"

interface AudioFile {
  id: string
  name: string
  url: string
  duration: number
}

export default function CreateArticlePage() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "politik",
    excerpt: "",
    content: "",
    author: "",
    featured: false,
    status: "draft",
  })

  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([])
  const [contentTab, setContentTab] = useState<"html" | "audio">("html")
  const [showPreview, setShowPreview] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement
      setFormData((prev) => ({
        ...prev,
        [name]: target.checked,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
      setFormData((prev) => ({
        ...prev,
        slug,
      }))
    }
  }

  const handleContentChange = (newContent: string) => {
    setFormData((prev) => ({
      ...prev,
      content: newContent,
    }))
  }

  const handleAudioAdd = (audio: AudioFile) => {
    setAudioFiles((prev) => [...prev, audio])
  }

  const handleAudioRemove = (id: string) => {
    setAudioFiles((prev) => prev.filter((a) => a.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Artikel disimpan:", formData)
    console.log("[v0] Audio files:", audioFiles)
    alert("Artikel berhasil disimpan!")
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Buat Artikel Baru</h1>
          <Link
            href="/admin"
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded"
          >
            <X className="w-6 h-6" />
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Preview Button */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition"
          >
            {showPreview ? (
              <>
                <EyeOff className="w-5 h-5" />
                Sembunyikan Preview
              </>
            ) : (
              <>
                <Eye className="w-5 h-5" />
                Lihat Preview
              </>
            )}
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-6"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Judul Artikel *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Masukkan judul artikel..."
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Slug (URL Friendly) *
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="judul-artikel-dalam-slug"
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
              required
            />
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Auto-generated dari judul. Gunakan huruf kecil, angka, dan tanda hubung
            </p>
          </div>

          {/* Category & Author */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Kategori *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
              >
                <option value="politik">Politik</option>
                <option value="olahraga">Olahraga</option>
                <option value="kuliner">Kuliner</option>
                <option value="teknologi">Teknologi</option>
                <option value="gaya-hidup">Gaya Hidup</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Penulis *</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Nama penulis..."
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
              Ringkasan (Excerpt) *
            </label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Masukkan ringkasan singkat artikel..."
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
              maxLength={300}
            />
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{formData.excerpt.length} / 300 karakter</p>
          </div>

          {/* Featured Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Gambar Unggulan</label>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-blue-600 dark:hover:border-blue-400 transition cursor-pointer">
              <Upload className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
              <p className="text-slate-600 dark:text-slate-400 font-medium">Drag and drop gambar di sini</p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                Atau klik untuk memilih file (JPG, PNG, WebP)
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">Konten Artikel *</label>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setContentTab("html")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  contentTab === "html"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                HTML Editor
              </button>
              <button
                type="button"
                onClick={() => setContentTab("audio")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  contentTab === "audio"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                }`}
              >
                Upload Audio
              </button>
            </div>

            {/* Tab Content */}
            {contentTab === "html" && <HtmlEditor value={formData.content} onChange={handleContentChange} />}

            {contentTab === "audio" && (
              <AudioUploader audios={audioFiles} onAudioAdd={handleAudioAdd} onAudioRemove={handleAudioRemove} />
            )}
          </div>

          {/* Status & Featured */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
              >
                <option value="draft">Draft</option>
                <option value="scheduled">Terjadwal</option>
                <option value="published">Publikasikan</option>
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 dark:text-blue-400 focus:ring-2 focus:ring-blue-600"
                />
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  Tampilkan di Beranda (Featured)
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              <Save className="w-5 h-5" />
              Simpan Artikel
            </button>
            <Link
              href="/admin"
              className="flex items-center gap-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold px-6 py-3 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
