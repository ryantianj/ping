import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import NaviBar from "./NaviBar";
import Settings from "../navigation/SettingsNavigation"
import Chats from "../navigation/ChatsNavigation"
import Groups from "../navigation/GroupsNavigation"
import Channels from "./ChannelsNavi";
import SearchNavi from "./SearchNavi";
import ViewProfile from "../screens/In_App/app/ViewProfile";

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
                <Stack.Screen
                    name = "ViewProfileChannel"
                    component = {ViewProfile}
                    options={{
                        headerShown: true,
                        title: "User Profile",
                        headerStyle: {
                            backgroundColor: colours.primary,
                        }}}/>
            </Stack.Navigator>
        </Screen>

    )
}
