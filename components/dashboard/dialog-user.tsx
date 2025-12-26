"use client";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState, useTransition } from "react";
import { createUser, deleteUser, getUser, updateUser } from "@/lib/action/auth";
import { toast } from "sonner";
import { Edit2, Trash2 } from "lucide-react";
import { deleteArticle } from "@/lib/action/article";


// Import server action

const DialogUser = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setSuccess(false);
    startTransition(async () => {
      const res = await createUser(formData);
      if (res.success) {
        setSuccess(true);
        setOpen(false);
        toast.success("User berhasil ditambahkan!");
      } else {
        setError(res.message || "Gagal menambah user.");
        toast.error(res.message || "Gagal menambah user.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Tambah User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah User</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nama</Label>
            <Input id="name" name="name" required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required minLength={6} />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              name="role"
              defaultValue="USER"
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="EDITOR">Editor</option>
              <option value="VIEWER">Viewer</option>
            </select>
          </div>
          {/* Toast will show success or error messages */}
          <DialogFooter>
            <Button type="submit" disabled={isPending}>{isPending ? "Menyimpan..." : "Simpan"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogUser;


export const EditDialogUser = ({ id }: { id: number }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUser(id);
      const data = res
      setData(data);
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setSuccess(false);
    startTransition(async () => {
      const res = await updateUser(id, formData);
      if (res.success) {
        setSuccess(true);
        setOpen(false);
        toast.success("User berhasil di ubah!");
      } else {
        setError(res.message || "Gagal mengubah user.");
        toast.error(res.message || "Gagal mengubah user.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button onClick={() => setOpen(true)}
          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded">
          <Edit2 className="w-4 h-4" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form action={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nama</Label>
            <Input id="name" name="name" required defaultValue={data.name} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required defaultValue={data.email} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required minLength={6} defaultValue={data.password} />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              name="role"
              defaultValue={data.role}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="EDITOR">Editor</option>
              <option value="VIEWER">Viewer</option>
            </select>
          </div>
          {/* Toast will show success or error messages */}
          <DialogFooter>
            <Button type="submit" disabled={isPending}>{isPending ? "Menyimpan..." : "Simpan"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};


export const DeleteDialogUser = ({ id }: { id: number }) => {

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();


  const handleDelete = async (formData: FormData) => {
    setError(null);
    setSuccess(false);
    startTransition(async () => {
      const res = await deleteUser(id);
      if (res.success) {
        setSuccess(true);
        setOpen(false);
        toast.success("User berhasil dihapus!");
      } else {
        setError(res.message || "Gagal menghapus user.");
        toast.error(res.message || "Gagal menghapus user.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button onClick={() => setOpen(true)} className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded">
        <Trash2 className="w-4 h-4" />
      </button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah User</DialogTitle>
        </DialogHeader>
        <form action={handleDelete} className="space-y-4">
          {/* Toast will show success or error messages */}
          <DialogFooter>
            <Button type="submit" disabled={isPending}>{isPending ? "Menyimpan..." : "Simpan"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )

}


export const DeleteDialogArticle = ({ id }: { id: number }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (formData: FormData) => {
    setError(null);
    setSuccess(false);
    startTransition(async () => {
      const res = await deleteArticle(id);
      if (res.success) {
        setSuccess(true);
        setOpen(false);
        toast.success("Artikel berhasil dihapus!");
      } else {
        setError(res.message || "Gagal menghapus artikel.");
        toast.error(res.message || "Gagal menghapus artikel.");
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
        aria-label="Hapus Artikel"
      >
        <Trash2 className="w-4 h-4" />
      </button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Konfirmasi Hapus Artikel
          </DialogTitle>
        </DialogHeader>
        <div className="mb-3">
          <p className="text-slate-600 dark:text-slate-400">
            Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.
          </p>
          {error && (
            <div className="mt-2 text-red-600 dark:text-red-400 text-sm font-medium">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-2 text-green-600 dark:text-green-400 text-sm font-medium">
              Artikel berhasil dihapus.
            </div>
          )}
        </div>
        <form action={handleDelete}>
          <DialogFooter className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              variant="destructive"
            >
              {isPending ? "Menghapus..." : "Hapus"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}