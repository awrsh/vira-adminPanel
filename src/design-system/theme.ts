/**
 * Theme modes: light · dark · system
 * Class strategy: `.dark` on `<html>` via next-themes.
 */

export const THEME_MODES = ["light", "dark", "system"] as const;

export type ThemeMode = (typeof THEME_MODES)[number];

export const THEME_STORAGE_KEY = "atlas-theme";

export function isThemeMode(value: string): value is ThemeMode {
  return (THEME_MODES as readonly string[]).includes(value);
}

/** Cycle light → dark → system → light */
export function nextThemeMode(current: ThemeMode | undefined): ThemeMode {
  if (current === "light") return "dark";
  if (current === "dark") return "system";
  return "light";
}

/** Apply short transition class during theme switches. */
export function runThemeTransition(durationMs = 300): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.add("theme-transition");
  window.setTimeout(() => {
    root.classList.remove("theme-transition");
  }, durationMs);
}
