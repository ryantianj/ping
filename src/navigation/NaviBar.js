import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from "../styling/navigation/NaviBar.styles";
import HomeScreen from "../screens/In_App/app/HomeScreen"
import Recommendations from "../screens/In_App/app/RecommendationsScreen";
import Room from "./RoomNavigation";
import Screen from "../components/Screen";
import Logo_Settings from "../constants/Logo_Settings";
import Search from "../constants/Search";


const Tab = createBottomTabNavigator();

export default (props) => {
    return (
        <Screen style = {styles.container}>
            <Logo_Settings navigation = {props.navigation}/>
            <Search navigation = {props.navigation}/>
            <Tab.Navigator
                initialRouteName = "Home"
                backBehavior = "history"
                lazy = {false}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'home' : 'home-outline';
                        } else if (route.name === 'Recommendations') {
                            iconName = focused
                                ? 'people' : 'people-outline';
                        } else if (route.name === 'Room') {
                            iconName = focused
                                ? 'chatbox' : 'chatbox-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={
                    {
                        keyboardHidesTabBar: true,
                        showLabel: false,
                        style: styles.NaviBar,
                        activeTintColor: 'tomato',
                        inactiveTintColor: 'gray',

                    }}
            >
                <Tab.Screen
                    name = "Room"
                    component = {Room}/>
                <Tab.Screen
                    name = "Home"
                    component = {HomeScreen}/>
                <Tab.Screen
                    name = "Recommendations"
                    component = {Recommendations}/>
            </Tab.Navigator>
        </Screen>

    )
}