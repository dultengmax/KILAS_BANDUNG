"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Check, X } from "lucide-react";
import { getAboutUsById, updateAboutUs } from "@/lib/action/profile";

type AboutUs = {
  id: number;
  title: string;
  deskripsi: string;
  email?: string | null;
  visi?: string | null;
  misi?: string | null;
  image?: string | null;
  address?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  facebook?: string | null;
  twitter?: string | null;
  createdAt: string;
  updatedAt: string;
};

const DUMMY_ABOUT: AboutUs = {
  id: 1,
  title: "Kilas Bandung",
  deskripsi:
    "Koperasi Digital Cahaya Ummat adalah institusi keuangan berbasis teknologi yang berfokus pada pemberdayaan ekonomi anggota dan masyarakat luas melalui layanan koperasi yang inovatif dan terpercaya.",
  email: "contact@koperasicahayau.com",
  visi: "Menjadi koperasi digital terdepan yang memberikan solusi ekonomi modern dan berkeadilan.",
  misi:
    "- Meningkatkan kesejahteraan anggota melalui layanan digital\n- Menyediakan produk dan layanan koperasi yang inovatif dan mudah diakses\n- Membangun jaringan kemitraan strategis untuk pertumbuhan berkelanjutan\n- Mengedukasi masyarakat tentang pentingnya budaya menabung dan berinvestasi",
  image:
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
  address: "Jl. Mawar No. 123, Jakarta Selatan, Indonesia",
  instagram: "instagram.com/koperasicahayau",
  tiktok: "tiktok.com/@koperasicahayau",
  facebook: "facebook.com/koperasicahayau",
  twitter: "twitter.com/koperasicahayau",
  createdAt: "2024-01-20T13:02:00Z",
  updatedAt: "2024-06-11T09:18:30Z",
};

const socialIcons: Record<string, React.ReactNode> = {
  instagram: (
    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-pink-100 text-pink-600 text-lg shadow-sm">
      <span aria-label="Instagram" role="img">
        📸
      </span>
    </span>
  ),
  tiktok: (
    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-200 text-black text-lg shadow-sm">
      <span aria-label="Tiktok" role="img">
        🎵
      </span>
    </span>
  ),
  facebook: (
    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-100 text-blue-700 text-lg shadow-sm">
      <span aria-label="Facebook" role="img">
        📘
      </span>
    </span>
  ),
  twitter: (
    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-50 text-blue-400 text-lg shadow-sm">
      <span aria-label="Twitter" role="img">
        🐦
      </span>
    </span>
  ),
};

const FIELDS: {
  label: string;
  key: keyof AboutUs;
  type?: "textarea" | "text";
  placeholder?: string;
}[] = [
  { label: "Judul", key: "title", placeholder: "Nama Perusahaan" },
  { label: "Deskripsi", key: "deskripsi", type: "textarea", placeholder: "Deskripsi singkat koperasi..." },
  { label: "Alamat", key: "address", placeholder: "Alamat lengkap" },
  { label: "Email", key: "email", placeholder: "Email aktif" },
  { label: "Visi", key: "visi", type: "textarea", placeholder: "Visi koperasi" },
  { label: "Misi", key: "misi", type: "textarea", placeholder: "Misi koperasi" },
  { label: "Instagram", key: "instagram", placeholder: "Link Instagram" },
  { label: "Tiktok", key: "tiktok", placeholder: "Link Tiktok" },
  { label: "Facebook", key: "facebook", placeholder: "Link Facebook" },
  { label: "Twitter", key: "twitter", placeholder: "Link Twitter" },
  { label: "Image URL", key: "image", placeholder: "Link gambar profil" },
];

