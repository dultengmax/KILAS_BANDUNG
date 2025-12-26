import { z } from "zod";
import { prisma } from "../prisma";

// Zod schema for Media
const mediaSchema = z.object({
  url: z.string().url(),
  image: z.string().nullable().optional(),
  video: z.string().nullable().optional(),
  type: z.string().optional(), // type must always be a string (not null or undefined)
  description: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  content: z.string().nullable().optional()
});

// Helper to cast Zod error properly
function getZodErrors(error: any) {
  // error.issues for Zod v3+, error.errors for v2
  return error.issues ?? error.errors ?? error;
}

// CREATE Media
export async function createMedia(data: any) {
  const parsed = mediaSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: getZodErrors(parsed.error) };
  }
  // Prepare data to match Prisma's strict typing (type must be string, not null/undefined)
  const createData = {
    ...parsed.data,
    type: parsed.data.type ?? "", // Provide default string if type is missing or null
  };
  try {
    const media = await prisma.media.create({ data: createData });
    return { success: true, media };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// READ Media by ID
export async function getMediaById(id: number) {
  try {
    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) {
      return { success: false, error: "Media not found" };
    }
    return { success: true, media };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// READ All Media
export async function getAllMedias() {
  try {
    const medias = await prisma.media.findMany({ orderBy: { createdAt: "desc" } });
    return { success: true, medias };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// UPDATE Media
export async function updateMedia(id: number, data: any) {
  const parsed = mediaSchema.partial().safeParse(data);
  if (!parsed.success) {
    return { success: false, error: getZodErrors(parsed.error) };
  }
  // Prisma expects `type` to always be string | StringFieldUpdateOperationsInput | undefined, not null!
  let updateData = { ...parsed.data };
  if (Object.prototype.hasOwnProperty.call(updateData, "type")) {
    if (updateData.type === null) {
      updateData.type = ""; // set to empty string if null (you can choose another default as desired)
    }
  }
  try {
    const media = await prisma.media.update({
      where: { id },
      data: updateData,
    });
    return { success: true, media };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// DELETE Media
export async function deleteMedia(id: number) {
  try {
    await prisma.media.delete({ where: { id } });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
