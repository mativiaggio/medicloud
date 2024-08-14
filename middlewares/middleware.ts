import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { account } from "@/lib/appwrite.config";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const session = await account.get();

  if (session.$id) {
    if (url.pathname === "/login") {
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  } else {
    if (url.pathname !== "/login") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/inicio", "/login"],
};
