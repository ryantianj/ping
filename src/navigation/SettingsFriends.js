import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import Friendlist from "../screens/In_App/settings/Friends/Friendlist";
import DeleteFriend from "../screens/In_App/settings/Friends/DeleteFriend";


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
                    name = "FriendList"
                    component = {Friendlist}
                    options={{
                        title: "Friends",
                        headerStyle: {
                            backgroundColor: colours.primary
                        },
                        headerLeft: backButton}}/>
                <Stack.Screen
                    name = "DeleteFriend"
                    component = {DeleteFriend}
                    options={{
                        title: "Friend",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>

            </Stack.Navigator>
        </Screen>

    )
}
