import React from 'react';
import {View} from "react-native";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "../screens/HomeScreen";
import Settings from "../screens/SettingsScreen";

import styles from "../styling/navigation/HomeNavigation.styles"

const Stack = createStackNavigator();
export default function App() {
    return (
        <View style = {styles.container}>
            <Stack.Navigator
                screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name = "Home"
                    component = {HomeScreen}/>
                <Stack.Screen
                    name = "Settings"
                    component = {Settings}/>
            </Stack.Navigator>
        </View>

    )
}
