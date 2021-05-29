import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import styles from "../styling/navigation/ChatsNavigation.styles"

import ChatRoomScreen from "../screens/In_App/app/chats/ChatRoomScreen";
import JoinCreateChatRoomScreen from "../screens/In_App/app/chats/JoinCreateChatRoomScreen";
import Screen from "../components/Screen";


const Stack = createStackNavigator();
export default function App() {
    return (
        <Screen style = {styles.container}>
            <Stack.Navigator
                screenOptions = {{headerShown:false}}
                mode = 'modal'>
                <Stack.Screen
                    name = "ChatRoom"
                    component = {ChatRoomScreen}/>
                <Stack.Screen
                    name = "JoinCreateRoom"
                    component = {JoinCreateChatRoomScreen}/>
            </Stack.Navigator>
        </Screen>

    );
}