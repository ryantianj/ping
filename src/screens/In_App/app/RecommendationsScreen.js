import React from "react";
import {Text} from "react-native";

import Search from "../../../constants/Search";
import Screen from "../../../components/Screen";
import Logo_Settings from "../../../constants/Logo_Settings";

import styles from '../../../styling/screens/In_App/app/RecommedationsScreen.styles'

export default (props) => {
    return (
        <Screen style = {styles.container}>
            <Logo_Settings navigation = {props.navigation}/>
            <Search />

            <Text
                style = {styles.notificationsText}>
                Just For You
            </Text>
        </Screen>

    )
}