export default function ProfileContent() {
  const [about, setAbout] = useState<AboutUs | any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [form, setForm] = useState<Partial<AboutUs> |any >();
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Load dummy data on mount
  useEffect(() => {
    setLoading(true);
    setTimeout(async () => {
    const data =  await getAboutUsById(1)
      setAbout(data?.data);
      setForm(data?.data);
      setLoading(false);
    }, 400);
  }, []);

  const handleChange = (key: keyof AboutUs, value: string) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    // Validasi: minimal title & deskripsi harus ada
    if (!form || !form.title || !form.deskripsi) {
      setError("Judul dan Deskripsi wajib diisi.");
      setSaving(false);
      return;
    }

    if (!about || !about.id) {
      setError("Data profil tidak tersedia.");
      setSaving(false);
      return;
    }

    try {
      const res = await updateAboutUs(about.id, form);
      if (res?.success) {
        const updated = { ...about, ...res.data, updatedAt: new Date().toISOString() };
        setAbout(updated);
        setForm(updated);
        setEditMode(false);
      } else {
        setError(res?.error || "Gagal memperbarui profil.");
      }
    } catch (err: any) {
      setError(err?.message || "Terjadi kesalahan saat menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  // Skeleton/loading
  if (loading) {
    return (
      <Card className="max-w-3xl mx-auto my-10">
        <CardHeader>
          <CardTitle>
            <Skeleton className="w-44 h-9" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-40 mb-6" />
          <Skeleton className="w-1/2 h-5 mb-2" />
          <Skeleton className="w-3/4 h-4" />
        </CardContent>
      </Card>
    );
  }

  if (!about) {
    return (
      <div className="max-w-2xl mx-auto mt-10 text-center text-gray-400">
        Data profil tidak ditemukan.
      </div>
    );
  }

  return (
    <Card className="max-w-3xl mx-auto my-12 border-2 border-slate-100 dark:border-slate-800 shadow-sm">
      <CardHeader className="flex flex-row items-start md:items-center justify-between gap-4">
        <div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
            {editMode ? (
              <Input
                value={form.title || ""}
                onChange={e => handleChange("title", e.target.value)}
                className="text-2xl font-bold"
                placeholder="Nama Perusahaan"
              />
            ) : (
              about.title
            )}
          </CardTitle>
          <CardDescription className="text-gray-500 text-base mt-2">
            Info & Profile beserta Social Media
          </CardDescription>
        </div>
        <div>
          {!editMode ? (
            <Button size="icon" variant="outline" onClick={() => setEditMode(true)} aria-label="Edit Profil">
              <Pencil className="w-4 h-4" />
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                size="icon"
                onClick={handleSave}
                disabled={saving}
                aria-label="Simpan Perubahan"
                className="bg-green-600 text-white hover:bg-green-700"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => {
                  setEditMode(false);
                  setForm(about);
                  setError(null);
                }}
                aria-label="Batal Edit"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!editMode && about.image && (
          <div className="flex justify-center mb-6">
            <img
              src={about.image}
              alt={about.title}
              className="rounded-2xl shadow-lg max-h-64 object-cover border border-slate-200"
            />
          </div>
        )}
        {editMode && (
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
            <Input
              type="text"
              value={form.image || ""}
              onChange={e => handleChange("image", e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            {form.image && (
              <div className="flex justify-center mt-2">
                <img
                  src={form.image}
                  alt="Preview"
                  className="h-36 w-auto rounded-xl shadow object-cover border border-gray-200"
                />
              </div>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
          {FIELDS.filter(f => f.key !== "title" && f.key !== "image" && (editMode || about[f.key]))
            .map(f => (
              <div key={f.key} className="flex flex-col">
                <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                {editMode ? (
                  f.type === "textarea" ? (
                    <Textarea
                      value={form[f.key] ?? ""}
                      onChange={e => handleChange(f.key, e.target.value)}
                      rows={3}
                      className="resize-none"
                      placeholder={f.placeholder}
                    />
                  ) : (
                    <Input
                      type="text"
                      value={form[f.key] ?? ""}
                      onChange={e => handleChange(f.key, e.target.value)}
                      placeholder={f.placeholder}
                    />
                  )
                ) : f.type === "textarea" ? (
                  <div className="min-h-3 whitespace-pre-line text-gray-800 text-sm bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded">
                    {about[f.key]}
                  </div>
                ) : (
                  <div className="text-gray-800 text-sm">{about[f.key] || <span className="text-gray-300">-</span>}</div>
                )}
              </div>
            ))}
        </div>
        {/* Social Media */}
        <div className="mt-5">
          <div className="font-semibold text-gray-600 mb-3 text-sm uppercase tracking-wide">
            Sosial Media
          </div>
          <div className="flex flex-wrap gap-4">
            {["instagram", "tiktok", "facebook", "twitter"].map(key => {
              const val = (editMode ? form[key as keyof AboutUs] : about[key as keyof AboutUs]);
              if (!val) return null;
              // Value normalization
              const hasProtocol = typeof val === "string" && val.startsWith("http");
              const url = hasProtocol ? val : `https://${val}`;
              return (
                <a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white dark:bg-slate-700/30 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg text-base font-medium text-slate-700 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-shadow shadow-sm"
                >
                  {socialIcons[key]}
                  <span className="capitalize">{key}</span>
                </a>
              );
            })}
            {/* Optionally show "-" if none, or just nothing */}
          </div>
        </div>
        {error && (
          <div className="mt-4 text-red-500 text-sm font-medium px-3">{error}</div>
        )}
        <div className="mt-8 text-xs text-gray-400 flex flex-col md:flex-row gap-2 md:gap-8">
          <span>
            Dibuat: {about.createdAt && new Date(about.createdAt).toLocaleString("id-ID", {
              dateStyle: "long",
              timeStyle: "short"
            })}
          </span>
          <span>
            Terakhir diupdate:{" "}
            {about.updatedAt && new Date(about.updatedAt).toLocaleString("id-ID", {
              dateStyle: "long",
              timeStyle: "short"
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}