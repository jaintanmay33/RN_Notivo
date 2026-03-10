import React from 'react';
import { View } from 'react-native';
import { useTheme } from '@theme/index';
import AppText from '@components/common/AppText';
import type { TodoPriority } from '@app-types/todo';

interface Props {
  priority: TodoPriority;
}

const PRIORITY_LABELS: Record<TodoPriority, string> = {
  urgent: '🔴  Urgent',
  high: '🟠  High',
  medium: '🟡  Medium',
  low: '🟢  Low',
};

export default function PriorityBadge({ priority }: Props) {
  const { colors, spacing, radius } = useTheme();

  const colorMap: Record<TodoPriority, string> = {
    urgent: colors.priorityUrgent,
    high: colors.priorityHigh,
    medium: colors.priorityMedium,
    low: colors.priorityLow,
  };
  const color = colorMap[priority];

  return (
    <View
      style={{
        backgroundColor: color + '22',
        borderRadius: radius.sm,
        paddingVertical: 2,
        paddingHorizontal: spacing.sm,
        borderWidth: 1,
        borderColor: color + '66',
      }}
    >
      <AppText variant="caption" color={color}>
        {PRIORITY_LABELS[priority]}
      </AppText>
    </View>
  );
}
