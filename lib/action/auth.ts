"use server"

import { cookies } from "next/headers"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

export async function createUser(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const name = formData.get("name") as string | undefined;
    const password = formData.get("password") as string;
    const role = (formData.get("role") as string | undefined) ?? "USER";

    // Validasi input
    if (!email || typeof email !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      throw new Error("Email tidak valid.");
    }
    if (!password || typeof password !== "string" || password.length < 6) {
      throw new Error("Password harus terdiri dari minimal 6 karakter.");
    }
    if (name && typeof name !== "string") {
      throw new Error("Nama tidak valid.");
    }
    if (role && typeof role !== "string") {
      throw new Error("Role tidak valid.");
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error("Email sudah terdaftar.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role,
      },
    });
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true, user };
  } catch (error: any) {
    return { success: false, message: error.message || "Terjadi kesalahan saat membuat pengguna." };
  }
}



export async function getUser(id: number) {
  return await prisma.user.findUnique({
    where: { id },
  })
}

export async function updateUser(id: number, formData: FormData) {
  try {
    const email = formData.get("email") as string | undefined;
    const name = formData.get("name") as string | undefined;
    const password = formData.get("password") as string | undefined;
    const role = (formData.get("role") as string | undefined) ?? "USER";

    // Validasi input
    if (!email || typeof email !== "string" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      throw new Error("Email tidak valid.");
    }
    if (password && (typeof password !== "string" || password.length < 6)) {
      throw new Error("Password harus terdiri dari minimal 6 karakter.");
    }
    if (name && typeof name !== "string") {
      throw new Error("Nama tidak valid.");
    }
    if (role && typeof role !== "string") {
      throw new Error("Role tidak valid.");
    }

    let updateData: any = {
      email,
      name,
      role,
    };

    // Jika password diisi, hash password dan update field password
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    revalidatePath('/admin')
    revalidatePath('/')
    return { success: true, user: updatedUser };
  } catch (error: any) {
    return { success: false, message: error.message || "Terjadi kesalahan saat mengupdate pengguna." };
  }
}

export async function deleteUser(id: number) {
  try {
    // Validasi id
    if (!id || typeof id !== "number" || isNaN(id) || id <= 0) {
      throw new Error("ID user tidak valid.");
    }

    // Pastikan user ada sebelum hapus
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new Error("Pengguna tidak ditemukan.");
    }

    await prisma.user.delete({
      where: { id },
    });

    revalidatePath('/admin')
    revalidatePath('/')
    return { success: true, message: "Pengguna berhasil dihapus." };
  } catch (error: any) {
    // Logging error secara profesional bisa ditambahkan di sini jika perlu
    return { success: false, message: error?.message || "Terjadi kesalahan saat menghapus pengguna." };
  }
}

export async function listUsers() {
  try {
    // Validasi prisma (misalnya, jika butuh validasi environment/prisma, tambahkan di sini)
    if (!prisma || typeof prisma.user.findMany !== "function") {
      throw new Error("Prisma client tidak tersedia.");
    }

    const users = await prisma.user.findMany({});

    // Validasi hasil query (optional, sesuai kebutuhan aplikasi)
    if (!users) {
      throw new Error("Tidak dapat mengambil data user.");
    }

    return users;
  } catch (error: any) {
    // Anda bisa memakai logger di sini jika perlu
    throw new Error(error?.message || "Terjadi kesalahan saat mengambil data user.");
  }
}

export async function loginUser(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      throw new Error("Email dan password wajib diisi.");
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Pengguna tidak ditemukan.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Password salah.");
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });
    return { success: true, message: "Login berhasil" };
  } catch (error: any) {
    return { success: false, message: error.message || "Terjadi kesalahan saat login." };
  }
}

