"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthFlowState {
  recoveryEmail: string | null;
  setRecoveryEmail: (email: string | null) => void;
  clear: () => void;
}

/** Ephemeral recovery-flow state (email between forgot → OTP → reset). */
export const useAuthFlowStore = create<AuthFlowState>()(
  persist(
    (set) => ({
      recoveryEmail: null,
      setRecoveryEmail: (email) => set({ recoveryEmail: email }),
      clear: () => set({ recoveryEmail: null }),
    }),
    {
      name: "atlas-auth-flow",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
