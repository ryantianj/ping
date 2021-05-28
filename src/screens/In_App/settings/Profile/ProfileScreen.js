import React, {useState} from "react";
import {Text, TextInput, TouchableOpacity} from "react-native";

import Screen from "../../../../components/Screen";

import styles from "../../../../styling/screens/In_App/settings/Profile/ProfileScreen.styles"

export default (props) => {

    return (
        <Screen style = {styles.container}>

            <Text style = {styles.profileText}>
                Your Profile
            </Text>

        </Screen>
    )
}