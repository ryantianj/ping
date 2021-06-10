import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import styles from "../styling/navigation/ChannelsNavi.styles"
import JoinCreateChannelScreen from "../screens/In_App/app/channels/JoinCreateChannelScreen";


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
                    name = "CreateChannel"
                    component = {JoinCreateChannelScreen}
                    options={{
                        headerShown: true,
                        title: "Chat",
                        headerStyle: {
                            backgroundColor: colours.primary,
                        }}}/>
            </Stack.Navigator>
        </Screen>

    );
}