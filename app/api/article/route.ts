import { NextResponse } from "next/server";
import { createArticle } from "@/lib/action/article";

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
    // Untuk update artikel, terima formData atau json body.
    // Misal body JSON: { id, ...fields }
    let body;
    const contentType = request.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      body = await request.json();
    } else if (contentType?.includes('multipart/form-data')) {
      // Untuk multer/form-data: harus parsing lain (optional) - non-prioritas.
      body = await request.formData();
    } else {
      body = await request.json();
    }

    // Panggil fungsi updateArticle (buat di lib/action/article jika belum ada)
    // Harus ada id!
    if (!body.id) {
      return NextResponse.json({ success: false, error: "ID artikel diperlukan" }, { status: 400 });
    }

    // Asumsi updateArticle(body) mengembalikan { success, article?, error? }
    // Perlu import/updateArticle jika belum (tamba hkan di /lib/action/article)
    // Supaya tidak error, pakai dynamic import
    const { updateArticle } = await import('@/lib/action/article');

    const result = await updateArticle(body);
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
