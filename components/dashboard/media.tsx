"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, ImageIcon, VideoIcon, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { createMedia, getAllMedias, updateMedia } from "@/lib/action/media";
import { toast } from "sonner";
import { DeleteDialogMedia } from "./dialog-user";

// Dummy fetcher: Ganti dengan fetch data nyata dari backend
const mockMediaData = [
  {
    id: 1,
    url: "https://example.com/sample.jpg",
    image: "https://example.com/sample.jpg",
    video: null,
    type: "image",
    description: "Contoh gambar",
    location: "Jakarta",
    content: "Gambar pemandangan pegunungan.",
    createdAt: "2024-06-09T14:25:00.000Z",
  },
  {
    id: 2,
    url: "https://example.com/video.mp4",
    image: null,
    video: "https://example.com/video.mp4",
    type: "video",
    description: "Contoh video",
    location: "Bandung",
    content: "Video suasana kota.",
    createdAt: "2024-06-09T13:12:00.000Z",
  },
];

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_AUDIO = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_AUDIO;


function MediaPreview({ media }: { media: any }) {

 

  if (media.type === "image" && media.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={media.image}
        alt={media.description || "Media"}
        className="h-12 w-16 object-cover rounded border"
      />
    );
  }
  if (media.type === "video" && media.video) {
    return (
      <div className="relative w-16 h-12 bg-black/10 rounded flex items-center justify-center text-muted-foreground">
        <VideoIcon className="w-6 h-6" />
      </div>
    );
  }
  return (
    <div className="w-16 h-12 flex items-center justify-center rounded bg-muted">
      <ImageIcon className="w-5 h-5 text-muted-foreground" />
    </div>
  );
}

function StatsCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="flex-1 bg-white dark:bg-slate-800 rounded-lg px-6 py-4 border border-border dark:border-slate-700 shadow-sm flex items-center gap-4">
      <div
        className={
          "shrink-0 rounded-full p-2 bg-muted " +
          (color || "")
        }
      >
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-xs text-muted-foreground font-medium">{label}</div>
      </div>
    </div>
  );
}

