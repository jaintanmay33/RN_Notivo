// src/types/navigation.ts
// Type definitions for all navigation routes and their params.
// These types power TypeScript autocompletion throughout the app.

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

// ── Root Stack ─────────────────────────────────────────────────────────
// Every screen in the main stack navigator.
// 'undefined' means the screen takes NO params.
// If a screen requires params, specify the type here.
export type RootStackParamList = {
  Splash: undefined;
  MainApp: undefined; // The bottom tab navigator lives here
  CreateTodo: undefined;
  EditTodo: { todoId: string }; // REQUIRED: which todo to edit
  Archive: undefined;
  ReportDetail: {
    filterType: 'status' | 'priority' | 'tag' | 'overdue';
    filterValue: string; // e.g. 'completed', 'urgent', 'design'
    title: string; // Header title shown on the detail screen
  };
};

// ── Bottom Tab Param List ──────────────────────────────────────────────
// Each tab in the bottom tab navigator.
// Tab screens rarely take params — they are top-level destinations.
export type BottomTabParamList = {
  HomeTab: undefined;
  ReportingTab: undefined;
  SettingsTab: undefined;
};

// ── Screen Props Helpers ───────────────────────────────────────────────
// Use these types as props for your screen components.
// They give you both 'navigation' and 'route' props, fully typed.

// For screens in the root stack:
export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

// For screens in the bottom tab navigator:
export type BottomTabScreensProps<T extends keyof BottomTabParamList> = BottomTabScreenProps<
  BottomTabParamList,
  T
>;

// For screens that are IN a tab but need ROOT stack navigation too:
// (HomeScreen needs to navigate to CreateTodo which is in the root stack)
export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'HomeTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

// ── Global type augmentation ──────────────────────────────────────────
// This tells TypeScript about the global navigation type.
// Required for useNavigation() to be fully typed without casting.
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
