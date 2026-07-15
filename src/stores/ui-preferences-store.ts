"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AccentId =
  | "orange"
  | "purple"
  | "green"
  | "neutral"
  | "blue"
  | "rose"
  | "teal"
  | "amber"
  | "indigo"
  | "crimson"
  | "cyan"
  | "lime";
export type LayoutMode =
  | "topbar"
  | "stacked"
  | "collapsible"
  | "frameless"
  | "overlapping"
  | "empty";

export interface UiPreferencesState {
  accent: AccentId;
  layout: LayoutMode;
  setAccent: (accent: AccentId) => void;
  setLayout: (layout: LayoutMode) => void;
}

export const ACCENT_PRESETS: {
  id: AccentId;
  swatch: string;
  primary: string;
  primaryForeground: string;
  softLight: string;
  softDark: string;
}[] = [
  {
    id: "orange",
    swatch: "#f97316",
    primary: "#ea580c",
    primaryForeground: "#fff7ed",
    softLight: "#ffedd5",
    softDark: "#3b2415",
  },
  {
    id: "purple",
    swatch: "#a855f7",
    primary: "#9333ea",
    primaryForeground: "#faf5ff",
    softLight: "#f3e8ff",
    softDark: "#2e1a45",
  },
  {
    id: "green",
    swatch: "#22c55e",
    primary: "#16a34a",
    primaryForeground: "#f0fdf4",
    softLight: "#dcfce7",
    softDark: "#14291c",
  },
  {
    id: "neutral",
    swatch: "#18181b",
    primary: "#27272a",
    primaryForeground: "#fafafa",
    softLight: "#f4f4f5",
    softDark: "#27272a",
  },
  {
    id: "blue",
    swatch: "#3b82f6",
    primary: "#2563eb",
    primaryForeground: "#eff6ff",
    softLight: "#dbeafe",
    softDark: "#1e293b",
  },
  {
    id: "rose",
    swatch: "#f43f5e",
    primary: "#e11d48",
    primaryForeground: "#fff1f2",
    softLight: "#ffe4e6",
    softDark: "#4c0519",
  },
  {
    id: "teal",
    swatch: "#14b8a6",
    primary: "#0d9488",
    primaryForeground: "#f0fdfa",
    softLight: "#ccfbf1",
    softDark: "#134e4a",
  },
  {
    id: "amber",
    swatch: "#f59e0b",
    primary: "#d97706",
    primaryForeground: "#fffbeb",
    softLight: "#fef3c7",
    softDark: "#451a03",
  },
  {
    id: "indigo",
    swatch: "#6366f1",
    primary: "#4f46e5",
    primaryForeground: "#eef2ff",
    softLight: "#e0e7ff",
    softDark: "#312e81",
  },
  {
    id: "crimson",
    swatch: "#dc2626",
    primary: "#b91c1c",
    primaryForeground: "#fef2f2",
    softLight: "#fee2e2",
    softDark: "#450a0a",
  },
  {
    id: "cyan",
    swatch: "#06b6d4",
    primary: "#0891b2",
    primaryForeground: "#ecfeff",
    softLight: "#cffafe",
    softDark: "#164e63",
  },
  {
    id: "lime",
    swatch: "#84cc16",
    primary: "#65a30d",
    primaryForeground: "#f7fee7",
    softLight: "#ecfccb",
    softDark: "#365314",
  },
];

export const LAYOUT_OPTIONS: LayoutMode[] = [
  "topbar",
  "stacked",
  "collapsible",
  "frameless",
  "overlapping",
  "empty",
];

export const useUiPreferencesStore = create<UiPreferencesState>()(
  persist(
    (set) => ({
      accent: "blue",
      layout: "stacked",
      setAccent: (accent) => set({ accent }),
      setLayout: (layout) => set({ layout }),
    }),
    {
      name: "atlas-ui-preferences",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        accent: state.accent,
        layout: state.layout,
      }),
    },
  ),
);

/** Apply accent CSS variables on the document root. */
export function applyAccentToDocument(accent: AccentId) {
  if (typeof document === "undefined") return;
  const preset = ACCENT_PRESETS.find((item) => item.id === accent);
  if (!preset) return;

  const root = document.documentElement;
  const isDark = root.classList.contains("dark");
  root.dataset.accent = accent;
  root.style.setProperty("--primary", preset.primary);
  root.style.setProperty("--primary-foreground", preset.primaryForeground);
  root.style.setProperty(
    "--primary-soft",
    isDark ? preset.softDark : preset.softLight,
  );
  root.style.setProperty("--ring", preset.primary);
  root.style.setProperty("--sidebar-primary", preset.primary);
  root.style.setProperty(
    "--sidebar-primary-foreground",
    preset.primaryForeground,
  );
  root.style.setProperty("--chart-1", preset.primary);
  root.style.setProperty("--ds-color-primary", preset.primary);
  root.style.setProperty(
    "--ds-color-primary-foreground",
    preset.primaryForeground,
  );
  root.style.setProperty(
    "--ds-color-primary-soft",
    isDark ? preset.softDark : preset.softLight,
  );
  root.style.setProperty("--ds-color-ring", preset.primary);
}
