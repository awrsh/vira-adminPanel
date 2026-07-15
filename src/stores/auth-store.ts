"use client";

import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import type { SessionUser } from "@/types";
import { ROLE_PERMISSIONS } from "@/constants";

interface AuthState {
  user: SessionUser | null;
  remember: boolean;
  setSession: (user: SessionUser | null, remember?: boolean) => void;
  logout: () => void;
  hasPermission: (permission: SessionUser["permissions"][number]) => boolean;
}

/**
 * Persist to localStorage when "remember me" is on, otherwise sessionStorage.
 */
const dualStorage: StateStorage = {
  getItem: (name) => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(name) ?? sessionStorage.getItem(name);
  },
  setItem: (name, value) => {
    if (typeof window === "undefined") return;
    try {
      const parsed = JSON.parse(value) as { state?: { remember?: boolean } };
      const remember = parsed.state?.remember ?? true;
      if (remember) {
        localStorage.setItem(name, value);
        sessionStorage.removeItem(name);
      } else {
        sessionStorage.setItem(name, value);
        localStorage.removeItem(name);
      }
    } catch {
      localStorage.setItem(name, value);
    }
  },
  removeItem: (name) => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(name);
    sessionStorage.removeItem(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      remember: true,
      setSession: (user, remember = true) => set({ user, remember }),
      logout: () => set({ user: null }),
      hasPermission: (permission) => {
        const user = get().user;
        if (!user) return false;
        // Always resolve from current role matrix so newly added
        // permissions (e.g. showcase:view) work without re-login.
        const rolePerms = ROLE_PERMISSIONS[user.role] as readonly string[];
        return rolePerms.includes(permission);
      },
    }),
    {
      name: "atlas-auth",
      storage: createJSONStorage(() => dualStorage),
      partialize: (state) => ({
        user: state.user,
        remember: state.remember,
      }),
      onRehydrateStorage: () => (state) => {
        if (!state?.user) return;
        const rolePerms = ROLE_PERMISSIONS[state.user.role];
        state.user = {
          ...state.user,
          permissions: [...rolePerms],
        };
      },
    },
  ),
);

export function createDemoSession(): SessionUser {
  return {
    id: "u-admin",
    name: "آرش محمدی",
    nameEn: "Arash Mohammadi",
    email: "admin@atlas.dev",
    role: "admin",
    permissions: [...ROLE_PERMISSIONS.admin],
  };
}
