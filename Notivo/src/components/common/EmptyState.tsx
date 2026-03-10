import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@theme/index';
import AppText from './AppText';
import AppButton from './AppButton';

interface Props {
  emoji?: string;
  title: string;
  subtitle?: string;
  action?: string;
  onAction?: () => void;
}

export default function EmptyState({ emoji = '📝', title, subtitle, action, onAction }: Props) {
  const { spacing } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing['2xl'],
        gap: spacing.base,
      }}
    >
      <AppText style={{ fontSize: 64 }}>{emoji}</AppText>
      <AppText variant="sectionTitle" center>
        {title}
      </AppText>
      {subtitle && (
        <AppText variant="cardBody" center color={undefined}>
          {subtitle}
        </AppText>
      )}
      {action && onAction && (
        <AppButton
          label={action}
          onPress={onAction}
          variant="secondary"
          icon="add-circle-outline"
        />
      )}
    </View>
  );
}
