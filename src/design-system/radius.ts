/**
 * Radius tokens
 * Default/surface: 24px · Small: 12px · Buttons/Inputs: 14px
 */
export const radiusTokens = {
  none: "var(--ds-radius-none)",
  sm: "var(--ds-radius-sm)",
  md: "var(--ds-radius-md)",
  lg: "var(--ds-radius-lg)",
  xl: "var(--ds-radius-xl)",
  default: "var(--ds-radius-default)",
  surface: "var(--ds-radius-surface)",
  button: "var(--ds-radius-button)",
  input: "var(--ds-radius-input)",
  badge: "var(--ds-radius-badge)",
  full: "var(--ds-radius-full)",
} as const;

export const radiusScalePx = {
  sm: 12,
  button: 14,
  input: 14,
  default: 24,
  surface: 24,
} as const;
