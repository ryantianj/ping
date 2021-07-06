import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import HelpMain from "../screens/In_App/settings/Help/HelpMain";
import FriendHelp from "../screens/In_App/settings/Help/FriendHelp";
import RoomHelp from "../screens/In_App/settings/Help/RoomHelp";
import BadgesHelp from "../screens/In_App/settings/Help/BadgesHelp";

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
                    name = "Help"
                    component = {HelpMain}
                    options={{
                        title: "Help",
                        headerStyle: {
                            backgroundColor: colours.primary
                        },
                    headerLeft: backButton}}/>

                <Stack.Screen
                    name = "Rooms"
                    component = {RoomHelp}
                    options={{
                        title: "Rooms",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>

                <Stack.Screen
                    name = "Friends"
                    component = {FriendHelp}
                    options={{
                        title: "Friends",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>

                <Stack.Screen
                    name = "Badges"
                    component = {BadgesHelp}
                    options={{
                        title: "Badges",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>
            </Stack.Navigator>
        </Screen>

    )
}
