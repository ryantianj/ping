import React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Channel from "../screens/In_App/app/ChannelScreen";
import Group from "../screens/In_App/app/GroupScreen";
import Chat from "../screens/In_App/app/ChatScreen";
import Logo_Settings from "../constants/Logo_Settings";
import Search from "../constants/Search";

import styles from "../styling/navigation/RoomNavigation.styles";
import Screen from "../components/Screen";

const Tab = createMaterialTopTabNavigator();

export default (props) => {
    return (
        <Screen style = {styles.container}>
            <Logo_Settings navigation = {props.navigation}/>
            <Search navigation = {props.navigation}/>
            <View style = {styles.tabContainer}>
                <Tab.Navigator
                    styles = {styles.navi}
                    tabBarOptions={
                        {
                            style: styles.NaviBar,
                            activeTintColor: 'tomato',
                            inactiveTintColor: 'black',
                        }}>
                    <Tab.Screen name="Channel" component={Channel} />
                    <Tab.Screen name="Group" component={Group} />
                    <Tab.Screen name="Chat" component={Chat} />
                </Tab.Navigator>
            </View>

        </Screen>

    )
}