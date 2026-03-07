// src/theme/spacing.ts

// ── Spacing Scale (base-4 grid) ────────────────────────────────────────
// Use these for: padding, margin, gap, top/left/right/bottom positioning.
// NEVER hardcode a number like padding: 13 — use spacing.md or similar.
export const spacing = {
  xs: 4, // Tiny gaps (icon to text, between chips)
  sm: 8, // Small internal padding
  md: 12, // Medium padding (inside compact components)
  base: 16, // Standard screen horizontal padding
  lg: 20, // Generous section padding
  xl: 24, // Large section gaps
  "2xl": 32, // Between major sections
  "3xl": 40, // Large visual breathing room
  "4xl": 48, // Hero spacing
  "5xl": 64, // Very large space (splash screen elements)
};

// ── Border Radius Scale ────────────────────────────────────────────────
// Use these for: borderRadius on View, TouchableOpacity, etc.
export const radius = {
  sm: 6, // Small chips, tiny buttons
  md: 10, // Standard inputs, small cards
  lg: 14, // Todo cards, setting rows
  xl: 20, // Large cards, bottom sheets
  "2xl": 28, // Modals
  full: 9999, // Fully rounded (pills, FAB button, circular avatars)
};

// ── Icon Sizes ─────────────────────────────────────────────────────────
// Consistent icon sizes throughout the app.
export const iconSize = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  "2xl": 32,
};

// ── Hit Slop ───────────────────────────────────────────────────────────
// Expand the tap target of small touchable elements (accessibility).
// Usage: <TouchableOpacity hitSlop={hitSlop.sm}>
export const hitSlop = {
  sm: { top: 8, bottom: 8, left: 8, right: 8 },
  md: { top: 12, bottom: 12, left: 12, right: 12 },
  lg: { top: 16, bottom: 16, left: 16, right: 16 },
};
