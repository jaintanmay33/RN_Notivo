import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  MainApp: undefined;
  CreateTodo: undefined;
  EditTodo: { todoId: string };
  Archive: undefined;
  ReportDetail: {
    filterType: 'status' | 'priority' | 'tag' | 'overdue';
    filterValue: string;
    title: string;
  };
};

export type BottomTabParamList = {
  HomeTab: undefined;
  ReportingTab: undefined;
  SettingsTab: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type BottomTabScreensProps<T extends keyof BottomTabParamList> = BottomTabScreenProps<
  BottomTabParamList,
  T
>;

export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'HomeTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
