import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { useTheme } from '@theme/index';

function SkeletonBlock({ width, height }: { width: string | number; height: number }) {
  const { colors, radius } = useTheme();
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1.0, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        width: width as number,
        height,
        backgroundColor: colors.shimmer,
        borderRadius: radius.sm,
        opacity,
      }}
    />
  );
}

function SkeletonCard() {
  const { colors, spacing, radius, shadows } = useTheme();
  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: radius.lg,
        padding: spacing.base,
        marginBottom: spacing.sm,
        gap: spacing.sm,
        borderLeftWidth: 4,
        borderLeftColor: colors.shimmer,
        ...shadows.card,
      }}
    >
      <SkeletonBlock width="70%" height={16} />
      <SkeletonBlock width="45%" height={12} />
      <View style={{ flexDirection: 'row', gap: spacing.xs }}>
        <SkeletonBlock width={48} height={20} />
        <SkeletonBlock width={48} height={20} />
      </View>
    </View>
  );
}

interface Props {
  count?: number;
}

export default function LoadingSkeleton({ count = 5 }: Props) {
  return (
    <View>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </View>
  );
}
