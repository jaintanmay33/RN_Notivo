import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useTheme } from '@theme/index';
import AppText from '@components/common/AppText';
import PriorityBadge from './PriorityBadge';
import TagChip from './TagChip';
import TodoStatusBadge from './TodoStatusBadge';
import type { Todo } from '@app-types/todo';

dayjs.extend(relativeTime);

interface Props {
  todo: Todo;
  onPress: () => void;
  onComplete: () => void;
  index?: number;
}

export default function TodoCard({ todo, onPress, onComplete, index = 0 }: Props) {
  const { colors, spacing, radius, shadows } = useTheme();

  const isCompleted = todo.status === 'completed';
  const isOverdue = todo.dueDate && !isCompleted && dayjs(todo.dueDate).isBefore(dayjs(), 'day');

  const priorityColorMap = {
    urgent: colors.priorityUrgent,
    high: colors.priorityHigh,
    medium: colors.priorityMedium,
    low: colors.priorityLow,
  };
  const leftBorderColor = isCompleted ? colors.statusCompleted : priorityColorMap[todo.priority];

  return (
    <Animated.View entering={FadeInDown.delay(index * 50).springify()} layout={Layout.springify()}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          backgroundColor: colors.card,
          borderRadius: radius.lg,
          padding: spacing.base,
          marginBottom: spacing.sm,
          borderLeftWidth: 4,
          borderLeftColor: leftBorderColor,
          ...shadows.card,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm }}>
          <TouchableOpacity
            onPress={onComplete}
            style={{ marginTop: 2 }}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name={isCompleted ? 'checkmark-circle' : 'ellipse-outline'}
              size={22}
              color={isCompleted ? colors.statusCompleted : colors.border}
            />
          </TouchableOpacity>
          <View style={{ flex: 1, gap: spacing.xs }}>
            <AppText
              variant="cardTitle"
              numberOfLines={2}
              style={{ textDecorationLine: isCompleted ? 'line-through' : 'none' }}
              color={isCompleted ? colors.textSecondary : colors.textPrimary}
            >
              {todo.title}
            </AppText>
            {todo.description ? (
              <AppText variant="cardBody" numberOfLines={1} color={colors.textSecondary}>
                {todo.description}
              </AppText>
            ) : null}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.xs,
            marginTop: spacing.sm,
            flexWrap: 'wrap',
          }}
        >
          <TodoStatusBadge status={todo.status} />
          <PriorityBadge priority={todo.priority} />
          {isOverdue && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
                backgroundColor: colors.dangerBg,
                borderRadius: radius.full,
                paddingVertical: 2,
                paddingHorizontal: spacing.sm,
              }}
            >
              <Ionicons name="alert" size={10} color={colors.danger} />
              <AppText variant="caption" color={colors.danger}>
                Overdue
              </AppText>
            </View>
          )}
        </View>
        {todo.tags.length > 0 && (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: spacing.xs,
              marginTop: spacing.sm,
            }}
          >
            {todo.tags.slice(0, 3).map(tag => (
              <TagChip key={tag} tag={tag} small />
            ))}
            {todo.tags.length > 3 && (
              <AppText variant="caption" color={colors.textSecondary}>
                +{todo.tags.length - 3}
              </AppText>
            )}
          </View>
        )}
        {(todo.dueDate || todo.estimatedMinutes) && (
          <View
            style={{
              flexDirection: 'row',
              gap: spacing.md,
              marginTop: spacing.sm,
            }}
          >
            {todo.dueDate && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Ionicons
                  name="calendar-outline"
                  size={12}
                  color={isOverdue ? colors.danger : colors.textSecondary}
                />
                <AppText variant="caption" color={isOverdue ? colors.danger : colors.textSecondary}>
                  {dayjs(todo.dueDate).format('MMM D')}
                </AppText>
              </View>
            )}
            {todo.estimatedMinutes && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Ionicons name="time-outline" size={12} color={colors.textSecondary} />
                <AppText variant="caption" color={colors.textSecondary}>
                  {todo.estimatedMinutes}m
                </AppText>
              </View>
            )}
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}
