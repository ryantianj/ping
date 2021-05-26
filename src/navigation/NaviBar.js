import React from 'react';
import 'react-native-gesture-handler';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import styles from "../styling/navigation/NaviBar.styles";
import HomeScreen from "../navigation/HomeNavigation"
import Recommendations from "../screens/In_App/app/RecommendationsScreen"


const Tab = createBottomTabNavigator();

export default (props) => {
    return (
        <View style = {styles.container}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'home' : 'home-outline';
                        } else if (route.name === 'Recommendations') {
                            iconName = focused
                                ? 'search' : 'search-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={
                {
                    style: styles.NaviBar,
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',

                }}
            >
                <Tab.Screen
                    name = "Home"
                    component = {HomeScreen}/>
                <Tab.Screen
                    name = "Recommendations"
                    component = {Recommendations}/>
            </Tab.Navigator>
        </View>

    )
}