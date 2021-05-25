import React from "react";
import {Text, TouchableOpacity} from "react-native";

import Screen from "../../../components/Screen";

import styles from "../../../styling/screens/In_App/settings/Security.styles";

export default (props) => {
    return (
        <Screen style = {styles.container}>
            <Text style = {styles.security}>Security</Text>

            <TouchableOpacity
                style = {styles.emailButton}
                onPress = {() => props.navigation.navigate('Update_email')}
            >
                <Text style = {styles.securityButtonText}>Update email</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style = {styles.passwordButton}
                onPress = {() => props.navigation.navigate('Update_password')}
            >
                <Text style = {styles.securityButtonText}>Update password</Text>
            </TouchableOpacity>

        </Screen>
    )
}