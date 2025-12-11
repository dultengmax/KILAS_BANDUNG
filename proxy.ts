import { NextRequest, NextResponse } from "next/server";

// Middleware for /admin - blokir akses jika tidak punya cookie user
export function proxy(request: NextRequest) {
  // Hanya lanjutkan kalau punya cookie "user"
  const userCookie = request.cookies.get("auth_token");
  if (!userCookie) {
    // Redirect ke login jika tidak ada cookie user
    const loginUrl = new URL("/login", request.url);
    // Pastikan prevent akses ke admin meskipun user coba akses langsung
    return NextResponse.redirect(loginUrl);
  }
  // Jika ada cookie user, lanjut ke halaman admin
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
