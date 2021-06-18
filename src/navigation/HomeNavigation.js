import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import NaviBar from "./NaviBar";
import Settings from "../navigation/SettingsNavigation"
import Chats from "../navigation/ChatsNavigation"
import Groups from "../navigation/GroupsNavigation"
import Channels from "./ChannelsNavi";
import SearchNavi from "./SearchNavi";
import LoadingScreen from "../constants/LoadingScreen";

import styles from "../styling/navigation/HomeNavigation.styles"
import Screen from "../components/Screen";


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
                    name = "Loading"
                    component = {LoadingScreen}/>
                <Stack.Screen
                    name = "Settings"
                    component = {Settings}/>
                <Stack.Screen
                    name = "Search"
                    component = {SearchNavi}/>
                <Stack.Screen
                    name = "ChatRooms"
                    component = {Chats}/>
                <Stack.Screen
                    name = "GroupRooms"
                    component = {Groups}/>
                <Stack.Screen
                    name = "Channels"
                    component = {Channels}/>
            </Stack.Navigator>
        </Screen>

    )
}
