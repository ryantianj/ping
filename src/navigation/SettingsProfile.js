import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from "../screens/In_App/settings/Profile/ProfileScreen"
import UpdateProfileScreen from "../screens/In_App/settings/Profile/UpdateProfileScreen";
import ProfileConfirmScreen from "../screens/In_App/app/ProfileConfirmScreen";

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
                    name = "Profile"
                    component = {Profile}
                    options={{
                        title: "Profile",
                        headerStyle: {
                            backgroundColor: colours.primary
                        },
                        headerLeft: backButton}}/>
                <Stack.Screen
                    name = "UpdateProfile"
                    component = {UpdateProfileScreen}
                    options={{
                        title: "Update Profile",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>
                <Stack.Screen
                    name = "ConfirmProfile"
                    component = {ProfileConfirmScreen}
                    options={{
                        title: "Confirm Profile",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>
            </Stack.Navigator>
        </Screen>

    )
}
