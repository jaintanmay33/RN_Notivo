import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@theme/index';
import AppText from './AppText';

interface Props extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: object;
}

export default function AppInput({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  multiline = false,
  numberOfLines = 4,
  ...textInputProps
}: Props) {
  const { colors, spacing, radius, fontFamily, fontSize } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error ? colors.danger : isFocused ? colors.borderFocus : colors.border;

  return (
    <View style={[{ marginBottom: spacing.md }, containerStyle]}>
      {label && (
        <AppText
          variant="label"
          color={error ? colors.danger : colors.textSecondary}
          style={{ marginBottom: spacing.xs }}
        >
          {label}
        </AppText>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: multiline ? 'flex-start' : 'center',
          backgroundColor: colors.surface,
          borderRadius: radius.md,
          borderWidth: 1.5,
          borderColor,
          paddingHorizontal: spacing.md,
          paddingVertical: multiline ? spacing.md : 0,
          minHeight: multiline ? 100 : 48,
        }}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={18}
            color={isFocused ? colors.primary : colors.textSecondary}
            style={{ marginRight: spacing.sm }}
          />
        )}
        <TextInput
          {...textInputProps}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            flex: 1,
            color: colors.textPrimary,
            fontFamily: fontFamily.regular,
            fontSize: fontSize.base,
            textAlignVertical: multiline ? 'top' : 'center',
          }}
          placeholderTextColor={colors.textDisabled}
          cursorColor={colors.primary}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={{ marginLeft: spacing.sm }}>
            <Ionicons name={rightIcon} size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs, gap: 4 }}>
          <Ionicons name="alert-circle" size={12} color={colors.danger} />
          <AppText variant="errorText" color={colors.danger}>
            {error}
          </AppText>
        </View>
      )}
    </View>
  );
}
