import React, {useState} from "react";
import {Text, TextInput, TouchableOpacity} from "react-native";

import Screen from "../../../../components/Screen";

import styles from "../../../../styling/screens/In_App/settings/Security/Update_password.styles"

export default (props) => {
    const [password, setPassword] = useState("");
    return (
        <Screen style = {styles.container}>

            <Text style = {styles.passwordText}>
                Enter new Password
            </Text>
            <TextInput
                style = {styles.textInput}
                placeholder = "Enter Password Here"
                value = {password}
                onChangeText = {setPassword}
                autoCapitalize = "none"
                returnKeyType = "next"
                blurOnSubmit={false}
            />
            <TouchableOpacity
                style = {styles.button}
            >
                <Text style = {styles.buttonText}>Update Password</Text>
            </TouchableOpacity>

        </Screen>
    )
}