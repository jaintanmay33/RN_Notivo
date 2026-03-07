// import { useSettingsStore } from '@store/settingsStore';
import { lightColors, darkColors, type AppColors } from './colors';
import { fontFamily, fontSize, lineHeight, textStyles, type TextVariant } from './typography';
import { spacing, radius, iconSize, hitSlop } from './spacing';
import { shadows } from './shadows';

export const useTheme = () => {
  // const theme = useSettingsStore(state => state.theme);
  // const isDark = theme === 'dark';
  // const colors: AppColors = isDark ? darkColors : lightColors;
  const colors: AppColors = lightColors;

  return {
    colors,
    // isDark,
    // theme,
    fontFamily,
    fontSize,
    lineHeight,
    textStyles,
    spacing,
    radius,
    iconSize,
    hitSlop,
    shadows,
  } as const;
};

export type Theme = ReturnType<typeof useTheme>;
export type { AppColors, TextVariant };
export { lightColors, darkColors };
export { fontFamily, fontSize, textStyles };
export { spacing, radius };
export { shadows };
