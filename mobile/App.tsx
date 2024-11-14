import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./src/pages/login";
import Register from "./src/pages/register";
import PlantDetails from "./src/pages/plantDetails";
import AddPlant from "./src/pages/addPlant";
import ResetPassword from "./src/pages/resetPassword";
import Main from "./src/pages/main";
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right'
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
        <Stack.Screen 
          name="ResetPassword" 
          component={ResetPassword}
        />
        <Stack.Screen 
          name="Main" 
          component={Main}
        />
        <Stack.Screen 
          name="PlantDetails" 
          component={PlantDetails}
        />
        <Stack.Screen 
          name="AddPlant" 
          component={AddPlant}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
