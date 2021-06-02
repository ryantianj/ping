import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import NaviBar from "./NaviBar";
import Settings from "../navigation/SettingsNavigation"
import Chats from "../navigation/ChatsNavigation"

import styles from "../styling/navigation/HomeNavigation.styles"
import Screen from "../components/Screen";
import colours from "../constants/colours";


const Stack = createStackNavigator();
export default (props) => {

    return (
        <Screen style = {styles.container}>
            <Stack.Navigator
                screenOptions={{headerShown: false}}
            >
                <Stack.Screen
                    name = "Main"
                    component = {NaviBar}/>
                <Stack.Screen
                    name = "Settings"
                    component = {Settings}/>
                <Stack.Screen
                    name = "ChatRoom"
                    component = {Chats}
                    options={{
                        headerShown: true,
                        title: "",
                        headerStyle: {
                            backgroundColor: colours.primary,
                        }}}/>
            </Stack.Navigator>
        </Screen>

    )
}
