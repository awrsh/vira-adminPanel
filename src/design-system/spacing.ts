/** Spacing scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 (px). */
export const spacingTokens = {
  0: "var(--ds-space-0)",
  1: "var(--ds-space-1)",
  2: "var(--ds-space-2)",
  3: "var(--ds-space-3)",
  4: "var(--ds-space-4)",
  5: "var(--ds-space-5)",
  6: "var(--ds-space-6)",
  8: "var(--ds-space-8)",
  10: "var(--ds-space-10)",
  12: "var(--ds-space-12)",
  16: "var(--ds-space-16)",
  20: "var(--ds-space-20)",
  24: "var(--ds-space-24)",
  section: "var(--ds-space-section)",
  stack: "var(--ds-space-stack)",
  inline: "var(--ds-space-inline)",
  gap: "var(--ds-space-gap)",
  gapLg: "var(--ds-space-gap-lg)",
} as const;

/** Pixel reference for docs / tooling (do not hardcode in UI). */
export const spacingScalePx = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  6: 24,
  8: 32,
  12: 48,
  16: 64,
} as const;
