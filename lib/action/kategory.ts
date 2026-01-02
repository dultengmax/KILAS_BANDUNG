"use server"

import {prisma} from "../prisma";
import { revalidatePath } from "next/cache";

// CREATE
export async function createCategory(formData: FormData) {
  // Ambil input dari FormData
  const name = formData.get("name");
  const description = formData.get("description");
  const subCategoryRaw = formData.getAll("subCategory"); // support multiple (checkbox/multi-select)

  // Basic validation
  if (!name || typeof name !== "string" || name.trim() === "") {
    throw new Error("Nama kategori wajib diisi.");
  }
  let subCategory: string[] = [];
  // subCategory bisa dikirim sebagai array form field atau one comma-separated string
  if (subCategoryRaw && Array.isArray(subCategoryRaw)) {
    subCategory = subCategoryRaw
      .map((item) => (typeof item === "string" ? item : ""))
      .filter((item) => item.trim() !== "");
  } else if (typeof subCategoryRaw === "string") {
    // jika dikirim comma separated
    subCategory = subCategoryRaw
  }

  try {
    const category = await prisma.category.create({
      data: {
        name: name as string,
        description: typeof description === "string" ? description : undefined,
        subCategory: subCategory,
      },
    });
    revalidatePath("/admin");
    revalidatePath("/");
    return category;
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new Error("Nama kategori sudah digunakan.");
    }
    throw new Error("Gagal membuat kategori: " + (error.message || error));
  }
}

// READ - Get All
export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({});
    if (!Array.isArray(categories)) {
      throw new Error("Data kategori tidak valid.");
    }
    return categories.map(cat => {
      if (
        !cat ||
        typeof cat !== "object" ||
        typeof cat.name !== "string" ||
        cat.name.trim() === ""
      ) {
        throw new Error("Data kategori mengandung entri tidak valid.");
      }
      // Validasi subCategory: jika null ubah jadi array kosong, jika bukan array lempar error
      let subCategory = cat.subCategory;
      if (subCategory === null || subCategory === undefined) {
        subCategory = [];
      } else if (!Array.isArray(subCategory)) {
        throw new Error("Format subCategory pada kategori tidak valid.");
      }
      return {
        ...cat,
        subCategory,
      };
    });
  } catch (error: any) {
    throw new Error("Gagal mengambil data kategori: " + (error?.message || error));
  }
}

// READ - Get by ID
export async function getCategoryById(id: number) {
  return await prisma.category.findUnique({
    where: { id },
  });
}

// UPDATE
export async function updateCategory(
  id: number,
  update: { name?: string; description?: string; subCategory?: string[] }
) {
  const category = await prisma.category.update({
    where: { id },
    data: {
      ...update,
    },
  });
  revalidatePath("/category");
  return category;
}

// DELETE
export async function deleteCategory(id: number) {
  const category = await prisma.category.delete({
    where: { id },
  });
  revalidatePath("/category");
  revalidatePath("/admin");
  revalidatePath("/");
  return category;
}
