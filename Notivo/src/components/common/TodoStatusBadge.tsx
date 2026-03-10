import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@theme/index';
import AppText from '@components/common/AppText';
import type { TodoStatus } from '@app-types/todo';

interface Props {
  status: TodoStatus;
}

type StatusConfig = { label: string; icon: string; colorKey: string; bgKey: string };

const STATUS_CONFIG: Record<TodoStatus, StatusConfig> = {
  active: {
    label: 'Active',
    icon: 'radio-button-on',
    colorKey: 'statusActive',
    bgKey: 'statusActiveBg',
  },
  in_progress: {
    label: 'In Progress',
    icon: 'time',
    colorKey: 'statusInProgress',
    bgKey: 'statusInProgressBg',
  },
  completed: {
    label: 'Completed',
    icon: 'checkmark-circle',
    colorKey: 'statusCompleted',
    bgKey: 'statusCompletedBg',
  },
  archived: {
    label: 'Archived',
    icon: 'archive',
    colorKey: 'statusArchived',
    bgKey: 'statusArchivedBg',
  },
};

export default function TodoStatusBadge({ status }: Props) {
  const { colors, spacing, radius } = useTheme();
  const config = STATUS_CONFIG[status];
  const color = colors[config.colorKey as keyof typeof colors] as string;
  const bgColor = colors[config.bgKey as keyof typeof colors] as string;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: bgColor,
        borderRadius: radius.full,
        paddingVertical: 2,
        paddingHorizontal: spacing.sm,
        gap: 4,
      }}
    >
      <Ionicons name={config.icon as any} size={11} color={color} />
      <AppText variant="caption" color={color}>
        {config.label}
      </AppText>
    </View>
  );
}
