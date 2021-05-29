import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import styles from "../styling/navigation/ChatsNavigation.styles.styles"

import ChatRoomScreen from "../screens/In_App/app/chats/ChatRoomScreen";
import JoinCreateChatRoomScreen from "../screens/In_App/app/chats/JoinCreateChatRoomScreen";


const Stack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer style = {styles.container}>
            <Stack.Navigator
                screenOptions = {{headerShown:false}}>
                <Stack.Screen
                    name = "ChatRoom"
                    component = {ChatRoomScreen}/>
                <Stack.Screen
                    name = "JoinCreateRoom"
                    component = {JoinCreateChatRoomScreen}/>

            </Stack.Navigator>
        </NavigationContainer>
    );
}