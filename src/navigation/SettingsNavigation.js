import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';


import Settings from "../screens/In_App/settings/SettingsScreen";
import Security from "../screens/In_App/settings/Security"
import Update_email from "../screens/In_App/settings/Security/Update_email";
import Update_password from "../screens/In_App/settings/Security/Update_password";
import Profile from "../screens/In_App/settings/Profile/ProfileScreen"
import UpdateProfileScreen from "../screens/In_App/settings/Profile/UpdateProfileScreen";
import ProfileConfirmScreen from "../screens/In_App/app/ProfileConfirmScreen";
import Friendlist from "../screens/In_App/settings/Friends/Friendlist";
import Pending from "../screens/In_App/settings/Pending/Pending";
import AcceptRequest from "../screens/In_App/settings/Pending/AcceptRequest";
import DeleteFriend from "../screens/In_App/settings/Friends/DeleteFriend";
import HelpMain from "../screens/In_App/settings/Help/HelpMain";
import FriendHelp from "../screens/In_App/settings/Help/FriendHelp";
import RoomHelp from "../screens/In_App/settings/Help/RoomHelp";
import BadgesHelp from "../screens/In_App/settings/Help/BadgesHelp";

import styles from "../styling/navigation/SettingsNavigation.styles"
import colours from "../constants/colours";
import Screen from "../components/Screen";

const Stack = createStackNavigator();
export default (props) => {
    return (
        <Screen style = {styles.container}>
            <Stack.Navigator
                screenOptions={{headerShown: true}}>
                <Stack.Screen
                    name = "Settings"
                    component = {Settings}
                    options={{
                        title: "Settings",
                        headerStyle: {
                            backgroundColor: colours.primary,
                        },

                    }}/>
                <Stack.Screen
                    name = "Security"
                    component = {Security}
                    options={{
                        title: "Security",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>
                <Stack.Screen
                    name = "Update_email"
                    component = {Update_email}
                    options={{
                        title: "Update Email",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>
                <Stack.Screen
                    name = "Update_password"
                    component = {Update_password}
                    options={{
                        title: "Update Password",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>
                <Stack.Screen
                    name = "Profile"
                    component = {Profile}
                    options={{
                        title: "Profile",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>
                <Stack.Screen
                    name = "UpdateProfile"
                    component = {UpdateProfileScreen}
                    options={{
                        title: "Update Profile",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>
                <Stack.Screen
                    name = "ConfirmProfile"
                    component = {ProfileConfirmScreen}
                    options={{
                        title: "Confirm Profile",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>
                <Stack.Screen
                    name = "Pending"
                    component = {Pending}
                    options={{
                        title: "Pending Requests",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>
                <Stack.Screen
                    name = "AcceptRequest"
                    component = {AcceptRequest}
                    options={{
                        title: "Accept Request",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>
                <Stack.Screen
                    name = "FriendList"
                    component = {Friendlist}
                    options={{
                        title: "Friends",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>
                <Stack.Screen
                    name = "DeleteFriend"
                    component = {DeleteFriend}
                    options={{
                        title: "Friend",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>

                <Stack.Screen
                    name = "Help"
                    component = {HelpMain}
                    options={{
                        title: "Help",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>

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
