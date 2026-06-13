"use client";

import { useSession } from "next-auth/react";

export function useCurrentSession() {
  const session = useSession();

  return {
    ...session,
    user: session.data?.user
      ? {
          id: session.data.user.id,
          name: session.data.user.name,
          email: session.data.user.email,
          role: (session.data.user as { role?: string }).role ?? "MEMBER",
          image: session.data.user.image,
        }
      : null,
    isAuthenticated: session.status === "authenticated",
    isLoading: session.status === "loading",
  };
}
