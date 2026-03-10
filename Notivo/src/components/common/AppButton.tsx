import React from 'react';
import { TouchableOpacity, ActivityIndicator, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@theme/index';
import AppText from './AppText';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent';
type ButtonSize = 'sm' | 'md' | 'lg';

interface Props {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  size?: ButtonSize;
  style?: ViewStyle;
}

export default function AppButton({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon,
  size = 'md',
  style,
}: Props) {
  const { colors, spacing, radius, fontSize, shadows } = useTheme();

  const isDisabled = disabled || loading;

  const sizeConfig = {
    sm: { py: spacing.sm, px: spacing.md, fs: fontSize.sm, iconSize: 14 },
    md: { py: spacing.md, px: spacing.lg, fs: fontSize.base, iconSize: 16 },
    lg: { py: spacing.base, px: spacing.xl, fs: fontSize.md, iconSize: 18 },
  }[size];

  const variantConfig = {
    primary: { bg: null, border: null, textColor: colors.textOnPrimary },
    secondary: { bg: colors.primaryLight, border: colors.primary, textColor: colors.primary },
    ghost: { bg: 'transparent', border: colors.border, textColor: colors.textPrimary },
    danger: { bg: colors.dangerBg, border: colors.danger, textColor: colors.danger },
    accent: { bg: null, border: null, textColor: colors.textOnAccent },
  }[variant];

  const containerStyle: ViewStyle = {
    borderRadius: radius.lg,
    paddingVertical: sizeConfig.py,
    paddingHorizontal: sizeConfig.px,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.xs,
    opacity: isDisabled ? 0.5 : 1,
    alignSelf: fullWidth ? 'stretch' : 'flex-start',
    backgroundColor: variantConfig.bg ?? undefined,
    borderWidth: variantConfig.border ? 1.5 : 0,
    borderColor: variantConfig.border ?? undefined,
    ...(variant === 'primary' ? shadows.fab : {}),
  };

  const content = (
    <>
      {icon && !loading && (
        <Ionicons name={icon} size={sizeConfig.iconSize} color={variantConfig.textColor} />
      )}
      {loading ? (
        <ActivityIndicator size="small" color={variantConfig.textColor} />
      ) : (
        <AppText
          variant="button"
          color={variantConfig.textColor}
          style={{ fontSize: sizeConfig.fs }}
        >
          {label}
        </AppText>
      )}
    </>
  );

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.85}
        style={[
          { borderRadius: radius.lg, alignSelf: fullWidth ? 'stretch' : 'flex-start' },
          style,
        ]}
      >
        <LinearGradient
          colors={colors.gradientPrimary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={containerStyle}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'accent') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.85}
        style={[
          { borderRadius: radius.lg, alignSelf: fullWidth ? 'stretch' : 'flex-start' },
          style,
        ]}
      >
        <LinearGradient
          colors={colors.gradientAccent}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={containerStyle}
        >
          {content}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[containerStyle, style]}
    >
      {content}
    </TouchableOpacity>
  );
}
