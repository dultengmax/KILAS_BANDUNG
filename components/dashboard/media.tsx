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

  React.useEffect(() => {
    setMediaList(mockMediaData);
  }, []);

  // Statistik sederhana
  const totalMedia = mediaList.length;
  const totalImage = mediaList.filter((m) => m.type === "image").length;
  const totalVideo = mediaList.filter((m) => m.type === "video").length;

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
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1">Jenis Media</label>
                <div className="flex space-x-2">
                  <Button type="button" variant="secondary" className="flex items-center gap-1 px-3 py-2 rounded focus:outline-none">
                    <ImageIcon className="w-4 h-4" />
                    Gambar
                  </Button>
                  <Button type="button" variant="secondary" className="flex items-center gap-1 px-3 py-2 rounded focus:outline-none">
                    <VideoIcon className="w-4 h-4" />
                    Video
                  </Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Upload File</label>
                <input
                  type="file"
                  className="block w-full border rounded px-2 py-2 bg-muted"
                  accept="image/*,video/*"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Deskripsi</label>
                <textarea
                  className="block w-full border rounded px-3 py-2 bg-muted"
                  placeholder="Tulis deskripsi singkat media"
                  rows={2}
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">position</label>
                  <input
                    type="text"
                    className="block w-full border rounded px-3 py-2 bg-muted"
                    placeholder="Cth: Bandung"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Konten Terkait</label>
                  <input
                    type="text"
                    className="block w-full border rounded px-3 py-2 bg-muted"
                    placeholder="ID artikel/link terkait"
                  />
                </div>
              </div>
              <div>
                <Button type="submit" className="w-full mt-4 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Simpan Media
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
                    <a
                      href={media.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-500 hover:text-primary text-xs truncate"
                      title={media.url}
                    >
                      {media.url}
                    </a>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 items-center">
                      <Button size="icon" variant="ghost" asChild>
                        <a href={media.url} target="_blank" rel="noopener noreferrer" title="Lihat">
                          <Eye className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button size="icon" variant="ghost" asChild>
                        <a href={media.url} download title="Download Media">
                          <Download className="w-4 h-4" />
                        </a>
                      </Button>
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

