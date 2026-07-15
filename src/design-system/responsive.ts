/** Mobile-first breakpoints (rem). */
export const responsiveTokens = {
  breakpoints: {
    sm: "var(--ds-breakpoint-sm)",
    md: "var(--ds-breakpoint-md)",
    lg: "var(--ds-breakpoint-lg)",
    xl: "var(--ds-breakpoint-xl)",
    "2xl": "var(--ds-breakpoint-2xl)",
  },
  /** Pixel values for matchMedia / JS */
  breakpointsPx: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  },
  containerPad: "var(--ds-container-pad)",
  shellPad: "var(--ds-shell-pad)",
} as const;

export type Breakpoint = keyof typeof responsiveTokens.breakpointsPx;

export function mediaMin(breakpoint: Breakpoint): string {
  return `(min-width: ${responsiveTokens.breakpointsPx[breakpoint]}px)`;
}
