import React from "react";
import {Text} from "react-native";

import Screen from "../../../components/Screen";

import styles from '../../../styling/screens/In_App/app/GroupScreen.styles';

export default (props) => {
    return (
        <Screen style = {styles.container}>

            <Text
                style = {styles.groupsText}>
                Your Groups
            </Text>
        </Screen>

    )
}