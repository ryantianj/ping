import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import styles from "../styling/navigation/ChatsNavigation.styles"

import ChatRoomScreen from "../screens/In_App/app/chats/ChatRoomScreen";
import ChatRoomSettingsScreen from "../screens/In_App/app/chats/ChatRoomSettingsScreen";
import JoinCreateChatRoomScreen from "../screens/In_App/app/chats/JoinCreateChatRoomScreen";
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
                    name = "ChatRoom"
                    component = {ChatRoomScreen}
                    options={{
                        headerShown: true,
                        title: "Chat",
                        headerStyle: {
                            backgroundColor: colours.primary,
                        }}}/>
                <Stack.Screen
                    name = "JoinCreateRoom"
                    component = {JoinCreateChatRoomScreen}
                    options={{
                        headerShown: true,
                        title: "New Chat",
                        headerStyle: {
                            backgroundColor: colours.primary,
                        }}}/>
                <Stack.Screen
                    name = "ChatRoomSettings"
                    component = {ChatRoomSettingsScreen}
                    options={{
                        headerShown: true,
                        title: "Chat Settings",
                        headerStyle: {
                            backgroundColor: colours.primary,
                        }}}/>

            </Stack.Navigator>
        </Screen>

    );
}