import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '@theme/index';
import { type RootStackParamList } from '@app-types/navigation';
import SplashScreen from '@screens/SplashScreen';
import BottomTabNavigator from './BottomTabNavigator';
import CreateTodoScreen from '@screens/CreateTodoScreen';
import EditTodoScreen from '@screens/EditTodoScreen';
import ArchiveScreen from '@screens/ArchiveScreen';
import ReportDetailScreen from '@screens/ReportDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
        animation: 'default',
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} options={{ animation: 'none' }} />
      <Stack.Screen name="MainApp" component={BottomTabNavigator} options={{ animation: 'fade' }} />
      <Stack.Screen
        name="CreateTodo"
        component={CreateTodoScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="EditTodo"
        component={EditTodoScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="Archive"
        component={ArchiveScreen}
        options={{ animation: 'slide_from_right' }}
      />
      <Stack.Screen
        name="ReportDetail"
        component={ReportDetailScreen}
        options={{ animation: 'slide_from_right' }}
      />
    </Stack.Navigator>
  );
}
