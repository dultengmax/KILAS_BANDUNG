"use client";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState, useTransition } from "react";
import { createUser, deleteUser, getUser, updateUser } from "@/lib/action/auth";
import { toast } from "sonner";
import { Edit2, Trash2 } from "lucide-react";


// Import server action

import { createCategory, deleteCategory, updateCategory } from "@/lib/action/kategory";

const DialogCategory = () => {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [subCategories, setSubCategories] = useState<string[]>([""]);

    const handleAddSubCategory = () => {
        setSubCategories((prev) => [...prev, ""]);
    };

    const handleRemoveSubCategory = (idx: number) => {
        setSubCategories((prev) => prev.filter((_, i) => i !== idx));
    };

    const handleSubCategoryChange = (idx: number, value: string) => {
        setSubCategories((prev) =>
            prev.map((cat, i) => (i === idx ? value : cat))
        );
    };

    const handleSubmit = async (formData: FormData) => {
        setError(null);
        setSuccess(false);
        // Append subCategory fields manually
        subCategories.forEach((sc) => {
            formData.append("subCategory", sc);
        });
        startTransition(async () => {
            try {
                await createCategory(formData);
                setSuccess(true);
                setOpen(false);
                toast.success("Kategori berhasil ditambahkan!");
            } catch (err: any) {
                setError(err.message || "Gagal menambah kategori.");
                toast.error(err.message || "Gagal menambah kategori.");
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpen(true)}>Tambah Kategori</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Kategori</DialogTitle>
                </DialogHeader>
                <form
                    action={handleSubmit}
                    className="space-y-4"
                    onSubmit={(e) => {
                        // Ensure all subCategories are included via formData
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const formData = new FormData(form);
                        handleSubmit(formData);
                    }}
                >
                    <div>
                        <Label htmlFor="name">Nama Kategori</Label>
                        <Input id="name" name="name" required />
                    </div>
                    <div>
                        <Label htmlFor="description">Deskripsi</Label>
                        <Input id="description" name="description" />
                    </div>
                    <div>
                        <Label>Sub Kategori</Label>
                        {subCategories.map((sc, idx) => (
                            <div key={idx} className="flex gap-2 mb-2">
                                <Input
                                    name="subCategoriesArray"
                                    value={sc}
                                    onChange={(e) => handleSubCategoryChange(idx, e.target.value)}
                                    placeholder="Sub Kategori"
                                />
                                {subCategories.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleRemoveSubCategory(idx)}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleAddSubCategory}
                            className="mt-1"
                        >
                            Tambah Sub Kategori
                        </Button>
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    {/* Toast will show success or error messages */}
                    <DialogFooter>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DialogCategory;


// Komponen DialogEditCategory untuk mengedit kategori yang sudah ada


// props: open modal, onOpenChange, initial category data, onSuccess
export const DialogEditCategory = ({
    category,
}: {

    category: any, // { id, name, description, subCategory }
}) => {

    const [open, setOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [name, setName] = useState(category?.name || "");
    const [description, setDescription] = useState(category?.description || "");
    // subCategories as array of string editable fields
    const [subCategories, setSubCategories] = useState<string[]>(
        Array.isArray(category?.subCategory)
            ? [...category.subCategory]
            : typeof category?.subCategory === "string" && category.subCategory
                ? [category.subCategory]
                : [""]
    );

    useEffect(() => {
        setName(category?.name || "");
        setDescription(category?.description || "");
        setSubCategories(
            Array.isArray(category?.subCategory)
                ? [...category.subCategory]
                : typeof category?.subCategory === "string" && category.subCategory
                    ? [category.subCategory]
                    : [""]
        );
    }, [category]);

    const handleAddSubCategory = () => setSubCategories(prev => [...prev, ""]);

    const handleRemoveSubCategory = (idx: number) =>
        setSubCategories(prev => prev.filter((_, i) => i !== idx));

    const handleSubCategoryChange = (idx: number, value: string) =>
        setSubCategories(prev => prev.map((cat, i) => (i === idx ? value : cat)));

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        const payload = {
            id: category.id,
            name,
            description,
            subCategory: subCategories.filter(Boolean),
        };

        startTransition(async () => {
            try {
                await updateCategory(category.id, payload);
                setSuccess(true);
                setOpen(false);
                toast.success("Kategori berhasil diubah!");
            } catch (err: any) {
                setError(err.message || "Gagal mengubah kategori.");
                toast.error(err.message || "Gagal mengubah kategori.");
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button onClick={() => setOpen(true)} className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded">
                        <Edit2 className="w-4 h-4" />
                      </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Kategori</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleEditSubmit}>
                    <div>
                        <Label htmlFor="edit-category-name">Nama Kategori</Label>
                        <Input
                            id="edit-category-name"
                            name="name"
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="edit-category-description">Deskripsi</Label>
                        <Input
                            id="edit-category-description"
                            name="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>Sub Kategori</Label>
                        {subCategories.map((sc, idx) => (
                            <div key={idx} className="flex gap-2 mb-2">
                                <Input
                                    name={`subCategory-${idx}`}
                                    value={sc}
                                    onChange={e => handleSubCategoryChange(idx, e.target.value)}
                                    placeholder="Sub Kategori"
                                />
                                {subCategories.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleRemoveSubCategory(idx)}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleAddSubCategory}
                            className="mt-1"
                        >
                            Tambah Sub Kategori
                        </Button>
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <DialogFooter>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};



export function DialogDeleteCategory({ categoryId, onDeleted }: { categoryId: number, onDeleted?: () => void }) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        setError(null);
        startTransition(async () => {
            try {

                await deleteCategory(categoryId);
                setOpen(false);
                toast.success("Kategori berhasil dihapus!");
                onDeleted?.();
            } catch (err: any) {
                setError(err.message || "Gagal menghapus kategori.");
                toast.error(err.message || "Gagal menghapus kategori.");
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button 
                    variant="destructive"
                    size="icon"
                    onClick={() => setOpen(true)}
                >
                    <Trash2 size={18}/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Hapus Kategori</DialogTitle>
                </DialogHeader>
                <div className="mb-4">
                    Apakah Anda yakin ingin menghapus kategori ini? Tindakan ini tidak dapat dibatalkan.
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
                        Batal
                    </Button>
                    <Button 
                        variant="destructive" 
                        onClick={handleDelete} 
                        disabled={isPending}
                    >
                        {isPending ? "Menghapus..." : "Hapus"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}