export default function MediaList() {
  const [mediaList, setMediaList] = React.useState<any[]>([]);
  const [file, setFile] = React.useState<File | null>(null);
  const [mediaType, setMediaType] = React.useState<"image" | "video" | "">("");
  const [desc, setDesc] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [content, setContent] = React.useState("");
  const [uploading, setUploading] = React.useState(false);

  React.useEffect(() => {
    async function fetchMedias() {
      const result = await getAllMedias();
      if (result && result.success && Array.isArray(result.medias)) {
        setMediaList(result.medias);
      } else {
        setMediaList([]);
      }
    }
    fetchMedias();
  }, []);

  // Statistik sederhana
  const totalMedia = mediaList.length;
  const totalImage = mediaList.filter((m) => m.type === "image").length;
  const totalVideo = mediaList.filter((m) => m.type === "video").length;

  // Handler untuk form upload media
  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!file) {
      alert("Mohon pilih file media!");
      return;
    }
    if (!mediaType) {
      alert("Pilih jenis media (gambar/video).");
      return;
    }

    setUploading(true);

    try {
      let uploadedUrl = "";
      let cloudEndpoint = "";

      if (!CLOUD_NAME) throw new Error("Cloudinary cloud name tidak ditemukan.");
      if (!UPLOAD_PRESET) throw new Error("Cloudinary preset tidak ditemukan.");

      if (mediaType === "image") {
        cloudEndpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
      } else if (mediaType === "video") {
        cloudEndpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`;
      } else {
        throw new Error("Jenis media tidak valid");
      }

      const cloudFormData = new FormData();
      cloudFormData.append("file", file);
      cloudFormData.append("upload_preset", UPLOAD_PRESET);

      const response = await fetch(cloudEndpoint, {
        method: "POST",
        body: cloudFormData,
        credentials: "omit",
      });
      if (!response.ok) {
        throw new Error("Upload ke Cloudinary gagal");
      }
      const uploadResult = await response.json();
      uploadedUrl = uploadResult.secure_url;

      if (!uploadedUrl) {
        throw new Error("URL file setelah upload tidak ditemukan.");
      }

      // Tambahkan ke mediaList lokal
      const newMedia = {
        id: `new-${Date.now()}`,
        url: uploadedUrl,
        image: mediaType === "image" ? uploadedUrl : null,
        video: mediaType === "video" ? uploadedUrl : null,
        type: mediaType,
        description: desc || "",
        location: location || "-",
        content: content || "",
        createdAt: new Date().toISOString(),
      };
      setMediaList((prev) => [newMedia, ...prev]);
       // Lakukan validasi hasil upload ke database
       const uploading = await createMedia(newMedia);
       if (!uploading.success) {
         // Hapus media dari local state jika gagal simpan ke database
         setMediaList(prev => prev.filter(item => item.id !== newMedia.id));
         throw new Error(
           uploading.error && Array.isArray(uploading.error)
             ? uploading.error.map((e: any) => e.message).join(', ')
             : (typeof uploading.error === 'string' ? uploading.error : 'Gagal menambah media ke database')
         );
       }
       
      // Reset form
      setFile(null);
      setMediaType("");
      setDesc("");
      setLocation("");
      setContent("");
      const previewElement = document.getElementById('media-file-preview');
      if (previewElement) previewElement.innerHTML = "";

      alert("Media berhasil ditambahkan!");
    } catch (err: any) {
      alert(err.message || "Gagal upload media!");
    } finally {
      setUploading(false);
    }
  }

  // Versi handleUploadEdit untuk mengedit media yang sudah ada
  // Perbaikan fungsi handleUploadEdit
  async function handleUploadEdit(
    e: React.FormEvent<HTMLFormElement>,
    mediaId: number | string,
    prevMedia: any
  ) {
    e.preventDefault();
    setUploading(true);
    try {
      let uploadedUrl: string = prevMedia.url; // Simpan url lama sebagai default
      let uploadedImage: string | null = prevMedia.image;
      let uploadedVideo: string | null = prevMedia.video;

      // Jika ada file baru yang diupload
      if (file) {
        if (!mediaType) {
          throw new Error("Jenis media harus dipilih.");
        }

        if (typeof UPLOAD_PRESET === 'undefined' || !UPLOAD_PRESET) {
          throw new Error("UPLOAD_PRESET tidak tersedia di environment variables");
        }

        if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
          throw new Error("Cloudinary Cloud Name tidak tersedia di environment variables");
        }
        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        const resourceType = mediaType === "image" ? "image" : "video";

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", UPLOAD_PRESET);

        const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

        const response = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Upload file gagal. Status: " + response.statusText);
        }
        const uploadResult = await response.json();

        uploadedUrl = uploadResult.secure_url;
        if (!uploadedUrl) {
          throw new Error("URL hasil upload tidak ditemukan.");
        }

        if (mediaType === "image") {
          uploadedImage = uploadedUrl;
          uploadedVideo = null;
        } else if (mediaType === "video") {
          uploadedVideo = uploadedUrl;
          uploadedImage = null;
        }
      }

      // Siapkan data baru
      const editedMedia = {
        url: uploadedUrl,
        image: mediaType === "image" ? uploadedImage : null,
        video: mediaType === "video" ? uploadedVideo : null,
        type: mediaType,
        description: desc || "",
        location: location || "-",
        content: content || "",
      };

      // Hanya update jika mediaId bertipe number
      if (typeof mediaId === "number" || (typeof mediaId === "string" && !mediaId.toString().startsWith('new-') && !isNaN(Number(mediaId)))) {
        const numberId = typeof mediaId === "number" ? mediaId : Number(mediaId);
        const updating = await updateMedia(numberId, editedMedia);
        if (!updating.success) {
          throw new Error(
            updating.error && Array.isArray(updating.error)
              ? updating.error.map((e: any) => e.message).join(', ')
              : (typeof updating.error === 'string' ? updating.error : 'Gagal update media di database')
          );
        }
        // Sync local state
        setMediaList(prev =>
          prev.map(item =>
            (item.id === mediaId || item.id === numberId)
              ? { ...item, ...editedMedia }
              : item
          )
        );
      } else {
        throw new Error("ID media tidak valid untuk edit.");
      }

      // Reset form setelah edit
      setFile(null);
      setMediaType("");
      setDesc("");
      setLocation("");
      setContent("");
      const previewElement = document.getElementById('media-file-preview');
      if (previewElement) previewElement.innerHTML = "";

      toast.success("Media berhasil diupdate!", { position: "top-center" });
    } catch (err: any) {
      toast.error(err?.message || "Gagal update media!",{ position: "top-center" });
    } finally {
      setUploading(false);
    }
  }
  return (
    <div className="w-full">
      {/* Statistik Card */}
      <div className="w-full mb-8 flex flex-col md:flex-row gap-4">
        <StatsCard
          icon={<ImageIcon className="w-7 h-7 text-blue-500" />}
          label="Total Media"
          value={totalMedia}
        />
        <StatsCard
          icon={<ImageIcon className="w-7 h-7 text-green-600" />}
          label="Gambar"
          value={totalImage}
        />
        <StatsCard
          icon={<VideoIcon className="w-7 h-7 text-purple-600" />}
          label="Video"
          value={totalVideo}
        />
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Daftar Media</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-sm flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Tambah Media
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg w-full">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-blue-500" />
                Tambah Media Baru
              </DialogTitle>
              <DialogDescription>
                Lengkapi formulir berikut untuk menambahkan file media baru ke galeri.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleUpload} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Jenis Media</label>
                <div className="flex space-x-2">
                  <Button
                    type="button"
                    variant={mediaType === "image" ? "default" : "secondary"}
                    className="flex items-center gap-1 px-3 py-2 rounded focus:outline-none"
                    onClick={() => setMediaType("image")}
                  >
                    <ImageIcon className="w-4 h-4" />
                    Gambar
                  </Button>
                  <Button
                    type="button"
                    variant={mediaType === "video" ? "default" : "secondary"}
                    className="flex items-center gap-1 px-3 py-2 rounded focus:outline-none"
                    onClick={() => setMediaType("video")}
                  >
                    <VideoIcon className="w-4 h-4" />
                    Video
                  </Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Upload File (Gambar atau Video)</label>
                <input
                  type="file"
                  className="block w-full border rounded px-2 py-2 bg-muted"
                  accept="image/*,video/*"
                  onChange={(e) => {
                    const f = e.target.files && e.target.files[0];
                    if (!f) return;
                    setFile(f);

                    // Optional: tampilkan preview di bawah
                    const previewUrl = URL.createObjectURL(f);
                    const previewElement = document.getElementById('media-file-preview') as HTMLDivElement;
                    if (previewElement) {
                      previewElement.innerHTML = '';
                      if (f.type.startsWith("video/")) {
                        const video = document.createElement('video');
                        video.src = previewUrl;
                        video.controls = true;
                        video.className = "max-h-40 max-w-full mt-3 rounded shadow";
                        previewElement.appendChild(video);
                      } else if (f.type.startsWith("image/")) {
                        const img = document.createElement('img');
                        img.src = previewUrl;
                        img.className = "max-h-40 max-w-full mt-3 rounded shadow";
                        previewElement.appendChild(img);
                      }
                    }
                  }}
                />
                <div id="media-file-preview" />
                <p className="text-xs text-slate-500 mt-1">Format didukung: JPG, PNG, WebP, MP4, MOV, AVI</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea
                  className="block w-full border rounded px-3 py-2 bg-muted"
                  placeholder="Tulis deskripsi singkat media"
                  rows={2}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Posisi Peletakan</label>
                  <select
                    className="block w-full border rounded px-3 py-2 bg-muted"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">Pilih posisi penempatan</option>
                    <option value="header">Header</option>
                    <option value="banner">Banner</option>
                    <option value="featured">Featured / Berita Utama</option>
                    <option value="sidebar">Sidebar</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Konten Terkait</label>
                  <input
                    type="text"
                    className="block w-full border rounded px-3 py-2 bg-muted"
                    placeholder="ID artikel/link terkait"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full mt-4 flex items-center gap-2"
                  disabled={uploading}
                >
                  <Plus className="w-4 h-4" />
                  {uploading ? "Menyimpan..." : "Simpan Media"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="rounded-lg shadow overflow-x-auto bg-white dark:bg-slate-800 border border-border dark:border-slate-700 transition-all">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Preview</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Lokasi</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Dibuat</TableHead>
              <TableHead>Konten</TableHead>
              <TableHead>URL</TableHead>
              <TableHead align="center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mediaList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                  Tidak ada data media.
                </TableCell>
              </TableRow>
            ) : (
              mediaList.map((media) => (
                <TableRow key={media.id} className="hover:bg-muted/50 transition">
                  <TableCell>
                    <MediaPreview media={media} />
                  </TableCell>
                  <TableCell className="max-w-[160px] truncate">
                    <span className="font-semibold">{media.description || <span className="italic text-muted-foreground">Tanpa Deskripsi</span>}</span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-block px-2 py-1 rounded bg-muted text-xs">{media.location || "-"}</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {media.type === "image" ? (
                        <ImageIcon className="inline w-4 h-4 mr-1 mb-0.5" />
                      ) : (
                        <VideoIcon className="inline w-4 h-4 mr-1 mb-0.5" />
                      )}
                      {media.type || "unknown"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-muted-foreground">
                      {media.createdAt && new Date(media.createdAt).toLocaleString("id-ID")}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[160px]">
                    <span className="truncate block text-sm">
                      {media.content || <span className="italic text-muted-foreground">Tidak ada konten</span>}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[140px]">
                    <div className="w-36 max-w-[140px]">
                      <a
                        href={media.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline text-blue-500 hover:text-primary text-xs block truncate"
                        title={media.url}
                        style={{
                          display: "block",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          maxWidth: "100%",
                        }}
                      >
                        {media.url}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 items-center">
                      {/* Tombol Lihat */}
                      <Button size="icon" variant="ghost" asChild>
                        <a href={media.url} target="_blank" rel="noopener noreferrer" title="Lihat">
                          <Eye className="w-4 h-4" />
                        </a>
                      </Button>
                      {/* Tombol Edit */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-2.828 1.172H7v-1.172A4 4 0 018.172 11.83l6.586-6.586" />
                            </svg>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg w-full">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <ImageIcon className="w-5 h-5 text-blue-500" />
                              Edit Media
                            </DialogTitle>
                            <DialogDescription>
                              Edit detail atau ganti file media ini.
                            </DialogDescription>
                          </DialogHeader>
                          <form
                            onSubmit={e => handleUploadEdit(e, media.id, media)}
                            className="space-y-5"
                          >
                            <div>
                              <label className="block text-sm font-medium mb-1">Jenis Media</label>
                              <div className="flex space-x-2">
                                <Button
                                  type="button"
                                  variant={mediaType === "image" ? "default" : "secondary"}
                                  className="flex items-center gap-1 px-3 py-2 rounded"
                                  onClick={() => setMediaType("image")}
                                >
                                  <ImageIcon className="w-4 h-4" />
                                  Gambar
                                </Button>
                                <Button
                                  type="button"
                                  variant={mediaType === "video" ? "default" : "secondary"}
                                  className="flex items-center gap-1 px-3 py-2 rounded"
                                  onClick={() => setMediaType("video")}
                                >
                                  <VideoIcon className="w-4 h-4" />
                                  Video
                                </Button>
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                Upload File (Gambar atau Video)
                              </label>
                              <div className="flex flex-col gap-2">
                              <input
                  type="file"
                  className="block w-full border rounded px-2 py-2 bg-muted"
                  accept="image/*,video/*"
                  onChange={(e) => {
                    const f = e.target.files && e.target.files[0];
                    if (!f) return;
                    setFile(f);

                    // Optional: tampilkan preview di bawah
                    const previewUrl = URL.createObjectURL(f);
                    const previewElement = document.getElementById('media-file-preview') as HTMLDivElement;
                    if (previewElement) {
                      previewElement.innerHTML = '';
                      if (f.type.startsWith("video/")) {
                        const video = document.createElement('video');
                        video.src = previewUrl;
                        video.controls = true;
                        video.className = "max-h-40 max-w-full mt-3 rounded shadow";
                        previewElement.appendChild(video);
                      } else if (f.type.startsWith("image/")) {
                        const img = document.createElement('img');
                        img.src = previewUrl;
                        img.className = "max-h-40 max-w-full mt-3 rounded shadow";
                        previewElement.appendChild(img);
                      }
                    }
                  }}
                />
                                {file && (
                                  <span className="text-xs text-gray-500 truncate">
                                    {file.name}
                                  </span>
                                )}
                                {media.fileurl && !file && (
                                  <div className="flex items-center gap-2 mt-1">
                                    {mediaType === "image" ? (
                                      <img src={media.fileurl} alt="Current" className="w-14 h-14 object-cover rounded border" />
                                    ) : (
                                      <video src={media.fileurl} controls className="w-24 h-14 rounded border" />
                                    )}
                                    <span className="text-xs text-gray-500">File saat ini</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Deskripsi</label>
                              <input
                                type="text"
                                className="w-full border rounded p-2 text-sm"
                                value={media?.desc}
                                onChange={e => setDesc(e.target.value)}
                                placeholder="Deskripsi singkat media"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Lokasi</label>
                              <select
                    className="block w-full border rounded px-3 py-2 bg-muted"
                    value={media.location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">Pilih posisi penempatan</option>
                    <option value="header">Header</option>
                    <option value="banner">Banner</option>
                    <option value="featured">Featured / Berita Utama</option>
                    <option value="sidebar">Sidebar</option>
                  </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Konten</label>
                              <textarea
                                className="w-full border rounded p-2 text-sm"
                                defaultValue={media.content}
                                onChange={e => setContent(e.target.value)}
                                placeholder="Konten tambahan (opsional)"
                              />
                            </div>
                            <Button
                              type="submit"
                              className="w-full"
                              disabled={uploading}
                            >
                              {uploading ? "Menyimpan..." : "Simpan Perubahan"}
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                      {/* Tombol Delete */}
<DeleteDialogMedia id={media.id} imageUrl={media.url}/>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

