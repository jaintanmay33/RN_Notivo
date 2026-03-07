// src/theme/colors.ts
// ─────────────────────────────────────────────────────────────────
// LAYER 1: RAW PALETTE
// These are never used directly in components.
// They are the building blocks for semantic tokens below.
// ─────────────────────────────────────────────────────────────────

const palette = {
  // Violet — primary brand color family
  violet50: "#F5F3FF",
  violet100: "#EDE9FE",
  violet200: "#DDD6FE",
  violet300: "#C4B5FD",
  violet400: "#A78BFA",
  violet500: "#8B5CF6",
  violet600: "#7C3AED", // PRIMARY (light mode)
  violet700: "#6D28D9",
  violet800: "#5B21B6",
  violet900: "#4C1D95", // HEADING COLOR (light mode)

  // Amber — accent / energy color family
  amber300: "#FCD34D",
  amber400: "#FBBF24",
  amber500: "#F59E0B", // ACCENT (light mode)
  amber600: "#D97706",
  amber700: "#B45309",

  // Obsidian — dark mode surface family
  obsidian950: "#0D0B14", // DARKEST background
  obsidian900: "#1E1B2E", // Main dark background
  obsidian800: "#2D2A40", // Elevated dark surface
  obsidian700: "#3D3A52", // Border in dark mode
  obsidian600: "#4D4A65", // Disabled text in dark mode

  // Neutral grays
  white: "#FFFFFF",
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",

  // Status colors — same name, adjusted shade per mode
  successLight: "#059669",
  successDark: "#10B981",
  successBgLight: "#D1FAE5",
  successBgDark: "#064E3B",

  warningLight: "#D97706",
  warningDark: "#FBBF24",
  warningBgLight: "#FEF3C7",
  warningBgDark: "#78350F",

  dangerLight: "#DC2626",
  dangerDark: "#F87171",
  dangerBgLight: "#FEE2E2",
  dangerBgDark: "#7F1D1D",

  infoLight: "#0284C7",
  infoDark: "#38BDF8",
  infoBgLight: "#E0F2FE",
  infoBgDark: "#0C4A6E",
} as const;

// ─────────────────────────────────────────────────────────────────
// LAYER 2A: LIGHT MODE SEMANTIC TOKENS
// ─────────────────────────────────────────────────────────────────

export const lightColors = {
  // ── Brand ──────────────────────────────────────────────────────
  primary: palette.violet600,
  primaryLight: palette.violet100,
  primaryDark: palette.violet900,
  accent: palette.amber500,
  accentLight: palette.amber300,
  accentDark: palette.amber700,

  // ── Backgrounds ─────────────────────────────────────────────────
  background: palette.gray50, // Main screen background
  surface: palette.white, // Cards, inputs, bottom sheets
  surfaceElevated: palette.white, // Modals (with shadow)
  card: palette.white, // Todo cards

  // ── Text ─────────────────────────────────────────────────────────
  textPrimary: palette.gray900, // Main body text
  textSecondary: palette.gray500, // Labels, captions, hints
  textDisabled: palette.gray300, // Placeholder text, disabled states
  textOnPrimary: palette.white, // Text ON violet backgrounds
  textOnAccent: palette.gray900, // Text ON amber backgrounds

  // ── Borders ──────────────────────────────────────────────────────
  border: palette.gray200, // Default borders
  borderFocus: palette.violet500, // Input border when focused

  // ── Status ───────────────────────────────────────────────────────
  success: palette.successLight,
  successBg: palette.successBgLight,
  warning: palette.warningLight,
  warningBg: palette.warningBgLight,
  danger: palette.dangerLight,
  dangerBg: palette.dangerBgLight,
  info: palette.infoLight,
  infoBg: palette.infoBgLight,

  // ── Todo Status Indicator Colors ──────────────────────────────────
  statusActive: palette.violet600,
  statusActiveBg: palette.violet100,
  statusInProgress: palette.amber500,
  statusInProgressBg: palette.warningBgLight,
  statusCompleted: palette.successLight,
  statusCompletedBg: palette.successBgLight,
  statusArchived: palette.gray400,
  statusArchivedBg: palette.gray100,

  // ── Priority Colors ───────────────────────────────────────────────
  priorityUrgent: "#DC2626", // Red
  priorityHigh: "#F97316", // Orange
  priorityMedium: palette.amber500, // Amber
  priorityLow: palette.successLight, // Green

  // ── Gradients (arrays for expo-linear-gradient) ───────────────────
  gradientPrimary: [palette.violet600, palette.violet900] as [string, string],
  gradientAccent: [palette.amber400, palette.amber600] as [string, string],
  gradientDark: [palette.obsidian900, palette.obsidian800] as [string, string],
  gradientCard: [palette.violet50, palette.white] as [string, string],

  // ── Tab Bar ───────────────────────────────────────────────────────
  tabBarBg: palette.white,
  tabBarActive: palette.violet600,
  tabBarInactive: palette.gray400,
  tabBarBorder: palette.gray200,

  // ── Overlay ───────────────────────────────────────────────────────
  overlay: "rgba(0, 0, 0, 0.5)",
  shimmer: palette.gray200, // Skeleton loading shimmer color
};

