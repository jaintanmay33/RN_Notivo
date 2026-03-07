import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTheme } from '@theme/index';
import { shadows } from '@theme/shadows';
import { type BottomTabParamList } from '@app-types/navigation';
import HomeScreen from '@screens/HomeScreen';
import ReportingScreen from '@screens/ReportingScreen';
import SettingsScreen from '@screens/SettingsScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

type TabConfig = {
  name: keyof BottomTabParamList;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  activeIcon: keyof typeof Ionicons.glyphMap;
};

const TABS: TabConfig[] = [
  { name: 'HomeTab', label: 'Home', icon: 'home-outline', activeIcon: 'home' },
  { name: 'ReportingTab', label: 'Reports', icon: 'bar-chart-outline', activeIcon: 'bar-chart' },
  { name: 'SettingsTab', label: 'Settings', icon: 'settings-outline', activeIcon: 'settings' },
];

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors, spacing, fontFamily, fontSize, iconSize } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.tabBarBg,
        borderTopWidth: 1,
        borderTopColor: colors.tabBarBorder,
        paddingBottom: insets.bottom + spacing.sm,
        paddingTop: spacing.sm,
        paddingHorizontal: spacing.base,
        ...shadows.none,
      }}
    >
      {state.routes.map((route, index) => {
        const tabConfig = TABS[index];
        const isActive = state.index === index;
        const color = isActive ? colors.tabBarActive : colors.tabBarInactive;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isActive && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true } as any);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.7}
            style={{ flex: 1, alignItems: 'center', gap: 2 }}
          >
            <View
              style={{
                height: 2,
                width: isActive ? 24 : 0,
                backgroundColor: colors.primary,
                borderRadius: 9999,
                marginBottom: 4,
              }}
            />
            <Ionicons
              name={isActive ? tabConfig.activeIcon : tabConfig.icon}
              size={iconSize.lg}
              color={color}
            />
            <Text
              style={{
                fontSize: fontSize.xs,
                fontFamily: isActive ? fontFamily.semiBold : fontFamily.regular,
                color,
              }}
            >
              {tabConfig.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="ReportingTab" component={ReportingScreen} />
      <Tab.Screen name="SettingsTab" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
