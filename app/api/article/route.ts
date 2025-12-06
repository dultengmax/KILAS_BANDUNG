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
