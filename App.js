import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import colours from "./src/constants/colours";
import styles from "./src/styling/app/App.styles"

import LoginScreen from "./src/screens/LoginScreen";
import Screen from "./src/components/Screen";
import MainScreen from "./src/screens/MainScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";

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
              </Stack.Navigator>
          </NavigationContainer>
      </View>
  );
}

