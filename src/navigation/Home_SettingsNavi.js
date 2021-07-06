import React from 'react';
import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {TouchableOpacity, Text} from "react-native";

import NaviBar from "./NaviBar";
import SettingsFriends from "./SettingsFriends";
import SettingsHelp from "./SettingsHelp";
import SettingsPending from "./SettingsPending";
import SettingsProfile from "./SettingsProfile";
import SettingsSecurity from "./SettingsSecurity";

import styles from "../styling/navigation/HomeNavigation.styles"
import Screen from "../components/Screen";
import colours from "../constants/colours";
import Ionicons from "react-native-vector-icons/Ionicons";


const Drawer = createDrawerNavigator();
export default (props) => {
    const backButton = () => {
        return (
            <TouchableOpacity style = {styles.icon}
            onPress = {() => props.navigation.navigate('Back to Home')}>
                <Ionicons
                          name={'arrow-back-outline'} size={25}  />
            </TouchableOpacity>
        )
    }

    return (
        <Screen style = {styles.container}>
            <Drawer.Navigator
                drawerPosition = {"right"}
                drawerType={'slide'}
                sceneContainerStyle={styles.drawer}
                drawerStyle={styles.drawer}
                options={{
                   drawerIcon: backButton
                }}
            >
                <Drawer.Screen
                    name = "Back to Home"
                    component = {NaviBar}
                    />
                <Drawer.Screen
                    name = "Security"
                    component = {SettingsSecurity}
                    options={{
                        title: "Security",
                        headerStyle: {
                            backgroundColor: colours.primary,
                        },
                    }}/>
                <Drawer.Screen
                    name = "Profile"
                    component = {SettingsProfile}/>
                <Drawer.Screen
                    name = "Friends"
                    component = {SettingsFriends}/>
                <Drawer.Screen
                    name = "Pending"
                    component = {SettingsPending}/>
                <Drawer.Screen
                    name = "Help"
                    component = {SettingsHelp}/>

            </Drawer.Navigator>
        </Screen>

    )
}
