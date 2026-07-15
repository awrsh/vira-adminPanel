/** Typography tokens — Vazirmatn (fa) · Inter (en). */
export const typographyTokens = {
  fontSans: "var(--ds-font-sans)",
  fontPersian: "var(--ds-font-persian)",
  fontMono: "var(--ds-font-mono)",
  size: {
    xs: "var(--ds-text-xs)",
    sm: "var(--ds-text-sm)",
    base: "var(--ds-text-base)",
    lg: "var(--ds-text-lg)",
    xl: "var(--ds-text-xl)",
    "2xl": "var(--ds-text-2xl)",
    "3xl": "var(--ds-text-3xl)",
    "4xl": "var(--ds-text-4xl)",
    "5xl": "var(--ds-text-5xl)",
  },
  leading: {
    tight: "var(--ds-leading-tight)",
    snug: "var(--ds-leading-snug)",
    normal: "var(--ds-leading-normal)",
    relaxed: "var(--ds-leading-relaxed)",
  },
  weight: {
    normal: "var(--ds-font-weight-normal)",
    medium: "var(--ds-font-weight-medium)",
    semibold: "var(--ds-font-weight-semibold)",
    bold: "var(--ds-font-weight-bold)",
  },
} as const;
