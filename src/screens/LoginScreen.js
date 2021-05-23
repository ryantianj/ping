import React, {useState} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";

import Screen from "../components/Screen";
import Logo from "../constants/Logo";
import styles from "../styling/screens/LoginScreen.styles";

export default () => {
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Screen style = {styles.container}>
            <Logo style = {styles.image} />
            <TextInput
                style = {styles.textInput}
                placeholder = "Username"
                value = {userName}
                onChangeText = {setuserName}
                autoCapitalize = "none"
                returnKeyType = "next"
            />

            <TextInput
                style = {styles.textInput}
                placeholder = "Password"
                value = {password}
                onChangeText = {setPassword}
                secureTextEntry = {true}
            />

            <TouchableOpacity
            style = {styles.button}>
                <Text style ={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style = {styles.forgotPasswordButton}>
                <Text style ={styles.forgotPasswordButtonText}>Forgot your Password ?</Text>
            </TouchableOpacity>

            <View style = {styles.signUpButtonTextOpac}>
                <Text style = {styles.signUpButtonText}>
                    Don't have an account? Sign up <Text onPress = {() => alert('ok')}>
                    here
                </Text>

                </Text>
            </View>




        </Screen>
    )
}


