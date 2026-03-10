import React, { useEffect, useRef } from 'react';
import { Animated, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@theme/index';
import { useUIStore, type ToastType } from '@store/uiStore';
import { TOAST_DURATION_MS } from '@utils/constants';
import AppText from './AppText';

const TOAST_CONFIG: Record<ToastType, { icon: string; bgKey: string; textKey: string }> = {
  success: { icon: 'checkmark-circle', bgKey: 'successBg', textKey: 'success' },
  error: { icon: 'alert-circle', bgKey: 'dangerBg', textKey: 'danger' },
  warning: { icon: 'warning', bgKey: 'warningBg', textKey: 'warning' },
  info: { icon: 'information-circle', bgKey: 'infoBg', textKey: 'info' },
};

export default function Toast() {
  const { colors, spacing, radius, shadows } = useTheme();
  const toast = useUIStore(s => s.toast);
  const hideToast = useUIStore(s => s.hideToast);
  const insets = useSafeAreaInsets();

  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!toast) return;
    Animated.parallel([
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, tension: 80, friction: 10 }),
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    const timer = setTimeout(() => dismiss(), TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [toast?.id]);

  const dismiss = () => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: -100, duration: 250, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start(() => hideToast());
  };

  if (!toast) return null;

  const config = TOAST_CONFIG[toast.type];
  const bgColor = colors[config.bgKey as keyof typeof colors] as string;
  const textColor = colors[config.textKey as keyof typeof colors] as string;

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: insets.top + spacing.sm,
        left: spacing.base,
        right: spacing.base,
        zIndex: 9999,
        transform: [{ translateY }],
        opacity,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: spacing.sm,
          backgroundColor: bgColor,
          borderRadius: radius.lg,
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.base,
          borderLeftWidth: 4,
          borderLeftColor: textColor,
          ...shadows.toast,
        }}
      >
        <Ionicons name={config.icon as any} size={20} color={textColor} />
        <AppText variant="cardBody" color={textColor} style={{ flex: 1 }}>
          {toast.message}
        </AppText>
        <TouchableOpacity onPress={dismiss}>
          <Ionicons name="close" size={16} color={textColor} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}
