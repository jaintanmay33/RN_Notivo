import React, { useRef } from 'react';
import { View, TextInput, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@theme/index';
import { useTodoStore } from '@store/todoStore';

export default function SearchBar() {
  const { colors, spacing, radius, fontFamily, fontSize } = useTheme();
  const searchQuery = useTodoStore(s => s.searchQuery);
  const setSearch = useTodoStore(s => s.setSearch);
  const clearAnim = useRef(new Animated.Value(searchQuery ? 1 : 0)).current;

  const handleChange = (text: string) => {
    setSearch(text);
    Animated.timing(clearAnim, {
      toValue: text.length > 0 ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  const handleClear = () => {
    setSearch('');
    Animated.timing(clearAnim, { toValue: 0, duration: 150, useNativeDriver: true }).start();
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: radius.full,
        paddingHorizontal: spacing.md,
        height: 44,
        borderWidth: 1,
        borderColor: colors.border,
        gap: spacing.xs,
      }}
    >
      <Ionicons name="search" size={18} color={colors.textSecondary} />
      <TextInput
        value={searchQuery}
        onChangeText={handleChange}
        placeholder="Search tasks..."
        placeholderTextColor={colors.textDisabled}
        style={{
          flex: 1,
          color: colors.textPrimary,
          fontFamily: fontFamily.regular,
          fontSize: fontSize.base,
        }}
      />
      <Animated.View style={{ opacity: clearAnim, transform: [{ scale: clearAnim }] }}>
        <TouchableOpacity onPress={handleClear} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Ionicons name="close-circle" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
