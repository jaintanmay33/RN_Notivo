import { Platform } from 'react-native';

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

export const shadows = {
  card: shadow('#000000', { width: 0, height: 2 }, 0.06, 8, 2),
  fab: shadow('#7C3AED', { width: 0, height: 4 }, 0.35, 12, 8),
  modal: shadow('#000000', { width: 0, height: 8 }, 0.15, 24, 16),
  toast: shadow('#000000', { width: 0, height: 4 }, 0.25, 12, 10),
  dragging: shadow('#7C3AED', { width: 0, height: 8 }, 0.3, 16, 12),
  none: Platform.select({
    ios: { shadowOpacity: 0 },
    android: { elevation: 0 },
    default: {},
  }),
};

export type ShadowKey = keyof typeof shadows;
