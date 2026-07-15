/** Color token names — values live in CSS (`--ds-color-*`). */
export const colorTokens = {
  background: "var(--ds-color-background)",
  foreground: "var(--ds-color-foreground)",
  surface: "var(--ds-color-surface)",
  surfaceForeground: "var(--ds-color-surface-foreground)",
  elevated: "var(--ds-color-elevated)",
  muted: "var(--ds-color-muted)",
  mutedForeground: "var(--ds-color-muted-foreground)",
  primary: "var(--ds-color-primary)",
  primaryForeground: "var(--ds-color-primary-foreground)",
  primarySoft: "var(--ds-color-primary-soft)",
  secondary: "var(--ds-color-secondary)",
  secondaryForeground: "var(--ds-color-secondary-foreground)",
  accent: "var(--ds-color-accent)",
  accentForeground: "var(--ds-color-accent-foreground)",
  success: "var(--ds-color-success)",
  warning: "var(--ds-color-warning)",
  danger: "var(--ds-color-danger)",
  border: "var(--ds-color-border)",
  ring: "var(--ds-color-ring)",
  glass: "var(--ds-color-glass)",
} as const;

export type ColorToken = keyof typeof colorTokens;
