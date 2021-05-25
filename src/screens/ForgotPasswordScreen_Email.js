import React, {useState} from "react";
import {Text, TextInput, TouchableOpacity} from "react-native";

import Screen from "../components/Screen";
import styles from "../styling/screens/ForgotPasswordScreen_Email.styles";

export default (props) => {
    const [email, setEmail] = useState("");

    return (
        <Screen style = {styles.container}>
            <Text style = {styles.usernameText}>
                Enter Email
            </Text>
            <TextInput
                style = {styles.textInput}
                placeholder = "Enter Email Here"
                value = {email}
                onChangeText = {setEmail}
                autoCapitalize = "none"
                returnKeyType = "next"
                blurOnSubmit={false}
            />

            <TouchableOpacity
                style = {styles.button}
                >
                <Text style = {styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </Screen>
    )
}