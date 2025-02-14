import NextAuth from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";

import authConfig, { CustomUser } from "./auth.config";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default NextAuth(authConfig).auth(async (req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;
  const user = req.auth?.user as CustomUser | undefined;
  const role = user?.role;
  const isTeacher = role === "TEACHER";
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (nextUrl.pathname.startsWith("/video-api")) {
    const secret = process.env.AUTH_SECRET;
    const token = await getToken({ req, secret });
    const res = NextResponse.next();
    if (token) {
      res.headers.set("x-user-id", token.sub || "");
    }
    return res;
  }

  if (isApiAuthRoute) {
    return undefined;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return undefined;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(
      nextUrl.origin + "/login?callbackUrl=" + nextUrl.href,
    );
  }

  if (isLoggedIn && nextUrl.pathname === "/") {
    return Response.redirect(nextUrl.origin + "/dashboard");
  }

  if (isLoggedIn && isTeacher && nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(nextUrl.origin + "/teacher/courses");
  }
  if (!isTeacher && nextUrl.pathname.startsWith("/teacher")) {
    return Response.redirect(nextUrl.origin + "/");
  }

  return undefined;
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
