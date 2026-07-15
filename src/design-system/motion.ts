/** Subtle motion — fade, scale, slide, layout; respect reduced-motion. */
export const motionTokens = {
  duration: {
    instant: "var(--ds-duration-instant)",
    fast: "var(--ds-duration-fast)",
    normal: "var(--ds-duration-normal)",
    slow: "var(--ds-duration-slow)",
    theme: "var(--ds-duration-theme)",
  },
  durationMs: {
    fast: 150,
    normal: 220,
    slow: 280,
    theme: 300,
  },
  ease: {
    out: "var(--ds-ease-out)",
    inOut: "var(--ds-ease-in-out)",
    linear: "var(--ds-ease-linear)",
  },
  /** Framer Motion style easings matching CSS tokens */
  easeOutCubic: [0.16, 1, 0.3, 1] as const,
  easeInOutCubic: [0.65, 0, 0.35, 1] as const,
} as const;
