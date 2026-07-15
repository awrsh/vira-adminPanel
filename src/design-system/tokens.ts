/**
 * Atlas Editorial design system — typed token surface.
 * CSS source of truth: `src/styles/tokens/*`
 * Spec: DESIGN_SYSTEM.md
 */

import { colorTokens, type ColorToken } from "./color";
import { typographyTokens } from "./typography";
import { spacingTokens, spacingScalePx } from "./spacing";
import { radiusTokens, radiusScalePx } from "./radius";
import { shadowTokens } from "./shadow";
import { motionTokens } from "./motion";
import { layoutTokens } from "./layout";
import { responsiveTokens, mediaMin, type Breakpoint } from "./responsive";
import {
  THEME_MODES,
  THEME_STORAGE_KEY,
  isThemeMode,
  nextThemeMode,
  runThemeTransition,
  type ThemeMode,
} from "./theme";

export const atlasTokens = {
  color: colorTokens,
  typography: typographyTokens,
  spacing: spacingTokens,
  spacingScalePx,
  radius: radiusTokens,
  radiusScalePx,
  shadow: shadowTokens,
  motion: motionTokens,
  layout: layoutTokens,
  responsive: responsiveTokens,
  theme: {
    modes: THEME_MODES,
    storageKey: THEME_STORAGE_KEY,
  },
} as const;

export {
  colorTokens,
  typographyTokens,
  spacingTokens,
  spacingScalePx,
  radiusTokens,
  radiusScalePx,
  shadowTokens,
  motionTokens,
  layoutTokens,
  responsiveTokens,
  mediaMin,
  THEME_MODES,
  THEME_STORAGE_KEY,
  isThemeMode,
  nextThemeMode,
  runThemeTransition,
};

export type { ColorToken, Breakpoint, ThemeMode };
