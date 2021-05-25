import React from 'react';
import { View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import styles from "./src/styling/app/App.styles"

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import Settings from "./src/screens/SettingsScreen";

const Stack = createStackNavigator();
export default function App() {
  return (
      <View style = {styles.container}>
          <NavigationContainer style = {styles.container}>
              <Stack.Navigator
                  screenOptions = {{headerShown:false}}>
                  <Stack.Screen
                      name = "Login"
                      component = {LoginScreen}/>
                  <Stack.Screen
                      name = "Register"
                      component = {RegisterScreen}/>
                  <Stack.Screen
                      name = "Home"
                      component = {HomeScreen}/>
                  <Stack.Screen
                      name = "Settings"
                      component = {Settings}/>
              </Stack.Navigator>
          </NavigationContainer>
      </View>
  );
}

