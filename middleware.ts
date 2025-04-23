import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import {
  DEFAULT_LOGIN_REDIRECT,
  authRoutes,
  privateRoutes,
  publicRoutes,
} from "./routes";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function middleware(req: NextRequest) {
  const isLoggedIn = !!getSessionCookie(req);
  const session = await auth.api.getSession({ headers: await headers() });

  const isVerified = session?.user.emailVerified;
  const currentLocation = req.nextUrl.pathname;

  if (
    publicRoutes.includes(currentLocation) ||
    authRoutes.includes(currentLocation)
  ) {
    if (isLoggedIn && isVerified) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
    }

    return;
  }

  if (privateRoutes.includes(currentLocation.slice(0, 5))) {
    if (!isLoggedIn || !isVerified) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    return;
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
