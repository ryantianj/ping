import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import styles from "../styling/navigation/LoginNavi.styles"

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPassword_Email from "../screens/ForgotPasswordScreen_Email";
import Main from "../navigation/HomeNavigation";

const Stack = createStackNavigator();
export default function App() {
    return (
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
                    name = "Forgot"
                    component = {ForgotPassword_Email}/>
                <Stack.Screen
                    name = "Main"
                    component = {Main}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
}