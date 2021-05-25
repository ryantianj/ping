import React from 'react';
import {View} from "react-native";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import Settings from "../screens/In_App/settings/SettingsScreen";
import Security from "../screens/In_App/settings/Security"
import Update_email from "../screens/In_App/settings/Security/Update_email";
import Update_password from "../screens/In_App/settings/Security/Update_password";

import styles from "../styling/navigation/SettingsNavigation.styles"

const Stack = createStackNavigator();
export default (props) => {
    return (
        <View style = {styles.container}>
            <Stack.Navigator
                screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name = "Settings"
                    component = {Settings}/>
                <Stack.Screen
                    name = "Security"
                    component = {Security}/>
                <Stack.Screen
                    name = "Update_email"
                    component = {Update_email}/>
                <Stack.Screen
                    name = "Update_password"
                    component = {Update_password}/>
            </Stack.Navigator>
        </View>

    )
}
