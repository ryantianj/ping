import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import styles from "../styling/navigation/GroupsNavigation.styles"

import GroupRoomScreen from "../screens/In_App/app/groups/GroupRoomScreen";
import GroupRoomSettingsScreen from "../screens/In_App/app/groups/GroupRoomSettingsScreen";
import JoinCreateGroupRoomScreen from "../screens/In_App/app/groups/JoinCreateGroupRoomScreen";
import Screen from "../components/Screen";
import colours from "../constants/colours";


const Stack = createStackNavigator();
export default function App() {
    return (
        <Screen style = {styles.container}>
            <Stack.Navigator
                screenOptions = {{headerShown:false}}
                mode = 'modal'>

                <Stack.Screen
                    name = "GroupRoom"
                    component = {GroupRoomScreen}
                    options={{
                        headerShown: true,
                        title: "Group",
                        headerStyle: {
                            backgroundColor: colours.primary,
                        }}}/>
                <Stack.Screen
                    name = "JoinCreateGroupRoom"
                    component = {JoinCreateGroupRoomScreen}
                    options={{
                        headerShown: true,
                        title: "New Group",
                        headerStyle: {
                            backgroundColor: colours.primary,
                        }}}/>
                <Stack.Screen
                    name = "GroupRoomSettings"
                    component = {GroupRoomSettingsScreen}
                    options={{
                        headerShown: true,
                        title: "Group Settings",
                        headerStyle: {
                            backgroundColor: colours.primary,
                        }}}/>

            </Stack.Navigator>
        </Screen>

    );
}