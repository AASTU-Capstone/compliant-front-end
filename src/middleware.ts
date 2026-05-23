import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
const isStaticOrInternalPath = (pathname: string) => {
  // Check for Next.js internals and known asset directories
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.includes(".map") ||
    pathname.includes("/assets") ||
    pathname.includes("/images")
  ) {
    return true;
  }

  // Allow favicon, icons, manifest, and other static files served from public/
  const staticExtensions = [".ico", ".png", ".jpg", ".jpeg", ".svg", ".webp", ".webmanifest", ".xml", ".txt"];
  return staticExtensions.some((ext) => pathname.endsWith(ext));
};
interface DecodedToken {
  typ: any;
}
export function middleware(request: NextRequest) {
  if (isStaticOrInternalPath(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  // console.log('Middleware is running for:', request.nextUrl.pathname);
  // const token = decodeURIComponent(
  //   typeof window !== "undefined" ? document.cookie : ""
  // )
  //   .split(";")
  //   .find((c) => c.trim().startsWith("token="))
  //   ?.split("=")[1];
  // const decodedToken: any = jwt.decode(token || "");
  const decodedToken = jwt.decode(token?.value || "") as DecodedToken;
  const path = request.nextUrl.pathname;
  const referer = request.headers.get("referer");
  if (decodedToken?.typ) {
    const userType = decodedToken.typ;
    if (path.startsWith("/reset-password/change")) {
      return NextResponse.next();
    } else if (path == "/password-updated") {
      return NextResponse.next();
    } else if (path.startsWith("/password-updated")) {
      return NextResponse.next();
    } else if (!path.startsWith(`/${userType}`)) {
      return NextResponse.redirect(
        new URL(`/${userType}/dashboard`, request.url)
      );
    }
  }
  // Protect /auth/signup/verify-otp route
  if (path === "/signup/verify-otp") {
    // allow the user if they are coming from the signup route
    if (
      referer &&
      (referer.includes("/signup") || referer.includes("/login"))
    ) {
      return NextResponse.next();
    } else {
      // deny the user if they are not coming from the signup route
      return NextResponse.redirect(new URL("/signup", request.url));
    }
  }

  // Protect /auth/success route
  if (path === "/success") {
    // allow the user if they come from the verifiy-otp route
    if (referer && referer.includes("/signup/verify-otp")) {
      return NextResponse.next();
    } else {
      // unauthorized , the user will be redirected to the app
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Protect /auth/reset-password/change route
  if (path === "/reset-password/change") {
    // allow the user if they come from the reset-password route
    if (
      decodedToken ||
      (referer && referer.includes("/reset-password/verify-otp"))
    ) {
      return NextResponse.next();
    } else {
      // unauthorized , the user will be redirected to the app
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Protect /auth/password-updated route
  if (path === "/password-updated") {
    // allow the user if they come from the reset-password route
    if (referer && referer.includes("/reset-password/change")) {
      return NextResponse.next();
    } else {
      // unauthorized , the user will be redirected to the app
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Protect /auth/reset-password/verify-otp route
  if (path === "/reset-password/verify-otp") {
    // allow the user if they come from the reset-password route
    if (referer && referer.includes("/reset-password")) {
      return NextResponse.next();
    } else {
      // unauthorized , the user will be redirected to the app
      return NextResponse.redirect(new URL("/reset-password", request.url));
    }
  }

  if (!decodedToken) {
    if (path.startsWith("/login")) {
      NextResponse.next();
    } else if (path.startsWith("/signup")) {
      NextResponse.next();
    } else if (path.startsWith("/reset-password")) {
      NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
  }

  return NextResponse.next();
}

/*
the routes that are not protected are the following:
- /auth/create-profile => should it be implemented? .... not sure
- /auth/reset-password => because the ui is not done yet

the routes that are protected are the following:
- /auth/signup/verify-otp
- /auth/success
- /auth/reset-password/verify-otp
- /auth/password-updated
- /auth/reset-password/change

Any Route that starts with /settings is protected and should be accessed only if the user is authenticated and is logged in.
*/

// Only run middleware on page routes, not on static files or assets
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - Files with common static extensions (.png, .jpg, .svg, .ico, .webp, .webmanifest, etc.)
     */
    "/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|webmanifest|xml|txt)$).*)",
  ],
};
