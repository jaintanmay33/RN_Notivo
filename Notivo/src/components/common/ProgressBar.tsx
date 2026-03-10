import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { useTheme } from '@theme/index';
import AppText from './AppText';

interface Props {
  progress: number;
  color?: string;
  height?: number;
  showLabel?: boolean;
}

export default function ProgressBar({ progress, color, height = 8, showLabel = false }: Props) {
  const { colors, radius } = useTheme();
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: Math.min(Math.max(progress, 0), 1),
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const fillColor = color ?? colors.primary;
  const pct = Math.round(progress * 100);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <View
        style={{
          flex: 1,
          height,
          backgroundColor: colors.primaryLight,
          borderRadius: radius.full,
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={{
            height,
            borderRadius: radius.full,
            backgroundColor: fillColor,
            width: widthAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          }}
        />
      </View>
      {showLabel && (
        <AppText variant="label" color={fillColor}>
          {pct}%
        </AppText>
      )}
    </View>
  );
}
