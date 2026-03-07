export const fontFamily = {
  regular: 'PlusJakartaSans_400Regular',
  medium: 'PlusJakartaSans_500Medium',
  semiBold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extraBold: 'PlusJakartaSans_800ExtraBold',
};

export const fontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 34,
  '5xl': 42,
  '6xl': 52,
};

export const lineHeight = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.7,
};

export const textStyles = {
  splashTitle: {
    fontSize: fontSize['6xl'],
    fontFamily: fontFamily.extraBold,
    letterSpacing: 8,
  },

  screenTitle: {
    fontSize: fontSize['3xl'],
    fontFamily: fontFamily.bold,
  },

  sectionTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.semiBold,
  },

  cardTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semiBold,
    lineHeight: fontSize.md * 1.4,
  },

  cardBody: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.regular,
    lineHeight: fontSize.base * 1.5,
  },

  label: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    letterSpacing: 0.2,
  },

  caption: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
  },

  button: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semiBold,
    letterSpacing: 0.3,
  },

  tabLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    letterSpacing: 0.5,
  },

  inputText: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.regular,
  },

  errorText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
  },

  statNumber: {
    fontSize: fontSize['4xl'],
    fontFamily: fontFamily.extraBold,
  },

  settingsLabel: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.medium,
  },
};

export type TextVariant = keyof typeof textStyles;
