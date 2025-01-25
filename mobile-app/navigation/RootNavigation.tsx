import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { HomeScreen } from '../screens/Home';
import { ProgressScreen } from '../screens/Progress';
import { AddExerciseScreen } from '../screens/AddExercise';
import { colors } from '../utils/colors';

export type RootNavigationParamsList = {
  ManageExercises: undefined;
  Progress: undefined;
};

export type ManageExercisesParamsList = {
  Home: undefined;
  AddExercise: undefined;
};
const Tab = createBottomTabNavigator<RootNavigationParamsList>();
const Stack = createNativeStackNavigator<ManageExercisesParamsList>();

const ManageExercises = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colors.primary,
        headerStyle: {
          backgroundColor: colors.bg,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddExercise"
        component={AddExerciseScreen}
        options={{
          title: 'Add Exercise',
          headerBackButtonDisplayMode: 'minimal',
        }}
      />
    </Stack.Navigator>
  );
};

export const RootNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarStyle: {
          backgroundColor: colors.bg,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="ManageExercises"
        component={ManageExercises}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="barbell-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Workout',
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart-outline" size={size} color={color} />
          ),
          tabBarLabel: 'My Progress',
        }}
      />
    </Tab.Navigator>
  );
};
