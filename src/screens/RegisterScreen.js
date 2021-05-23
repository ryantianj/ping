import React, {useState} from "react";
import {Text, TextInput, TouchableOpacity} from "react-native";

import Screen from "../components/Screen";
import styles from "../styling/screens/RegisterScreen.styles"

export default (props) => {
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Screen style = {styles.container}>
            <Text style = {styles.usernameText}>
                Choose Username, Password
            </Text>
            <TextInput
                style = {styles.textInput}
                placeholder = "Enter Username Here"
                value = {userName}
                onChangeText = {setuserName}
                autoCapitalize = "none"
                returnKeyType = "next"
            />
            <TextInput
                style = {styles.textInput}
                placeholder = "Enter Password Here"
                value = {password}
                onChangeText = {setPassword}
                secureTextEntry = {true}
            />
            <TouchableOpacity
                style = {styles.button}>
                <Text style = {styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </Screen>
    )
}
