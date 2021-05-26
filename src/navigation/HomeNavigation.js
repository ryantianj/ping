import React from 'react';
import {View} from "react-native";
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import NaviBar from "./NaviBar";
import Settings from "../navigation/SettingsNavigation"

import styles from "../styling/navigation/HomeNavigation.styles"

const Stack = createStackNavigator();
export default (props) => {

    return (
        <View style = {styles.container}>
            <Stack.Navigator
                screenOptions={{headerShown: false}}
            >
                <Stack.Screen
                    name = "Main"
                    component = {NaviBar}/>
                <Stack.Screen
                    name = "Settings"
                    component = {Settings}/>
            </Stack.Navigator>
        </View>

    )
}
