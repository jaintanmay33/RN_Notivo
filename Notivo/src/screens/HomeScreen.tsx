import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@theme/index';

export default function HomeScreen() {
  const { colors, fontFamily } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: colors.textPrimary, fontFamily: fontFamily.bold }}>
        HomeScreen — Coming in Section 7
      </Text>
    </View>
  );
}
