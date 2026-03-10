import React, { useEffect, useRef } from 'react';
import { Modal, View, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { useTheme } from '@theme/index';
import AppText from './AppText';
import AppButton from './AppButton';

const { height: SCREEN_H } = Dimensions.get('window');

interface Props {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  destructive?: boolean;
}

export default function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  destructive = false,
}: Props) {
  const { colors, spacing, radius, shadows } = useTheme();
  const translateY = useRef(new Animated.Value(SCREEN_H)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        tension: 70,
        friction: 11,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_H,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} onRequestClose={onCancel} animationType="none">
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: colors.overlay }}
        onPress={onCancel}
        activeOpacity={1}
      />
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.surfaceElevated,
          borderTopLeftRadius: radius['2xl'],
          borderTopRightRadius: radius['2xl'],
          padding: spacing.xl,
          paddingBottom: spacing['2xl'],
          gap: spacing.base,
          transform: [{ translateY }],
          ...shadows.modal,
        }}
      >
        <View
          style={{
            width: 40,
            height: 4,
            backgroundColor: colors.border,
            borderRadius: radius.full,
            alignSelf: 'center',
            marginBottom: spacing.sm,
          }}
        />
        <AppText variant="sectionTitle">{title}</AppText>
        <AppText variant="cardBody" color={colors.textSecondary}>
          {message}
        </AppText>
        <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }}>
          <AppButton
            label={cancelLabel}
            onPress={onCancel}
            variant="ghost"
            fullWidth
            style={{ flex: 1 }}
          />
          <AppButton
            label={confirmLabel}
            onPress={onConfirm}
            variant={destructive ? 'danger' : 'primary'}
            fullWidth
            style={{ flex: 1 }}
          />
        </View>
      </Animated.View>
    </Modal>
  );
}
