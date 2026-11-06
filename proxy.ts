import { NextResponse, type NextRequest } from "next/server";

/**
 * Safe Next.js 16 proxy.
 *
 * The first SellerGenly deployment was returning a Vercel
 * "Error running the exported Web Handler" from the proxy/middleware layer.
 * Keep the proxy intentionally side-effect free so the public app can boot.
 * Supabase authentication is handled by the server actions and server client.
 */
export function proxy(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/products/:path*", "/calculator/:path*"],
};
