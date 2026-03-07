// src/theme/shadows.ts
import { Platform } from 'react-native';

// Cross-platform shadow creator
// On iOS: uses shadowColor, shadowOffset, shadowOpacity, shadowRadius
// On Android: uses elevation (casts a material shadow)
const shadow = (
  color: string,
  offset: { width: number; height: number },
  opacity: number,
  radius: number,
  elevation: number,
) =>
  Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: offset,
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: { elevation },
    default: {},
  });

// ── Shadow Presets ────────────────────────────────────────────────────
export const shadows = {
  // For todo cards — subtle lift
  card: shadow('#000000', { width: 0, height: 2 }, 0.06, 8, 2),

  // For FAB button — stronger to stand above the list
  fab: shadow('#7C3AED', { width: 0, height: 4 }, 0.35, 12, 8),

  // For modals and bottom sheets — prominent separation from content
  modal: shadow('#000000', { width: 0, height: 8 }, 0.15, 24, 16),

  // For toast notifications — floating above everything
  toast: shadow('#000000', { width: 0, height: 4 }, 0.25, 12, 10),

  // For the active kanban card being dragged
  dragging: shadow('#7C3AED', { width: 0, height: 8 }, 0.3, 16, 12),

  // No shadow — for elements that should appear flat
  none: Platform.select({
    ios: { shadowOpacity: 0 },
    android: { elevation: 0 },
    default: {},
  }),
};

export type ShadowKey = keyof typeof shadows;
