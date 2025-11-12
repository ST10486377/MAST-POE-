import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProvider } from './context/MenuContext';
import HomeScreen from './screens/HomeScreen';
import ChefScreen from './screens/ChefScreen';
import FilterScreen from './screens/FilterScreen';

export type RootStackParamList = {
  Home: undefined;
  Chef: undefined;
  Filter: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerLargeTitle: true }}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Menu" }} />
          <Stack.Screen name="Chef" component={ChefScreen} options={{ title: "Chef - Manage Menu" }} />
          <Stack.Screen name="Filter" component={FilterScreen} options={{ title: "Filter Menu" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
