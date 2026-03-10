import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@theme/index';
import AppText from '@components/common/AppText';

interface Props {
  tag: string;
  onRemove?: () => void;
  small?: boolean;
}

export default function TagChip({ tag, onRemove, small = false }: Props) {
  const { colors, spacing, radius } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.primaryLight,
        borderRadius: radius.full,
        paddingVertical: small ? 2 : spacing.xs,
        paddingHorizontal: small ? spacing.sm : spacing.md,
        gap: 4,
      }}
    >
      <AppText
        variant="caption"
        color={colors.primary}
        style={{ fontSize: small ? 10 : undefined }}
      >
        #{tag}
      </AppText>
      {onRemove && (
        <TouchableOpacity onPress={onRemove} hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}>
          <Ionicons name="close" size={10} color={colors.primary} />
        </TouchableOpacity>
      )}
    </View>
  );
}
