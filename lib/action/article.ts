"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Zod schema for Article input validation (with string/array normalization for FormData)
const articleSchemaForFormData = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  image: z.string().optional().nullable(),
  audio: z.string().optional().nullable(),
  category: z.preprocess(
    (val) =>
      typeof val === "string"
        ? val.split(",").map((v) => v.trim()).filter(Boolean)
        : Array.isArray(val)
        ? val
        : [],
    z.array(z.string()).default([])
  ),
  subcategory: z.preprocess(
    (val) =>
      typeof val === "string"
        ? val.split(",").map((v) => v.trim()).filter(Boolean)
        : Array.isArray(val)
        ? val
        : [],
    z.array(z.string()).default([])
  ),
  author: z.string().min(1),
  authorBio: z.string().optional().nullable().default(""),
  publishedAt: z.preprocess((val) => (val ? new Date(val as string) : new Date()), z.date()),
  updatedAt: z.preprocess((val) => (val ? new Date(val as string) : new Date()), z.date()),
  readTime: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z.number().int().default(0)
  ),
  views: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z.number().int().default(0)
  ),
  featuredImage: z.string().optional().nullable(),
  content: z.string().min(1),
  seoTitle: z.string().optional().nullable(),
  seoDescription: z.string().optional().nullable(),
  status: z.string().optional().nullable(),
  userId: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z.number().int()
  ),
});

function formDataToObject(formData: FormData): Record<string, any> {
  const obj: Record<string, any> = {};
  for (const [key, value] of formData.entries()) {
    // Handle multiple values for the same key as array
    if (obj[key]) {
      if (Array.isArray(obj[key])) {
        obj[key].push(value);
      } else {
        obj[key] = [obj[key], value];
      }
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

export async function createArticle(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const image = formData.get("image") as string;
    const audio = formData.get("audio") as string;
    const category = JSON.parse(formData.get("category") as string ?? "[]") as string[];
    const subcategory = JSON.parse(formData.get("subcategory") as string ?? "[]") as string[];
    const author = formData.get("author") as string;
    const publishedAt = formData.get("publishedAt") as string;
    const updatedAt = formData.get("updatedAt") as string;
    const readTime = Number(formData.get("readTime"));
    const views = Number(formData.get("views"));
    const featuredImage = formData.get("featuredImage") as string | null;
    const content = formData.get("content") as string;
    const status = formData.get("status") as string | null;
    const userId = formData.get("userId") as unknown as string;

    const userIdNum = Number(userId);

    const article = await prisma.article.create({
      data: {
        title,
        slug,
        excerpt,
        image,
        audio,
        category,
        subcategory,
        author,
        publishedAt,
        updatedAt:publishedAt,
        readTime,
        views,
        featuredImage: featuredImage ?? "",
        content,
        status,
        // Remove userId; instead, use Prisma relation 'user'
        user: {
          connect: { id: userIdNum },
          // Optionally add connectOrCreate and create logic here if needed
          // e.g.,
          // connectOrCreate: { where: { id: userIdNum }, create: {/* user fields */} },
        },
      },
    });

    return { success: true, article };
  } catch (error: any) {
    return { success: false, error: error.message || error };
  }
}

// Update version - expects FormData for compatibility
const articleUpdateSchemaForFormData = articleSchemaForFormData.partial().extend({
  id: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val, 10) : val),
    z.number().int()
  ),
});

export async function updateArticle(input: FormData) {
  try {
    const inputObj = formDataToObject(input);

    // For category and subcategory, allow multi-value array OR comma-separated string
    if (
      inputObj.category &&
      typeof inputObj.category === "string" &&
      inputObj.category.includes(",")
    ) {
      inputObj.category = inputObj.category
        .split(",")
        .map((v: string) => v.trim())
        .filter(Boolean);
    }
    if (
      inputObj.subcategory &&
      typeof inputObj.subcategory === "string" &&
      inputObj.subcategory.includes(",")
    ) {
      inputObj.subcategory = inputObj.subcategory
        .split(",")
        .map((v: string) => v.trim())
        .filter(Boolean);
    }

    const data = articleUpdateSchemaForFormData.parse(inputObj);
    const { id, ...updateData } = data;

    // Remove userId from updateData to satisfy Prisma type requirements
    const { userId, ...safeUpdateData } = updateData;
    // Update each field one by one
    let updatedArticle;
    for (const [key, value] of Object.entries(safeUpdateData)) {
      updatedArticle = await prisma.article.update({
        where: { id },
        data: { [key]: value },
      });
    }
    const article = updatedArticle;
    return { success: true, article };
  } catch (error: any) {
    return { success: false, error: error.message || error };
  }
}

export async function deleteArticle(id: number) {
  try {
    await prisma.article.delete({
      where: { id },
    });

    // Tambahkan revalidate path untuk memastikan cache terupdate (Next.js App Router style)
revalidatePath('/admin')
revalidatePath('/')
revalidatePath('/kategori')

    return { success: true, message: "Artikel berhasil dihapus." };
  } catch (error: any) {
    return { success: false, message: error.message || error, error: error.message || error };
  }
}

export async function getArticleById(id: number) {
  try {
    // Pastikan id adalah number
    const numericId = Number(id);
    if (isNaN(numericId)) {
      return { success: false, error: "ID artikel tidak valid." };
    }

    const article = await prisma.article.findUnique({
      where: { id: numericId },
    });

    if (!article) {
      return { success: false, error: "Artikel tidak ditemukan." };
    }
    return { success: true, article };
  } catch (error: any) {
    return { success: false, error: error?.message || error };
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    // Validasi slug: harus string, minimal 3 karakter, hanya huruf, angka dan dash
    if (
      !slug ||
      typeof slug !== "string" ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      slug.length < 3
    ) {
      return { success: false, error: "Slug tidak valid. Slug minimal 3 karakter, huruf kecil/angka/dash." };
    }
    const article = await prisma.article.findFirstOrThrow({
      where: { slug },
    });
    if (!article) {
      return { success: false, error: "Artikel tidak ditemukan." };
    }
    return { success: true, article };
  } catch (error: any) {
    return { success: false, error: error?.message || error };
  }
}



export async function getArticles(params = {}) {
  try {
    const articles = await prisma.article.findMany({
      where: params,
      orderBy: { publishedAt: "desc" },
    });
    return { success: true, articles };
  } catch (error: any) {
    return { success: false, error: error.message || error };
  }
}
