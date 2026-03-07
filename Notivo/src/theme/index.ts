// src/theme/index.ts
// This is the single import point for all theme values.
// Components import ONLY from '@theme/index', never from sub-files.

import { useSettingsStore } from '@store/settingsStore';
import { lightColors, darkColors, type AppColors } from './colors';
import { fontFamily, fontSize, lineHeight, textStyles, type TextVariant } from './typography';
import { spacing, radius, iconSize, hitSlop } from './spacing';
import { shadows } from './shadows';

// ── useTheme Hook ──────────────────────────────────────────────────────
// Call this at the top of any component that needs theme values.
// Example: const { colors, spacing, radius } = useTheme();
export const useTheme = () => {
  const theme = useSettingsStore(state => state.theme);
  const isDark = theme === 'dark';
  const colors: AppColors = isDark ? darkColors : lightColors;

  return {
    // Core
    colors,
    isDark,
    theme,

    // Typography
    fontFamily,
    fontSize,
    lineHeight,
    textStyles,

    // Layout
    spacing,
    radius,
    iconSize,
    hitSlop,

    // Effects
    shadows,
  } as const;
};

// ── Re-export types for use in other files ─────────────────────────────
export type Theme = ReturnType<typeof useTheme>;
export type { AppColors, TextVariant };
export { lightColors, darkColors };
export { fontFamily, fontSize, textStyles };
export { spacing, radius };
export { shadows };
