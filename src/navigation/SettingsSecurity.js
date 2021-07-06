import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import Security from "../screens/In_App/settings/Security"
import Update_email from "../screens/In_App/settings/Security/Update_email";
import Update_password from "../screens/In_App/settings/Security/Update_password";


import styles from "../styling/navigation/SettingsNavigation.styles"
import colours from "../constants/colours";
import Screen from "../components/Screen";
import {TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();
export default (props) => {
    const backButton = () => {
        return (
            <TouchableOpacity style = {styles.icon}
                              onPress = {() => props.navigation.goBack()}>
                <Ionicons
                    name={'arrow-back-outline'} size={25}  />
            </TouchableOpacity>
        )
    }
    return (
        <Screen style = {styles.container}>
            <Stack.Navigator
                screenOptions={{headerShown: true}}>
                <Stack.Screen
                    name = "Security"
                    component = {Security}
                    options={{
                        title: "Security",
                        headerStyle: {
                            backgroundColor: colours.primary
                        },
                    headerLeft: backButton}}/>
                <Stack.Screen
                    name = "Update_email"
                    component = {Update_email}
                    options={{
                        title: "Update Email",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>
                <Stack.Screen
                    name = "Update_password"
                    component = {Update_password}
                    options={{
                        title: "Update Password",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>
            </Stack.Navigator>
        </Screen>

    )
}
