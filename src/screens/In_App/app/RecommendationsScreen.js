import React from "react";
import {Text} from "react-native";

import Screen from "../../../components/Screen";

import styles from '../../../styling/screens/In_App/app/RecommendationsScreen.styles'

export default (props) => {
    return (
        <Screen style = {styles.container}>
            <Text
                style = {styles.notificationsText}>
                Just For You
            </Text>
        </Screen>

    )
}