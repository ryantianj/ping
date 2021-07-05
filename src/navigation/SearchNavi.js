import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import addUser from "../constants/Search/addUser";
import addChannel from "../constants/Search/addChannel";
import SearchResultsUser from "../constants/Search/SearchResultsUser";
import SearchResultsChannel from "../constants/Search/SearchResultsChannel";

import styles from "../styling/navigation/SeachNavi.styles"
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
                    name = "addUser"
                    component = {addUser}
                    options={{
                        headerShown: true,
                        title: "Add User",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>
                <Stack.Screen
                    name = "searchUsers"
                    component = {SearchResultsUser}
                    options={{
                        headerShown: true,
                        title: "Add User",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>

                <Stack.Screen
                    name = "addChannel"
                    component = {addChannel}
                    options={{
                        headerShown: true,
                        title: "Add Channel",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>

                <Stack.Screen
                    name = "searchChannels"
                    component = {SearchResultsChannel}
                    options={{
                        headerShown: true,
                        title: "Add Channel",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>

            </Stack.Navigator>
        </Screen>

    )
}
