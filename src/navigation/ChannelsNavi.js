import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import styles from "../styling/navigation/ChannelsNavi.styles"
import JoinCreateChannelScreen from "../screens/In_App/app/channels/JoinCreateChannelScreen";
import ChannelRoomScreen from "../screens/In_App/app/channels/ChannelRoomScreen";
import NewPost from "../screens/In_App/app/channels/NewPost";
import ChannelRoomSettings from "../screens/In_App/app/channels/ChannelRoomSettings";
import Comments from "../screens/In_App/app/channels/Comments";


import Screen from "../components/Screen";
import colours from "../constants/colours";


const Stack = createStackNavigator();
export default (props) =>  {
    return (
        <Screen style = {styles.container}>
            <Stack.Navigator
                screenOptions = {{headerShown:false}}
                mode = 'modal'>
                <Stack.Screen
                    name = "ChannelRoom"
                    component = {ChannelRoomScreen}
                    options={{
                        headerShown: true,
                        title: "Channel",
                        headerStyle: {
                            backgroundColor: colours.primary,
                        }}}/>
                <Stack.Screen
                    name = "CreateChannel"
                    component = {JoinCreateChannelScreen}
                    options={{
                        headerShown: true,
                        title: "Create Channel",
                        headerStyle: {
                            backgroundColor: colours.primary,
                        }}}/>

                <Stack.Screen
                    name = "ChannelSettings"
                    component = {ChannelRoomSettings}
                    options={{
                        headerShown: true,
                        title: "Channel Settings",
                        headerStyle: {
                            backgroundColor: colours.primary,
                        }}}/>
                <Stack.Screen
                    name = "NewPost"
                    component = {NewPost}
                    options={{
                        headerShown: true,
                        title: "New post",
                        headerStyle: {
                            backgroundColor: colours.primary,
                        }}}/>
                <Stack.Screen
                    name = "Comments"
                    component = {Comments}
                    options={{
                        headerShown: true,
                        title: "Comments",
                        headerStyle: {
                            backgroundColor: colours.primary,
                        }}}/>

            </Stack.Navigator>
        </Screen>

    );
}