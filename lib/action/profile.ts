"use server"

import { revalidatePath } from "next/cache";
import prisma from "../prisma";


// CREATE AboutUs
// export async function createAboutUs(data: {
//   title: string,
//   deskripsi: string,
//   email?: string,
//   visi?: string,
//   misi?: string,
//   image?: string,
//   address?: string,
//   instagram?: string,
//   tiktok?: string,
//   facebook?: string,
//   twitter?: string,
// }) {
//   try {
//     const about = await prisma.aboutUs.create({
//       data: {
//         title: data.title,
//         deskripsi: data.deskripsi,
//         email: data.email,
//         visi: data.visi,
//         misi: data.misi,
//         image: data.image,
//         address: data.address,
//         instagram: data.instagram,
//         tiktok: data.tiktok,
//         facebook: data.facebook,
//         twitter: data.twitter,
//       },
//     });
//     return { success: true, data: about };
//   } catch (error) {
//     return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
//   }
// }

// READ ALL AboutUs
export async function getAllAboutUs() {
  try {
    const abouts = await prisma.aboutUs.findMany({
      orderBy: { createdAt: "desc" }
    });
    return { success: true, data: abouts };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// READ AboutUs by ID
export async function getAboutUsById(id: number) {
  try {
    const about = await prisma.aboutUs.findUnique({
      where: { id },
    });
    if (!about) {
      return { success: false, error: "AboutUs not found" };
    }
    return { success: true, data: about };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// UPDATE AboutUs
export async function updateAboutUs(id: number, data: {
  title?: string,
  deskripsi?: string,
  email?: string,
  visi?: string,
  misi?: string,
  image?: string,
  address?: string,
  instagram?: string,
  tiktok?: string,
  facebook?: string,
  twitter?: string,
}) {
  try {
    const about = await prisma.aboutUs.update({
      where: { id },
      data: {
        ...data,
      }
    });
    revalidatePath("/admin");
    revalidatePath(`/`);
    return { success: true, data: about };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// DELETE AboutUs
export async function deleteAboutUs(id: number) {
  try {
    await prisma.aboutUs.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
