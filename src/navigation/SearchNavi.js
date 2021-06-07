import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

import SearchResults from "../constants/Search/SearchResults";
import addUser from "../constants/Search/addUser";

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
                    name = "SearchResults"
                    options={{
                        headerShown: true,
                        title: "Search",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}>

                    {(prop) => <SearchResults {...prop} searchData={props.route.params}/>}
                </ Stack.Screen>
                <Stack.Screen
                    name = "addUser"
                    component = {addUser}
                    options={{
                        headerShown: true,
                        title: "Add User",
                        headerStyle: {
                            backgroundColor: colours.primary
                        }}}/>

            </Stack.Navigator>
        </Screen>

    )
}
