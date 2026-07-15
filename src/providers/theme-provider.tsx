"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { THEME_STORAGE_KEY } from "@/design-system";

/**
 * next-themes injects an inline <script> to prevent theme FOUC.
 * React 19 / Next 16 emit a console error for <script> inside client components;
 * the script still runs correctly during SSR. Filter that known false positive.
 * @see https://github.com/pacocoursey/next-themes/issues/385
 */
function suppressThemeScriptWarning() {
  if (typeof window === "undefined" || process.env.NODE_ENV !== "development") {
    return;
  }

  const marker = "__atlas_theme_script_warning_filtered__";
  const g = window as Window & { [marker]?: boolean };
  if (g[marker]) return;
  g[marker] = true;

  const original = console.error;
  console.error = (...args: unknown[]) => {
    const isThemeScriptWarning = args.some(
      (arg) =>
        typeof arg === "string" &&
        arg.includes("Encountered a script tag while rendering React component"),
    );
    if (isThemeScriptWarning) return;
    original.apply(console, args);
  };
}

suppressThemeScriptWarning();

/**
 * Light · Dark · System theme provider.
 * Applies `.dark` class on `<html>` when resolved theme is dark.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey={THEME_STORAGE_KEY}
      themes={["light", "dark", "system"]}
    >
      {children}
    </NextThemesProvider>
  );
}
