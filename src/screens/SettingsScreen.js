import React, {useState} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";

import Screen from "../components/Screen";

import styles from '../styling/screens/SettingsScreen.styles'

export default (props) => {
    return (
        <Screen style = {styles.container}>
            <TouchableOpacity
                style = {styles.button}
                >
                <Text style ={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </Screen>
    )
}