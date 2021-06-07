import React from "react";
import {Text} from "react-native";

import Search from "../../../constants/Search";
import Screen from "../../../components/Screen";
import Logo_Settings from "../../../constants/Logo_Settings";

import styles from '../../../styling/screens/In_App/app/HomeScreen.styles'

export default (props) => {
    return (
        <Screen style = {styles.container}>
            <Logo_Settings navigation = {props.navigation}/>
            <Search navigation = {props.navigation}/>

            <Text
                style = {styles.notificationsText}>
                Your Notifications
            </Text>
        </Screen>

    )
}