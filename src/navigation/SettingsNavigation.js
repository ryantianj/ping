import React from 'react';
import {View} from "react-native";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import Settings from "../screens/In_App/settings/SettingsScreen";
import Security from "../screens/In_App/settings/Security"
import Update_email from "../screens/In_App/settings/Security/Update_email";
import Update_password from "../screens/In_App/settings/Security/Update_password";

import styles from "../styling/navigation/SettingsNavigation.styles"
import colours from "../constants/colours";

const Stack = createStackNavigator();
export default (props) => {
    return (
        <View style = {styles.container}>
            <Stack.Navigator
                screenOptions={{headerShown: true}}>
                <Stack.Screen
                    name = "Settings"
                    component = {Settings}
                    options={{
                        title: "Settings",
                        headerStyle: {
                            backgroundColor: colours.primary,
                        },

                    }}/>
                <Stack.Screen
                    name = "Security"
                    component = {Security}
                    options={{
                        title: "Security",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>
                <Stack.Screen
                    name = "Update_email"
                    component = {Update_email}
                    options={{
                        title: "Security",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>
                <Stack.Screen
                    name = "Update_password"
                    component = {Update_password}
                    options={{
                        title: "Security",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>
            </Stack.Navigator>
        </View>

    )
}
