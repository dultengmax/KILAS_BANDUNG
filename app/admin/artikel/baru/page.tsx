"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Save, X, Upload, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { listUsers } from "@/lib/action/auth";
import { getCategories } from "@/lib/action/kategory";

// Update form fields based on prisma schema (fields: id, title, slug, excerpt, content, image, audioUrl, publishedAt, status, featured, views, like, authorId, category, tags)
const defaultFormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image: "",
  audioUrl: "",
  publishedAt: "",
  status: "draft",  // should match ENUM ArticleStatus
  featured: false,
  views: 0,
  like: 0,
  authorId: "",
  category: undefined as any,
  subcategory: undefined as any,
  tags: ""
};

export default function CreateArticlePage() {
  const [formData, setFormData] = useState({ ...defaultFormState });
  const [showPreview, setShowPreview] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>()
  const [category, setCategory] = useState<any>([])
  const [subcategory, setSubCategory] = useState<any>([])

  useEffect(() => {
    // Ambil data user dari API untuk digunakan pada authorId/user
    async function fetchUsersAndCategories() {
      try {
        // Hanya panggil listUsers dan getCategories karena subcategoriesRes belum didefinisikan
        const [usersRes, categoriesRes] = await Promise.all([
          listUsers(),
          getCategories(),
        ]);
        setUser(usersRes || []);
        setCategory(categoriesRes || []);
        setSubCategory([]); // Atur subcategory ke array kosong (atau dapat disesuaikan jika ada fungsi lain)
      } catch (err) {
        setUser([]);
        setCategory([]);
        setSubCategory([]);
      }
    }
    fetchUsersAndCategories();
  }, []);

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // Handle field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const { name, value, type } = target;
    let checked = false;
    if (type === "checkbox" && "checked" in target) {
      checked = (target as HTMLInputElement).checked;
    }

    // Generate slug automatically from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: slug,
      }));
      return;
    }

    // Format views and like as number
    if (name === "views" || name === "like") {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  // Image
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      setFormData((prev) => ({ ...prev, image: "" }));
    }
  };
  const handleRemoveImage = () => {
    setFile(null);
    setImageUrl("");
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  // Form submit
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // title, slug, content, status, authorId are required
    if (
      !formData.title ||
      !formData.slug ||
      !formData.content ||
      !formData.status ||
      !formData.authorId
    ) {
      toast.error("Harap isi semua data utama artikel!");
      return;
    }

    setLoading(true);

    try {
      let uploadedImageUrl = "";
      if (file) {
        if (!CLOUD_NAME || !UPLOAD_PRESET) {
          toast.error("Pengaturan Cloudinary tidak ditemukan di environment variable.");
          setLoading(false);
          return;
        }
        const cloudFormData = new FormData();
        cloudFormData.append("file", file);
        cloudFormData.append("upload_preset", UPLOAD_PRESET);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: cloudFormData,
            credentials: "omit",
          }
        );
        if (!response.ok) {
          setLoading(false);
          toast.error("Gagal mengunggah gambar ke Cloudinary");
          return;
        }
        const uploadResult: any = await response.json();
        uploadedImageUrl = uploadResult?.secure_url || "";
        if (!uploadedImageUrl) {
          setLoading(false);
          toast.error("URL gambar tidak ditemukan setelah upload.");
          return;
        }
      } else {
        uploadedImageUrl = formData.image || "";
      }

      // Prepare payload according to schema fields

      const articlePayload: Record<string, any> = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt || "",
        content: formData.content || "",
        image: uploadedImageUrl,
        featuredImage: uploadedImageUrl,
        audioUrl: formData.audioUrl || "",
        publishedAt: formData.publishedAt ? new Date(formData.publishedAt).toISOString() : null,
        status: formData.status,
        featured: !!formData.featured,
        views: Number(formData.views) || 0,
        like: Number(formData.like) || 0,
        authorId: formData.authorId,
        userId: formData.authorId,
        category: formData.subcategory ? JSON.stringify(formData.subcategory) : "",
        subcategory: formData.subcategory ? JSON.stringify(formData.subcategory) : "",
        tags: formData.tags || "",
      };

      // Remove empty values except those allowed by prisma as optional
      Object.keys(articlePayload).forEach((k) => {
        if (
          articlePayload[k] === "" ||
          articlePayload[k] === null
        ) {
          if (
            ["excerpt", "image", "audioUrl", "category", "publishedAt", "tags"].includes(k)
          ) {
            // allowed as empty value
          } else {
            delete articlePayload[k];
          }
        }
      });

      let res: Response;
      try {
        const fd = new FormData();
        Object.entries(articlePayload).forEach(([key, value]) => {
          if (value !== undefined) {
            fd.append(key, value === null ? "" : value);
          }
        });

        res = await fetch("/api/article", {
          method: "POST",
          body: fd,
        });
      } catch (fetchError) {
        toast.error("Gagal menyambung ke server. Periksa koneksi.");
        setLoading(false);
        return;
      }
      if (!res.ok) {
        let errorMsg = `Gagal menyimpan artikel (Kode: ${res.status})`;
        try {
          const errorData = await res.json();
          if (errorData?.error) {
            errorMsg = `Gagal menyimpan artikel: ${errorData.error}`;
          }
        } catch (e) { }
        toast.error(errorMsg);
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (!data?.success) {
        toast.error(data?.error || "Gagal menyimpan artikel ke database");
        setLoading(false);
        return;
      }

      toast.success("Upload & Simpan Artikel Sukses!");

      setFormData({ ...defaultFormState });
      setImageUrl("");
      setFile(null);
    } catch (error: any) {
      toast.error("Upload atau Simpan Gagal!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Buat Artikel Baru
          </h1>
          <Link
            href="/admin"
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded"
            aria-label="Kembali ke Admin"
          >
            <X className="w-6 h-6" />
          </Link>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Preview Button */}
        <div className="mb-6 flex justify-end">
          <button
            type="button"
            onClick={() => setShowPreview((p) => !p)}
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
          onSubmit={handleUpload}
          className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border grid grid-cols-4 gap-4 border-slate-200 dark:border-slate-700 p-6 space-y-6"
        >
          {/* Title */}

          <section className="space-y-2 col-span-3">
            <div>
              <label
                htmlFor="article-title"
                className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
              >
                Judul Artikel *
              </label>
              <input
                id="article-title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Masukkan judul artikel..."
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                autoComplete="off"
                required
              />
            </div>

            {/* Slug */}
            <div>
              <label
                htmlFor="article-slug"
                className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
              >
                Slug (URL Friendly) *
              </label>
              <input
                id="article-slug"
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="judul-artikel-dalam-slug"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                autoComplete="off"
                required
              />
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Slug otomatis dari judul. Huruf kecil & tanda strip.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-3">
                Konten Artikel *
              </label>
              <textarea
                id="article-content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Masukkan konten artikel di sini (HTML diperbolehkan)..."
                className="w-full h-40 px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                required
              />
            </div>
          </section>

          <section className="flex space-y-5 flex-col ">
            {/* category */}
            <div className="space-y-2">
              {/* Kategori */}
              <label htmlFor="category" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Kategori <span className="text-slate-500 text-xs">(opsional)</span>
              </label>
              <div className="max-h-48 overflow-y-auto rounded-md border border-input bg-muted/50 p-2 flex flex-col gap-2">
                {category && Array.isArray(category) && category.map((cat: { id: string | number; name: string; subCategory?: string[] }) => (
                  <section key={cat.id}>
                    <label className="flex flex-col sm:flex-row items-center gap-2 px-3 py-2 rounded-md hover:bg-primary/10 transition cursor-pointer">
                      <input
                        type="checkbox"
                        name="category"
                        value={cat.id}
                        checked={Array.isArray(formData.category) ? formData.category.map(String).includes(String(cat.id)) : false}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          let newCategory: string[] = Array.isArray(formData.category)
                            ? formData.category.map(String)
                            : [];
                          const idStr = String(cat.id);
                          if (checked) {
                            if (!newCategory.includes(idStr)) {
                              newCategory.push(idStr);
                            }
                          } else {
                            newCategory = newCategory.filter((id) => id !== idStr);
                          }
                          setFormData({ ...formData, category: newCategory });
                        }}
                        className="accent-primary h-4 w-4 rounded border-gray-300"
                      />
                      <span className="text-sm font-medium">{cat.name}</span>
                    </label>
                    {/* Subcategory Checkbox */}
                    {Array.isArray(cat.subCategory) && cat.subCategory.length > 0 && (
                      <div className="flex flex-col ml-6 gap-2 mt-2">
                        {cat.subCategory.map((sub: string, subIdx: number) => (
                          <label key={subIdx} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              name="subcategory"
                              value={sub}
                              checked={
                                Array.isArray(formData.subcategory)
                                  ? formData.subcategory.map(String).includes(String(sub))
                                  : false
                              }
                              disabled={
                                !(Array.isArray(formData.category) && formData.category.map(String).includes(String(cat.id)))
                              }
                              onChange={(e) => {
                                const checked = e.target.checked;
                                let newSub: string[] = Array.isArray(formData.subcategory)
                                  ? formData.subcategory.map(String)
                                  : [];
                                const subStr = String(sub);
                                if (checked) {
                                  if (!newSub.includes(subStr)) {
                                    newSub.push(subStr);
                                  }
                                } else {
                                  newSub = newSub.filter((v) => v !== subStr);
                                }
                                setFormData({ ...formData, subcategory: newSub });
                              }}
                              className="accent-primary h-4 w-4 rounded border-gray-300"
                            />
                            <span className="text-xs">{sub}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* Tag input */}
              <div>
                <label
                  htmlFor="article-tags"
                  className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
                >
                  Tag (opsional)
                </label>
                <input
                  id="article-tags"
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Pisahkan tag dengan koma: politik,berita"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                />
              </div>

              {/* Penulis */}
              <div>
                <label
                  htmlFor="article-author-id"
                  className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
                >
                  ID Penulis *
                </label>
                <select
                  id="article-author-id"
                  name="authorId"
                  value={formData.authorId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                  required
                >
                  <option value="">Pilih Penulis</option>
                  {user && Array.isArray(user) && user.map((u: { id: string | number; name?: string; email: string }) => (
                    <option key={u.id} value={u.id}>
                      {u.name ? `${u.name} (${u.email})` : u.email}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label
                htmlFor="article-excerpt"
                className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
              >
                Ringkasan (Excerpt)
              </label>
              <textarea
                id="article-excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="Masukkan ringkasan artikel (opsional)"
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                maxLength={300}
              />
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {formData.excerpt.length} / 300 karakter
              </p>
            </div>

            {/* Featured Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                Gambar Utama (image)
              </label>
              {imageUrl || formData.image ? (
                <div className="mt-4 flex flex-col items-center gap-2">
                  <img
                    src={imageUrl || formData.image}
                    alt="Preview"
                    className="max-w-xs rounded-lg shadow border"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  >
                    Hapus Gambar
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="featured-image-upload"
                  className="block border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-blue-600 dark:hover:border-blue-400 transition cursor-pointer"
                >
                  <Upload className="w-12 h-12 text-slate-400 dark:text-slate-500 mx-auto mb-3" />
                  <p className="text-slate-600 dark:text-slate-400 font-medium">
                    Drag and drop gambar di sini
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                    Atau klik untuk memilih file (JPG, PNG, WebP)
                  </p>
                  <input
                    id="featured-image-upload"
                    type="file"
                    name="image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>

            {/* Konten Artikel */}


            {/* Audio URL */}
            <div>
              <label
                htmlFor="audioUrl"
                className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
              >
                Audio (Link MP3 / opsional)
              </label>
              <input
                id="audioUrl"
                name="audioUrl"
                type="text"
                value={formData.audioUrl}
                onChange={handleChange}
                placeholder="https://audio-url.mp3"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
              />
              {formData.audioUrl && (
                <div className="mt-2">
                  <audio src={formData.audioUrl} controls />
                  <button
                    onClick={() => setFormData((f) => ({ ...f, audioUrl: "" }))}
                    type="button"
                    className="ml-3 text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  >
                    Hapus Audio URL
                  </button>
                </div>
              )}
            </div>

            {/* Published At, Status, Featured, Views, Like */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="article-status"
                  className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
                >
                  Status *
                </label>
                <select
                  id="article-status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                  required
                >
                  <option value="draft">Draft</option>
                  <option value="scheduled">Terjadwal</option>
                  <option value="published">Diterbitkan</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="publishedAt"
                  className="block text-sm font-semibold text-slate-900 dark:text-white mb-2"
                >
                  Tanggal Terbit
                </label>
                <input
                  type="datetime-local"
                  id="publishedAt"
                  name="publishedAt"
                  value={formData.publishedAt}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400"
                />
              </div>

            </div>
            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-700">
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition ${loading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
              >
                <Save className="w-5 h-5" />
                {loading ? "Menyimpan..." : "Simpan Artikel"}
              </button>
              <Link
                href="/admin"
                className="flex items-center gap-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold px-6 py-3 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition"
              >
                Batal
              </Link>
            </div>
          </section>
          {/* Category, Tags, AuthorID */}

        </form>
      </div>
    </div>
  );
}
