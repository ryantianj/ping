import React from "react";
import {Text, TouchableOpacity} from "react-native";

import Screen from "../../../components/Screen";

import styles from '../../../styling/screens/In_App/settings/SettingsScreen.styles'

export default (props) => {
    return (
        <Screen style = {styles.container}>
            <Text style = {styles.settings}>Settings</Text>

            <TouchableOpacity
                style = {styles.securityButton}
                onPress = {() => props.navigation.navigate('Security')}
            >
                <Text style = {styles.securityButtonText}>Security</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style = {styles.button}
                >
                <Text style ={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </Screen>
    )
}