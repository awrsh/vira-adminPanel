"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/auth-store";

interface AuthHydrationProps {
  children: React.ReactNode;
}

/**
 * Triggers Zustand persist rehydration on the client.
 * Does not block render — AuthGuard waits for hydration before redirecting.
 */
export function AuthHydration({ children }: AuthHydrationProps) {
  useEffect(() => {
    const api = useAuthStore.persist;
    if (!api) return;
    // Touch the API so rehydration listeners are attached early.
    api.hasHydrated();
  }, []);

  return children;
}
