import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./src/pages/login";
import Register from "./src/pages/register";
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={Login} 
        />
        <Stack.Screen 
          name="Register" 
          component={Register} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
