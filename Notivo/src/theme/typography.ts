// src/theme/typography.ts

// ── Font Family Constants ──────────────────────────────────────────────
// These string values match EXACTLY the font names registered by expo-font.
// If these strings don't match, the font falls back to system default.
export const fontFamily = {
  regular: "PlusJakartaSans_400Regular",
  medium: "PlusJakartaSans_500Medium",
  semiBold: "PlusJakartaSans_600SemiBold",
  bold: "PlusJakartaSans_700Bold",
  extraBold: "PlusJakartaSans_800ExtraBold",
};

// ── Font Size Scale ────────────────────────────────────────────────────
// Based on a 4pt grid. Never use raw numbers in components — always use
// fontSize.base or fontSize.lg etc.
export const fontSize = {
  xs: 11, // Tags, version text, tiny labels
  sm: 13, // Secondary labels, tab labels, validation errors
  base: 15, // Default body text
  md: 16, // Inputs, slightly larger body
  lg: 18, // Section subtitles, important body
  xl: 20, // Card titles, section headers
  "2xl": 24, // Screen sub-headings
  "3xl": 28, // Screen headings
  "4xl": 34, // Large display numbers (report stats)
  "5xl": 42, // Splash screen, hero text
  "6xl": 52, // Splash title with letter-spacing
};

// ── Line Height Multipliers ────────────────────────────────────────────
export const lineHeight = {
  tight: 1.2, // Headings
  normal: 1.5, // Body text
  relaxed: 1.7, // Long paragraphs
};

// ── Pre-built Text Styles ─────────────────────────────────────────────
// Use these as the 'variant' prop on <AppText>.
// Each style defines: fontSize, fontFamily, and optional letterSpacing.
export const textStyles = {
  // Splash & display
  splashTitle: {
    fontSize: fontSize["6xl"],
    fontFamily: fontFamily.extraBold,
    letterSpacing: 8,
  },

  // Screen-level headings
  screenTitle: {
    fontSize: fontSize["3xl"],
    fontFamily: fontFamily.bold,
  },

  // Section headers inside screens
  sectionTitle: {
    fontSize: fontSize.xl,
    fontFamily: fontFamily.semiBold,
  },

  // Card and list item titles
  cardTitle: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semiBold,
    lineHeight: fontSize.md * 1.4,
  },

  // Standard body text
  cardBody: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.regular,
    lineHeight: fontSize.base * 1.5,
  },

  // Form field labels
  label: {
    fontSize: fontSize.sm,
    fontFamily: fontFamily.medium,
    letterSpacing: 0.2,
  },

  // Hint text, captions, metadata
  caption: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
  },

  // Button text
  button: {
    fontSize: fontSize.md,
    fontFamily: fontFamily.semiBold,
    letterSpacing: 0.3,
  },

  // Bottom tab labels
  tabLabel: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.medium,
    letterSpacing: 0.5,
  },

  // Form input text
  inputText: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.regular,
  },

  // Validation error messages
  errorText: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.regular,
  },

  // Large numeric display (reports dashboard)
  statNumber: {
    fontSize: fontSize["4xl"],
    fontFamily: fontFamily.extraBold,
  },

  // Settings row labels
  settingsLabel: {
    fontSize: fontSize.base,
    fontFamily: fontFamily.medium,
  },
};

export type TextVariant = keyof typeof textStyles;
