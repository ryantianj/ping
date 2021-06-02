import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';


import styles from "../styling/navigation/CreateProfileNavi.styles"
import Screen from "../components/Screen";
import colours from "../constants/colours";


import RegisterProfileScreen from "../screens/In_App/app/RegisterProfileScreen";
import ProfileConfirmScreen from "../screens/In_App/app/ProfileConfirmScreen";

const Stack = createStackNavigator();
export default (props) => {

    return (
        <Screen style = {styles.container}>
            <Stack.Navigator
                screenOptions={{headerShown: false}}
            >
                <Stack.Screen
                    name = "RegisterProfile"
                    component = {RegisterProfileScreen}>
                </ Stack.Screen>

                <Stack.Screen
                    name = "ConfirmProfile"
                    component = {ProfileConfirmScreen}/>
            </Stack.Navigator>
        </Screen>

    )
}
