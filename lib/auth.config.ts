import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe auth configuration.
 * This file must NOT import anything that requires Node.js APIs
 * (no Prisma, no bcrypt, no fs). It is used by middleware.ts
 * which runs in the Edge runtime.
 *
 * The actual credential verification (Prisma + bcrypt) lives in auth.ts.
 */
export default {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "MEMBER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      const protectedRoutes = ["/dashboard", "/clients", "/billing", "/team", "/settings"];
      const authRoutes = ["/login", "/signup", "/forgot-password", "/otp-verification"];

      const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route),
      );
      const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

      if (isProtectedRoute && !isLoggedIn) {
        return false; // Redirects to pages.signIn
      }

      if (isAuthRoute && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
