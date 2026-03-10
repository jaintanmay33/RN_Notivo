import React from 'react';
import { Text, TextStyle } from 'react-native';
import { useTheme } from '@theme/index';
import type { TextVariant } from '@theme/index';

interface Props {
  variant?: TextVariant;
  children: React.ReactNode;
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
  center?: boolean;
}

export default function AppText({
  variant = 'cardBody',
  children,
  color,
  style,
  numberOfLines,
  center = false,
}: Props) {
  const { colors, textStyles } = useTheme();
  const variantStyle = textStyles[variant];

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        variantStyle,
        { color: color ?? colors.textPrimary },
        center && { textAlign: 'center' },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