// ─────────────────────────────────────────────────────────────────
// LAYER 2B: DARK MODE SEMANTIC TOKENS
// Every key matches lightColors exactly.
// TypeScript enforces this via 'typeof lightColors'.
// ─────────────────────────────────────────────────────────────────

export const darkColors = {
  // ── Brand ──────────────────────────────────────────────────────
  primary: palette.violet500, // Slightly lighter for dark bg
  primaryLight: palette.obsidian700, // Dark equivalent of light tint
  primaryDark: palette.violet300, // Used for headings on dark
  accent: palette.amber400,
  accentLight: palette.amber300,
  accentDark: palette.amber600,

  // ── Backgrounds ─────────────────────────────────────────────────
  background: palette.obsidian950, // Deepest dark
  surface: palette.obsidian900, // Cards, inputs
  surfaceElevated: palette.obsidian800, // Modals sit above surface
  card: palette.obsidian800,

  // ── Text ─────────────────────────────────────────────────────────
  textPrimary: palette.gray50,
  textSecondary: palette.gray400,
  textDisabled: palette.obsidian600,
  textOnPrimary: palette.white,
  textOnAccent: palette.gray900,

  // ── Borders ──────────────────────────────────────────────────────
  border: palette.obsidian700,
  borderFocus: palette.violet400,

  // ── Status ───────────────────────────────────────────────────────
  success: palette.successDark,
  successBg: palette.successBgDark,
  warning: palette.warningDark,
  warningBg: palette.warningBgDark,
  danger: palette.dangerDark,
  dangerBg: palette.dangerBgDark,
  info: palette.infoDark,
  infoBg: palette.infoBgDark,

  // ── Todo Status ───────────────────────────────────────────────────
  statusActive: palette.violet400,
  statusActiveBg: palette.obsidian700,
  statusInProgress: palette.amber400,
  statusInProgressBg: palette.warningBgDark,
  statusCompleted: palette.successDark,
  statusCompletedBg: palette.successBgDark,
  statusArchived: palette.gray500,
  statusArchivedBg: palette.obsidian700,

  // ── Priority Colors ───────────────────────────────────────────────
  priorityUrgent: "#F87171", // Softened red for dark bg
  priorityHigh: "#FB923C", // Softened orange
  priorityMedium: palette.amber400,
  priorityLow: palette.successDark,

  // ── Gradients ─────────────────────────────────────────────────────
  gradientPrimary: [palette.violet800, palette.obsidian900] as [string, string],
  gradientAccent: [palette.amber600, palette.amber700] as [string, string],
  gradientDark: [palette.obsidian950, palette.obsidian900] as [string, string],
  gradientCard: [palette.obsidian800, palette.obsidian900] as [string, string],

  // ── Tab Bar ───────────────────────────────────────────────────────
  tabBarBg: palette.obsidian900,
  tabBarActive: palette.violet400,
  tabBarInactive: palette.obsidian600,
  tabBarBorder: palette.obsidian700,

  // ── Overlay ───────────────────────────────────────────────────────
  overlay: "rgba(0, 0, 0, 0.75)",
  shimmer: palette.obsidian700,
};

// Export the type so other files can use it for type annotations
export type AppColors = typeof lightColors;
