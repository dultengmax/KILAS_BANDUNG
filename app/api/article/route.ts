import { NextResponse } from "next/server";
import { createArticle, updateArticle } from "@/lib/action/article";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await createArticle(formData);
    if (result.success) {
      return NextResponse.json({ success: true, article: result.article });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    let data: any = undefined;
    let isFormData = false;

    const contentType = request.headers.get("content-type");

    if (contentType && contentType.includes("multipart/form-data")) {
      data = await request.formData();
      isFormData = true;
    } else if (contentType && contentType.includes("application/json")) {
      data = await request.json();
    } else {
      try {
        data = await request.json();
      } catch {
        return NextResponse.json(
          { success: false, error: "Request body tidak dikenali" },
          { status: 400 }
        );
      }
    }

    // pastikan id ada
    // Untuk FormData, cek id dari FormData
    const idValue = isFormData ? data.get("id") : data?.id;
    if (!idValue) {
      return NextResponse.json(
        { success: false, error: "ID artikel diperlukan" },
        { status: 400 }
      );
    }

    // Jalankan updateArticle sesuai tipe data
    // updateArticle diharapkan menerima FormData atau JSON, bukan dicampur
    const result = await updateArticle(data);

    if (result.success) {
      return NextResponse.json({ success: true, article: result.article });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
