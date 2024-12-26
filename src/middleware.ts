import NextAuth, { NextAuthConfig } from "next-auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";

const typedAuthConfig = {
  trustHost: true,
  providers: [],
} satisfies NextAuthConfig;

export default NextAuth(typedAuthConfig).auth((req) => {
  const { nextUrl } = req;

  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    console.log("middleware running in isApiAuthRoute");
    return undefined;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      console.log("middleware running in isLoggedIn");
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    console.log("middleware running in isAuthRoute");
    return undefined;
  }

  if (!isLoggedIn && !isPublicRoute) {
    console.log(
      "middleware running in is not logged in and is not public route ",
    );

    return Response.redirect(new URL("/login", nextUrl));
  }
  console.log("middleware running in the end");
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
