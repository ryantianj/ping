import React, {useRef, useState} from "react";
import {Image, Pressable, Text, TextInput, TouchableOpacity, View} from "react-native";

import Screen from "../components/Screen";
import styles from "../styling/screens/RegisterScreen.styles"

export default (props) => {
    const [userName, setuserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, isPassVisible] = useState(true);

    const nextInput = useRef();

    const togglePassVisible = () => {
        isPassVisible(!showPass)
    }


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
                onSubmitEditing = {() => nextInput.current.focus()}
                blurOnSubmit={false}
            />
            <View>
                <TextInput
                    ref = {nextInput}
                    style = {styles.textInput}
                    placeholder = "Enter Password Here"
                    value = {password}
                    onChangeText = {setPassword}
                    secureTextEntry = {showPass}
                />
                <Pressable
                    style = {styles.pressableToggle}
                    onPress = {togglePassVisible}>
                    <Image style = {styles.passwordToggle}
                           source = {require("../../assets/hide_password1.png")}/>
                </Pressable>
            </View>

            <TouchableOpacity
                style = {styles.button}>
                <Text style = {styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </Screen>
    )
}
