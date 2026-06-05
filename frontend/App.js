import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS } from './src/theme/theme';
import { LayoutDashboard, Dumbbell, Activity } from 'lucide-react-native';

import Dashboard from './src/screens/Dashboard';
import WorkoutArena from './src/screens/WorkoutArena';
import TelemetrySync from './src/screens/TelemetrySync';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.primaryBackground, borderBottomWidth: 0 },
          headerTintColor: COLORS.textPrimary,
          tabBarStyle: { backgroundColor: COLORS.primaryBackground, borderTopColor: COLORS.secondarySurface },
          tabBarActiveTintColor: COLORS.accent1,
          tabBarInactiveTintColor: COLORS.textSecondary,
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ tabBarIcon: ({color}) => <LayoutDashboard color={color} size={24} /> }}
        />
        <Tab.Screen
          name="Workout"
          component={WorkoutArena}
          options={{ tabBarIcon: ({color}) => <Dumbbell color={color} size={24} /> }}
        />
        <Tab.Screen
          name="Telemetry"
          component={TelemetrySync}
          options={{ tabBarIcon: ({color}) => <Activity color={color} size={24} /> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
